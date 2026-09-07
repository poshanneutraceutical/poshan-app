package com.poshan.service;

import com.poshan.dto.DigitalDTO;

import com.poshan.dto.TaskDTO;
import com.poshan.entity.Digital;
import com.poshan.entity.Task;
import com.poshan.entity.WebDevelopment;
import com.poshan.repository.DigitalMarketingRepository;
import com.poshan.repository.WebDevelopmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class DigitalMarketingService {

  public  final DigitalMarketingRepository digitalMarketingRepository;


    public DigitalDTO createdigitalproject(DigitalDTO digitalDTO){
        
        Digital digital = new Digital();

        digital.setId(digitalDTO.getId());
        digital.setCompanyname(digitalDTO.getCompanyname());
        digital.setAssigndate(digitalDTO.getAssigndate());
        digital.setAssignto(digitalDTO.getAssignto());
        digital.setDuedate(digitalDTO.getDuedate());
        digital.setType(digitalDTO.getType());
        digital.setStatus(digitalDTO.getStatus());
        digital.setLeadgenerated(digitalDTO.getLeadgenerated());
        digital.setNotes(digitalDTO.getNotes());
        Digital savedDigital = digitalMarketingRepository.save(digital);
        return mapToDTO(savedDigital);
    }

    public  DigitalDTO updatedigitalproject(Long id, DigitalDTO digitalDTO){

        Digital digital  = digitalMarketingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("project not found with id: " + id));
        digital.setId(digitalDTO.getId());
        digital.setCompanyname(digitalDTO.getCompanyname());
        digital.setAssigndate(digitalDTO.getAssigndate());
        digital.setAssignto(digitalDTO.getAssignto());
        digital.setDuedate(digitalDTO.getDuedate());
        digital.setType(digitalDTO.getType());
        digital.setStatus(digitalDTO.getStatus());
        digital.setLeadgenerated(digitalDTO.getLeadgenerated());
        digital.setNotes(digitalDTO.getNotes());

        Digital savedDigital = digitalMarketingRepository.save(digital);
        return mapToDTO(savedDigital);
    }

    public  void deletedigitalproject(Long id){
        if (!digitalMarketingRepository.existsById(id)) {
            throw new RuntimeException("Task not found with id: " + id);
        }
       digitalMarketingRepository.deleteById(id);
    }
    public  List<DigitalDTO> getalldigitalproject(){
        return  digitalMarketingRepository.findAll()
                .stream()
                .map(digital -> mapToDTO(digital))
                .toList();
    }

    public  DigitalDTO  getdigitalprojectbyid(Long id){
        Digital digital = digitalMarketingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));
        return mapToDTO(digital);
    }
    private  DigitalDTO mapToDTO(Digital digital) {
         DigitalDTO dto= new DigitalDTO();
        dto.setId(digital.getId());
        dto.setCompanyname(digital.getCompanyname());
        dto.setAssigndate(digital.getAssigndate());
        dto.setAssignto(digital.getAssignto());
        dto.setDuedate(digital.getDuedate());
        dto.setType(digital.getType());
        dto.setStatus(digital.getStatus());
        dto.setLeadgenerated(digital.getLeadgenerated());
        dto.setNotes(digital.getNotes());
        return dto;
    }
}
