package com.poshan.repository;


import com.poshan.entity.DesigningEntity;
import com.poshan.entity.Projectstatus;
import com.poshan.entity.Taskstatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DesigningRepository extends JpaRepository<DesigningEntity , Long> {
    long countByStatus(Taskstatus status);

}
