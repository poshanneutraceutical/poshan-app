package com.poshan.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

    @Getter
    @Setter
    public class StickerDTO {

        private Long id;
        private String weight;
        private Integer stickerCount;
        private String note;
        private List<String> imageUrls = new ArrayList<>();
        private LocalDateTime createdAt;
    }


