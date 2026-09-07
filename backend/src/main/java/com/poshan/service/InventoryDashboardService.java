package com.poshan.service;

import com.poshan.dto.InventoryDashboardDTO;
import com.poshan.entity.Inventory;
import com.poshan.repository.InventoryRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InventoryDashboardService {

    private final InventoryRepository inventoryRepository;


    @Transactional(readOnly = true)
    public InventoryDashboardDTO
    getDashboard() {

        List<Inventory> inventoryList =
                inventoryRepository
                        .findAllByOrderByIdDesc();


        InventoryDashboardDTO dashboard =
                new InventoryDashboardDTO();


        int availableStock =
                inventoryList
                        .stream()
                        .mapToInt(
                                item ->
                                        item.getAvailableQuantity()
                                                == null
                                                ? 0
                                                : item.getAvailableQuantity()
                        )
                        .sum();


        int minimumQuantity =
                inventoryList
                        .stream()
                        .mapToInt(
                                item ->
                                        item.getMinimumQuantity()
                                                == null
                                                ? 0
                                                : item.getMinimumQuantity()
                        )
                        .sum();


        long lowStockCount =
                inventoryRepository
                        .countLowStockItems();


        LocalDateTime updatedTime =
                inventoryList
                        .stream()
                        .map(
                                Inventory::getUpdatedAt
                        )
                        .filter(
                                date -> date != null
                        )
                        .max(
                                LocalDateTime::compareTo
                        )
                        .orElse(null);


        List<InventoryDashboardDTO.InventoryItemDTO>
                items =

                inventoryList
                        .stream()
                        .map(
                                inventory -> {

                                    InventoryDashboardDTO
                                            .InventoryItemDTO item =
                                            new InventoryDashboardDTO
                                                    .InventoryItemDTO();


                                    item.setId(
                                            inventory.getId()
                                    );


                                    item.setCategoryName(
                                            inventory.getCategory()
                                                    != null
                                                    ? inventory
                                                    .getCategory()
                                                    .getName()
                                                    : "-"
                                    );


                                    if (
                                            inventory.getBoxType()
                                                    != null
                                    ) {

                                        item.setItemName(
                                                inventory
                                                        .getBoxType()
                                                        .name()
                                        );

                                    }
                                    else if (
                                            inventory.getMaterial()
                                                    != null
                                    ) {

                                        item.setItemName(
                                                inventory
                                                        .getMaterial()
                                                        .getName()
                                        );

                                    }
                                    else {

                                        item.setItemName(
                                                "-"
                                        );
                                    }


                                    item.setAvailableQuantity(
                                            inventory
                                                    .getAvailableQuantity()
                                    );


                                    item.setMinimumQuantity(
                                            inventory
                                                    .getMinimumQuantity()
                                    );


                                    item.setLowStock(
                                            inventory
                                                    .getAvailableQuantity()
                                                    <=
                                                    inventory
                                                            .getMinimumQuantity()
                                    );


                                    item.setUpdatedTime(
                                            inventory
                                                    .getUpdatedAt()
                                    );


                                    return item;
                                }
                        )
                        .toList();


        dashboard.setAvailableStock(
                availableStock
        );

        dashboard.setMinimumQuantity(
                minimumQuantity
        );

        dashboard.setLowStockCount(
                lowStockCount
        );

        dashboard.setUpdatedTime(
                updatedTime
        );

        dashboard.setItems(
                items
        );


        return dashboard;
    }
}