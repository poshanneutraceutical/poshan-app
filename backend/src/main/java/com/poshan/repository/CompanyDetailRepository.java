package com.poshan.repository;

import com.poshan.entity.Company;
import com.poshan.entity.CompanyDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CompanyDetailRepository extends JpaRepository<CompanyDetail , Long> {

    Optional<CompanyDetail> findByCompany(Company company);

}

