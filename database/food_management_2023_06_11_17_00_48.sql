-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : dim. 11 juin 2023 à 09:10
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
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
(14, 3, 'Sans Tomate', '0.00', NULL),
(15, 3, 'Sans Salade', '0.00', NULL),
(16, 3, 'Sans Oignon', '0.00', NULL),
(17, 3, 'Sans Frite', '0.00', NULL),
(18, 2, 'Gruyère', '150.00', NULL),
(22, 3, 'OASIS', '0.00', NULL),
(23, 3, 'TROPICO', '0.00', NULL),
(24, 3, 'LIPTON', '0.00', NULL),
(25, 3, 'ORANGINA', '0.00', NULL),
(26, 3, 'SCHWEPPES', '0.00', NULL),
(27, 3, 'SPRITE', '0.00', NULL),
(28, 3, 'FANTA', '0.00', NULL),
(29, 3, '7 UP', '0.00', NULL),
(30, 3, 'COCA COLA', '0.00', NULL);

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
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
(15, '15', '2023-05-21 10:02:09', NULL, NULL, NULL, 2, '600.00', NULL, NULL),
(16, '16', '2023-05-21 10:25:44', NULL, NULL, NULL, 0, '0.00', NULL, NULL),
(17, '17', '2023-05-21 10:48:51', NULL, NULL, NULL, 0, '700.00', NULL, NULL),
(24, '24', '2023-05-22 12:00:45', NULL, NULL, NULL, 2, '5150.00', NULL, NULL),
(25, '25', '2023-05-22 12:12:47', NULL, NULL, NULL, 0, '0.00', NULL, NULL),
(26, '26', '2023-06-01 13:14:21', NULL, NULL, NULL, 2, '500.00', NULL, NULL),
(29, '29', '2023-06-01 17:08:16', NULL, NULL, NULL, 0, '0.00', NULL, NULL),
(31, '31', '2023-06-04 09:49:28', NULL, NULL, NULL, 0, '0.00', NULL, NULL),
(32, '32', '2023-06-04 09:50:12', NULL, NULL, NULL, 2, '900.00', NULL, NULL),
(34, '34', '2023-06-04 10:11:09', NULL, NULL, NULL, 0, '1000.00', NULL, NULL),
(35, '35', '2023-06-04 10:18:13', NULL, NULL, NULL, 2, '700.00', NULL, NULL),
(36, '36', '2023-06-04 10:20:53', NULL, NULL, NULL, 2, '1500.00', NULL, NULL),
(38, '38', '2023-06-04 11:07:04', NULL, NULL, NULL, 2, '700.00', NULL, NULL),
(39, '39', '2023-06-04 11:10:19', NULL, NULL, NULL, 2, '800.00', NULL, NULL),
(40, '40', '2023-06-04 11:13:00', NULL, NULL, NULL, 2, '800.00', NULL, NULL),
(42, '42', '2023-06-04 14:56:34', NULL, NULL, NULL, 2, '800.00', NULL, NULL),
(43, '43', '2023-06-04 14:59:47', NULL, NULL, NULL, 1, '900.00', NULL, NULL),
(44, '44', '2023-06-04 15:03:01', NULL, NULL, NULL, 1, '800.00', NULL, NULL),
(45, '45', '2023-06-04 15:03:58', NULL, NULL, NULL, 2, '800.00', NULL, NULL),
(46, '46', '2023-06-04 15:04:53', NULL, NULL, NULL, 0, '0.00', NULL, NULL),
(47, '47', '2023-06-04 15:04:53', NULL, NULL, NULL, 1, '800.00', NULL, NULL),
(48, '48', '2023-06-04 15:09:15', NULL, NULL, NULL, 1, '900.00', NULL, NULL),
(49, '49', '2023-06-04 15:11:06', NULL, NULL, NULL, 1, '800.00', NULL, NULL),
(50, '50', '2023-06-04 15:22:42', NULL, NULL, NULL, 1, '800.00', NULL, NULL),
(52, '52', '2023-06-04 15:23:44', NULL, NULL, NULL, 2, '900.00', NULL, NULL),
(53, '53', '2023-06-04 15:24:43', NULL, NULL, NULL, 1, '950.00', NULL, NULL),
(54, '54', '2023-06-05 08:23:10', NULL, NULL, NULL, 1, '800.00', NULL, NULL),
(55, '55', '2023-06-05 08:24:36', NULL, NULL, NULL, 1, '900.00', NULL, NULL),
(56, '56', '2023-06-05 08:58:21', NULL, NULL, NULL, 1, '800.00', NULL, NULL),
(57, '57', '2023-06-05 08:59:14', NULL, NULL, NULL, 0, '0.00', NULL, NULL),
(58, '58', '2023-06-05 09:15:17', NULL, NULL, NULL, 0, '0.00', NULL, NULL),
(59, '59', '2023-06-05 10:46:11', NULL, NULL, NULL, 0, '0.00', NULL, NULL),
(62, '62', '2023-06-07 09:50:51', NULL, NULL, NULL, 0, '0.00', NULL, NULL),
(64, '64', '2023-06-07 12:40:04', NULL, NULL, NULL, 1, '900.00', NULL, NULL),
(72, '72', '2023-06-08 16:47:53', NULL, NULL, NULL, 0, '0.00', NULL, NULL),
(73, '73', '2023-06-10 11:26:10', NULL, NULL, NULL, 0, '0.00', NULL, NULL),
(76, '76', '2023-06-10 12:55:27', NULL, NULL, NULL, 0, '0.00', NULL, NULL);

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
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `product`
--

