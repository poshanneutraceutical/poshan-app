package com.poshan.repository;

import com.poshan.entity.PushDevice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PushDeviceRepository
        extends JpaRepository<PushDevice, Long> {

    Optional<PushDevice> findByFid(String fid);

    List<PushDevice> findByUserIdIn(List<Long> userIds);

    void deleteByFid(String fid);
}

