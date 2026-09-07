package com.poshan.service;


import com.poshan.dto.OpeningDTO;
import com.poshan.dto.TaskDTO;
import com.poshan.entity.OpeningEntity;
import com.poshan.entity.Task;
import com.poshan.repository.OpeningRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OpeningService {

    private final OpeningRepository openingRepository;

    public OpeningDTO createjob(OpeningDTO openingDTO){
        OpeningEntity job =  new OpeningEntity();

        job.setId(openingDTO.getId());
        job.setJobtittle(openingDTO.getJobtittle());
        job.setDepartment(openingDTO.getDepartment());
        job.setPosition(openingDTO.getPosition());
        job.setPosteddate(openingDTO.getPosteddate());
        job.setClosingdate(openingDTO.getClosingdate());
        job.setSalaryrange(openingDTO.getSalaryrange());
        job.setDescription(openingDTO.getDescription());

        OpeningEntity savedjob = openingRepository.save(job);
         return mapToDTO(job);

    }


    public List<OpeningDTO> getalljob(){
        return openingRepository.findAll()
                .stream()
                .map(job ->mapToDTO(job))
                .toList();

    }

    public OpeningDTO updatejob(Long id, OpeningDTO openingDTO){
        OpeningEntity job =  new OpeningEntity();

        job.setId(openingDTO.getId());
        job.setJobtittle(openingDTO.getJobtittle());
        job.setDepartment(openingDTO.getDepartment());
        job.setPosition(openingDTO.getPosition());
        job.setPosteddate(openingDTO.getPosteddate());
        job.setClosingdate(openingDTO.getClosingdate());
        job.setSalaryrange(openingDTO.getSalaryrange());
        job.setDescription(openingDTO.getDescription());

        OpeningEntity savedjob = openingRepository.save(job);
        return mapToDTO(job);

    }
    public OpeningDTO getjobbyid(Long id){
        OpeningEntity job =   openingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("job is not found with this id "));
        return mapToDTO(job);
    }

    public void deletejobbyid(Long id){
        if(!openingRepository.existsById(id)) {
            throw new RuntimeException("job is found with this id");
        }
        openingRepository.deleteById(id);

    }

    private OpeningDTO mapToDTO(OpeningEntity openingEntity) {
        OpeningDTO dto = new OpeningDTO();
        dto.setId(openingEntity.getId());
        dto.setJobtittle(openingEntity.getJobtittle());
        dto.setDepartment(openingEntity.getDepartment());
        dto.setPosition(openingEntity.getPosition());
        dto.setPosteddate(openingEntity.getPosteddate());
        dto.setClosingdate(openingEntity.getClosingdate());
        dto.setSalaryrange(openingEntity.getSalaryrange());
        dto.setDescription(openingEntity.getDescription());

        return dto;
    }


}

