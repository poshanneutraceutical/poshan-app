package com.poshan.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class FileStorageConfig implements WebMvcConfigurer {

    @Value("${file.upload-dir}")
    private String uploadDirectory;

    @Override
    public void addResourceHandlers(
            ResourceHandlerRegistry registry
    ) {

        String location =
                "file:" +
                        (uploadDirectory.endsWith("/")
                                || uploadDirectory.endsWith("\\")
                                ? uploadDirectory
                                : uploadDirectory + "/");

        registry.addResourceHandler(
                "/uploads/**"
        ).addResourceLocations(
                location
        );
    }
}