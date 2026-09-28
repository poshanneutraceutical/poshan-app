package com.poshan.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Locale;

@Configuration
public class StickerWebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(
            ResourceHandlerRegistry registry
    ) {

        Path uploadDirectory =
                getUploadDirectory();

        registry
                .addResourceHandler(
                        "/uploads/stickers/**"
                )
                .addResourceLocations(
                        uploadDirectory
                                .toUri()
                                .toString()
                );
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
}
