package com.poshan.repository;

import com.poshan.entity.PR;
import com.poshan.entity.PRstatus;
import com.poshan.entity.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PRRepository extends JpaRepository<PR, Long> {



    List<PR> findByVendor(Vendor vendor);

    long countByStatus(PRstatus status);

    List<PR> findByStatus(PRstatus status);



    PR findByPrNumber(String prNumber);



}