package com.poshan.service;


import com.poshan.dto.DesigningDTO;

import com.poshan.entity.DesigningEntity;

import com.poshan.repository.DesigningRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class  DesigningService {

    private final DesigningRepository designingRepository;

    public DesigningDTO creatdesignproject(DesigningDTO designingDTO){
        DesigningEntity design = new DesigningEntity();
        design.setId(designingDTO.getId());
        design.setProjectname(designingDTO.getProjectname());
        design.setCompanyname(designingDTO.getCompanyname());
        design.setDesigntype(designingDTO.getDesigntype());
        design.setStatus(designingDTO.getStatus());
        design.setAssignby(designingDTO.getAssignby());
        design.setAssignto(designingDTO.getAssignto());
        design.setDuedate(designingDTO.getDuedate());
        design.setNotes(designingDTO.getNotes());

         DesigningEntity savedDesign = designingRepository.save(design);
        return mapToDTO(savedDesign);


    }
     public DesigningDTO updatedesignproject(Long id ,DesigningDTO designingDTO){
         DesigningEntity design = designingRepository.findById(id)
                 .orElseThrow(() -> new RuntimeException("project not found with id: " + id));
         design.setId(designingDTO.getId());
         design.setProjectname(designingDTO.getProjectname());
         design.setCompanyname(designingDTO.getCompanyname());
         design.setDesigntype(designingDTO.getDesigntype());
         design.setStatus(designingDTO.getStatus());
         design.setAssignby(designingDTO.getAssignby());
         design.setAssignto(designingDTO.getAssignto());
         design.setDuedate(designingDTO.getDuedate());
         design.setNotes(designingDTO.getNotes());

         DesigningEntity savedDesign = designingRepository.save(design);
         return mapToDTO(savedDesign);
     }

     public void deletedesignproject(Long id){
        if(!designingRepository.existsById(id)) {
             throw new RuntimeException("Project not found with given id");
        }
        designingRepository.deleteById(id);

     }

     public List<DesigningDTO> getalldesignproject(){
         return designingRepository.findAll()
                 .stream()
                 .map(design-> mapToDTO(design))
                 .toList();
     }

     public DesigningDTO getdesignprojectbyid(Long id){
          DesigningEntity design =designingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("project not found with given id "));
        return mapToDTO(design);
     }
    private DesigningDTO mapToDTO(DesigningEntity designingEntity) {
        DesigningDTO dto = new DesigningDTO();
        dto.setId(designingEntity.getId());
        dto.setProjectname(designingEntity.getProjectname());
        dto.setCompanyname(designingEntity.getCompanyname());
        dto.setDesigntype(designingEntity.getDesigntype());
        dto.setStatus(designingEntity.getStatus());
        dto.setAssignby(designingEntity.getAssignby());
        dto.setAssignto(designingEntity.getAssignto());
        dto.setDuedate(designingEntity.getDuedate());
        dto.setNotes(designingEntity.getNotes());

        return dto;
    }


}
