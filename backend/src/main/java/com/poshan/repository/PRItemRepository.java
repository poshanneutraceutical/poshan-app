package com.poshan.repository;

import com.poshan.entity.PR;
import com.poshan.entity.PR_Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PRItemRepository extends JpaRepository<PR_Item, Long> {


    // Get all items of a particular PR
    List<PR_Item> findByPr(PR pr);


    // Delete all items of a PR while updating PR
    void deleteByPr(PR pr);

}