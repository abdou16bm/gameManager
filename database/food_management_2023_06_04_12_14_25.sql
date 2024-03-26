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

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";



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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`cat_id`, `cat_name`, `cat_pic_count`) VALUES (1,'Sandwich',NULL),(2,'Burger',NULL),(3,'Toaste',NULL),(4,'Tacos',NULL),(6,'Quesadilas',NULL),(7,'Tex Mex',NULL),(8,'Baby Boss',NULL),(9,'Brunche',NULL),(10,'Boisson',NULL);

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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `option_add`
--

INSERT INTO `option_add` (`option_id`, `option_type`, `option_name`, `option_price`, `option_pic_count`) VALUES (1,1,'Mayonnaise1',0.00,NULL),(2,1,'KETCHUP',0.00,NULL),(3,1,'GIANT',0.00,NULL),(4,1,'BIGGY',0.00,NULL),(5,1,'ALGERIENNE',0.00,NULL),(6,1,'SAMOURAÏ',0.00,NULL),(7,1,'BRAZIL',0.00,NULL),(8,1,'BARBECUE',0.00,NULL),(9,1,'FISH',0.00,NULL),(10,1,'POIVRE',0.00,NULL),(11,1,'CHEDDAR',0.00,NULL),(12,1,'CURRY MANGUE',0.00,NULL),(14,3,'Sans Tomate',0.00,NULL),(15,3,'Sans Salade',0.00,NULL),(16,3,'Sans Oignon',0.00,NULL),(17,3,'Sans Frite',0.00,NULL),(18,2,'Gruyère',150.00,NULL);

