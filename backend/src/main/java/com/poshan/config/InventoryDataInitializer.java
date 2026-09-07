package com.poshan.config;

import com.poshan.entity.InventoryCategory;
import com.poshan.entity.Inventory;

import com.poshan.repository.InventoryCategoryRepository;
import com.poshan.repository.InventoryRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class InventoryDataInitializer
        implements CommandLineRunner {

    private final InventoryCategoryRepository categoryRepository;

    private final InventoryRepository inventoryRepository;


    @Override
    @Transactional
    public void run(
            String... args
    ) {

        createDefaultCategory("BOX");
        createDefaultCategory("FLAVOUR");
        createDefaultCategory("DUSTREIN");
        createDefaultCategory("SMP");
        createDefaultCategory("FAT POWDER");


        /*
         * Existing inventory rows created before the new
         * category system can be assigned to BOX.
         */

        InventoryCategory boxCategory =
                categoryRepository
                        .findByNameIgnoreCase("BOX")
                        .orElse(null);


        if (
                boxCategory != null
        ) {

            List<Inventory> oldInventory =
                    inventoryRepository.findAll();


            for (
                    Inventory inventory
                    : oldInventory
            ) {

                if (
                        inventory.getCategory() == null &&
                                inventory.getBoxType() != null
                ) {

                    inventory.setCategory(
                            boxCategory
                    );

                    inventory.setUpdatedAt(
                            LocalDateTime.now()
                    );

                    inventoryRepository.save(
                            inventory
                    );
                }
            }
        }
    }


    private void createDefaultCategory(
            String name
    ) {

        if (
                !categoryRepository
                        .existsByNameIgnoreCase(
                                name
                        )
        ) {

            InventoryCategory category =
                    new InventoryCategory();


            category.setName(name);

            category.setActive(true);

            category.setCreatedAt(
                    LocalDateTime.now()
            );

            category.setUpdatedAt(
                    LocalDateTime.now()
            );


            categoryRepository.save(
                    category
            );
        }
    }
}