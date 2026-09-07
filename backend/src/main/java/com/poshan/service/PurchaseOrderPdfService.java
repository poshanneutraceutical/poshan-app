package com.poshan.service;

import com.poshan.entity.PurchaseOrder;
import com.poshan.entity.PurchaseOrderItem;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;

@Service
public class PurchaseOrderPdfService {



    public String generatePurchaseOrderPdf(
            PurchaseOrder purchaseOrder
    ) {


        try {


            String folder =
                    "uploads/purchase-orders/";



            File directory =
                    new File(folder);



            if(!directory.exists()){

                directory.mkdirs();

            }




            String filePath =
                    folder
                            +
                            purchaseOrder.getPoNumber()
                            +
                            ".pdf";




            Document document =
                    new Document();



            PdfWriter.getInstance(
                    document,
                    new FileOutputStream(filePath)
            );



            document.open();




            Font titleFont =
                    FontFactory.getFont(
                            FontFactory.HELVETICA_BOLD,
                            18
                    );



            Paragraph title =
                    new Paragraph(
                            "PURCHASE ORDER",
                            titleFont
                    );


            title.setAlignment(
                    Element.ALIGN_CENTER
            );


            document.add(title);



            document.add(
                    new Paragraph("\n")
            );



            document.add(
                    new Paragraph(
                            "PO Number : "
                                    +
                                    purchaseOrder.getPoNumber()
                    )
            );



            document.add(
                    new Paragraph(
                            "Vendor Name : "
                                    +
                                    purchaseOrder.getVendor()
                                            .getVendorName()
                    )
            );



            document.add(
                    new Paragraph(
                            "WhatsApp Number : "
                                    +
                                    purchaseOrder.getVendor()
                                            .getWhatsappNumber()
                    )
            );




            document.add(
                    new Paragraph("\nItems\n")
            );



            PdfPTable table =
                    new PdfPTable(2);



            table.addCell("Box Type");

            table.addCell("Quantity");




            for(PurchaseOrderItem item :
                    purchaseOrder.getItems()){


                table.addCell(
                        item.getBoxType()
                                .name()
                );


                table.addCell(
                        String.valueOf(
                                item.getQuantity()
                        )
                );

            }



            document.add(table);



            document.close();



            return filePath;


        }
        catch(Exception e){

            throw new RuntimeException(
                    "PDF generation failed",
                    e
            );

        }


    }

}