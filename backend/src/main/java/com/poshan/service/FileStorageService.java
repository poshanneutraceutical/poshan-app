package com.poshan.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileStorageService {

    @Value("${file.upload-dir}")
    private String uploadDirectory;

    /*
     ==========================================
     SAVE FILE
     ==========================================
     */

    public String saveFile(

            MultipartFile file,

            String folder,

            String fileName

    ) {

        try {

            if (file == null || file.isEmpty()) {

                return null;

            }

            Path uploadPath = Paths.get(

                    uploadDirectory,

                    folder

            );

            if (!Files.exists(uploadPath)) {

                Files.createDirectories(uploadPath);

            }

            String extension = getExtension(

                    file.getOriginalFilename()

            );

            String finalFileName =

                    fileName + extension;

            Path targetLocation =

                    uploadPath.resolve(finalFileName);

            Files.copy(

                    file.getInputStream(),

                    targetLocation,

                    StandardCopyOption.REPLACE_EXISTING

            );

            return "/uploads/"

                    + folder

                    + "/"

                    + finalFileName;

        }

        catch (IOException ex) {

            throw new RuntimeException(

                    "Failed to upload file.",

                    ex

            );

        }

    }


    /*
     ==========================================
     DELETE FILE
     ==========================================
     */

    public void deleteFile(

            String relativePath

    ) {

        try {

            if (relativePath == null || relativePath.isBlank()) {

                return;

            }

            String cleanedPath =

                    relativePath.replace(

                            "/uploads/",

                            ""

                    );

            Path filePath = Paths.get(

                    uploadDirectory,

                    cleanedPath

            );

            Files.deleteIfExists(filePath);

        }

        catch (IOException ex) {

            ex.printStackTrace();

        }

    }


    /*
     ==========================================
     FILE EXTENSION
     ==========================================
     */

    private String getExtension(

            String filename

    ) {

        if (filename == null) {

            return "";

        }

        int index = filename.lastIndexOf(".");

        if (index == -1) {

            return "";

        }

        return filename.substring(index);

    }


    /*
     ==========================================
     SAVE EMPLOYEE PROFILE IMAGE
     ==========================================
     */

    public String saveEmployeeProfileImage(

            MultipartFile file,

            Long employeeId

    ) {

        if (file == null || file.isEmpty()) {

            return null;

        }

        String fileName =

                "employee_" + employeeId + "_profile";

        return saveFile(

                file,

                "employees",

                fileName

        );

    }

}