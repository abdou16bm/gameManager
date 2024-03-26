-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : dim. 21 mai 2023 à 11:53
-- Version du serveur : 8.0.27
-- Version de PHP : 7.4.26


drop database if exists food_management;
create database food_management;
use food_management;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `food_management`
--

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `cat_id` int NOT NULL AUTO_INCREMENT,
  `cat_name` varchar(30) DEFAULT NULL,
  `cat_pic_count` int DEFAULT NULL,
  PRIMARY KEY (`cat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `category`
--

INSERT INTO `category` (`cat_id`, `cat_name`, `cat_pic_count`) VALUES
(1, 'Sandwich', NULL),
(2, 'Burger', NULL),
(3, 'Toaste', NULL),
(4, 'Tacos', NULL),
(6, 'Quesadilas', NULL),
(7, 'Tex Mex', NULL),
(8, 'Baby Boss', NULL),
(9, 'Brunche', NULL),
(10, 'Boisson', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `option_add`
--

DROP TABLE IF EXISTS `option_add`;
CREATE TABLE IF NOT EXISTS `option_add` (
  `option_id` int NOT NULL AUTO_INCREMENT,
  `option_type` int DEFAULT NULL,
  `option_name` varchar(200) DEFAULT NULL,
  `option_price` decimal(15,2) DEFAULT '0.00',
  `option_pic_count` int DEFAULT NULL,
  PRIMARY KEY (`option_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `option_add`
--

INSERT INTO `option_add` (`option_id`, `option_type`, `option_name`, `option_price`, `option_pic_count`) VALUES
(1, 1, 'Mayonnaise', '0.00', NULL),
(2, 1, 'KETCHUP', '0.00', NULL),
(3, 1, 'GIANT', '0.00', NULL),
(4, 1, 'BIGGY', '0.00', NULL),
(5, 1, 'ALGERIENNE', '0.00', NULL),
(6, 1, 'SAMOURAÏ', '0.00', NULL),
(7, 1, 'BRAZIL', '0.00', NULL),
(8, 1, 'BARBECUE', '0.00', NULL),
(9, 1, 'FISH', '0.00', NULL),
(10, 1, 'POIVRE', '0.00', NULL),
(11, 1, 'CHEDDAR', '0.00', NULL),
(12, 1, 'CURRY MANGUE', '0.00', NULL),
(14, 0, 'Sans Tomate', '0.00', NULL),
(15, 0, 'Sans Salade', '0.00', NULL),
(16, 0, 'Sans Oignon', '0.00', NULL),
(17, 0, 'Sans Frite', '0.00', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `option_cat`
--

DROP TABLE IF EXISTS `option_cat`;
CREATE TABLE IF NOT EXISTS `option_cat` (
  `option_id` int NOT NULL,
  `cat_id` int NOT NULL,
  PRIMARY KEY (`option_id`,`cat_id`),
  KEY `option_cat_category0_FK` (`cat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `option_cat`
--

INSERT INTO `option_cat` (`option_id`, `cat_id`) VALUES
(1, 1),
(2, 1);

-- --------------------------------------------------------

--
-- Structure de la table `order_client`
--

DROP TABLE IF EXISTS `order_client`;
CREATE TABLE IF NOT EXISTS `order_client` (
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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `order_client`
--

INSERT INTO `order_client` (`order_id`, `order_number`, `order_in`, `order_on`, `order_out`, `order_remark`, `order_statut`, `order_total_price`, `waiting_id`, `user_id`) VALUES
(2, '2', '2023-04-17 09:04:08', NULL, NULL, NULL, 0, '2500.00', NULL, NULL),
(3, '3', '2023-04-17 10:00:26', NULL, NULL, NULL, 0, '0.00', NULL, NULL),
(4, '4', '2023-04-17 10:10:59', NULL, NULL, NULL, 0, '0.00', NULL, NULL),
(5, '5', '2023-04-17 10:14:41', NULL, NULL, NULL, 0, '0.00', NULL, NULL),
(6, '6', '2023-04-17 10:41:58', NULL, NULL, NULL, 0, '0.00', NULL, NULL),
(8, '8', '2023-05-18 10:26:10', NULL, NULL, NULL, 0, '0.00', NULL, NULL),
(9, '9', '2023-05-21 08:34:28', NULL, NULL, NULL, 0, '0.00', NULL, NULL),
(15, '15', '2023-05-21 10:02:09', NULL, NULL, NULL, 2, '600.00', NULL, NULL),
(16, '16', '2023-05-21 10:25:44', NULL, NULL, NULL, 0, '0.00', NULL, NULL),
(17, '17', '2023-05-21 10:48:51', NULL, NULL, NULL, 0, '700.00', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `privilege`
--

DROP TABLE IF EXISTS `privilege`;
CREATE TABLE IF NOT EXISTS `privilege` (
  `priv_id` int NOT NULL AUTO_INCREMENT,
  `priv_name` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`priv_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `privilege`
--

INSERT INTO `privilege` (`priv_id`, `priv_name`) VALUES
(1, 'superadmin'),
(2, 'admin'),
(3, 'service');

-- --------------------------------------------------------

--
-- Structure de la table `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_ref` varchar(100) DEFAULT NULL,
  `product_name` varchar(200) DEFAULT NULL,
  `product_desig` varchar(500) DEFAULT NULL,
  `product_price` decimal(15,2) DEFAULT '0.00',
  `product_pic_count` int DEFAULT NULL,
  `cat_id` int DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `product_category_FK` (`cat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `product`
--

INSERT INTO `product` (`product_id`, `product_ref`, `product_name`, `product_desig`, `product_price`, `product_pic_count`, `cat_id`) VALUES
(1, NULL, 'Big Pop', '3 Pain - 2 Steak - Black angus - Sauce giant - Salade - Cornichon - 2 Cheddar', '600.00', NULL, 2),
(2, NULL, 'Cheesburger ', '1 Steak - Black angus - cornichon - Sauce Ketchup - moutarde- 1 Cheddar', '400.00', NULL, 2),
(3, NULL, 'Double Chezze', '2 Steak 100 g - Black augus - Ketchups - Moutarde - oignons - Cornichon - 2 cheddar', '500.00', NULL, 2),
(4, NULL, 'Triple cheeze', '3 Steak 100 g - Black augus - Ketchups - Moutarde - oignons - Cornichon - 3 cheddar', '600.00', NULL, 2),
(5, NULL, 'Pop chiken', '100 g de poulet - mayo - poivre - oignons - cornichon', '550.00', NULL, 2),
(6, NULL, 'Pop fish ', 'Filet de colin pané - sauce fish - cheddar', '700.00', NULL, 2),
(7, NULL, 'Pop Quesadillas Bavette', '', '1000.00', NULL, 6),
(8, NULL, 'Pop Quesadillas Veau', '', '1200.00', NULL, 6),
(9, NULL, 'Pop Quesadillas Viande haché', '', '1000.00', NULL, 6),
(10, NULL, 'Pop Quesadillas tandoor', '', '1200.00', NULL, 6),
(11, NULL, 'Pop Quesadillas Curry', '', '1500.00', NULL, 6),
(12, NULL, 'Pop Quesadillas Viande Escalo', '', '1000.00', NULL, 6),
(13, NULL, 'Tex Mex Mozza stick', '', '500.00', NULL, 7),
(15, NULL, 'Tex Mex Tenders', '', '500.00', NULL, 7),
(16, NULL, 'Tex Mex Japalenos', '', '1500.00', NULL, 7),
(17, NULL, 'Tex Mex Nuggets', '', '1200.00', NULL, 7),
(18, NULL, 'Tex Mex Wings', '', '800.00', NULL, 7),
(19, NULL, 'Baby Boss', '6 nuggets ou Cheeze au choix Jus + cadeau', '1200.00', NULL, 8),
(20, NULL, 'Branche (08h - 11h)', 'POP brunch : Bruschetta avocat saumon œuf Bénédicte tomate grillé ', '1500.00', NULL, 9),
(21, NULL, 'Toaste Frenchy ', 'Escalope - Oignons fris - Cheddar', '800.00', NULL, 3),
(22, NULL, 'Toaste Américain ', 'Steak - Bacon - Sauce giant', '800.00', NULL, 3),
(23, NULL, 'Toaste Mexicain', 'Bavette poivron oignons fris', '800.00', NULL, 3),
(24, NULL, 'Tex Mex Boucher de camembert	', '', '1200.00', NULL, 7),
(25, NULL, 'LE MEXICANO', 'Bavette d\'aloyau- marine légume griller - Sauce au choix - Ketchups -crudité au choix- 1 cheddar	', '800.00', NULL, 1),
(26, NULL, 'LE MIELLEUX', 'Escalope miel gingembre -   Sauce au choix - Crudité au choix- 1 cheddar', '700.00', NULL, 1),
(27, NULL, 'LE TANDOORI', 'Chiken rouge  - Sauce au choix - Ketchups -crudité au choix- 1 cheddar', '800.00', NULL, 1),
(28, NULL, 'LE CURRY', 'Sauce au choix - Crudité au choix- 1 cheddar', '900.00', NULL, 1),
(29, NULL, 'LE DZ POWER', 'Frite Omelette- Escalope - Sauce au choix - Crudité au choix- 1 cheddar', '800.00', NULL, 1),
(30, NULL, 'LE MERGUEZ', 'Frite - Sauce au choix  -  1 cheddar', '400.00', NULL, 1),
(31, NULL, 'LE KAINRY', 'Triple steak bacon - Cheddar', '700.00', NULL, 1),
(32, NULL, 'LE BLINDE', 'Curry steak smache œuf bacon', '900.00', NULL, 1),
(33, NULL, 'TACOS POULET', 'Poulet', '500.00', NULL, 4),
(34, NULL, 'TACOS CURRY', 'Curry', '600.00', NULL, 4),
(35, NULL, 'TACOS TANDOORI', 'Tandoori', '700.00', NULL, 4),
(36, NULL, ' boisson gazeuse canette', '', '100.00', NULL, 10),
(37, NULL, 'boisson gazeuse bouteille 1 L', '', '150.00', NULL, 10),
(38, NULL, 'Eau 0.5 L', '', '50.00', NULL, 10),
(39, NULL, 'Eau 1 L', '', '100.00', NULL, 10);

-- --------------------------------------------------------

--
-- Structure de la table `product_detail`
--

DROP TABLE IF EXISTS `product_detail`;
CREATE TABLE IF NOT EXISTS `product_detail` (
  `detail_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `order_id` int NOT NULL,
  PRIMARY KEY (`detail_id`),
  KEY `product_detail_product_FK` (`product_id`),
  KEY `product_detail_order0_FK` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `product_detail`
--

INSERT INTO `product_detail` (`detail_id`, `product_id`, `order_id`) VALUES
(5, 1, 2),
(20, 1, 15),
(21, 26, 17);

-- --------------------------------------------------------

--
-- Structure de la table `product_option`
--

DROP TABLE IF EXISTS `product_option`;
CREATE TABLE IF NOT EXISTS `product_option` (
  `option_id` int NOT NULL,
  `detail_id` int NOT NULL,
  PRIMARY KEY (`option_id`,`detail_id`),
  KEY `product_option_product_detail0_FK` (`detail_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `product_option`
--

INSERT INTO `product_option` (`option_id`, `detail_id`) VALUES
(2, 5),
(1, 20),
(2, 20),
(3, 20),
(4, 20),
(5, 20),
(6, 20),
(7, 20),
(8, 20),
(9, 20),
(10, 20),
(11, 20),
(12, 20),
(3, 21),
(6, 21);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`user_id`, `user_id_s`, `user_name`, `user_lastname`, `user_email`, `user_phone`, `user_address`, `user_username`, `user_password`, `user_status`, `priv_id`) VALUES
(1, NULL, NULL, NULL, NULL, NULL, NULL, 'superadmin', '$2b$10$dMNGK6CkrX/e7/hSvipak.2QWfzn521IphggKJ.91vwYVK6h.GHne', 1, 1),
(2, NULL, NULL, NULL, NULL, NULL, NULL, 'guichet1', '$2a$10$dEznUlsOHytxwmxKD7EOg.6XKaOAS7ouJmwfvW9FmSr9kl3J.QB3W', 1, 3);

-- --------------------------------------------------------

--
-- Structure de la table `waiting`
--

DROP TABLE IF EXISTS `waiting`;
CREATE TABLE IF NOT EXISTS `waiting` (
  `waiting_id` int NOT NULL AUTO_INCREMENT,
  `waiting_date` date DEFAULT NULL,
  `waiting_total` int DEFAULT NULL,
  `waiting_remaining` int DEFAULT NULL,
  PRIMARY KEY (`waiting_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `option_cat`
--
ALTER TABLE `option_cat`
  ADD CONSTRAINT `option_cat_category0_FK` FOREIGN KEY (`cat_id`) REFERENCES `category` (`cat_id`),
  ADD CONSTRAINT `option_cat_option_FK` FOREIGN KEY (`option_id`) REFERENCES `option_add` (`option_id`);

--
-- Contraintes pour la table `order_client`
--
ALTER TABLE `order_client`
  ADD CONSTRAINT `order_user0_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `order_waiting_FK` FOREIGN KEY (`waiting_id`) REFERENCES `waiting` (`waiting_id`);

--
-- Contraintes pour la table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_category_FK` FOREIGN KEY (`cat_id`) REFERENCES `category` (`cat_id`);

--
-- Contraintes pour la table `product_detail`
--
ALTER TABLE `product_detail`
  ADD CONSTRAINT `product_detail_order0_FK` FOREIGN KEY (`order_id`) REFERENCES `order_client` (`order_id`),
  ADD CONSTRAINT `product_detail_product_FK` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);

--
-- Contraintes pour la table `product_option`
--
ALTER TABLE `product_option`
  ADD CONSTRAINT `product_option_option_FK` FOREIGN KEY (`option_id`) REFERENCES `option_add` (`option_id`),
  ADD CONSTRAINT `product_option_product_detail0_FK` FOREIGN KEY (`detail_id`) REFERENCES `product_detail` (`detail_id`);

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_privilege_FK` FOREIGN KEY (`priv_id`) REFERENCES `privilege` (`priv_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
