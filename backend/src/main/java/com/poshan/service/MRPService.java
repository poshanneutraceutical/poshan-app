package com.poshan.service;

import com.poshan.dto.MRPDTO;
import com.poshan.entity.MrpEntity;
import com.poshan.repository.MRPRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MRPService {

    private final MRPRepository mrpRepository;


    // =========================================================
    // CREATE MRP
    // =========================================================

    public MRPDTO createMrpDetails(MRPDTO mrpDTO) {

        MrpEntity mrp = new MrpEntity();

        mrp.setMrp(mrpDTO.getMrp());
        mrp.setBatchNumber(mrpDTO.getBatchNumber());
        mrp.setMfgDate(mrpDTO.getMfgDate());
        mrp.setExpDate(mrpDTO.getExpDate());
        mrp.setCompanyName(mrpDTO.getCompanyName());
        mrp.setScopeType(mrpDTO.getScopeType());
        mrp.setBoxType(mrpDTO.getBoxType());
        mrp.setNeckSealType(mrpDTO.getNeckSealType());
        mrp.setNote(mrpDTO.getNote());

        MrpEntity savedMrp =
                mrpRepository.save(mrp);

        return mapToDTO(savedMrp);
    }


    // =========================================================
    // GET MRP BY ID
    // =========================================================

    public MRPDTO getMrpById(Long id) {

        MrpEntity mrp =
                mrpRepository.findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "MRP not found with id: " + id
                                )
                        );

        return mapToDTO(mrp);
    }


    // =========================================================
    // GET ALL MRP DETAILS
    // =========================================================

    public List<MRPDTO> getAllMrpDetails() {

        return mrpRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }


    // =========================================================
    // UPDATE MRP
    // =========================================================

    public MRPDTO updateMrpDetails(
            Long id,
            MRPDTO mrpDTO
    ) {

        MrpEntity mrp =
                mrpRepository.findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "MRP not found with id: " + id
                                )
                        );


        mrp.setMrp(mrpDTO.getMrp());

        mrp.setBatchNumber(
                mrpDTO.getBatchNumber()
        );

        mrp.setMfgDate(
                mrpDTO.getMfgDate()
        );

        mrp.setExpDate(
                mrpDTO.getExpDate()
        );

        mrp.setCompanyName(
                mrpDTO.getCompanyName()
        );

        mrp.setScopeType(
                mrpDTO.getScopeType()
        );

        mrp.setBoxType(
                mrpDTO.getBoxType()
        );

        mrp.setNeckSealType(
                mrpDTO.getNeckSealType()
        );

        mrp.setNote(
                mrpDTO.getNote()
        );


        MrpEntity updatedMrp =
                mrpRepository.save(mrp);

        return mapToDTO(updatedMrp);
    }


    // =========================================================
    // DELETE MRP
    // =========================================================

    public void deleteMrpById(Long id) {

        if (!mrpRepository.existsById(id)) {

            throw new RuntimeException(
                    "MRP not found with id: " + id
            );
        }

        mrpRepository.deleteById(id);
    }


    // =========================================================
    // ENTITY → DTO
    // =========================================================

    private MRPDTO mapToDTO(MrpEntity mrp) {

        MRPDTO dto = new MRPDTO();

        dto.setId(
                mrp.getId()
        );

        dto.setMrp(
                mrp.getMrp()
        );

        dto.setBatchNumber(
                mrp.getBatchNumber()
        );

        dto.setMfgDate(
                mrp.getMfgDate()
        );

        dto.setExpDate(
                mrp.getExpDate()
        );

        dto.setCompanyName(
                mrp.getCompanyName()
        );

        dto.setScopeType(
                mrp.getScopeType()
        );

        dto.setBoxType(
                mrp.getBoxType()
        );

        dto.setNeckSealType(
                mrp.getNeckSealType()
        );

        dto.setNote(
                mrp.getNote()
        );

        return dto;
    }

}