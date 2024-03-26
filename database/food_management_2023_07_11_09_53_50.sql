-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: food_management
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


drop database if exists food_management;
create database food_management;
use food_management;
--
-- Table structure for table `category`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `cat_id` int NOT NULL AUTO_INCREMENT,
  `cat_name` varchar(30) DEFAULT NULL,
  `cat_pic_count` int DEFAULT NULL,
  PRIMARY KEY (`cat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`cat_id`, `cat_name`, `cat_pic_count`) VALUES (1,'Sandwich',NULL),(2,'Burger',NULL),(3,'Toaste',NULL),(4,'Tacos',NULL),(6,'Quesadilas',NULL),(7,'TexMex',NULL),(8,'Baby Boss',NULL),(10,'Boissons',NULL),(11,'Dessert',NULL);

--
-- Table structure for table `option_add`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `option_add` (
  `option_id` int NOT NULL AUTO_INCREMENT,
  `option_type` int DEFAULT NULL,
  `option_name` varchar(200) DEFAULT NULL,
  `option_price` decimal(15,2) DEFAULT '0.00',
  `option_pic_count` int DEFAULT NULL,
  PRIMARY KEY (`option_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `option_add`
--

INSERT INTO `option_add` (`option_id`, `option_type`, `option_name`, `option_price`, `option_pic_count`) VALUES (1,1,'Mayonnaise',0.00,NULL),(2,1,'KETCHUP',0.00,NULL),(3,1,'GIANT',0.00,NULL),(4,1,'BIGGY',0.00,NULL),(5,1,'ALGERIENNE',0.00,NULL),(6,1,'SAMOURAÏ',0.00,NULL),(7,1,'BRAZIL',0.00,NULL),(8,1,'BARBECUE',0.00,NULL),(9,1,'FISH',0.00,NULL),(10,1,'POIVRE',0.00,NULL),(11,1,'CHEDDAR',0.00,NULL),(12,1,'CURRY MANGUE',0.00,NULL),(14,3,'Sans Tomate',0.00,NULL),(15,3,'Sans Salade',0.00,NULL),(16,3,'Sans Oignon',0.00,NULL),(17,3,'Sans Frite',0.00,NULL),(18,2,'Gruyère',150.00,NULL),(25,3,'ORANGINA',0.00,NULL),(27,3,'SPRITE',0.00,NULL),(29,3,'7 UP',0.00,NULL);

--
-- Table structure for table `option_cat`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `option_cat` (
  `option_id` int NOT NULL,
  `cat_id` int NOT NULL,
  PRIMARY KEY (`option_id`,`cat_id`),
  KEY `option_cat_category0_FK` (`cat_id`)
) ENGINE=InnoDB;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `option_cat`
--

INSERT INTO `option_cat` (`option_id`, `cat_id`) VALUES (1,1),(2,1);

--
-- Table structure for table `order_client`
--

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
) ENGINE=InnoDB AUTO_INCREMENT=172;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_client`
--

INSERT INTO `order_client` (`order_id`, `order_number`, `order_in`, `order_on`, `order_out`, `order_remark`, `order_statut`, `order_total_price`, `waiting_id`, `user_id`) VALUES (2,'2','2023-04-17 09:04:08',NULL,NULL,NULL,0,2500.00,NULL,NULL),(3,'3','2023-04-17 10:00:26',NULL,NULL,NULL,0,0.00,NULL,NULL),(4,'4','2023-04-17 10:10:59',NULL,NULL,NULL,0,0.00,NULL,NULL),(5,'5','2023-04-17 10:14:41',NULL,NULL,NULL,0,0.00,NULL,NULL),(6,'6','2023-04-17 10:41:58',NULL,NULL,NULL,0,0.00,NULL,NULL),(8,'8','2023-05-18 10:26:10',NULL,NULL,NULL,0,0.00,NULL,NULL),(15,'15','2023-05-21 10:02:09',NULL,NULL,NULL,2,600.00,NULL,NULL),(16,'16','2023-05-21 10:25:44',NULL,NULL,NULL,0,0.00,NULL,NULL),(17,'17','2023-05-21 10:48:51',NULL,NULL,NULL,0,700.00,NULL,NULL),(24,'24','2023-05-22 12:00:45',NULL,NULL,NULL,2,5150.00,NULL,NULL),(25,'25','2023-05-22 12:12:47',NULL,NULL,NULL,0,0.00,NULL,NULL),(26,'26','2023-06-01 13:14:21',NULL,NULL,NULL,2,500.00,NULL,NULL),(29,'29','2023-06-01 17:08:16',NULL,NULL,NULL,0,0.00,NULL,NULL),(31,'31','2023-06-04 09:49:28',NULL,NULL,NULL,0,0.00,NULL,NULL),(32,'32','2023-06-04 09:50:12',NULL,NULL,NULL,2,900.00,NULL,NULL),(34,'34','2023-06-04 10:11:09',NULL,NULL,NULL,0,1000.00,NULL,NULL),(35,'35','2023-06-04 10:18:13',NULL,NULL,NULL,2,700.00,NULL,NULL),(36,'36','2023-06-04 10:20:53',NULL,NULL,NULL,2,1500.00,NULL,NULL),(38,'38','2023-06-04 11:07:04',NULL,NULL,NULL,2,700.00,NULL,NULL),(39,'39','2023-06-04 11:10:19',NULL,NULL,NULL,2,800.00,NULL,NULL),(40,'40','2023-06-04 11:13:00',NULL,NULL,NULL,2,800.00,NULL,NULL),(42,'42','2023-06-04 14:56:34',NULL,NULL,NULL,2,800.00,NULL,NULL),(43,'43','2023-06-04 14:59:47',NULL,NULL,NULL,1,900.00,NULL,NULL),(44,'44','2023-06-04 15:03:01',NULL,NULL,NULL,1,800.00,NULL,NULL),(45,'45','2023-06-04 15:03:58',NULL,NULL,NULL,2,800.00,NULL,NULL),(46,'46','2023-06-04 15:04:53',NULL,NULL,NULL,0,0.00,NULL,NULL),(47,'47','2023-06-04 15:04:53',NULL,NULL,NULL,1,800.00,NULL,NULL),(48,'48','2023-06-04 15:09:15',NULL,NULL,NULL,1,900.00,NULL,NULL),(49,'49','2023-06-04 15:11:06',NULL,NULL,NULL,1,800.00,NULL,NULL),(50,'50','2023-06-04 15:22:42',NULL,NULL,NULL,1,800.00,NULL,NULL),(52,'52','2023-06-04 15:23:44',NULL,NULL,NULL,2,900.00,NULL,NULL),(53,'53','2023-06-04 15:24:43',NULL,NULL,NULL,1,950.00,NULL,NULL),(54,'54','2023-06-05 08:23:10',NULL,NULL,NULL,1,800.00,NULL,NULL),(55,'55','2023-06-05 08:24:36',NULL,NULL,NULL,1,900.00,NULL,NULL),(56,'56','2023-06-05 08:58:21',NULL,NULL,NULL,1,800.00,NULL,NULL),(57,'57','2023-06-05 08:59:14',NULL,NULL,NULL,0,0.00,NULL,NULL),(58,'58','2023-06-05 09:15:17',NULL,NULL,NULL,0,0.00,NULL,NULL),(59,'59','2023-06-05 10:46:11',NULL,NULL,NULL,0,0.00,NULL,NULL),(62,'62','2023-06-07 09:50:51',NULL,NULL,NULL,0,0.00,NULL,NULL),(64,'64','2023-06-07 12:40:04',NULL,NULL,NULL,1,900.00,NULL,NULL),(72,'72','2023-06-08 16:47:53',NULL,NULL,NULL,0,0.00,NULL,NULL),(73,'73','2023-06-10 11:26:10',NULL,NULL,NULL,0,0.00,NULL,NULL),(76,'76','2023-06-10 12:55:27',NULL,NULL,NULL,0,0.00,NULL,NULL),(77,'77','2023-06-11 09:40:25',NULL,NULL,NULL,2,700.00,NULL,NULL),(78,'78','2023-06-11 09:50:24',NULL,NULL,NULL,2,800.00,NULL,NULL),(79,'79','2023-06-11 10:11:46',NULL,NULL,NULL,2,550.00,NULL,NULL),(80,'80','2023-06-11 10:16:17',NULL,NULL,NULL,2,100.00,NULL,NULL),(82,'82','2023-06-11 10:17:06',NULL,NULL,NULL,2,800.00,NULL,NULL),(83,'83','2023-06-11 10:17:22',NULL,NULL,NULL,2,700.00,NULL,NULL),(85,'85','2023-06-11 10:50:19',NULL,NULL,NULL,1,0.00,NULL,NULL),(86,'86','2023-06-11 11:16:16',NULL,NULL,NULL,2,400.00,NULL,NULL),(88,'88','2023-06-11 11:43:34',NULL,NULL,NULL,1,0.00,NULL,NULL),(89,'89','2023-06-11 11:44:35',NULL,NULL,NULL,0,0.00,NULL,NULL),(90,'90','2023-06-11 11:45:41',NULL,NULL,NULL,1,4000.00,NULL,NULL),(91,'91','2023-06-11 13:11:12',NULL,NULL,NULL,1,700.00,NULL,NULL),(92,'92','2023-06-11 13:12:58',NULL,NULL,NULL,1,700.00,NULL,NULL),(93,'93','2023-06-11 21:25:18',NULL,NULL,NULL,1,1650.00,NULL,NULL),(94,'94','2023-06-12 08:16:17',NULL,NULL,NULL,1,800.00,NULL,NULL),(95,'95','2023-06-12 08:20:16',NULL,NULL,NULL,1,700.00,NULL,NULL),(96,'96','2023-06-12 08:20:16',NULL,NULL,NULL,0,0.00,NULL,NULL),(97,'97','2023-06-12 08:26:22',NULL,NULL,NULL,1,600.00,NULL,NULL),(98,'98','2023-06-12 08:59:52',NULL,NULL,NULL,1,800.00,NULL,NULL),(100,'100','2023-06-12 09:37:04',NULL,NULL,NULL,1,1300.00,NULL,NULL),(102,'102','2023-06-12 09:47:02',NULL,NULL,NULL,1,700.00,NULL,NULL),(103,'103','2023-06-12 09:47:37',NULL,NULL,NULL,0,0.00,NULL,NULL),(104,'104','2023-06-12 10:24:16',NULL,NULL,NULL,1,700.00,NULL,NULL),(105,'105','2023-06-12 10:51:03',NULL,NULL,NULL,1,800.00,NULL,NULL),(107,'107','2023-06-12 11:01:31',NULL,NULL,NULL,1,950.00,NULL,NULL),(108,'108','2023-06-12 11:40:00',NULL,NULL,NULL,2,2700.00,NULL,NULL),(109,'109','2023-06-12 12:21:21',NULL,NULL,NULL,1,1850.00,NULL,NULL),(120,'120','2023-06-12 13:53:36',NULL,NULL,NULL,1,400.00,NULL,NULL),(121,'121','2023-06-12 13:53:54',NULL,NULL,NULL,1,150.00,NULL,NULL),(122,'122','2023-06-12 13:54:27',NULL,NULL,NULL,1,200.00,NULL,NULL),(124,'124','2023-06-12 13:55:11',NULL,NULL,NULL,1,100.00,NULL,NULL),(128,'128','2023-06-12 16:41:20',NULL,NULL,NULL,1,550.00,NULL,NULL),(129,'129','2023-06-13 12:20:46',NULL,NULL,NULL,1,700.00,NULL,NULL),(130,'130','2023-06-13 16:04:48',NULL,NULL,NULL,1,2450.00,NULL,NULL),(132,'132','2023-06-14 11:26:30',NULL,NULL,NULL,1,1700.00,NULL,NULL),(134,'1','2023-06-14 11:27:03',NULL,NULL,NULL,0,0.00,1,NULL),(135,'2','2023-06-14 11:32:43',NULL,NULL,NULL,2,500.00,1,NULL),(136,'3','2023-06-14 11:54:27',NULL,NULL,NULL,1,1700.00,1,NULL),(140,'1','2023-06-14 12:28:11',NULL,NULL,NULL,1,800.00,3,NULL),(143,'6','2023-06-14 12:31:42',NULL,NULL,NULL,1,500.00,1,NULL),(144,'7','2023-06-14 12:32:00',NULL,NULL,NULL,1,800.00,1,NULL),(145,'8','2023-06-14 17:47:18',NULL,NULL,NULL,1,2200.00,1,NULL),(146,'9','2023-06-14 18:01:50',NULL,NULL,NULL,0,0.00,1,NULL),(148,'2','2023-06-15 16:31:30',NULL,NULL,NULL,0,0.00,6,NULL),(149,'3','2023-06-15 16:31:31',NULL,NULL,NULL,0,0.00,6,NULL),(150,'4','2023-06-15 17:22:43',NULL,NULL,NULL,0,800.00,6,NULL),(151,'5','2023-06-15 17:27:34',NULL,NULL,NULL,0,800.00,6,NULL),(152,'6','2023-06-15 17:29:02',NULL,NULL,NULL,0,800.00,6,NULL),(153,'7','2023-06-15 17:29:26',NULL,NULL,NULL,0,800.00,6,NULL),(154,'8','2023-06-15 17:35:55',NULL,NULL,NULL,2,500.00,6,NULL),(155,'9','2023-06-15 17:36:23',NULL,NULL,NULL,2,400.00,6,NULL),(156,'1','2023-06-18 15:23:00',NULL,NULL,NULL,1,1200.00,7,NULL),(157,'1','2023-06-19 10:48:03',NULL,NULL,NULL,0,0.00,8,NULL),(158,'2','2023-06-19 13:31:43',NULL,NULL,NULL,1,500.00,8,NULL),(159,'3','2023-06-19 13:33:21',NULL,NULL,NULL,1,400.00,8,NULL),(161,'2','2023-07-01 12:56:20',NULL,NULL,NULL,0,0.00,9,NULL),(163,'4','2023-07-01 14:17:12',NULL,NULL,NULL,0,0.00,9,NULL),(164,'1','2023-07-06 18:09:59',NULL,NULL,NULL,2,3000.00,10,NULL),(165,'2','2023-07-06 18:11:58',NULL,NULL,NULL,2,3000.00,10,NULL),(168,'5','2023-07-06 18:23:23',NULL,NULL,NULL,2,900.00,10,NULL),(170,'7','2023-07-06 18:36:30',NULL,NULL,NULL,0,0.00,10,NULL),(171,'8','2023-07-06 18:37:13',NULL,NULL,NULL,1,800.00,10,NULL);

--
-- Table structure for table `privilege`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `privilege` (
  `priv_id` int NOT NULL AUTO_INCREMENT,
  `priv_name` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`priv_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `privilege`
