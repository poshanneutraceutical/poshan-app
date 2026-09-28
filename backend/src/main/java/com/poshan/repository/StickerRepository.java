package com.poshan.repository;

import com.poshan.entity.StickerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StickerRepository extends JpaRepository<StickerEntity, Long> {

    List<StickerEntity> findAllByOrderByCreatedAtDesc();
}
