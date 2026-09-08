-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: poshanapp_db
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `allowed_network`
--

DROP TABLE IF EXISTS `allowed_network`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `allowed_network` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `ip_address` varchar(255) NOT NULL,
  `status` bit(1) NOT NULL,
  `wifi_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKmxxn4lndg6tvlg1ql7fb5js56` (`ip_address`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `allowed_network`
--

LOCK TABLES `allowed_network` WRITE;
/*!40000 ALTER TABLE `allowed_network` DISABLE KEYS */;
INSERT INTO `allowed_network` VALUES (1,'2026-08-10 11:00:00.000000','122.183.48.14',_binary '','Company Network'),(2,'2026-08-24 11:27:31.000000','0:0:0:0:0:0:0:1',_binary '','LOCAL TEST');
/*!40000 ALTER TABLE `allowed_network` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendance` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `attendance_date` date DEFAULT NULL,
  `check_in` datetime(6) DEFAULT NULL,
  `check_out` datetime(6) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `status` enum('ABSENT','HALF_DAY','PRESENT') DEFAULT NULL,
  `employee_id` bigint DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKb48lmkou5j4rvde9sr88bqgjw` (`employee_id`),
  CONSTRAINT `FKb48lmkou5j4rvde9sr88bqgjw` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
INSERT INTO `attendance` VALUES (1,'2026-08-24','2026-08-24 11:28:02.059311','2026-08-24 11:28:16.197311','2026-08-24 11:28:02.078727','0:0:0:0:0:0:0:1','PRESENT',1,'2026-08-24 11:28:16.208442'),(2,'2026-08-25','2026-08-25 13:46:39.064622',NULL,'2026-08-25 13:46:39.074235','0:0:0:0:0:0:0:1','PRESENT',1,'2026-08-25 13:46:39.074235');
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `box_dimensions`
--

DROP TABLE IF EXISTS `box_dimensions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `box_dimensions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `box_code` varchar(255) NOT NULL,
  `box_image` varchar(255) DEFAULT NULL,
  `box_type` varchar(255) NOT NULL,
  `cap_circumference` double DEFAULT NULL,
  `cap_height` double DEFAULT NULL,
  `circumference` double NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `height` double NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `width` double NOT NULL,
  `label_height` double NOT NULL,
  `label_width` double NOT NULL,
  `neckseal_height` double NOT NULL,
  `neckseal_width` double NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKe5c25tkdo2ry963xmnuuisw67` (`box_code`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `box_dimensions`
--

LOCK TABLES `box_dimensions` WRITE;
/*!40000 ALTER TABLE `box_dimensions` DISABLE KEYS */;
INSERT INTO `box_dimensions` VALUES (2,'BOX-000002','/uploads/box-dimensions/BOX-000002.jpeg','creatine 100 gram',30.83,1.7,32,'2026-08-22 11:16:19.299689','this box is for creatine new phase ,',11.5,'2026-08-24 12:09:17.880827',10,100,50,7,3);
/*!40000 ALTER TABLE `box_dimensions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companies` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `companyname` varchar(255) DEFAULT NULL,
  `createdate` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` VALUES (4,'Axe-Breaker','2026-08-10 09:39:01.366793'),(5,'poshan','2026-08-10 15:20:55.840402');
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_details`
--

DROP TABLE IF EXISTS `company_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_details` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `companylocation` varchar(255) DEFAULT NULL,
  `ordername` varchar(255) DEFAULT NULL,
  `ordertype` varchar(255) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `company_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKcpfobl3rf6wogmbobv69lfec1` (`company_id`),
  CONSTRAINT `FK2hn7xhggopfmu4ulnd6j7bgj3` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_details`
--

LOCK TABLES `company_details` WRITE;
/*!40000 ALTER TABLE `company_details` DISABLE KEYS */;
INSERT INTO `company_details` VALUES (1,'benglore','mass gainer 100kg','mass gainer',100,4),(2,'benglore','protein','food',288,5);
/*!40000 ALTER TABLE `company_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `custom_field`
--

DROP TABLE IF EXISTS `custom_field`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `custom_field` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `field_name` varchar(255) DEFAULT NULL,
  `field_value` varchar(255) DEFAULT NULL,
  `company_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKddm8m6nbkahgxmn95wxmwsd2e` (`company_id`),
  CONSTRAINT `FKddm8m6nbkahgxmn95wxmwsd2e` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `custom_field`
--

LOCK TABLES `custom_field` WRITE;
/*!40000 ALTER TABLE `custom_field` DISABLE KEYS */;
/*!40000 ALTER TABLE `custom_field` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deliveries`
--

DROP TABLE IF EXISTS `deliveries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deliveries` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `box_type` enum('BOX_2KG','I_SEAL_118MM_HDPE_ONE','I_SEAL_118MM_PET_ONE','I_SEAL_372MM_HDPE_ONE','I_SEAL_436MM_PET_ONE','I_SEAL_877MM_PET_ONE','PET_1100ML_JAR','PET_275CC_R_TAB_JAR_WITH_PEAL_CAP','PET_46_240ML_SQ_TAB_JAR_H_LOCK','PET_88MM_850ML_JAR','PET_JAR_2_LBS_B','PET_JAR_2_LBS_J','PET_JAR_5_LBS_BS','PET_JAR_5_LBS_M','PET_JAR_5_LBS_R','PLASTIC_12_KG_JAR_SQ_520','PLASTIC_275_KG_JAR','PLASTIC_275_KG_JAR_WO_CAP','PLASTIC_325ML_CYLINDRICAL_JAR_WO_CAP','PLASTIC_535ML_L_CART_BOTTLE','PLASTIC_55_KGS_JAR_300','PLASTIC_6_KG_JAR','PLASTIC_6_KG_JAR_WO_CAP','PLASTIC_88MM_700ML_HDPE_JAR_WO_CAP','PLASTIC_88MM_975ML_JAR','PLASTIC_88MM_975ML_JAR_WO_CAP','PLASTIC_MET_120MM_GOLDEN_CAP','PLASTIC_MET_60MM_GOLDEN_CAP','PLASTIC_MET_88MM_GOLDEN_CAP') DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `delivered_quantity` int DEFAULT NULL,
  `delivery_date` datetime(6) DEFAULT NULL,
  `delivery_status` enum('DELIVERED','HOLD','INPROCESS','NOTDELIVERED') DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `company_id` bigint NOT NULL,
  `delivery_medium` varchar(255) DEFAULT NULL,
  `custom_box_type` varchar(255) DEFAULT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `category_id` bigint DEFAULT NULL,
  `material_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKftgshpb2pjx6yjc1324fb1435` (`company_id`),
  KEY `FKtq5q10tys3u2vubujdoi71mj5` (`category_id`),
  KEY `FKdy66rx197mkd5p6n972u4d4tm` (`material_id`),
  CONSTRAINT `FKdy66rx197mkd5p6n972u4d4tm` FOREIGN KEY (`material_id`) REFERENCES `materials` (`id`),
  CONSTRAINT `FKftgshpb2pjx6yjc1324fb1435` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`),
  CONSTRAINT `FKtq5q10tys3u2vubujdoi71mj5` FOREIGN KEY (`category_id`) REFERENCES `inventory_categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deliveries`
--

LOCK TABLES `deliveries` WRITE;
/*!40000 ALTER TABLE `deliveries` DISABLE KEYS */;
INSERT INTO `deliveries` VALUES (1,'BOX_2KG','2026-08-10 16:40:10.295509',200,'2026-08-10 16:40:00.000000','DELIVERED','done',5,NULL,NULL,NULL,NULL,NULL),(2,'BOX_2KG','2026-08-10 18:07:07.525716',1100,'2026-08-10 18:06:00.000000','DELIVERED','',5,NULL,NULL,NULL,NULL,NULL),(3,'PET_JAR_5_LBS_R','2026-08-11 10:16:43.962441',300,'2026-08-11 10:16:00.000000','DELIVERED','',4,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `deliveries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `designing`
--

DROP TABLE IF EXISTS `designing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `designing` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `assignby` varchar(255) DEFAULT NULL,
  `assigndate` datetime(6) DEFAULT NULL,
  `assignto` varchar(255) DEFAULT NULL,
  `companyname` varchar(255) DEFAULT NULL,
  `designtype` varchar(255) DEFAULT NULL,
  `duedate` datetime(6) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `projectname` varchar(255) DEFAULT NULL,
  `status` enum('CANCEL','COMPLETE','IN_PROGRESS','ON_HOLD','PENDING') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `designing`
--

LOCK TABLES `designing` WRITE;
/*!40000 ALTER TABLE `designing` DISABLE KEYS */;
INSERT INTO `designing` VALUES (1,'new phase ',NULL,'aakash ','new phase ','label design','2026-08-21 06:56:00.000000','this is the new ohase label design ','creatine 100gm','IN_PROGRESS');
/*!40000 ALTER TABLE `designing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `digital market`
--

DROP TABLE IF EXISTS `digital market`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `digital market` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `assigndate` datetime(6) DEFAULT NULL,
  `assignto` varchar(255) DEFAULT NULL,
  `companyname` varchar(255) DEFAULT NULL,
  `duedate` datetime(6) DEFAULT NULL,
  `leadgenerated` bigint DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `projectname` varchar(255) DEFAULT NULL,
  `status` enum('COMPLETED','DELIVER','HOLD','IN_PROGRESS','REVIEW') DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `digital market`
--

LOCK TABLES `digital market` WRITE;
/*!40000 ALTER TABLE `digital market` DISABLE KEYS */;
INSERT INTO `digital market` VALUES (1,'2026-07-30 09:51:00.000000','nanu','Axe-Breaker','2026-07-31 09:52:00.000000',100,'complete as soon as possible ',NULL,'IN_PROGRESS','online ');
/*!40000 ALTER TABLE `digital market` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(500) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `date_of_joining` date DEFAULT NULL,
  `department` enum('ACCOUNTS','ADMIN','DESIGN','FINANCE','HR','INVENTORY','IT','MARKETING','PRODUCTION','PURCHASE','QUALITY','SALES','WAREHOUSE','WEB_DEVELOPMENT') NOT NULL,
  `designation` enum('ACCOUNTANT','ACCOUNT_EXECUTIVE','CASHIER','CHIEF_EXECUTIVE_OFFICER','CHIEF_OPERATING_OFFICER','DIRECTOR','DISPATCH_EXECUTIVE','FINANCE_MANAGER','HOUSEKEEPING','HR_EXECUTIVE','HR_MANAGER','INVENTORY_MANAGER','IT_MANAGER','MACHINE_OPERATOR','MANAGING_DIRECTOR','MARKETING_EXECUTIVE','MARKETING_MANAGER','OFFICE_ASSISTANT','PACKAGING_EXECUTIVE','PLANT_HEAD','PLANT_MANAGER','PRODUCTION_EXECUTIVE','PRODUCTION_MANAGER','PURCHASE_EXECUTIVE','PURCHASE_MANAGER','QUALITY_ANALYST','QUALITY_INSPECTOR','QUALITY_MANAGER','RECEPTIONIST','SALES_EXECUTIVE','SALES_MANAGER','SECURITY_GUARD','SHIFT_INCHARGE','SOFTWARE_DEVELOPER','STORE_KEEPER','SUPERVISOR','SUPPORT_ENGINEER','SYSTEM_ADMINISTRATOR','TEAM_LEADER') NOT NULL,
  `email` varchar(255) NOT NULL,
  `employee_code` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) NOT NULL,
  `pincode` varchar(255) DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `salary` decimal(12,2) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `status` enum('ACTIVE','INACTIVE','ON_LEAVE','PROBATION','RESIGNED','RETIRED','TERMINATED') NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `user_id` bigint NOT NULL,
  `aadhaar_number` varchar(255) DEFAULT NULL,
  `account_holder_name` varchar(255) DEFAULT NULL,
  `account_number` varchar(255) DEFAULT NULL,
  `alternate_mobile` varchar(255) DEFAULT NULL,
  `bank_name` varchar(255) DEFAULT NULL,
  `emergency_contact_name` varchar(255) DEFAULT NULL,
  `emergency_contact_number` varchar(255) DEFAULT NULL,
  `ifsc_code` varchar(255) DEFAULT NULL,
  `note` varchar(1000) DEFAULT NULL,
  `pan_number` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKetqhw9qqnad1kyjq3ks1glw8x` (`employee_code`),
  UNIQUE KEY `UKj2dmgsma6pont6kf7nic9elpd` (`user_id`),
  CONSTRAINT `FK69x3vjuy1t5p18a5llb8h2fjx` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,'vill-gazipur sabha chand ,nayagaw,harganpur,nagina , bijnor','Ghaziabad','India','2026-08-07 17:55:07.469243','2026-08-01','IT','IT_MANAGER','jatinrajput2815@gmail.com','POS-EMP-000001','Jatin','Kumar','9045126731','246762','',NULL,'Uttar Pradesh','ACTIVE','2026-08-07 17:55:07.469243',4,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,'','','','2026-09-03 12:05:41.164224',NULL,'WAREHOUSE','PACKAGING_EXECUTIVE','poshanpacking@gmail.com','POS-EMP-000002','Surjeet','','9602301385','',NULL,NULL,'','ACTIVE','2026-09-03 12:05:41.164224',7,'','','','','','','','','',''),(3,'','','','2026-09-03 12:06:59.692001',NULL,'DESIGN','PACKAGING_EXECUTIVE','poshandesigns@gmail.com','POS-EMP-000003','Aakash','jadam','9079293665','',NULL,NULL,'','ACTIVE','2026-09-03 12:06:59.692001',8,'','','','','','','','','',''),(4,'','','','2026-09-03 12:35:44.822616',NULL,'WAREHOUSE','PACKAGING_EXECUTIVE','poshanpacking@gmail.com','POS-EMP-000004','Dipesh','','7055372982','',NULL,NULL,'','ACTIVE','2026-09-03 15:30:16.285461',9,'','','','','','','','','','');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `available_quantity` int DEFAULT NULL,
  `box_type` enum('BOX_2KG','I_SEAL_118MM_HDPE_ONE','I_SEAL_118MM_PET_ONE','I_SEAL_372MM_HDPE_ONE','I_SEAL_436MM_PET_ONE','I_SEAL_877MM_PET_ONE','PET_1100ML_JAR','PET_275CC_R_TAB_JAR_WITH_PEAL_CAP','PET_46_240ML_SQ_TAB_JAR_H_LOCK','PET_88MM_850ML_JAR','PET_JAR_2_LBS_B','PET_JAR_2_LBS_J','PET_JAR_5_LBS_BS','PET_JAR_5_LBS_M','PET_JAR_5_LBS_R','PLASTIC_12_KG_JAR_SQ_520','PLASTIC_275_KG_JAR','PLASTIC_275_KG_JAR_WO_CAP','PLASTIC_325ML_CYLINDRICAL_JAR_WO_CAP','PLASTIC_535ML_L_CART_BOTTLE','PLASTIC_55_KGS_JAR_300','PLASTIC_6_KG_JAR','PLASTIC_6_KG_JAR_WO_CAP','PLASTIC_88MM_700ML_HDPE_JAR_WO_CAP','PLASTIC_88MM_975ML_JAR','PLASTIC_88MM_975ML_JAR_WO_CAP','PLASTIC_MET_120MM_GOLDEN_CAP','PLASTIC_MET_60MM_GOLDEN_CAP','PLASTIC_MET_88MM_GOLDEN_CAP') DEFAULT NULL,
  `minimum_quantity` int DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `inventory_type` enum('BOX','CUSTOM','DUSTREIN','FAT_POWDER','FLAVOUR','SMP') NOT NULL,
  `material_id` bigint DEFAULT NULL,
  `category_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK69v5fqcpeyu62j7vf10vcughg` (`material_id`),
  KEY `FKaisc96wdowctjr871dw0hyjns` (`category_id`),
  CONSTRAINT `FK69v5fqcpeyu62j7vf10vcughg` FOREIGN KEY (`material_id`) REFERENCES `materials` (`id`),
  CONSTRAINT `FKaisc96wdowctjr871dw0hyjns` FOREIGN KEY (`category_id`) REFERENCES `inventory_categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
INSERT INTO `inventory` VALUES (1,202,'BOX_2KG',300,'2026-08-10 18:07:07.560075','BOX',NULL,1),(2,200,'PET_JAR_5_LBS_R',300,'2026-08-11 10:16:44.017132','BOX',NULL,1),(3,500,NULL,200,'2026-08-22 13:49:54.702390','BOX',1,2);
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory_categories`
--

DROP TABLE IF EXISTS `inventory_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory_categories` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` bit(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `name` varchar(100) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_inventory_category_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory_categories`
--

LOCK TABLES `inventory_categories` WRITE;
/*!40000 ALTER TABLE `inventory_categories` DISABLE KEYS */;
INSERT INTO `inventory_categories` VALUES (1,_binary '','2026-08-21 23:23:38.436297','BOX','2026-08-21 23:23:38.436297'),(2,_binary '','2026-08-21 23:23:38.497479','FLAVOUR','2026-08-21 23:23:38.497479'),(3,_binary '','2026-08-21 23:23:38.500682','DUSTREIN','2026-08-21 23:23:38.500682'),(4,_binary '','2026-08-21 23:23:38.512903','SMP','2026-08-21 23:23:38.512903'),(5,_binary '','2026-08-21 23:23:38.518847','FAT POWDER','2026-08-21 23:23:38.518847');
/*!40000 ALTER TABLE `inventory_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materials`
--

DROP TABLE IF EXISTS `materials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materials` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` bit(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `inventory_type` enum('BOX','CUSTOM','DUSTREIN','FAT_POWDER','FLAVOUR','SMP') NOT NULL,
  `name` varchar(255) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `category_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_material_name_type` (`name`,`inventory_type`),
  UNIQUE KEY `uk_material_category_name` (`category_id`,`name`),
  CONSTRAINT `FK65g65tpnaafx2qn9l32tcx8iu` FOREIGN KEY (`category_id`) REFERENCES `inventory_categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materials`
--

LOCK TABLES `materials` WRITE;
/*!40000 ALTER TABLE `materials` DISABLE KEYS */;
INSERT INTO `materials` VALUES (1,_binary '','2026-08-22 11:19:23.731015','BOX','chocolate','2026-08-22 11:19:23.731015',2);
/*!40000 ALTER TABLE `materials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mrp_details`
--

DROP TABLE IF EXISTS `mrp_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mrp_details` (
  `id` bigint NOT NULL,
  `batch_number` varchar(255) DEFAULT NULL,
  `box_type` varchar(255) DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `exp_date` varchar(255) DEFAULT NULL,
  `mfg_date` varchar(255) DEFAULT NULL,
  `mrp` varchar(255) DEFAULT NULL,
  `neck_seal_type` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `scope_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mrp_details`
--

LOCK TABLES `mrp_details` WRITE;
/*!40000 ALTER TABLE `mrp_details` DISABLE KEYS */;
INSERT INTO `mrp_details` VALUES (1,'4587980986','PLASTIC_535ML_L_CART_BOTTLE','poshan','2026-08-22','2026-08-21','5999','printed','','black');
/*!40000 ALTER TABLE `mrp_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mrp_details_seq`
--

DROP TABLE IF EXISTS `mrp_details_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mrp_details_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mrp_details_seq`
--

LOCK TABLES `mrp_details_seq` WRITE;
/*!40000 ALTER TABLE `mrp_details_seq` DISABLE KEYS */;
INSERT INTO `mrp_details_seq` VALUES (51);
/*!40000 ALTER TABLE `mrp_details_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `is_read` bit(1) NOT NULL,
  `message` varchar(500) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK9y21adhxn0ayjhfocscqox7bh` (`user_id`),
  CONSTRAINT `FK9y21adhxn0ayjhfocscqox7bh` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (1,'2026-08-11 10:16:44.061737',_binary '','PET_JAR_5_LBS_R stock is low. Available: 200, Minimum required: 300','Low Stock Alert','LOW_STOCK',2);
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `opening`
--

DROP TABLE IF EXISTS `opening`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `opening` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `closingdate` datetime(6) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `jobtittle` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `posteddate` datetime(6) DEFAULT NULL,
  `salaryrange` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `opening`
--

LOCK TABLES `opening` WRITE;
/*!40000 ALTER TABLE `opening` DISABLE KEYS */;
INSERT INTO `opening` VALUES (2,'2026-08-29 11:53:00.000000','production','','gaurd','peon','2026-08-22 11:53:00.000000','10000-12000');
/*!40000 ALTER TABLE `opening` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productionplan`
--

DROP TABLE IF EXISTS `productionplan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productionplan` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `assignby` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `executedate` datetime(6) DEFAULT NULL,
  `plandate` varchar(255) DEFAULT NULL,
  `status` enum('CANCEL','COMPLETE','IN_PROGRESS','ON_HOLD','PENDING') DEFAULT NULL,
  `tittle` varchar(255) DEFAULT NULL,
  `boxtype` varchar(255) DEFAULT NULL,
  `companyname` varchar(255) DEFAULT NULL,
  `neckseal` varchar(255) DEFAULT NULL,
  `necksealtype` varchar(255) DEFAULT NULL,
  `scoope` varchar(255) DEFAULT NULL,
  `weight` varchar(255) DEFAULT NULL,
  `material_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKfc492l2w4dy0r7tqv67g3kddj` (`material_id`),
  CONSTRAINT `FKfc492l2w4dy0r7tqv67g3kddj` FOREIGN KEY (`material_id`) REFERENCES `materials` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productionplan`
--

LOCK TABLES `productionplan` WRITE;
/*!40000 ALTER TABLE `productionplan` DISABLE KEYS */;
/*!40000 ALTER TABLE `productionplan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_order_items`
--

DROP TABLE IF EXISTS `purchase_order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_order_items` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `box_type` enum('BOX_2KG','I_SEAL_118MM_HDPE_ONE','I_SEAL_118MM_PET_ONE','I_SEAL_372MM_HDPE_ONE','I_SEAL_436MM_PET_ONE','I_SEAL_877MM_PET_ONE','PET_1100ML_JAR','PET_275CC_R_TAB_JAR_WITH_PEAL_CAP','PET_46_240ML_SQ_TAB_JAR_H_LOCK','PET_88MM_850ML_JAR','PET_JAR_2_LBS_B','PET_JAR_2_LBS_J','PET_JAR_5_LBS_BS','PET_JAR_5_LBS_M','PET_JAR_5_LBS_R','PLASTIC_12_KG_JAR_SQ_520','PLASTIC_275_KG_JAR','PLASTIC_275_KG_JAR_WO_CAP','PLASTIC_325ML_CYLINDRICAL_JAR_WO_CAP','PLASTIC_535ML_L_CART_BOTTLE','PLASTIC_55_KGS_JAR_300','PLASTIC_6_KG_JAR','PLASTIC_6_KG_JAR_WO_CAP','PLASTIC_88MM_700ML_HDPE_JAR_WO_CAP','PLASTIC_88MM_975ML_JAR','PLASTIC_88MM_975ML_JAR_WO_CAP','PLASTIC_MET_120MM_GOLDEN_CAP','PLASTIC_MET_60MM_GOLDEN_CAP','PLASTIC_MET_88MM_GOLDEN_CAP') DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `purchase_order_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKo3yj8ocbw2kav38548t22hgh8` (`purchase_order_id`),
  CONSTRAINT `FKo3yj8ocbw2kav38548t22hgh8` FOREIGN KEY (`purchase_order_id`) REFERENCES `purchase_orders` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_order_items`
--

LOCK TABLES `purchase_order_items` WRITE;
/*!40000 ALTER TABLE `purchase_order_items` DISABLE KEYS */;
INSERT INTO `purchase_order_items` VALUES (1,'BOX_2KG',500,1);
/*!40000 ALTER TABLE `purchase_order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_orders`
--

DROP TABLE IF EXISTS `purchase_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `po_number` varchar(255) NOT NULL,
  `status` enum('ACCEPTED','CANCLED','COMPLETED','CREATED','REJECTED','SENT_TO_VENDOR') DEFAULT NULL,
  `total_amount` double DEFAULT NULL,
  `pr_id` bigint DEFAULT NULL,
  `vendor_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKpbiykvcpyg0jslne4gviyeuc2` (`po_number`),
  UNIQUE KEY `UK3t95vojly7c99dofkv8ofadc5` (`pr_id`),
  KEY `FKn3rssy7613r6x49ax30e2nbay` (`vendor_id`),
  CONSTRAINT `FKfqc3bd2ykiapkuuffg3y5e8qo` FOREIGN KEY (`pr_id`) REFERENCES `purchase_requisitions` (`id`),
  CONSTRAINT `FKn3rssy7613r6x49ax30e2nbay` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_orders`
--

LOCK TABLES `purchase_orders` WRITE;
/*!40000 ALTER TABLE `purchase_orders` DISABLE KEYS */;
INSERT INTO `purchase_orders` VALUES (1,'2026-08-10 17:44:54.578485','PO-0001','CREATED',NULL,1,1);
/*!40000 ALTER TABLE `purchase_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_requisition_items`
--

DROP TABLE IF EXISTS `purchase_requisition_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_requisition_items` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `box_type` enum('BOX_2KG','I_SEAL_118MM_HDPE_ONE','I_SEAL_118MM_PET_ONE','I_SEAL_372MM_HDPE_ONE','I_SEAL_436MM_PET_ONE','I_SEAL_877MM_PET_ONE','PET_1100ML_JAR','PET_275CC_R_TAB_JAR_WITH_PEAL_CAP','PET_46_240ML_SQ_TAB_JAR_H_LOCK','PET_88MM_850ML_JAR','PET_JAR_2_LBS_B','PET_JAR_2_LBS_J','PET_JAR_5_LBS_BS','PET_JAR_5_LBS_M','PET_JAR_5_LBS_R','PLASTIC_12_KG_JAR_SQ_520','PLASTIC_275_KG_JAR','PLASTIC_275_KG_JAR_WO_CAP','PLASTIC_325ML_CYLINDRICAL_JAR_WO_CAP','PLASTIC_535ML_L_CART_BOTTLE','PLASTIC_55_KGS_JAR_300','PLASTIC_6_KG_JAR','PLASTIC_6_KG_JAR_WO_CAP','PLASTIC_88MM_700ML_HDPE_JAR_WO_CAP','PLASTIC_88MM_975ML_JAR','PLASTIC_88MM_975ML_JAR_WO_CAP','PLASTIC_MET_120MM_GOLDEN_CAP','PLASTIC_MET_60MM_GOLDEN_CAP','PLASTIC_MET_88MM_GOLDEN_CAP') DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `pr_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKlm87u1mhkirkqbmfblinjajbg` (`pr_id`),
  CONSTRAINT `FKlm87u1mhkirkqbmfblinjajbg` FOREIGN KEY (`pr_id`) REFERENCES `purchase_requisitions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_requisition_items`
--

LOCK TABLES `purchase_requisition_items` WRITE;
/*!40000 ALTER TABLE `purchase_requisition_items` DISABLE KEYS */;
INSERT INTO `purchase_requisition_items` VALUES (2,'BOX_2KG',500,1),(3,'BOX_2KG',360,2);
/*!40000 ALTER TABLE `purchase_requisition_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_requisitions`
--

DROP TABLE IF EXISTS `purchase_requisitions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_requisitions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `approved_at` datetime(6) DEFAULT NULL,
  `approved_by` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `pr_number` varchar(255) DEFAULT NULL,
  `priority` varchar(255) DEFAULT NULL,
  `rejection_reason` varchar(255) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `requested_by` varchar(255) DEFAULT NULL,
  `status` enum('Approved','Cancel','Hold','Pending','Rejected') DEFAULT NULL,
  `vendor_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKde5wyh2mq350ghbi6yxitrdnx` (`vendor_id`),
  CONSTRAINT `FKde5wyh2mq350ghbi6yxitrdnx` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_requisitions`
--

LOCK TABLES `purchase_requisitions` WRITE;
/*!40000 ALTER TABLE `purchase_requisitions` DISABLE KEYS */;
INSERT INTO `purchase_requisitions` VALUES (1,'2026-08-10 17:44:54.544921','admin','2026-08-10 09:47:49.982697','production','PR-2026-001','High',NULL,'we need these boxes.','raman','Approved',1),(2,NULL,NULL,'2026-08-10 17:38:37.279736','production','PR-2026-002','Normal',NULL,'i need these ','raman','Pending',1);
/*!40000 ALTER TABLE `purchase_requisitions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `received_material`
--

DROP TABLE IF EXISTS `received_material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `received_material` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `bill_image` varchar(255) DEFAULT NULL,
  `bill_number` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `received_date` datetime(6) DEFAULT NULL,
  `receiver_name` varchar(255) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `supplier_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `received_material`
--

LOCK TABLES `received_material` WRITE;
/*!40000 ALTER TABLE `received_material` DISABLE KEYS */;
INSERT INTO `received_material` VALUES (1,NULL,'326892378973','2026-08-10 09:44:24.909674','2026-08-08 09:43:00.000000','jatin kumar','all thing are good\n','ironmass');
/*!40000 ALTER TABLE `received_material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receiving_material_items`
--

DROP TABLE IF EXISTS `receiving_material_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receiving_material_items` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `box_type` enum('BOX_2KG','I_SEAL_118MM_HDPE_ONE','I_SEAL_118MM_PET_ONE','I_SEAL_372MM_HDPE_ONE','I_SEAL_436MM_PET_ONE','I_SEAL_877MM_PET_ONE','PET_1100ML_JAR','PET_275CC_R_TAB_JAR_WITH_PEAL_CAP','PET_46_240ML_SQ_TAB_JAR_H_LOCK','PET_88MM_850ML_JAR','PET_JAR_2_LBS_B','PET_JAR_2_LBS_J','PET_JAR_5_LBS_BS','PET_JAR_5_LBS_M','PET_JAR_5_LBS_R','PLASTIC_12_KG_JAR_SQ_520','PLASTIC_275_KG_JAR','PLASTIC_275_KG_JAR_WO_CAP','PLASTIC_325ML_CYLINDRICAL_JAR_WO_CAP','PLASTIC_535ML_L_CART_BOTTLE','PLASTIC_55_KGS_JAR_300','PLASTIC_6_KG_JAR','PLASTIC_6_KG_JAR_WO_CAP','PLASTIC_88MM_700ML_HDPE_JAR_WO_CAP','PLASTIC_88MM_975ML_JAR','PLASTIC_88MM_975ML_JAR_WO_CAP','PLASTIC_MET_120MM_GOLDEN_CAP','PLASTIC_MET_60MM_GOLDEN_CAP','PLASTIC_MET_88MM_GOLDEN_CAP') DEFAULT NULL,
  `material_quantity` int DEFAULT NULL,
  `receiving_material_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKt2u2qp9dhx8gi1qsnsh3tyc6x` (`receiving_material_id`),
  CONSTRAINT `FKt2u2qp9dhx8gi1qsnsh3tyc6x` FOREIGN KEY (`receiving_material_id`) REFERENCES `received_material` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receiving_material_items`
--

LOCK TABLES `receiving_material_items` WRITE;
/*!40000 ALTER TABLE `receiving_material_items` DISABLE KEYS */;
INSERT INTO `receiving_material_items` VALUES (1,'BOX_2KG',502,1);
/*!40000 ALTER TABLE `receiving_material_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receiving_material_photos`
--

DROP TABLE IF EXISTS `receiving_material_photos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receiving_material_photos` (
  `receiving_material_id` bigint NOT NULL,
  `photo_path` varchar(255) DEFAULT NULL,
  KEY `FKpm8lb3icvgx56kjjvmxe7pqjm` (`receiving_material_id`),
  CONSTRAINT `FKpm8lb3icvgx56kjjvmxe7pqjm` FOREIGN KEY (`receiving_material_id`) REFERENCES `received_material` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receiving_material_photos`
--

LOCK TABLES `receiving_material_photos` WRITE;
/*!40000 ALTER TABLE `receiving_material_photos` DISABLE KEYS */;
/*!40000 ALTER TABLE `receiving_material_photos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKofx66keruapi6vyqpv6f2or37` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (2,'ROLE_ADMIN'),(4,'ROLE_EMPLOYEE'),(3,'ROLE_USER');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `assign_date` datetime(6) DEFAULT NULL,
  `assigned_by` enum('ADMIN','DEPT_HEAD','MANAGER') DEFAULT NULL,
  `assigned_to` varchar(255) DEFAULT NULL,
  `department` enum('WEB_DEVELOPMENT','MARKETING','DESIGN','PRODUCTION','QUALITY','SALES','PURCHASE','INVENTORY','WAREHOUSE','HR','MRP_PRINTING','FINANCE','ACCOUNTS','IT','ADMIN') DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `due_date` datetime(6) DEFAULT NULL,
  `priority` enum('HIGH','LOW','MEDIUM','URGENT') DEFAULT NULL,
  `status` enum('CANCEL','COMPLETE','IN_PROGRESS','ON_HOLD','PENDING') DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (5,'2026-09-03 14:07:00.000000','ADMIN','aakash','DESIGN','oxn label','2026-09-07 14:07:00.000000','MEDIUM','PENDING','oxn label'),(6,'2026-09-03 14:14:00.000000','ADMIN','aakash','DESIGN','oxn neck seal','2026-09-08 14:14:00.000000','HIGH','PENDING','neck seal'),(12,'2026-09-03 15:52:00.000000','ADMIN','Jatin Kumar','WEB_DEVELOPMENT','oxn website','2026-09-05 15:52:00.000000','MEDIUM','PENDING','website'),(14,'2026-09-03 16:22:00.000000','ADMIN','surjeet','MRP_PRINTING','oxn mrp printing','2026-09-05 16:22:00.000000','MEDIUM','PENDING','mrp printing');
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `user_id` bigint NOT NULL,
  `role_id` bigint NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `FKh8ciramu9cc9q3qcqiv4ue8a6` (`role_id`),
  CONSTRAINT `FKh8ciramu9cc9q3qcqiv4ue8a6` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `FKhfh9dx7w3ubf1co1vdev94g3f` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (2,2),(4,4),(7,4),(8,4),(9,4);
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `position` enum('DESIGN','LABOUR','MARKETING','MRP_PRINTING','WEB_DEVELOPMENT') DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'admin@poshan.com','dushyant singh','$2a$10$eOrpMdq/ERjCd4ZNtyKk6OP./QJhK3QsUOZW4.VFYnUthGDFa2jGK','admin',NULL),(4,'jatinrajput2815@gmail.com','Jatin Kumar','$2a$10$dhx1qTGB1oWdTnWMrdbL8ukm3/ln0NmSBXkGIl/fgvizDcmhO5EmO','monu','WEB_DEVELOPMENT'),(7,'poshanpacking@gmail.com','Surjeet','$2a$10$JWbeua8PFi.vtggYhIuyyOgiXfWrG7jmAAVdVmtqo5GDwxYw4d20S','Surjeet','MRP_PRINTING'),(8,'poshandesigns@gmail.com','Aakash jadam','$2a$10$kj5.YwelVeUUIcJ5Z5NEou6lisNEX9ZPQHEF12aq/uN8Ye1aVIPlq','Aakash','DESIGN'),(9,'poshanpacking@gmail.com','Dipesh','$2a$10$8NjxeJeabrJLcZyJDNAm6..4KAt6BkkjEGn0fyj8UIgM4RILPTgGG','Dipesh','MRP_PRINTING');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendors`
--

DROP TABLE IF EXISTS `vendors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendors` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `contact_number` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `vendor_company_name` varchar(255) DEFAULT NULL,
  `vendor_email` varchar(255) DEFAULT NULL,
  `vendor_name` varchar(255) DEFAULT NULL,
  `whatsapp_number` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendors`
--

LOCK TABLES `vendors` WRITE;
/*!40000 ALTER TABLE `vendors` DISABLE KEYS */;
INSERT INTO `vendors` VALUES (1,'','box','442756382791203','2026-08-10 09:46:19.223392','xyz','xyx@gmail.com','monu','1264726872837');
/*!40000 ALTER TABLE `vendors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `webdeveloper`
--

DROP TABLE IF EXISTS `webdeveloper`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `webdeveloper` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `notes` varchar(255) DEFAULT NULL,
  `assigndate` datetime(6) DEFAULT NULL,
  `assigndeveloper` varchar(255) DEFAULT NULL,
  `companyname` varchar(255) DEFAULT NULL,
  `contactperson` varchar(255) DEFAULT NULL,
  `duedate` datetime(6) DEFAULT NULL,
  `priority` enum('HIGH','LOW','MEDIUM','URGENT') DEFAULT NULL,
  `projectname` varchar(255) DEFAULT NULL,
  `projecttype` varchar(255) DEFAULT NULL,
  `status` enum('COMPLETED','DELIVER','HOLD','IN_PROGRESS','REVIEW') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `webdeveloper`
--

LOCK TABLES `webdeveloper` WRITE;
/*!40000 ALTER TABLE `webdeveloper` DISABLE KEYS */;
INSERT INTO `webdeveloper` VALUES (1,'make a premium website \n','2026-08-12 09:54:00.000000','jatin ','Axe-Breaker','thajar','2026-08-28 09:54:00.000000','MEDIUM','axe breaker website','development','HOLD');
/*!40000 ALTER TABLE `webdeveloper` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'poshanapp_db'
--

--
-- Dumping routines for database 'poshanapp_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-09-08 14:23:16
