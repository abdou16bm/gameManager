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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`cat_id`, `cat_name`, `cat_pic_count`) VALUES (1,'Burgers',0),(2,'Poulet',0),(3,'Pizzas',0),(4,'Boisson',0),(5,'Café',0);

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `option_add`
--

INSERT INTO `option_add` (`option_id`, `option_type`, `option_name`, `option_price`, `option_pic_count`) VALUES (1,1,'Mayonnaise',1.00,NULL),(2,2,'Gruyère',100.00,NULL),(3,1,'Ketchup',0.00,NULL),(4,2,'Cheddar',80.00,NULL),(5,3,'Sans frite',0.00,NULL);

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
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_client`
--

INSERT INTO `order_client` (`order_id`, `order_number`, `order_in`, `order_on`, `order_out`, `order_remark`, `order_statut`, `order_total_price`, `waiting_id`, `user_id`) VALUES (1,'1',NULL,NULL,NULL,NULL,1,1000.00,NULL,NULL),(2,NULL,'2023-03-30 13:04:04',NULL,NULL,NULL,1,1400.00,NULL,2),(3,NULL,'2023-03-30 13:36:36',NULL,NULL,NULL,0,1800.00,NULL,2),(4,NULL,'2023-04-12 15:10:44',NULL,NULL,NULL,0,0.00,NULL,NULL),(5,NULL,'2023-04-12 15:10:50',NULL,NULL,NULL,0,0.00,NULL,NULL),(6,NULL,'2023-04-12 15:10:52',NULL,NULL,NULL,0,0.00,NULL,NULL),(7,NULL,'2023-04-13 09:33:49',NULL,NULL,NULL,0,0.00,NULL,NULL),(8,NULL,'2023-04-13 10:03:27',NULL,NULL,NULL,0,0.00,NULL,NULL),(9,NULL,'2023-04-13 10:05:15',NULL,NULL,NULL,0,0.00,NULL,NULL),(10,NULL,'2023-04-13 10:06:11',NULL,NULL,NULL,0,0.00,NULL,NULL),(11,NULL,'2023-04-13 10:07:12',NULL,NULL,NULL,0,0.00,NULL,NULL),(12,NULL,'2023-04-13 10:12:31',NULL,NULL,NULL,0,0.00,NULL,NULL),(13,NULL,'2023-04-13 10:18:52',NULL,NULL,NULL,0,0.00,NULL,NULL),(14,NULL,'2023-04-13 10:24:45',NULL,NULL,NULL,0,0.00,NULL,NULL),(15,NULL,'2023-04-13 10:28:04',NULL,NULL,NULL,0,0.00,NULL,NULL),(16,'16','2023-04-13 10:39:19',NULL,NULL,NULL,0,0.00,NULL,NULL),(17,'17','2023-04-13 10:42:31',NULL,NULL,NULL,0,0.00,NULL,NULL),(18,'18','2023-04-13 10:44:21',NULL,NULL,NULL,0,0.00,NULL,NULL),(19,'19','2023-04-13 10:44:34',NULL,NULL,NULL,0,0.00,NULL,NULL),(20,'20','2023-04-13 10:47:01',NULL,NULL,NULL,0,0.00,NULL,NULL),(21,'21','2023-04-13 10:49:06',NULL,NULL,NULL,0,0.00,NULL,NULL),(22,'22','2023-04-13 10:49:47',NULL,NULL,NULL,0,0.00,NULL,NULL),(23,'23','2023-04-13 10:50:09',NULL,NULL,NULL,0,0.00,NULL,NULL),(24,'24','2023-04-13 10:50:13',NULL,NULL,NULL,0,0.00,NULL,NULL),(25,'25','2023-04-13 10:51:22',NULL,NULL,NULL,0,0.00,NULL,NULL),(26,'26','2023-04-13 10:52:38',NULL,NULL,NULL,0,0.00,NULL,NULL),(27,'27','2023-04-16 16:00:17',NULL,NULL,NULL,0,0.00,NULL,NULL),(28,'28','2023-04-16 16:19:53',NULL,NULL,NULL,0,2500.00,NULL,NULL),(29,'29','2023-04-17 11:40:19',NULL,NULL,NULL,0,500.00,NULL,NULL),(30,'30','2023-04-17 11:57:04',NULL,NULL,NULL,0,2500.00,NULL,NULL),(31,'31','2023-04-17 13:15:12',NULL,NULL,NULL,0,981.00,NULL,NULL),(32,'32','2023-04-17 13:33:38',NULL,NULL,NULL,0,0.00,NULL,NULL),(33,'33','2023-04-17 13:34:00',NULL,NULL,NULL,0,700.00,NULL,NULL),(34,'34','2023-04-17 13:35:06',NULL,NULL,NULL,0,0.00,NULL,NULL),(36,'36','2023-04-17 13:36:10',NULL,NULL,NULL,0,400.00,NULL,NULL),(42,'42','2023-04-18 13:16:05',NULL,NULL,NULL,0,8280.00,NULL,NULL),(43,'43','2023-04-20 00:06:50',NULL,NULL,NULL,0,500.00,NULL,NULL),(44,'44','2023-05-08 12:47:35',NULL,NULL,NULL,0,1180.00,NULL,NULL),(45,'45','2023-05-08 12:48:17',NULL,NULL,NULL,0,500.00,NULL,NULL),(46,'46','2023-05-08 13:15:42',NULL,NULL,NULL,0,0.00,NULL,NULL),(47,'47','2023-05-08 13:16:01',NULL,NULL,NULL,0,1201.00,NULL,NULL),(48,'48','2023-05-08 13:20:42',NULL,NULL,NULL,0,0.00,NULL,NULL),(49,'49','2023-05-08 15:53:47',NULL,NULL,NULL,0,0.00,NULL,NULL),(51,'51','2023-05-20 13:55:29',NULL,NULL,NULL,0,0.00,NULL,NULL);

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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `product_ref`, `product_name`, `product_desig`, `product_price`, `product_pic_count`, `cat_id`) VALUES (1,'','Burger Bro','100g viande',600.00,1,1),(2,NULL,'Burger Bistro','150g viande',400.00,NULL,1),(3,NULL,'poulet','POULET ROTI EPICE',750.00,1,2);

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
) ENGINE=InnoDB AUTO_INCREMENT=211 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_detail`
--

