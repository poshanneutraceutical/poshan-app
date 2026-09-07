package com.poshan.repository;


import com.poshan.entity.MrpEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface MRPRepository extends JpaRepository<MrpEntity ,  Long> {
}
