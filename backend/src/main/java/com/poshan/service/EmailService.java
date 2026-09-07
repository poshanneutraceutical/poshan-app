package com.poshan.service;

import com.poshan.entity.PurchaseOrder;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    private final PurchaseOrderPdfService purchaseOrderPdfService;

    @Value("${spring.mail.username}")
    private String fromEmail;



    /*
        =====================================================
        Send Purchase Order PDF to Vendor
        =====================================================
    */

    public void sendPurchaseOrderToVendor(
            PurchaseOrder purchaseOrder
    ) {

        try {

            /*
                Step 1
                Generate Purchase Order PDF
             */

            String pdfPath =
                    purchaseOrderPdfService
                            .generatePurchaseOrderPdf(
                                    purchaseOrder
                            );



            /*
                Step 2
                Fetch Vendor Email
             */

            String vendorEmail =
                    purchaseOrder
                            .getVendor()
                            .getVendorEmail();



            if (vendorEmail == null ||
                    vendorEmail.isBlank()) {

                throw new RuntimeException(
                        "Vendor email is not available."
                );

            }



            /*
                Step 3
                Create Email
             */

            MimeMessage message =
                    mailSender.createMimeMessage();


            MimeMessageHelper helper =
                    new MimeMessageHelper(
                            message,
                            true,
                            "UTF-8"
                    );



            helper.setFrom(fromEmail);

            helper.setTo(vendorEmail);

            helper.setSubject(
                    "Purchase Order "
                            + purchaseOrder.getPoNumber()
                            + " | Poshan Nutraceuticals"
            );



            helper.setText(
                    buildEmailMessage(
                            purchaseOrder
                    ),
                    true
            );



            /*
                Step 4
                Attach PDF
             */

            File pdf =
                    new File(pdfPath);


            if (pdf.exists()) {

                FileSystemResource attachment =
                        new FileSystemResource(pdf);

                helper.addAttachment(
                        purchaseOrder.getPoNumber()
                                + ".pdf",
                        attachment
                );

            }



            /*
                Step 5
                Send Email
             */

            mailSender.send(message);



            log.info(
                    "Purchase Order {} emailed successfully to {}",
                    purchaseOrder.getPoNumber(),
                    vendorEmail
            );

        }
        catch (MessagingException e) {

            log.error(
                    "Unable to send Purchase Order Email",
                    e
            );

            throw new RuntimeException(
                    "Unable to send Purchase Order email.",
                    e
            );

        }
        catch (Exception e) {

            log.error(
                    "Unexpected Email Error",
                    e
            );

            throw new RuntimeException(
                    e.getMessage()
            );

        }

    }




    /*
        =====================================================
        HTML Email Body
        =====================================================
    */

    private String buildEmailMessage(
            PurchaseOrder purchaseOrder
    ) {

        return """
                <html>

                <body style="font-family:Arial,sans-serif;
                             background:#f4f6f9;
                             padding:30px;">

                <div style="
                        max-width:700px;
                        margin:auto;
                        background:white;
                        border-radius:10px;
                        padding:35px;
                        border:1px solid #e5e7eb;
                        ">

                <h2 style="
                        color:#2563eb;
                        margin-top:0;
                        ">
                        Purchase Order
                </h2>

                <p>
                    Dear <b>%s</b>,
                </p>

                <p>

                    Greetings from
                    <b>Poshan Nutraceuticals</b>.

                </p>

                <p>

                    Please find the attached
                    Purchase Order for your reference.

                </p>

                <table style="
                        border-collapse:collapse;
                        margin-top:20px;
                        margin-bottom:20px;
                        width:100%%;
                        ">

                    <tr>

                        <td style="padding:10px;font-weight:bold;">
                            Purchase Order
                        </td>

                        <td style="padding:10px;">
                            %s
                        </td>

                    </tr>

                    <tr>

                        <td style="padding:10px;font-weight:bold;">
                            Vendor
                        </td>

                        <td style="padding:10px;">
                            %s
                        </td>

                    </tr>

                    <tr>

                        <td style="padding:10px;font-weight:bold;">
                            Status
                        </td>

                        <td style="padding:10px;">
                            %s
                        </td>

                    </tr>

                </table>

                <p>

                    Kindly acknowledge receipt of this
                    Purchase Order and begin processing it
                    at the earliest.

                </p>

                <br>

                <p>

                    Regards,

                    <br>

                    <b>Procurement Team</b>

                    <br>

                    Poshan Nutraceuticals

                </p>

                <hr>

                <small style="color:gray;">

                This is an automatically generated email.
                Please do not reply to this message.

                </small>

                </div>

                </body>

                </html>
                """.formatted(

                purchaseOrder
                        .getVendor()
                        .getVendorName(),

                purchaseOrder.getPoNumber(),

                purchaseOrder
                        .getVendor()
                        .getVendorCompanyName(),

                purchaseOrder.getStatus()

        );

    }

}