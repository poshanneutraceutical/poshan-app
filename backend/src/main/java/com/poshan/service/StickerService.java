package com.poshan.service;

import com.poshan.dto.StickerDTO;
import com.poshan.entity.StickerEntity;
import com.poshan.repository.StickerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class StickerService {

    private final StickerRepository stickerRepository;

    @Transactional
    public StickerDTO createSticker(
            String weight,
            Integer stickerCount,
            String note,
            List<MultipartFile> images
    ) {
        validateInput(weight, stickerCount, images);

        Path uploadDirectory = getUploadDirectory();

        List<Path> uploadedFiles = new ArrayList<>();
        List<String> imageUrls = new ArrayList<>();

        try {
            Files.createDirectories(uploadDirectory);

            for (MultipartFile image : images) {

                if (image == null || image.isEmpty()) {
                    throw new RuntimeException(
                            "One of the selected images is empty."
                    );
                }

                String contentType = image.getContentType();

                if (
                        contentType == null
                                || !contentType
                                .toLowerCase(Locale.ROOT)
                                .startsWith("image/")
                ) {
                    throw new RuntimeException(
                            "Only image files are allowed."
                    );
                }

                String extension = getImageExtension(image);

                String fileName =
                        UUID.randomUUID() + extension;

                Path target =
                        uploadDirectory
                                .resolve(fileName)
                                .normalize();

                if (!target.getParent().equals(uploadDirectory)) {
                    throw new RuntimeException(
                            "Invalid image path."
                    );
                }

                Files.copy(
                        image.getInputStream(),
                        target,
                        StandardCopyOption.REPLACE_EXISTING
                );

                uploadedFiles.add(target);

                imageUrls.add(
                        "/uploads/stickers/" + fileName
                );
            }

            StickerEntity sticker = new StickerEntity();

            sticker.setWeight(weight.trim());
            sticker.setStickerCount(stickerCount);
            sticker.setNote(
                    note == null ? "" : note.trim()
            );
            sticker.setImageUrls(imageUrls);

            return mapToDTO(
                    stickerRepository.save(sticker)
            );

        } catch (IOException exception) {

            deleteFilesQuietly(uploadedFiles);

            throw new RuntimeException(
                    "Unable to save sticker images.",
                    exception
            );

        } catch (RuntimeException exception) {

            deleteFilesQuietly(uploadedFiles);

            throw exception;
        }
    }

    public List<StickerDTO> getAllStickers() {

        return stickerRepository
                .findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    public StickerDTO getStickerById(Long id) {

        StickerEntity sticker =
                stickerRepository
                        .findById(id)
                        .orElseThrow(
                                () ->
                                        new RuntimeException(
                                                "Sticker record not found."
                                        )
                        );

        return mapToDTO(sticker);
    }

    @Transactional
    public void deleteSticker(Long id) {

        StickerEntity sticker =
                stickerRepository
                        .findById(id)
                        .orElseThrow(
                                () ->
                                        new RuntimeException(
                                                "Sticker record not found."
                                        )
                        );

        List<String> imageUrls =
                sticker.getImageUrls();

        if (imageUrls != null) {

            for (String imageUrl : imageUrls) {

                deleteStickerImage(imageUrl);
            }
        }

        stickerRepository.delete(sticker);
    }

    private void validateInput(
            String weight,
            Integer stickerCount,
            List<MultipartFile> images
    ) {

        if (weight == null || weight.isBlank()) {
            throw new RuntimeException(
                    "Weight is required."
            );
        }

        if (stickerCount == null || stickerCount <= 0) {
            throw new RuntimeException(
                    "Number of stickers to print must be greater than 0."
            );
        }

        if (images == null || images.isEmpty()) {
            throw new RuntimeException(
                    "At least 1 image is required."
            );
        }
    }

    private Path getUploadDirectory() {

        String osName =
                System.getProperty(
                        "os.name",
                        ""
                ).toLowerCase(Locale.ROOT);

        if (osName.contains("win")) {

            return Paths.get(
                            System.getProperty("user.dir"),
                            "uploads",
                            "stickers"
                    )
                    .toAbsolutePath()
                    .normalize();
        }

        return Paths.get(
                        "/opt/poshan/uploads/stickers"
                )
                .toAbsolutePath()
                .normalize();
    }

    private String getImageExtension(
            MultipartFile image
    ) {

        String originalName =
                image.getOriginalFilename();

        if (
                originalName != null
                        && originalName.contains(".")
        ) {

            String extension =
                    originalName
                            .substring(
                                    originalName.lastIndexOf(".")
                            )
                            .toLowerCase(Locale.ROOT);

            if (
                    extension.equals(".jpg")
                            || extension.equals(".jpeg")
                            || extension.equals(".png")
                            || extension.equals(".webp")
                            || extension.equals(".gif")
                            || extension.equals(".bmp")
                            || extension.equals(".svg")
            ) {
                return extension;
            }
        }

        String contentType = image.getContentType();

        if (contentType != null) {

            String normalized =
                    contentType
                            .toLowerCase(Locale.ROOT);

            if (normalized.equals("image/jpeg")) {
                return ".jpg";
            }

            if (normalized.equals("image/png")) {
                return ".png";
            }

            if (normalized.equals("image/webp")) {
                return ".webp";
            }

            if (normalized.equals("image/gif")) {
                return ".gif";
            }

            if (normalized.equals("image/bmp")) {
                return ".bmp";
            }

            if (normalized.equals("image/svg+xml")) {
                return ".svg";
            }
        }

        return ".jpg";
    }

    private StickerDTO mapToDTO(
            StickerEntity sticker
    ) {

        StickerDTO dto = new StickerDTO();

        dto.setId(sticker.getId());
        dto.setWeight(sticker.getWeight());
        dto.setStickerCount(sticker.getStickerCount());
        dto.setNote(sticker.getNote());

        dto.setImageUrls(
                sticker.getImageUrls() == null
                        ? new ArrayList<>()
                        : new ArrayList<>(
                        sticker.getImageUrls()
                )
        );

        dto.setCreatedAt(sticker.getCreatedAt());

        return dto;
    }

    private void deleteStickerImage(
            String imageUrl
    ) {

        if (imageUrl == null || imageUrl.isBlank()) {
            return;
        }

        String fileName;

        try {
            fileName =
                    Paths.get(imageUrl)
                            .getFileName()
                            .toString();
        } catch (Exception exception) {
            throw new RuntimeException(
                    "Invalid sticker image path.",
                    exception
            );
        }

        if (fileName.isBlank() || fileName.contains("..")) {
            throw new RuntimeException(
                    "Invalid sticker image path."
            );
        }

        Path uploadDirectory =
                getUploadDirectory();

        Path imagePath =
                uploadDirectory
                        .resolve(fileName)
                        .normalize();

        if (!imagePath.getParent().equals(uploadDirectory)) {
            throw new RuntimeException(
                    "Invalid sticker image path."
            );
        }

        try {
            Files.deleteIfExists(imagePath);
        } catch (IOException exception) {
            throw new RuntimeException(
                    "Unable to delete sticker image.",
                    exception
            );
        }
    }


    private void deleteFilesQuietly(
            List<Path> files
    ) {

        for (Path file : files) {

            try {
                Files.deleteIfExists(file);
            } catch (IOException ignored) {
                // Ignore cleanup failures.
            }
        }
    }
}
