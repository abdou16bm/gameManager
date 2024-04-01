-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: game_management
-- ------------------------------------------------------
-- Server version	8.0.27

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

drop database if exists game_management;
create database game_management;
use game_management;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `cat_id` int NOT NULL AUTO_INCREMENT,
  `cat_name` varchar(30) DEFAULT NULL,
  `cat_pic_count` int DEFAULT NULL,
  `cat_priority` int DEFAULT NULL,
  PRIMARY KEY (`cat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` (`cat_id`, `cat_name`, `cat_pic_count`, `cat_priority`) VALUES (1,'Playstation 5',NULL,NULL),(2,'Playstation 4',NULL,NULL),(3,'Xbox One',NULL,NULL),(4,'Xbox Series X',NULL,NULL),(6,'Nintendo SWITCH',NULL,NULL),(7,'Nintendo 3DS',NULL,NULL),(12,'Nintendo ',NULL,NULL);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;

--
-- Table structure for table `option_add`
--

DROP TABLE IF EXISTS `option_add`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `option_add` (
  `option_id` int NOT NULL AUTO_INCREMENT,
  `option_type` int DEFAULT NULL,
  `option_name` varchar(200) DEFAULT NULL,
  `option_price` decimal(15,2) DEFAULT '0.00',
  `option_pic_count` int DEFAULT NULL,
  PRIMARY KEY (`option_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `option_add`
--

/*!40000 ALTER TABLE `option_add` DISABLE KEYS */;
/*!40000 ALTER TABLE `option_add` ENABLE KEYS */;

--
-- Table structure for table `option_cat`
--

DROP TABLE IF EXISTS `option_cat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `option_cat` (
  `option_id` int NOT NULL,
  `cat_id` int NOT NULL,
  PRIMARY KEY (`option_id`,`cat_id`),
  KEY `option_cat_category0_FK` (`cat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `option_cat`
--

/*!40000 ALTER TABLE `option_cat` DISABLE KEYS */;
INSERT INTO `option_cat` (`option_id`, `cat_id`) VALUES (1,1),(2,1);
/*!40000 ALTER TABLE `option_cat` ENABLE KEYS */;

--
-- Table structure for table `order_client`
--

DROP TABLE IF EXISTS `order_client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_client` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `order_number` varchar(10) DEFAULT NULL,
  `order_in` datetime DEFAULT NULL,
  `order_on` datetime DEFAULT NULL,
  `order_out` datetime DEFAULT NULL,
  `order_remark` text,
  `order_statut` int DEFAULT NULL,
  `order_total_price` decimal(15,2) DEFAULT '0.00',
  `waiting_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `order_waiting_FK` (`waiting_id`),
  KEY `order_user0_FK` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=200 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_client`
--

/*!40000 ALTER TABLE `order_client` DISABLE KEYS */;
INSERT INTO `order_client` (`order_id`, `order_number`, `order_in`, `order_on`, `order_out`, `order_remark`, `order_statut`, `order_total_price`, `waiting_id`, `user_id`) VALUES (2,'2','2023-04-17 09:04:08',NULL,NULL,NULL,0,2500.00,NULL,NULL),(3,'3','2023-04-17 10:00:26',NULL,NULL,NULL,0,0.00,NULL,NULL),(4,'4','2023-04-17 10:10:59',NULL,NULL,NULL,0,0.00,NULL,NULL),(5,'5','2023-04-17 10:14:41',NULL,NULL,NULL,0,0.00,NULL,NULL),(6,'6','2023-04-17 10:41:58',NULL,NULL,NULL,0,0.00,NULL,NULL),(8,'8','2023-05-18 10:26:10',NULL,NULL,NULL,0,0.00,NULL,NULL),(15,'15','2023-05-21 10:02:09',NULL,NULL,NULL,2,600.00,NULL,NULL),(16,'16','2023-05-21 10:25:44',NULL,NULL,NULL,0,0.00,NULL,NULL),(17,'17','2023-05-21 10:48:51',NULL,NULL,NULL,0,700.00,NULL,NULL),(24,'24','2023-05-22 12:00:45',NULL,NULL,NULL,2,5150.00,NULL,NULL),(25,'25','2023-05-22 12:12:47',NULL,NULL,NULL,0,0.00,NULL,NULL),(26,'26','2023-06-01 13:14:21',NULL,NULL,NULL,2,500.00,NULL,NULL),(29,'29','2023-06-01 17:08:16',NULL,NULL,NULL,0,0.00,NULL,NULL),(31,'31','2023-06-04 09:49:28',NULL,NULL,NULL,0,0.00,NULL,NULL),(32,'32','2023-06-04 09:50:12',NULL,NULL,NULL,2,900.00,NULL,NULL),(34,'34','2023-06-04 10:11:09',NULL,NULL,NULL,0,1000.00,NULL,NULL),(35,'35','2023-06-04 10:18:13',NULL,NULL,NULL,2,700.00,NULL,NULL),(36,'36','2023-06-04 10:20:53',NULL,NULL,NULL,2,1500.00,NULL,NULL),(38,'38','2023-06-04 11:07:04',NULL,NULL,NULL,2,700.00,NULL,NULL),(39,'39','2023-06-04 11:10:19',NULL,NULL,NULL,2,800.00,NULL,NULL),(40,'40','2023-06-04 11:13:00',NULL,NULL,NULL,2,800.00,NULL,NULL),(42,'42','2023-06-04 14:56:34',NULL,NULL,NULL,2,800.00,NULL,NULL),(43,'43','2023-06-04 14:59:47',NULL,NULL,NULL,1,900.00,NULL,NULL),(44,'44','2023-06-04 15:03:01',NULL,NULL,NULL,1,800.00,NULL,NULL),(45,'45','2023-06-04 15:03:58',NULL,NULL,NULL,2,800.00,NULL,NULL),(46,'46','2023-06-04 15:04:53',NULL,NULL,NULL,0,0.00,NULL,NULL),(47,'47','2023-06-04 15:04:53',NULL,NULL,NULL,1,800.00,NULL,NULL),(48,'48','2023-06-04 15:09:15',NULL,NULL,NULL,1,900.00,NULL,NULL),(49,'49','2023-06-04 15:11:06',NULL,NULL,NULL,1,800.00,NULL,NULL),(50,'50','2023-06-04 15:22:42',NULL,NULL,NULL,1,800.00,NULL,NULL),(52,'52','2023-06-04 15:23:44',NULL,NULL,NULL,2,900.00,NULL,NULL),(53,'53','2023-06-04 15:24:43',NULL,NULL,NULL,1,950.00,NULL,NULL),(54,'54','2023-06-05 08:23:10',NULL,NULL,NULL,1,800.00,NULL,NULL),(55,'55','2023-06-05 08:24:36',NULL,NULL,NULL,1,900.00,NULL,NULL),(56,'56','2023-06-05 08:58:21',NULL,NULL,NULL,1,800.00,NULL,NULL),(57,'57','2023-06-05 08:59:14',NULL,NULL,NULL,0,0.00,NULL,NULL),(58,'58','2023-06-05 09:15:17',NULL,NULL,NULL,0,0.00,NULL,NULL),(59,'59','2023-06-05 10:46:11',NULL,NULL,NULL,0,0.00,NULL,NULL),(62,'62','2023-06-07 09:50:51',NULL,NULL,NULL,0,0.00,NULL,NULL),(64,'64','2023-06-07 12:40:04',NULL,NULL,NULL,1,900.00,NULL,NULL),(72,'72','2023-06-08 16:47:53',NULL,NULL,NULL,0,0.00,NULL,NULL),(73,'73','2023-06-10 11:26:10',NULL,NULL,NULL,0,0.00,NULL,NULL),(76,'76','2023-06-10 12:55:27',NULL,NULL,NULL,0,0.00,NULL,NULL),(77,'77','2023-06-11 09:40:25',NULL,NULL,NULL,2,700.00,NULL,NULL),(78,'78','2023-06-11 09:50:24',NULL,NULL,NULL,2,800.00,NULL,NULL),(79,'79','2023-06-11 10:11:46',NULL,NULL,NULL,2,550.00,NULL,NULL),(80,'80','2023-06-11 10:16:17',NULL,NULL,NULL,2,100.00,NULL,NULL),(82,'82','2023-06-11 10:17:06',NULL,NULL,NULL,2,800.00,NULL,NULL),(83,'83','2023-06-11 10:17:22',NULL,NULL,NULL,2,700.00,NULL,NULL),(85,'85','2023-06-11 10:50:19',NULL,NULL,NULL,1,0.00,NULL,NULL),(86,'86','2023-06-11 11:16:16',NULL,NULL,NULL,2,400.00,NULL,NULL),(88,'88','2023-06-11 11:43:34',NULL,NULL,NULL,1,0.00,NULL,NULL),(89,'89','2023-06-11 11:44:35',NULL,NULL,NULL,0,0.00,NULL,NULL),(90,'90','2023-06-11 11:45:41',NULL,NULL,NULL,1,4000.00,NULL,NULL),(91,'91','2023-06-11 13:11:12',NULL,NULL,NULL,1,700.00,NULL,NULL),(92,'92','2023-06-11 13:12:58',NULL,NULL,NULL,1,700.00,NULL,NULL),(93,'93','2023-06-11 21:25:18',NULL,NULL,NULL,1,1650.00,NULL,NULL),(94,'94','2023-06-12 08:16:17',NULL,NULL,NULL,1,800.00,NULL,NULL),(95,'95','2023-06-12 08:20:16',NULL,NULL,NULL,1,700.00,NULL,NULL),(96,'96','2023-06-12 08:20:16',NULL,NULL,NULL,0,0.00,NULL,NULL),(97,'97','2023-06-12 08:26:22',NULL,NULL,NULL,1,600.00,NULL,NULL),(98,'98','2023-06-12 08:59:52',NULL,NULL,NULL,1,800.00,NULL,NULL),(100,'100','2023-06-12 09:37:04',NULL,NULL,NULL,1,1300.00,NULL,NULL),(102,'102','2023-06-12 09:47:02',NULL,NULL,NULL,1,700.00,NULL,NULL),(103,'103','2023-06-12 09:47:37',NULL,NULL,NULL,0,0.00,NULL,NULL),(104,'104','2023-06-12 10:24:16',NULL,NULL,NULL,1,700.00,NULL,NULL),(105,'105','2023-06-12 10:51:03',NULL,NULL,NULL,1,800.00,NULL,NULL),(107,'107','2023-06-12 11:01:31',NULL,NULL,NULL,1,950.00,NULL,NULL),(108,'108','2023-06-12 11:40:00',NULL,NULL,NULL,2,2700.00,NULL,NULL),(109,'109','2023-06-12 12:21:21',NULL,NULL,NULL,1,1850.00,NULL,NULL),(120,'120','2023-06-12 13:53:36',NULL,NULL,NULL,1,400.00,NULL,NULL),(121,'121','2023-06-12 13:53:54',NULL,NULL,NULL,1,150.00,NULL,NULL),(122,'122','2023-06-12 13:54:27',NULL,NULL,NULL,1,200.00,NULL,NULL),(124,'124','2023-06-12 13:55:11',NULL,NULL,NULL,1,100.00,NULL,NULL),(128,'128','2023-06-12 16:41:20',NULL,NULL,NULL,1,550.00,NULL,NULL),(129,'129','2023-06-13 12:20:46',NULL,NULL,NULL,1,700.00,NULL,NULL),(130,'130','2023-06-13 16:04:48',NULL,NULL,NULL,1,2450.00,NULL,NULL),(132,'132','2023-06-14 11:26:30',NULL,NULL,NULL,1,1700.00,NULL,NULL),(134,'1','2023-06-14 11:27:03',NULL,NULL,NULL,0,0.00,1,NULL),(135,'2','2023-06-14 11:32:43',NULL,NULL,NULL,2,500.00,1,NULL),(136,'3','2023-06-14 11:54:27',NULL,NULL,NULL,1,1700.00,1,NULL),(140,'1','2023-06-14 12:28:11',NULL,NULL,NULL,1,800.00,3,NULL),(143,'6','2023-06-14 12:31:42',NULL,NULL,NULL,1,500.00,1,NULL),(144,'7','2023-06-14 12:32:00',NULL,NULL,NULL,1,800.00,1,NULL),(145,'8','2023-06-14 17:47:18',NULL,NULL,NULL,1,2200.00,1,NULL),(146,'9','2023-06-14 18:01:50',NULL,NULL,NULL,0,0.00,1,NULL),(148,'2','2023-06-15 16:31:30',NULL,NULL,NULL,0,0.00,6,NULL),(149,'3','2023-06-15 16:31:31',NULL,NULL,NULL,0,0.00,6,NULL),(150,'4','2023-06-15 17:22:43',NULL,NULL,NULL,0,800.00,6,NULL),(151,'5','2023-06-15 17:27:34',NULL,NULL,NULL,0,800.00,6,NULL),(152,'6','2023-06-15 17:29:02',NULL,NULL,NULL,0,800.00,6,NULL),(153,'7','2023-06-15 17:29:26',NULL,NULL,NULL,0,800.00,6,NULL),(154,'8','2023-06-15 17:35:55',NULL,NULL,NULL,2,500.00,6,NULL),(155,'9','2023-06-15 17:36:23',NULL,NULL,NULL,2,400.00,6,NULL),(156,'1','2023-06-18 15:23:00',NULL,NULL,NULL,1,1200.00,7,NULL),(157,'1','2023-06-19 10:48:03',NULL,NULL,NULL,0,0.00,8,NULL),(158,'2','2023-06-19 13:31:43',NULL,NULL,NULL,1,500.00,8,NULL),(159,'3','2023-06-19 13:33:21',NULL,NULL,NULL,1,400.00,8,NULL),(161,'2','2023-07-01 12:56:20',NULL,NULL,NULL,0,0.00,9,NULL),(163,'4','2023-07-01 14:17:12',NULL,NULL,NULL,0,0.00,9,NULL),(164,'1','2023-07-06 18:09:59',NULL,NULL,NULL,2,3000.00,10,NULL),(165,'2','2023-07-06 18:11:58',NULL,NULL,NULL,2,3000.00,10,NULL),(168,'5','2023-07-06 18:23:23',NULL,NULL,NULL,2,900.00,10,NULL),(170,'7','2023-07-06 18:36:30',NULL,NULL,NULL,0,0.00,10,NULL),(171,'8','2023-07-06 18:37:13',NULL,NULL,NULL,1,800.00,10,NULL),(173,'2','2024-03-26 14:48:55',NULL,NULL,NULL,0,0.00,11,NULL),(174,'3','2024-03-26 14:57:12',NULL,NULL,NULL,0,0.00,11,NULL),(176,'2','2024-03-27 12:49:12',NULL,NULL,NULL,0,10900.00,12,NULL),(179,'5','2024-03-27 13:43:32',NULL,NULL,NULL,0,0.00,12,NULL),(180,'6','2024-03-27 13:52:14',NULL,NULL,NULL,1,17500.00,12,NULL),(184,'2','2024-03-28 09:33:24',NULL,NULL,NULL,1,3450.00,13,NULL),(185,'3','2024-03-28 09:35:13',NULL,NULL,NULL,1,8000.00,13,NULL),(186,'4','2024-03-28 09:42:41',NULL,NULL,NULL,1,21500.00,13,NULL),(187,'5','2024-03-28 09:53:11',NULL,NULL,NULL,1,6500.00,13,NULL),(188,'6','2024-03-28 09:58:17',NULL,NULL,NULL,1,24000.00,13,NULL),(189,'7','2024-03-28 09:59:35',NULL,NULL,NULL,1,7000.00,13,NULL),(190,'8','2024-03-28 10:00:21',NULL,NULL,NULL,1,7000.00,13,NULL),(191,'9','2024-03-28 10:00:48',NULL,NULL,NULL,1,7000.00,13,NULL),(192,'10','2024-03-28 10:02:33',NULL,NULL,NULL,1,7500.00,13,NULL),(193,'11','2024-03-28 10:03:38',NULL,NULL,NULL,1,4600.00,13,NULL),(194,'1','2024-03-31 14:31:36',NULL,NULL,NULL,0,12000.00,14,NULL),(195,'1','2024-04-01 09:39:26',NULL,NULL,NULL,1,14000.00,15,NULL),(196,'2','2024-04-01 09:51:45',NULL,NULL,NULL,1,9800.00,15,NULL),(197,'3','2024-04-01 09:52:42',NULL,NULL,NULL,1,8050.00,15,NULL),(198,'4','2024-04-01 10:13:58',NULL,NULL,NULL,1,7500.00,15,NULL),(199,'5','2024-04-01 10:15:56',NULL,NULL,NULL,1,22000.00,15,NULL);
/*!40000 ALTER TABLE `order_client` ENABLE KEYS */;

--
-- Table structure for table `privilege`
--

DROP TABLE IF EXISTS `privilege`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `privilege` (
  `priv_id` int NOT NULL AUTO_INCREMENT,
  `priv_name` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`priv_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `privilege`
--

/*!40000 ALTER TABLE `privilege` DISABLE KEYS */;
INSERT INTO `privilege` (`priv_id`, `priv_name`) VALUES (1,'superadmin'),(2,'admin'),(3,'service');
/*!40000 ALTER TABLE `privilege` ENABLE KEYS */;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_ref` varchar(100) DEFAULT NULL,
  `product_name` varchar(200) DEFAULT NULL,
  `product_desig` varchar(500) DEFAULT NULL,
  `product_price` decimal(15,2) DEFAULT '0.00',
  `product_pic_count` int DEFAULT NULL,
  `cat_id` int DEFAULT NULL,
  `product_status` int DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `product_category_FK` (`cat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` (`product_id`, `product_ref`, `product_name`, `product_desig`, `product_price`, `product_pic_count`, `cat_id`, `product_status`) VALUES (1,NULL,'EA SPORTS™ FC 24 ','',8500.00,NULL,2,1),(2,NULL,'UFC 5 ','',14500.00,NULL,1,1),(3,NULL,'Battlefield™ 2042','',3450.00,NULL,1,1),(4,NULL,'Dragon’s Dogma II','',13800.00,NULL,1,1),(5,NULL,'Resident Evil 4 Gold Edition','',15800.00,NULL,1,1),(6,NULL,'Avatar Frontiers of Pandora','',7000.00,NULL,1,1),(7,NULL,' Minecraft Nintendo Switch','',8000.00,NULL,6,1),(8,NULL,'Persona 5 Tactica','',9800.00,NULL,6,1),(10,NULL,'The Smurfs : Mission Vileaf - Smurftastic Edition','',8050.00,NULL,6,1),(11,NULL,'Mario Vs Donkey Kong','',10500.00,NULL,6,1),(12,NULL,'Crash Dummy pour Nintendo Switch','',3400.00,NULL,6,1),(13,NULL,'Asphalt 2 - Urban GT','',5000.00,NULL,12,1),(15,NULL,'Spider-Man - Bataille pour New-York','',1500.00,NULL,12,1),(16,NULL,'New Super Mario Bros','',1500.00,NULL,12,1),(17,NULL,'Pokémon - Version Diamant','',2200.00,NULL,12,1),(21,NULL,'Tennis World Tour ','',2500.00,NULL,3,1),(22,NULL,'Yakuza Like a Dragon','',6500.00,NULL,2,1),(23,NULL,'Forza Horizon 4','',8000.00,NULL,3,1),(32,NULL,'EA SPORTS™ FC 24 ','',9500.00,NULL,1,1),(33,NULL,'The Legend of Zelda - A Link Between Worlds','',2500.00,NULL,7,1),(34,NULL,'Poochy et Yoshi\'s Woolly World','',4600.00,NULL,7,1),(35,NULL,'New Super Mario Bros 2','',3700.00,NULL,7,1),(52,NULL,'Rise of The Ronin',NULL,1200.00,NULL,1,1),(53,NULL,'Tourist Trophy Isle of Man',NULL,7500.00,NULL,2,1),(54,NULL,'L`Âge de Glace 3','',1800.00,NULL,12,1),(55,NULL,'Kim Possible - Kimmunicator','',1850.00,NULL,12,1),(56,NULL,'Animal Crossing - Wild World','',800.00,NULL,12,1),(57,NULL,'Inazuma Eleven 2 Tempête de Glace','',2000.00,NULL,12,1),(58,NULL,'Mario Party Island Tour',NULL,4500.00,NULL,7,1),(59,NULL,'Animal Crossing New Leaf',NULL,3500.00,NULL,7,1),(61,NULL,'Prince of Persia: The Lost Crown',NULL,3000.00,NULL,4,1),(62,NULL,'WWE 2K24',NULL,12000.00,NULL,4,1),(63,NULL,'TopSpin 2K25 ','',12000.00,NULL,4,1),(64,NULL,'Call of Duty Modern Warfare II',NULL,12000.00,NULL,4,1),(65,NULL,'Assassin’s Creed Mirage',NULL,11000.00,NULL,4,1),(66,NULL,'South Park: Snow Day!',NULL,4500.00,NULL,4,1),(67,NULL,'Forza Motorsport 7',NULL,7000.00,NULL,3,1),(68,NULL,'Hellblade Senua’s Sacrifice',NULL,8000.00,NULL,3,1),(69,NULL,'Sea of Thieves Edition Anniversaire',NULL,7500.00,NULL,3,1),(70,NULL,'Grand Theft Auto V Édition Premium',NULL,7500.00,NULL,3,1),(71,NULL,'Assassin’s Creed Rogue Remastered',NULL,7500.00,NULL,3,1),(72,NULL,'Call of Duty Modern Warfare III ',NULL,7500.00,NULL,2,1),(73,NULL,'Hogwarts Legacy L\'Héritage de Poudlard',NULL,4500.00,NULL,2,1),(74,NULL,'Grand Theft Auto V Édition',NULL,5000.00,NULL,2,1),(75,NULL,'The Crew Motorfest',NULL,4500.00,NULL,2,1),(76,NULL,'Tourist Trophy Isle of Man',NULL,4800.00,NULL,2,1);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;

--
-- Table structure for table `product_detail`
--

DROP TABLE IF EXISTS `product_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_detail` (
  `detail_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `order_id` int NOT NULL,
  PRIMARY KEY (`detail_id`),
  KEY `product_detail_product_FK` (`product_id`),
  KEY `product_detail_order0_FK` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=251 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_detail`
--

/*!40000 ALTER TABLE `product_detail` DISABLE KEYS */;
INSERT INTO `product_detail` (`detail_id`, `product_id`, `order_id`) VALUES (157,2,120),(158,38,121),(159,38,121),(160,38,121),(161,36,122),(162,36,122),(163,36,124),(164,5,128),(165,26,129),(166,27,130),(167,38,130),(168,41,130),(169,44,130),(170,50,130),(177,3,135),(178,29,136),(179,27,140),(180,3,143),(181,27,144),(182,29,132),(183,28,136),(184,28,132),(185,51,145),(186,50,145),(187,51,145),(188,35,145),(190,27,150),(191,27,151),(192,27,152),(193,27,153),(194,3,154),(195,2,155),(197,19,156),(198,3,158),(199,2,159),(201,27,164),(202,51,164),(203,50,164),(204,19,164),(205,51,165),(206,51,165),(207,2,165),(208,22,165),(209,21,165),(210,28,168),(212,27,171),(216,26,176),(217,26,176),(218,32,176),(222,32,180),(223,7,180),(224,3,184),(225,23,185),(226,22,186),(227,53,186),(228,72,186),(229,22,187),(230,53,188),(231,72,188),(232,75,188),(233,17,188),(234,16,188),(235,56,188),(236,67,189),(237,67,190),(238,67,191),(239,53,192),(240,34,193),(241,53,194),(242,75,194),(243,22,195),(244,72,195),(245,8,196),(246,10,197),(247,53,198),(248,22,199),(249,53,199),(250,23,199);
/*!40000 ALTER TABLE `product_detail` ENABLE KEYS */;

--
-- Table structure for table `product_option`
--

DROP TABLE IF EXISTS `product_option`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_option` (
  `option_id` int NOT NULL,
  `detail_id` int NOT NULL,
  PRIMARY KEY (`option_id`,`detail_id`),
  KEY `product_option_product_detail0_FK` (`detail_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_option`
--

/*!40000 ALTER TABLE `product_option` DISABLE KEYS */;
INSERT INTO `product_option` (`option_id`, `detail_id`) VALUES (3,157),(25,161),(25,162),(29,163),(16,164),(2,165),(3,165),(2,166),(3,166),(6,166),(3,177),(2,178),(3,179),(6,180),(7,180),(3,181),(3,182),(5,183),(6,184),(1,188),(2,188),(3,188),(3,190),(3,191),(3,192),(2,193),(3,194),(3,195),(3,198),(2,201),(3,201),(2,207),(17,208),(11,209),(16,209),(5,210),(15,210),(6,212);
/*!40000 ALTER TABLE `product_option` ENABLE KEYS */;

--
-- Table structure for table `product_option_limit`
--

DROP TABLE IF EXISTS `product_option_limit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_option_limit` (
  `product_id` int NOT NULL,
  `option_id` int NOT NULL,
  PRIMARY KEY (`option_id`,`product_id`),
  KEY `product_option_limit_product_FK` (`product_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_option_limit`
--

/*!40000 ALTER TABLE `product_option_limit` DISABLE KEYS */;
INSERT INTO `product_option_limit` (`product_id`, `option_id`) VALUES (9,1),(26,1),(27,1),(29,1),(30,1),(31,1),(40,1),(26,2),(27,2),(29,2),(30,2),(31,2),(40,2),(26,3),(27,3),(28,3),(29,3),(30,3),(31,3),(40,3),(26,4),(27,4),(29,4),(30,4),(31,4),(40,4),(27,5),(28,5),(29,5),(30,5),(31,5),(40,5),(26,6),(27,6),(28,6),(29,6),(30,6),(31,6),(40,6),(26,7),(27,7),(28,7),(29,7),(30,7),(31,7),(40,7),(27,8),(28,8),(29,8),(30,8),(31,8),(40,8),(27,9),(29,9),(31,9),(40,9),(9,10),(27,10),(29,10),(31,10),(40,10),(9,11),(27,11),(29,11),(31,11),(40,11),(9,12),(27,12),(29,12),(31,12),(40,12),(9,14),(28,14),(9,15),(28,15),(9,16),(9,17),(37,25),(37,26),(37,27),(37,28),(37,30);
/*!40000 ALTER TABLE `product_option_limit` ENABLE KEYS */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_id_s` varchar(32) DEFAULT NULL,
  `user_name` varchar(50) DEFAULT NULL,
  `user_lastname` varchar(50) DEFAULT NULL,
  `user_email` varchar(50) DEFAULT NULL,
  `user_phone` varchar(15) DEFAULT NULL,
  `user_address` varchar(200) DEFAULT NULL,
  `user_username` varchar(50) DEFAULT NULL,
  `user_password` varchar(200) DEFAULT NULL,
  `user_status` int DEFAULT NULL,
  `priv_id` int NOT NULL,
  PRIMARY KEY (`user_id`),
  KEY `user_privilege_FK` (`priv_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`user_id`, `user_id_s`, `user_name`, `user_lastname`, `user_email`, `user_phone`, `user_address`, `user_username`, `user_password`, `user_status`, `priv_id`) VALUES (1,NULL,NULL,NULL,NULL,NULL,NULL,'superadmin','$2b$10$dMNGK6CkrX/e7/hSvipak.2QWfzn521IphggKJ.91vwYVK6h.GHne',1,1),(2,NULL,NULL,NULL,NULL,NULL,NULL,'guichet1','$2a$10$dEznUlsOHytxwmxKD7EOg.6XKaOAS7ouJmwfvW9FmSr9kl3J.QB3W',1,3),(3,NULL,NULL,NULL,NULL,NULL,NULL,'caisse','$2b$10$BsmrrVx7CJwOY46N7wpKs.B9uV2X6jh7HveKu0jPPeb3QEGnMsMOG',1,3);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

--
-- Table structure for table `waiting`
--

DROP TABLE IF EXISTS `waiting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `waiting` (
  `waiting_id` int NOT NULL AUTO_INCREMENT,
  `waiting_date` date DEFAULT NULL,
  `waiting_total` int DEFAULT NULL,
  `waiting_remaining` int DEFAULT NULL,
  PRIMARY KEY (`waiting_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `waiting`
--

/*!40000 ALTER TABLE `waiting` DISABLE KEYS */;
INSERT INTO `waiting` (`waiting_id`, `waiting_date`, `waiting_total`, `waiting_remaining`) VALUES (1,'2023-06-14',9,9),(2,'2023-06-14',1,1),(3,'2023-06-14',1,1),(4,'2023-06-14',1,1),(5,'2023-06-14',1,1),(6,'2023-06-15',9,9),(7,'2023-06-18',1,1),(8,'2023-06-19',3,3),(9,'2023-07-01',4,4),(10,'2023-07-06',8,8),(11,'2024-03-26',3,3),(12,'2024-03-27',8,8),(13,'2024-03-28',11,11),(14,'2024-03-31',1,1),(15,'2024-04-01',5,5);
/*!40000 ALTER TABLE `waiting` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-01 13:52:51