--
-- Table structure for table `option_cat`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `option_cat` (
  `option_id` int NOT NULL,
  `cat_id` int NOT NULL,
  PRIMARY KEY (`option_id`,`cat_id`),
  KEY `option_cat_category0_FK` (`cat_id`),
  CONSTRAINT `option_cat_category0_FK` FOREIGN KEY (`cat_id`) REFERENCES `category` (`cat_id`),
  CONSTRAINT `option_cat_option_FK` FOREIGN KEY (`option_id`) REFERENCES `option_add` (`option_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  KEY `order_user0_FK` (`user_id`),
  CONSTRAINT `order_user0_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `order_waiting_FK` FOREIGN KEY (`waiting_id`) REFERENCES `waiting` (`waiting_id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_client`
--

INSERT INTO `order_client` (`order_id`, `order_number`, `order_in`, `order_on`, `order_out`, `order_remark`, `order_statut`, `order_total_price`, `waiting_id`, `user_id`) VALUES (2,'2','2023-04-17 09:04:08',NULL,NULL,NULL,0,2500.00,NULL,NULL),(3,'3','2023-04-17 10:00:26',NULL,NULL,NULL,0,0.00,NULL,NULL),(4,'4','2023-04-17 10:10:59',NULL,NULL,NULL,0,0.00,NULL,NULL),(5,'5','2023-04-17 10:14:41',NULL,NULL,NULL,0,0.00,NULL,NULL),(6,'6','2023-04-17 10:41:58',NULL,NULL,NULL,0,0.00,NULL,NULL),(8,'8','2023-05-18 10:26:10',NULL,NULL,NULL,0,0.00,NULL,NULL),(15,'15','2023-05-21 10:02:09',NULL,NULL,NULL,2,600.00,NULL,NULL),(16,'16','2023-05-21 10:25:44',NULL,NULL,NULL,0,0.00,NULL,NULL),(17,'17','2023-05-21 10:48:51',NULL,NULL,NULL,0,700.00,NULL,NULL),(24,'24','2023-05-22 12:00:45',NULL,NULL,NULL,2,5150.00,NULL,NULL),(25,'25','2023-05-22 12:12:47',NULL,NULL,NULL,0,0.00,NULL,NULL),(26,'26','2023-06-01 13:14:21',NULL,NULL,NULL,2,500.00,NULL,NULL),(29,'29','2023-06-01 17:08:16',NULL,NULL,NULL,0,0.00,NULL,NULL),(31,'31','2023-06-04 09:49:28',NULL,NULL,NULL,0,0.00,NULL,NULL),(32,'32','2023-06-04 09:50:12',NULL,NULL,NULL,2,900.00,NULL,NULL),(34,'34','2023-06-04 10:11:09',NULL,NULL,NULL,0,1000.00,NULL,NULL),(35,'35','2023-06-04 10:18:13',NULL,NULL,NULL,2,700.00,NULL,NULL),(36,'36','2023-06-04 10:20:53',NULL,NULL,NULL,2,1500.00,NULL,NULL),(38,'38','2023-06-04 11:07:04',NULL,NULL,NULL,2,700.00,NULL,NULL),(39,'39','2023-06-04 11:10:19',NULL,NULL,NULL,2,800.00,NULL,NULL),(40,'40','2023-06-04 11:13:00',NULL,NULL,NULL,2,800.00,NULL,NULL);

--
-- Table structure for table `privilege`
--

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
  KEY `product_category_FK` (`cat_id`),
  CONSTRAINT `product_category_FK` FOREIGN KEY (`cat_id`) REFERENCES `category` (`cat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `product_ref`, `product_name`, `product_desig`, `product_price`, `product_pic_count`, `cat_id`) VALUES (1,NULL,'Big Pop','3 Pain - 2 Steak - Black angus - Sauce giant - Salade - Cornichon - 2 Cheddar',600.00,NULL,2),(2,NULL,'Cheesburger ','1 Steak - Black angus - cornichon - Sauce Ketchup - moutarde- 1 Cheddar',400.00,NULL,2),(3,NULL,'Double Chezze','2 Steak 100 g - Black augus - Ketchups - Moutarde - oignons - Cornichon - 2 cheddar',500.00,NULL,2),(4,NULL,'Triple cheeze','3 Steak 100 g - Black augus - Ketchups - Moutarde - oignons - Cornichon - 3 cheddar',600.00,NULL,2),(5,NULL,'Pop chiken','100 g de poulet - mayo - poivre - oignons - cornichon',550.00,NULL,2),(6,NULL,'Pop fish ','Filet de colin pané - sauce fish - cheddar',700.00,NULL,2),(7,NULL,'Pop Quesadillas Bavette','',1000.00,NULL,6),(8,NULL,'Pop Quesadillas Veau','',1200.00,NULL,6),(9,NULL,'Pop Quesadillas Viande haché','',1000.00,NULL,6),(10,NULL,'Pop Quesadillas tandoor','',1200.00,NULL,6),(11,NULL,'Pop Quesadillas Curry','',1500.00,NULL,6),(12,NULL,'Pop Quesadillas Viande Escalo','',1000.00,NULL,6),(13,NULL,'Tex Mex Mozza stick','',500.00,NULL,7),(15,NULL,'Tex Mex Tenders','',500.00,NULL,7),(16,NULL,'Tex Mex Japalenos','',1500.00,NULL,7),(17,NULL,'Tex Mex Nuggets','',1200.00,NULL,7),(18,NULL,'Tex Mex Wings','',800.00,NULL,7),(19,NULL,'Baby Boss','6 nuggets ou Cheeze au choix Jus + cadeau',1200.00,NULL,8),(20,NULL,'Branche (08h - 11h)','POP brunch : Bruschetta avocat saumon œuf Bénédicte tomate grillé ',1500.00,NULL,9),(21,NULL,'Toaste Frenchy ','Escalope - Oignons fris - Cheddar',800.00,NULL,3),(22,NULL,'Toaste Américain ','Steak - Bacon - Sauce giant',800.00,NULL,3),(23,NULL,'Toaste Mexicain','Bavette poivron oignons fris',800.00,NULL,3),(24,NULL,'Tex Mex Boucher de camembert	','',1200.00,NULL,7),(25,NULL,'LE MEXICANO','Bavette d\'aloyau- marine légume griller - Sauce au choix - Ketchups -crudité au choix- 1 cheddar	',800.00,NULL,1),(26,NULL,'LE MIELLEUX','Escalope miel gingembre -   Sauce au choix - Crudité au choix- 1 cheddar',700.00,NULL,1),(27,NULL,'LE TANDOORI','Chiken rouge  - Sauce au choix - Ketchups -crudité au choix- 1 cheddar',800.00,NULL,1),(28,NULL,'LE CURRY','Sauce au choix - Crudité au choix- 1 cheddar',900.00,NULL,1),(29,NULL,'LE DZ POWER','Frite Omelette- Escalope - Sauce au choix - Crudité au choix- 1 cheddar',800.00,NULL,1),(30,NULL,'LE MERGUEZ','Frite - Sauce au choix  -  1 cheddar',400.00,NULL,1),(31,NULL,'LE KAINRY','Triple steak bacon - Cheddar',700.00,NULL,1),(32,NULL,'LE BLINDE','Curry steak smache œuf bacon',900.00,NULL,1),(33,NULL,'TACOS POULET','Poulet',500.00,NULL,4),(34,NULL,'TACOS CURRY','Curry',600.00,NULL,4),(35,NULL,'TACOS TANDOORI','Tandoori',700.00,NULL,4),(36,NULL,' boisson gazeuse canette','',100.00,NULL,10),(37,NULL,'boisson gazeuse bouteille 1 L','',150.00,NULL,10),(38,NULL,'Eau 0.5 L','',50.00,NULL,10),(39,NULL,'Eau 1 L','',100.00,NULL,10);

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
  KEY `product_detail_order0_FK` (`order_id`),
  CONSTRAINT `product_detail_order0_FK` FOREIGN KEY (`order_id`) REFERENCES `order_client` (`order_id`),
  CONSTRAINT `product_detail_product_FK` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_detail`
--

INSERT INTO `product_detail` (`detail_id`, `product_id`, `order_id`) VALUES (5,1,2),(20,1,15),(21,26,17),(64,3,26),(69,2,24),(72,32,24),(73,28,24),(74,28,24),(75,28,24),(76,28,24),(77,39,24),(78,28,32),(79,2,34),(80,4,34),(82,26,35),(83,20,36),(84,26,38),(85,27,39),(86,27,40);

--
-- Table structure for table `product_option`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_option` (
  `option_id` int NOT NULL,
  `detail_id` int NOT NULL,
  PRIMARY KEY (`option_id`,`detail_id`),
  KEY `product_option_product_detail0_FK` (`detail_id`),
  CONSTRAINT `product_option_option_FK` FOREIGN KEY (`option_id`) REFERENCES `option_add` (`option_id`),
  CONSTRAINT `product_option_product_detail0_FK` FOREIGN KEY (`detail_id`) REFERENCES `product_detail` (`detail_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_option`
--

INSERT INTO `product_option` (`option_id`, `detail_id`) VALUES (2,5),(1,20),(2,20),(3,20),(4,20),(5,20),(6,20),(7,20),(8,20),(9,20),(10,20),(11,20),(12,20),(3,21),(6,21),(2,64),(3,64),(7,64),(1,69),(1,72),(2,72),(18,72),(2,73),(3,75),(2,76),(2,78),(1,79),(2,79),(3,79),(2,80),(2,82),(6,82),(2,83),(2,84),(6,84),(3,85),(6,85),(3,86),(7,86),(11,86);

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
  KEY `user_privilege_FK` (`priv_id`),
  CONSTRAINT `user_privilege_FK` FOREIGN KEY (`priv_id`) REFERENCES `privilege` (`priv_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_id_s`, `user_name`, `user_lastname`, `user_email`, `user_phone`, `user_address`, `user_username`, `user_password`, `user_status`, `priv_id`) VALUES (1,NULL,NULL,NULL,NULL,NULL,NULL,'superadmin','$2b$10$dMNGK6CkrX/e7/hSvipak.2QWfzn521IphggKJ.91vwYVK6h.GHne',1,1),(2,NULL,NULL,NULL,NULL,NULL,NULL,'guichet1','$2a$10$dEznUlsOHytxwmxKD7EOg.6XKaOAS7ouJmwfvW9FmSr9kl3J.QB3W',1,3);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `waiting`
--

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-04 12:14:25
