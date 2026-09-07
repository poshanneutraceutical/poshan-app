package com.poshan.repository;

import com.poshan.entity.BoxDimension;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BoxDimensionRepository
        extends JpaRepository<BoxDimension, Long> {

    /*
     ==========================================
     FIND BOX
     ==========================================
     */

    Optional<BoxDimension> findByBoxCode(
            String boxCode
    );

    /*
     ==========================================
     CHECK BOX CODE
     ==========================================
     */

    boolean existsByBoxCode(
            String boxCode
    );

    /*
     ==========================================
     GENERATE NEXT BOX CODE
     ==========================================
     */

    BoxDimension findTopByOrderByIdDesc();

}