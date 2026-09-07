package com.poshan.repository;


import com.poshan.entity.OpeningEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface OpeningRepository extends JpaRepository <OpeningEntity, Long>{




}
