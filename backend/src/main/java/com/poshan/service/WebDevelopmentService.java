package com.poshan.service;

import com.poshan.dto.WebDevelopmentDTO;
import com.poshan.entity.WebDevelopment;
import com.poshan.repository.WebDevelopmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class WebDevelopmentService {
    private final WebDevelopmentRepository webDevelopmentRepository;
     public WebDevelopmentDTO createProject(WebDevelopmentDTO webDevelopmentDTO){
         WebDevelopment web = new WebDevelopment();
         web.setPriority(webDevelopmentDTO.getPriority());
         web.setCompanyname(webDevelopmentDTO.getCompanyname());
         web.setContactperson(webDevelopmentDTO.getContactperson());
         web.setProjectname(webDevelopmentDTO.getProjectname());
         web.setProjecttype(webDevelopmentDTO.getProjecttype());
         web.setStatus(webDevelopmentDTO.getStatus());
         web.setAssigndate(webDevelopmentDTO.getAssigndate());
         web.setAssigndeveloper(webDevelopmentDTO.getAssigndeveloper());
         web.setDuedate(webDevelopmentDTO.getDuedate());
         web.setNotes(webDevelopmentDTO.getNotes());

         WebDevelopment savedProject = webDevelopmentRepository.save(web);

         return mapToDTO(savedProject);

    }

    public WebDevelopmentDTO getProjectById(Long id){
            WebDevelopment web = webDevelopmentRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Project not found "));
        return mapToDTO(web);

    }
    public List<WebDevelopmentDTO> getAllProject(){
         return  webDevelopmentRepository.findAll()
                 .stream()
                 .map(web -> mapToDTO(web))
                 .toList();
    }
    public void deleteProjectById(Long id){
        if (!webDevelopmentRepository.existsById(id)) {
            throw new RuntimeException("Project not found with id: " + id);
        }
        webDevelopmentRepository.deleteById(id);
    }
    public WebDevelopmentDTO updateProject(Long id, WebDevelopmentDTO webDevelopmentDTO) {
       WebDevelopment web  = webDevelopmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("project not found with id: " + id));
        web.setNotes(webDevelopmentDTO.getNotes());
        web.setCompanyname(webDevelopmentDTO.getCompanyname());
        web.setContactperson(webDevelopmentDTO.getContactperson());
        web.setProjectname(webDevelopmentDTO.getProjectname());
        web.setProjecttype(webDevelopmentDTO.getProjecttype());
        web.setAssigndeveloper(webDevelopmentDTO.getAssigndeveloper());
        web.setPriority(webDevelopmentDTO.getPriority());
        web.setDuedate(webDevelopmentDTO.getDuedate());
        web.setAssigndate(webDevelopmentDTO.getAssigndate());
        web.setStatus(webDevelopmentDTO.getStatus());
        WebDevelopment updatedweb = webDevelopmentRepository.save(web);
        return mapToDTO(updatedweb);
    }
    private WebDevelopmentDTO mapToDTO(WebDevelopment web) {
        WebDevelopmentDTO dto = new WebDevelopmentDTO();
        dto.setId(web.getId());
        dto.setNotes(web.getNotes());
        dto.setCompanyname(web.getCompanyname());
        dto.setContactperson(web.getContactperson());
        dto.setProjectname(web.getProjectname());
        dto.setProjecttype(web.getProjecttype());
        dto.setAssigndeveloper(web.getAssigndeveloper());
        dto.setPriority(web.getPriority());
        dto.setDuedate(web.getDuedate());
        dto.setAssigndate(web.getAssigndate());
        dto.setStatus(web.getStatus());
        return dto;
    }




}
