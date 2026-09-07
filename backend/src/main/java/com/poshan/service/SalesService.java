package com.poshan.service;

import com.poshan.dto.CompanyDetailDTO;
import com.poshan.dto.CompanyPageDTO;
import com.poshan.dto.CompanyRequestDTO;
import com.poshan.dto.CompanyResponseDTO;
import com.poshan.dto.CustomFieldDTO;
import com.poshan.entity.Company;
import com.poshan.entity.CompanyDetail;
import com.poshan.entity.CustomField;
import com.poshan.repository.CompanyDetailRepository;
import com.poshan.repository.CompanyRepository;
import com.poshan.repository.CustomFieldRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SalesService {

    private final CompanyRepository companyRepository;

    private final CompanyDetailRepository companyDetailRepository;

    private final CustomFieldRepository customFieldRepository;


    /*
     ==========================================
     CREATE COMPANY
     ==========================================
     */

    public CompanyResponseDTO createcompany(
            CompanyRequestDTO companyRequestDTO
    ) {

        Company company = new Company();

        company.setCompanyname(
                companyRequestDTO.getCompanyname()
        );

        company.setCreatedate(
                LocalDateTime.now()
        );

        Company savedCompany =
                companyRepository.save(company);

        return mapToCompanyDTO(savedCompany);
    }


    /*
     ==========================================
     UPDATE COMPANY NAME
     ==========================================
     */

    public CompanyResponseDTO updatecompany(
            Long id,
            CompanyRequestDTO companyRequestDTO
    ) {

        Company company =
                companyRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Company not found with id: " + id
                                )
                        );

        company.setCompanyname(
                companyRequestDTO.getCompanyname()
        );

        Company savedCompany =
                companyRepository.save(company);

        return mapToCompanyDTO(savedCompany);
    }


    /*
     ==========================================
     GET COMPANY BY ID
     ==========================================
     */

    public CompanyResponseDTO getCompanyById(Long id) {

        Company company =
                companyRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Company not found with id: " + id
                                )
                        );

        return mapToCompanyDTO(company);
    }


    /*
     ==========================================
     GET ALL COMPANIES
     ==========================================
     */

    public List<CompanyResponseDTO> getallcompany() {

        return companyRepository.findAll()
                .stream()
                .map(this::mapToCompanyDTO)
                .toList();
    }


    /*
     ==========================================
     CREATE COMPANY DETAIL
     ==========================================
     */

    public CompanyDetailDTO createdetail(
            CompanyDetailDTO companyDetailDTO
    ) {

        Company company =
                companyRepository.findById(
                                companyDetailDTO.getCompanyid()
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Company not found"
                                )
                        );


        /*
         Prevent duplicate CompanyDetail.
         A Company has only ONE CompanyDetail.
         */

        CompanyDetail detail =
                companyDetailRepository
                        .findByCompany(company)
                        .orElseGet(CompanyDetail::new);


        detail.setOrdername(
                companyDetailDTO.getOrdername()
        );

        detail.setOrdertype(
                companyDetailDTO.getOrdertype()
        );

        detail.setQuantity(
                companyDetailDTO.getQuantity()
        );

        detail.setCompanylocation(
                companyDetailDTO.getCompanylocation()
        );

        detail.setCompany(company);


        CompanyDetail savedDetail =
                companyDetailRepository.save(detail);

        return mapToCompanyDetailDTO(savedDetail);
    }


    /*
     ==========================================
     UPDATE COMPANY DETAIL
     ==========================================
     */

    public CompanyDetailDTO updatedetail(
            Long id,
            CompanyDetailDTO companyDetailDTO
    ) {

        CompanyDetail detail =
                companyDetailRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Company detail not found with id: " + id
                                )
                        );


        detail.setOrdername(
                companyDetailDTO.getOrdername()
        );

        detail.setOrdertype(
                companyDetailDTO.getOrdertype()
        );

        detail.setQuantity(
                companyDetailDTO.getQuantity()
        );

        detail.setCompanylocation(
                companyDetailDTO.getCompanylocation()
        );


        CompanyDetail savedDetail =
                companyDetailRepository.save(detail);

        return mapToCompanyDetailDTO(savedDetail);
    }


    /*
     ==========================================
     CREATE CUSTOM FIELD
     ==========================================
     */

    public CustomFieldDTO createfield(
            CustomFieldDTO customFieldDTO
    ) {

        Company company =
                companyRepository.findById(
                                customFieldDTO.getCompanyid()
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Company not found"
                                )
                        );


        CustomField field =
                new CustomField();

        field.setFieldName(
                customFieldDTO.getFieldname()
        );

        field.setFieldValue(
                customFieldDTO.getFieldvalue()
        );

        field.setCompany(company);


        CustomField savedField =
                customFieldRepository.save(field);

        return mapToCustomFieldDTO(savedField);
    }


    /*
     ==========================================
     UPDATE CUSTOM FIELD
     ==========================================
     */

    public CustomFieldDTO updatefield(
            Long id,
            CustomFieldDTO customFieldDTO
    ) {

        CustomField field =
                customFieldRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Custom field not found with id: " + id
                                )
                        );


        field.setFieldName(
                customFieldDTO.getFieldname()
        );

        field.setFieldValue(
                customFieldDTO.getFieldvalue()
        );


        CustomField savedField =
                customFieldRepository.save(field);

        return mapToCustomFieldDTO(savedField);
    }


    /*
     ==========================================
     DELETE COMPANY
     ==========================================
     */

    public void deletecompanybyid(Long id) {

        if (!companyRepository.existsById(id)) {

            throw new RuntimeException(
                    "Company not found with id: " + id
            );
        }

        companyRepository.deleteById(id);
    }


    /*
     ==========================================
     GET COMPLETE COMPANY PAGE
     ==========================================
     */

    public CompanyPageDTO getCompanyPage(
            Long companyId
    ) {

        Company company =
                companyRepository.findById(companyId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Company not found"
                                )
                        );


        CompanyPageDTO dto =
                new CompanyPageDTO();


        /*
         ==========================================
         COMPANY
         ==========================================
         */

        dto.setCompanyId(
                company.getId()
        );

        dto.setCompanyName(
                company.getCompanyname()
        );


        /*
         ==========================================
         COMPANY DETAIL
         ==========================================
         */

        companyDetailRepository
                .findByCompany(company)
                .ifPresent(detail -> {

                    dto.setCompanyDetailId(
                            detail.getId()
                    );

                    dto.setOrderName(
                            detail.getOrdername()
                    );

                    dto.setOrderType(
                            detail.getOrdertype()
                    );

                    dto.setQuantity(
                            detail.getQuantity()
                    );

                    dto.setCompanyLocation(
                            detail.getCompanylocation()
                    );

                });


        /*
         ==========================================
         CUSTOM FIELDS
         ==========================================
         */

        List<CustomFieldDTO> fieldDTOList =
                customFieldRepository
                        .findByCompany(company)
                        .stream()
                        .map(this::mapToCustomFieldDTO)
                        .toList();


        dto.setCustomFields(
                fieldDTOList
        );


        return dto;
    }


    /*
     ==========================================
     MAP COMPANY DETAIL -> DTO
     ==========================================
     */

    private CompanyDetailDTO mapToCompanyDetailDTO(
            CompanyDetail companyDetail
    ) {

        CompanyDetailDTO dto =
                new CompanyDetailDTO();


        dto.setId(
                companyDetail.getId()
        );

        dto.setCompanyid(
                companyDetail.getCompany().getId()
        );

        dto.setOrdername(
                companyDetail.getOrdername()
        );

        dto.setOrdertype(
                companyDetail.getOrdertype()
        );

        dto.setQuantity(
                companyDetail.getQuantity()
        );

        dto.setCompanylocation(
                companyDetail.getCompanylocation()
        );


        return dto;
    }


    /*
     ==========================================
     MAP COMPANY -> DTO
     ==========================================
     */

    private CompanyResponseDTO mapToCompanyDTO(
            Company company
    ) {

        CompanyResponseDTO dto =
                new CompanyResponseDTO();


        dto.setId(
                company.getId()
        );

        dto.setCompanyname(
                company.getCompanyname()
        );


        return dto;
    }


    /*
     ==========================================
     MAP CUSTOM FIELD -> DTO
     ==========================================
     */

    private CustomFieldDTO mapToCustomFieldDTO(
            CustomField customField
    ) {

        CustomFieldDTO dto =
                new CustomFieldDTO();


        dto.setId(
                customField.getId()
        );

        dto.setCompanyid(
                customField.getCompany().getId()
        );

        dto.setFieldname(
                customField.getFieldName()
        );

        dto.setFieldvalue(
                customField.getFieldValue()
        );


        return dto;
    }

}