--

INSERT INTO `privilege` (`priv_id`, `priv_name`) VALUES (1,'superadmin'),(2,'admin'),(3,'service');

--
-- Table structure for table `product`
--

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
  PRIMARY KEY (`product_id`),
  KEY `product_category_FK` (`cat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=52;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `product_ref`, `product_name`, `product_desig`, `product_price`, `product_pic_count`, `cat_id`) VALUES (1,NULL,'Big Pop','3 Pain - 2 Steak - Black angus - Sauce giant - Salade - Cornichon - 2 Cheddar',600.00,NULL,2),(2,NULL,'Cheesburger ','1 Steak - Black angus - cornichon - Sauce Ketchup - moutarde- 1 Cheddar',400.00,NULL,2),(3,NULL,'Burger Double','2 Steak 100 g - Black augus - Ketchups - Moutarde - oignons - Cornichon - 2 cheddar',500.00,NULL,2),(4,NULL,'Burger Triple','3 Steak 100 g - Black augus - Ketchups - Moutarde - oignons - Cornichon - 3 cheddar',600.00,NULL,2),(5,NULL,'Pop chicken','100 g de poulet - mayo - poivre - oignons - cornichon',550.00,NULL,2),(6,NULL,'Pop fish ','Filet de colin pané - sauce fish - cheddar',700.00,NULL,2),(7,NULL,'Pop Quesadillas Bavette','',1000.00,NULL,6),(8,NULL,'Pop Quesadillas Veau','',1200.00,NULL,6),(9,NULL,'Pop Quesadillas Viande hache','',1000.00,NULL,6),(10,NULL,'Pop Quesadillas tandoor','',1200.00,NULL,6),(11,NULL,'Pop Quesadillas Curry','',1500.00,NULL,6),(12,NULL,'Pop Quesadillas Viande Escalo','',1000.00,NULL,6),(13,NULL,'Tex Mex Mozza stick','',500.00,NULL,7),(15,NULL,'Tex Mex Tenders','',500.00,NULL,7),(16,NULL,'Tex Mex Japalenos','',1500.00,NULL,7),(17,NULL,'Tex Mex Nuggets','',1200.00,NULL,7),(19,NULL,'Baby Boss','6 nuggets ou Cheeze au choix Jus + cadeau',1200.00,NULL,8),(21,NULL,'Toaste Frenchy ','Escalope - Oignons fris - Cheddar',800.00,NULL,3),(22,NULL,'Toaste Americain ','Steak - Bacon - Sauce giant',800.00,NULL,3),(23,NULL,'Toaste Mexicain','Bavette poivron oignons fris',800.00,NULL,3),(26,NULL,'LE MIELLEUX','Escalope miel gingembre -   Sauce au choix - Crudité au choix- 1 cheddar',700.00,NULL,1),(27,NULL,'LE TANDOORI','Chiken rouge  - Sauce au choix - Ketchups -crudité au choix- 1 cheddar',800.00,NULL,1),(28,NULL,'LE CURRY','Sauce au choix - Crudité au choix- 1 cheddar',900.00,NULL,1),(29,NULL,'LE DZ POWER','Frite Omelette- Escalope - Sauce au choix - Crudité au choix- 1 cheddar',800.00,NULL,1),(30,NULL,'LE MERGUEZ','Frite - Sauce au choix  -  1 cheddar',400.00,NULL,1),(31,NULL,'LE KAINRY','Triple steak bacon - Cheddar',700.00,NULL,1),(32,NULL,'LE BLINDE','Curry steak smache œuf bacon',900.00,NULL,1),(33,NULL,'TACOS POULET','Poulet',500.00,NULL,4),(34,NULL,'TACOS CURRY','Curry',600.00,NULL,4),(35,NULL,'TACOS TANDOORI','Tandoori',700.00,NULL,4),(36,NULL,' OASIS','Boisson Importation',200.00,NULL,10),(38,NULL,'LIPTON','Boisson importation',500.00,NULL,10),(40,NULL,'LE MEXICANO','Bavette d`aloyau- marine légume griller - Sauce au choix - Ketchups -crudité au choix- 1 cheddar',800.00,NULL,1),(41,NULL,'TROPICO','Boisson importation',500.00,NULL,10),(42,NULL,'COCA CHERRY ','Boisson importation',250.00,NULL,10),(43,NULL,'SCHWEPPES','Boisson importation',250.00,NULL,10),(44,NULL,'SPRITE','Boisson importation',150.00,NULL,10),(45,NULL,'FANTA','Boisson importation',150.00,NULL,10),(46,NULL,'7 UP','Boisson importation',150.00,NULL,10),(47,NULL,' COCA COLA','Boisson importation',150.00,NULL,10),(49,NULL,'Tarte au citron','',500.00,NULL,11),(50,NULL,'Tiramisu','',500.00,NULL,11),(51,NULL,'Tarte au diam','',500.00,NULL,11);

--
-- Table structure for table `product_detail`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_detail` (
  `detail_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `order_id` int NOT NULL,
  PRIMARY KEY (`detail_id`),
  KEY `product_detail_product_FK` (`product_id`),
  KEY `product_detail_order0_FK` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=213;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_detail`
--

INSERT INTO `product_detail` (`detail_id`, `product_id`, `order_id`) VALUES (157,2,120),(158,38,121),(159,38,121),(160,38,121),(161,36,122),(162,36,122),(163,36,124),(164,5,128),(165,26,129),(166,27,130),(167,38,130),(168,41,130),(169,44,130),(170,50,130),(177,3,135),(178,29,136),(179,27,140),(180,3,143),(181,27,144),(182,29,132),(183,28,136),(184,28,132),(185,51,145),(186,50,145),(187,51,145),(188,35,145),(190,27,150),(191,27,151),(192,27,152),(193,27,153),(194,3,154),(195,2,155),(197,19,156),(198,3,158),(199,2,159),(201,27,164),(202,51,164),(203,50,164),(204,19,164),(205,51,165),(206,51,165),(207,2,165),(208,22,165),(209,21,165),(210,28,168),(212,27,171);

--
-- Table structure for table `product_option`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_option` (
  `option_id` int NOT NULL,
  `detail_id` int NOT NULL,
  PRIMARY KEY (`option_id`,`detail_id`),
  KEY `product_option_product_detail0_FK` (`detail_id`)
) ENGINE=InnoDB;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_option`
--

INSERT INTO `product_option` (`option_id`, `detail_id`) VALUES (3,157),(25,161),(25,162),(29,163),(16,164),(2,165),(3,165),(2,166),(3,166),(6,166),(3,177),(2,178),(3,179),(6,180),(7,180),(3,181),(3,182),(5,183),(6,184),(1,188),(2,188),(3,188),(3,190),(3,191),(3,192),(2,193),(3,194),(3,195),(3,198),(2,201),(3,201),(2,207),(17,208),(11,209),(16,209),(5,210),(15,210),(6,212);

--
-- Table structure for table `product_option_limit`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_option_limit` (
  `product_id` int NOT NULL,
  `option_id` int NOT NULL,
  PRIMARY KEY (`option_id`,`product_id`),
  KEY `product_option_limit_product_FK` (`product_id`)
) ENGINE=MyISAM;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_option_limit`
--

INSERT INTO `product_option_limit` (`product_id`, `option_id`) VALUES (1,1),(2,1),(3,1),(9,1),(10,1),(12,1),(26,1),(27,1),(29,1),(30,1),(31,1),(33,1),(35,1),(40,1),(1,2),(2,2),(3,2),(4,2),(5,2),(7,2),(10,2),(12,2),(26,2),(27,2),(29,2),(30,2),(31,2),(33,2),(35,2),(40,2),(1,3),(2,3),(3,3),(4,3),(5,3),(6,3),(7,3),(10,3),(12,3),(22,3),(23,3),(26,3),(27,3),(28,3),(29,3),(30,3),(31,3),(33,3),(35,3),(40,3),(1,4),(2,4),(3,4),(4,4),(5,4),(6,4),(12,4),(22,4),(26,4),(27,4),(29,4),(30,4),(31,4),(40,4),(1,5),(3,5),(10,5),(12,5),(27,5),(28,5),(29,5),(30,5),(31,5),(40,5),(1,6),(3,6),(4,6),(7,6),(26,6),(27,6),(28,6),(29,6),(30,6),(31,6),(40,6),(1,7),(3,7),(4,7),(6,7),(26,7),(27,7),(28,7),(29,7),(30,7),(31,7),(40,7),(4,8),(8,8),(11,8),(27,8),(28,8),(29,8),(30,8),(31,8),(40,8),(27,9),(29,9),(31,9),(40,9),(4,10),(9,10),(12,10),(21,10),(23,10),(27,10),(29,10),(31,10),(40,10),(9,11),(10,11),(21,11),(27,11),(29,11),(31,11),(40,11),(8,12),(9,12),(10,12),(11,12),(23,12),(27,12),(29,12),(31,12),(40,12),(1,14),(2,14),(3,14),(5,14),(6,14),(7,14),(8,14),(9,14),(10,14),(11,14),(12,14),(21,14),(22,14),(23,14),(28,14),(33,14),(34,14),(35,14),(1,15),(2,15),(4,15),(5,15),(6,15),(7,15),(8,15),(9,15),(10,15),(11,15),(12,15),(21,15),(22,15),(23,15),(28,15),(33,15),(34,15),(35,15),(2,16),(4,16),(5,16),(6,16),(7,16),(8,16),(9,16),(10,16),(11,16),(12,16),(21,16),(22,16),(23,16),(33,16),(34,16),(35,16),(1,17),(2,17),(3,17),(4,17),(5,17),(6,17),(7,17),(8,17),(9,17),(10,17),(11,17),(12,17),(21,17),(22,17),(23,17),(33,17),(34,17),(35,17),(37,25),(37,26),(37,27),(37,28),(37,30);

--
-- Table structure for table `user`
--

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
) ENGINE=InnoDB AUTO_INCREMENT=4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_id_s`, `user_name`, `user_lastname`, `user_email`, `user_phone`, `user_address`, `user_username`, `user_password`, `user_status`, `priv_id`) VALUES (1,NULL,NULL,NULL,NULL,NULL,NULL,'superadmin','$2b$10$dMNGK6CkrX/e7/hSvipak.2QWfzn521IphggKJ.91vwYVK6h.GHne',1,1),(2,NULL,NULL,NULL,NULL,NULL,NULL,'guichet1','$2a$10$dEznUlsOHytxwmxKD7EOg.6XKaOAS7ouJmwfvW9FmSr9kl3J.QB3W',1,3),(3,NULL,NULL,NULL,NULL,NULL,NULL,'caisse','$2b$10$BsmrrVx7CJwOY46N7wpKs.B9uV2X6jh7HveKu0jPPeb3QEGnMsMOG',1,3);

--
-- Table structure for table `waiting`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `waiting` (
  `waiting_id` int NOT NULL AUTO_INCREMENT,
  `waiting_date` date DEFAULT NULL,
  `waiting_total` int DEFAULT NULL,
  `waiting_remaining` int DEFAULT NULL,
  PRIMARY KEY (`waiting_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `waiting`
--

INSERT INTO `waiting` (`waiting_id`, `waiting_date`, `waiting_total`, `waiting_remaining`) VALUES (1,'2023-06-14',9,9),(2,'2023-06-14',1,1),(3,'2023-06-14',1,1),(4,'2023-06-14',1,1),(5,'2023-06-14',1,1),(6,'2023-06-15',9,9),(7,'2023-06-18',1,1),(8,'2023-06-19',3,3),(9,'2023-07-01',4,4),(10,'2023-07-06',8,8);
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-11  9:53:50