INSERT INTO `product` (`product_id`, `product_ref`, `product_name`, `product_desig`, `product_price`, `product_pic_count`, `cat_id`) VALUES
(1, NULL, 'Big Pop', '3 Pain - 2 Steak - Black angus - Sauce giant - Salade - Cornichon - 2 Cheddar', '600.00', NULL, 2),
(2, NULL, 'Cheesburger ', '1 Steak - Black angus - cornichon - Sauce Ketchup - moutarde- 1 Cheddar', '400.00', NULL, 2),
(3, NULL, 'Burger Double', '2 Steak 100 g - Black augus - Ketchups - Moutarde - oignons - Cornichon - 2 cheddar', '500.00', NULL, 2),
(4, NULL, 'Burger Triple', '3 Steak 100 g - Black augus - Ketchups - Moutarde - oignons - Cornichon - 3 cheddar', '600.00', NULL, 2),
(5, NULL, 'Pop chicken', '100 g de poulet - mayo - poivre - oignons - cornichon', '550.00', NULL, 2),
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
(21, NULL, 'Toaste Frenchy ', 'Escalope - Oignons fris - Cheddar', '800.00', NULL, 3),
(22, NULL, 'Toaste Américain ', 'Steak - Bacon - Sauce giant', '800.00', NULL, 3),
(23, NULL, 'Toaste Mexicain', 'Bavette poivron oignons fris', '800.00', NULL, 3),
(24, NULL, 'Tex Mex Boucher de camembert	', '', '1200.00', NULL, 7),
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
(39, NULL, 'Eau 1 L', '', '100.00', NULL, 10),
(40, NULL, 'LE MEXICANO', 'Bavette d`aloyau- marine légume griller - Sauce au choix - Ketchups -crudité au choix- 1 cheddar', '800.00', NULL, 1);

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
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `product_detail`
--

INSERT INTO `product_detail` (`detail_id`, `product_id`, `order_id`) VALUES
(5, 1, 2),
(20, 1, 15),
(21, 26, 17),
(64, 3, 26),
(69, 2, 24),
(72, 32, 24),
(73, 28, 24),
(74, 28, 24),
(75, 28, 24),
(76, 28, 24),
(77, 39, 24),
(78, 28, 32),
(79, 2, 34),
(80, 4, 34),
(82, 26, 35),
(84, 26, 38),
(85, 27, 39),
(86, 27, 40),
(87, 27, 42),
(88, 28, 43),
(89, 27, 44),
(90, 27, 45),
(91, 40, 47),
(92, 28, 48),
(93, 27, 49),
(94, 27, 50),
(95, 28, 52),
(96, 27, 53),
(97, 37, 53),
(98, 40, 54),
(99, 32, 55),
(100, 27, 56),
(109, 28, 64);

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
(6, 21),
(2, 64),
(3, 64),
(7, 64),
(1, 69),
(1, 72),
(2, 72),
(18, 72),
(2, 73),
(3, 75),
(2, 76),
(2, 78),
(1, 79),
(2, 79),
(3, 79),
(2, 80),
(2, 82),
(6, 82),
(2, 84),
(6, 84),
(3, 85),
(6, 85),
(3, 86),
(7, 86),
(11, 86),
(2, 87),
(2, 88),
(2, 89),
(2, 90),
(4, 91),
(7, 92),
(15, 92),
(6, 93),
(6, 94),
(4, 95),
(7, 95),
(12, 95),
(15, 95),
(3, 96),
(6, 96),
(7, 96),
(6, 97),
(14, 98),
(7, 99),
(6, 100);

