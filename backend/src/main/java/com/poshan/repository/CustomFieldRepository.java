package com.poshan.repository;


import com.poshan.entity.Company;
import com.poshan.entity.CustomField;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CustomFieldRepository extends JpaRepository<CustomField , Long> {

    List<CustomField> findByCompany(Company company);


}