INSERT INTO `product_detail` (`detail_id`, `product_id`, `order_id`) VALUES (1,1,1),(2,2,1),(3,1,1),(4,2,1),(5,2,1),(6,1,1),(7,1,1),(8,2,1),(9,2,1),(10,2,1),(11,2,1),(12,2,1),(13,2,1),(14,1,1),(15,2,1),(16,1,1),(17,2,1),(18,1,1),(19,2,6),(26,2,7),(31,1,7),(34,1,8),(35,2,9),(36,2,10),(37,2,10),(38,1,10),(39,1,10),(40,2,10),(44,2,11),(45,2,12),(46,2,12),(48,2,13),(49,2,13),(50,2,14),(52,2,17),(57,2,19),(58,2,19),(59,2,19),(61,2,20),(62,2,20),(63,1,20),(67,2,20),(71,1,22),(72,1,22),(73,1,22),(74,2,20),(75,2,20),(76,2,24),(77,2,24),(78,1,24),(79,1,23),(80,1,23),(81,1,23),(82,2,25),(83,2,25),(84,2,25),(85,2,25),(87,2,25),(104,2,26),(105,2,26),(106,2,26),(107,2,26),(108,2,26),(109,2,26),(110,2,26),(111,2,26),(112,2,26),(113,2,26),(114,2,27),(115,2,27),(116,2,27),(117,2,27),(118,2,27),(119,2,27),(120,2,27),(121,2,27),(122,2,27),(123,2,27),(124,2,28),(125,2,28),(126,2,28),(127,2,28),(128,1,28),(129,1,28),(130,2,28),(136,2,30),(148,2,29),(152,2,31),(154,2,31),(156,1,33),(197,1,42),(198,3,42),(201,2,43),(202,2,44),(203,1,44),(204,2,45),(207,2,47),(208,1,47);

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

INSERT INTO `product_option` (`option_id`, `detail_id`) VALUES (1,1),(2,1),(3,1),(4,1),(1,2),(2,12),(4,12),(2,13),(4,13),(5,13),(4,14),(5,14),(1,15),(3,15),(5,15),(2,16),(3,16),(4,16),(5,16),(2,17),(2,18),(5,18),(2,19),(5,19),(2,31),(5,31),(2,34),(5,34),(4,35),(2,36),(4,36),(2,37),(4,37),(2,38),(4,38),(2,39),(4,39),(2,40),(2,44),(4,45),(2,46),(2,48),(2,49),(1,50),(2,50),(4,52),(2,57),(2,58),(2,59),(2,61),(4,61),(2,62),(5,62),(2,63),(5,63),(2,67),(2,71),(5,71),(3,72),(3,73),(4,74),(4,75),(4,76),(2,77),(5,77),(2,78),(5,78),(1,79),(3,79),(3,80),(4,80),(3,81),(4,81),(2,82),(4,82),(2,83),(4,83),(2,84),(4,84),(1,85),(1,87),(2,104),(4,104),(2,105),(4,105),(2,106),(4,106),(2,107),(4,107),(2,113),(2,114),(4,114),(2,115),(4,115),(5,115),(2,116),(4,116),(5,116),(2,117),(5,117),(2,118),(5,118),(2,119),(5,119),(1,120),(2,120),(4,120),(5,120),(1,121),(2,121),(4,121),(5,121),(1,122),(2,122),(4,122),(5,122),(1,123),(2,123),(4,123),(5,123),(1,124),(2,124),(3,124),(4,124),(5,124),(2,125),(5,125),(4,126),(2,127),(4,127),(4,128),(5,129),(2,130),(2,136),(2,148),(1,152),(4,152),(2,154),(2,156),(5,197),(2,198),(4,198),(2,201),(2,202),(4,202),(3,203),(5,203),(2,204),(2,207),(3,207),(1,208),(2,208);

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

-- Dump completed on 2023-05-20 14:58:12