-- --------------------------------------------------------

--
-- Structure de la table `product_option_limit`
--

DROP TABLE IF EXISTS `product_option_limit`;
CREATE TABLE IF NOT EXISTS `product_option_limit` (
  `product_id` int NOT NULL,
  `option_id` int NOT NULL,
  PRIMARY KEY (`option_id`,`product_id`),
  KEY `product_option_limit_product_FK` (`product_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `product_option_limit`
--

INSERT INTO `product_option_limit` (`product_id`, `option_id`) VALUES
(1, 1),
(2, 1),
(3, 1),
(9, 1),
(10, 1),
(12, 1),
(26, 1),
(27, 1),
(29, 1),
(30, 1),
(31, 1),
(33, 1),
(35, 1),
(40, 1),
(1, 2),
(2, 2),
(3, 2),
(4, 2),
(5, 2),
(7, 2),
(10, 2),
(12, 2),
(26, 2),
(27, 2),
(29, 2),
(30, 2),
(31, 2),
(33, 2),
(35, 2),
(40, 2),
(1, 3),
(2, 3),
(3, 3),
(4, 3),
(5, 3),
(6, 3),
(7, 3),
(10, 3),
(12, 3),
(22, 3),
(23, 3),
(26, 3),
(27, 3),
(28, 3),
(29, 3),
(30, 3),
(31, 3),
(33, 3),
(35, 3),
(40, 3),
(1, 4),
(2, 4),
(3, 4),
(4, 4),
(5, 4),
(6, 4),
(12, 4),
(22, 4),
(26, 4),
(27, 4),
(29, 4),
(30, 4),
(31, 4),
(40, 4),
(1, 5),
(3, 5),
(10, 5),
(12, 5),
(27, 5),
(28, 5),
(29, 5),
(30, 5),
(31, 5),
(40, 5),
(1, 6),
(3, 6),
(4, 6),
(7, 6),
(26, 6),
(27, 6),
(28, 6),
(29, 6),
(30, 6),
(31, 6),
(40, 6),
(1, 7),
(3, 7),
(4, 7),
(6, 7),
(26, 7),
(27, 7),
(28, 7),
(29, 7),
(30, 7),
(31, 7),
(40, 7),
(4, 8),
(8, 8),
(11, 8),
(27, 8),
(28, 8),
(29, 8),
(30, 8),
(31, 8),
(40, 8),
(27, 9),
(29, 9),
(31, 9),
(40, 9),
(4, 10),
(9, 10),
(12, 10),
(21, 10),
(23, 10),
(27, 10),
(29, 10),
(31, 10),
(40, 10),
(9, 11),
(10, 11),
(21, 11),
(27, 11),
(29, 11),
(31, 11),
(40, 11),
(8, 12),
(9, 12),
(10, 12),
(11, 12),
(23, 12),
(27, 12),
(29, 12),
(31, 12),
(40, 12),
(1, 14),
(2, 14),
(3, 14),
(5, 14),
(6, 14),
(7, 14),
(8, 14),
(9, 14),
(10, 14),
(11, 14),
(12, 14),
(21, 14),
(22, 14),
(23, 14),
(28, 14),
(33, 14),
(34, 14),
(35, 14),
(1, 15),
(2, 15),
(4, 15),
(5, 15),
(6, 15),
(7, 15),
(8, 15),
(9, 15),
(10, 15),
(11, 15),
(12, 15),
(21, 15),
(22, 15),
(23, 15),
(28, 15),
(33, 15),
(34, 15),
(35, 15),
(2, 16),
(4, 16),
(5, 16),
(6, 16),
(7, 16),
(8, 16),
(9, 16),
(10, 16),
(11, 16),
(12, 16),
(21, 16),
(22, 16),
(23, 16),
(33, 16),
(34, 16),
(35, 16),
(1, 17),
(2, 17),
(3, 17),
(4, 17),
(5, 17),
(6, 17),
(7, 17),
(8, 17),
(9, 17),
(10, 17),
(11, 17),
(12, 17),
(21, 17),
(22, 17),
(23, 17),
(33, 17),
(34, 17),
(35, 17),
(36, 22),
(37, 22),
(36, 23),
(37, 23),
(36, 24),
(37, 24),
(36, 25),
(37, 25),
(36, 26),
(37, 26),
(36, 27),
(37, 27),
(36, 28),
(37, 28),
(36, 29),
(37, 29),
(36, 30),
(37, 30);

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
