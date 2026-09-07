package com.poshan.repository;

import com.poshan.entity.AllowedNetwork;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AllowedNetworkRepository extends JpaRepository<AllowedNetwork, Long> {

    Optional<AllowedNetwork> findByIpAddressAndStatusTrue(String ipAddress);

}