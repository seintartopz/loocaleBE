-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: loocaledb
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `connects`
--

DROP TABLE IF EXISTS `connects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `connects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `background` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `connects`
--

LOCK TABLES `connects` WRITE;
/*!40000 ALTER TABLE `connects` DISABLE KEYS */;
INSERT INTO `connects` VALUES (1,'http://localhost:5000/1666337771838-bike_touring.png','Bike Touring','2022-10-21 07:36:11','2022-10-21 07:36:11'),(2,'http://localhost:5000/1666337792969-hiking.png','Hiking','2022-10-21 07:36:32','2022-10-21 07:36:32'),(3,'http://localhost:5000/1666337806551-camping.png','Camping','2022-10-21 07:36:46','2022-10-21 07:36:46'),(4,'http://localhost:5000/1666337822362-temple.png','Temple Admirer','2022-10-21 07:37:02','2022-10-21 07:37:02'),(5,'http://localhost:5000/1666337838057-architecture.png','Architecture','2022-10-21 07:37:18','2022-10-21 07:37:18'),(6,'http://localhost:5000/1666337971918-spicy.png','Spicy Culinary','2022-10-21 07:39:31','2022-10-21 07:39:31'),(7,'http://localhost:5000/1666337988203-traditional.png','Traditional Culinary','2022-10-21 07:39:48','2022-10-21 07:39:48'),(8,'http://localhost:5000/1666338005043-vegan.png','Vegan On Look','2022-10-21 07:40:05','2022-10-21 07:40:05'),(9,'http://localhost:5000/1666338019683-chicken.png','Chicken Lovers','2022-10-21 07:40:19','2022-10-21 07:40:19'),(10,'http://localhost:5000/1666338030654-meat.png','Meat No. 1','2022-10-21 07:40:30','2022-10-21 07:40:30'),(11,'http://localhost:5000/1666338042662-coffee.png','Coffee Experts','2022-10-21 07:40:42','2022-10-21 07:40:42');
/*!40000 ALTER TABLE `connects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discovers`
--

DROP TABLE IF EXISTS `discovers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discovers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `href` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discovers`
--

LOCK TABLES `discovers` WRITE;
/*!40000 ALTER TABLE `discovers` DISABLE KEYS */;
INSERT INTO `discovers` VALUES (1,'http://localhost:5000/1666247987348-pulau-marabatua.jpg','Pulau Marabatua, Kab. Kota Baru','2022-10-20 06:39:47','2022-10-20 06:39:47','https://goo.gl/maps/qVXSioSzzRBKZjsv7'),(2,'http://localhost:5000/1666248059437-desa-batara.jpg','Desa Batara, Banten','2022-10-20 06:40:59','2022-10-20 06:40:59','https://goo.gl/maps/PfQ5u7EM2c9QW2646'),(3,'http://localhost:5000/1666248080000-kampung-warna.jpg','Kampung Warna, Malang','2022-10-20 06:41:20','2022-10-20 06:41:20','https://goo.gl/maps/kdGi8Q2wDyAuWLHa7'),(4,'http://localhost:5000/1666248099346-danau-situpatenggang.jpg','Danau Situpatenggang, Bandung','2022-10-20 06:41:39','2022-10-20 06:41:39','https://goo.gl/maps/dWxWCWz2D74iffgAA'),(5,'http://localhost:5000/1666248117870-pecatu-badung.jpg','Pecatu, Badung','2022-10-20 06:41:57','2022-10-20 06:41:57','https://goo.gl/maps/J7vXEfLSantpn3tB7'),(6,'http://localhost:5000/1666248141352-tumpak-sewu.jpg','Air Terjun Tumpak Sewu, Lumajang','2022-10-20 06:42:21','2022-10-20 06:42:21','https://goo.gl/maps/X7oaC4PFwUxuMTU49'),(7,'http://localhost:5000/1666248159674-stasiun-mrt.jpg','Stasiun MRT, Jakarta','2022-10-20 06:42:39','2022-10-20 06:42:39','https://goo.gl/maps/ir5chrHQWe7g8P2C8'),(8,'http://localhost:5000/1666248643761-masjid-baiturrahman.jpg','Masjid Baiturrahman','2022-10-20 06:50:43','2022-10-20 06:50:43','https://goo.gl/maps/fVUrFWLLGTw6tME56'),(9,'http://localhost:5000/1666248678586-kawah-ijen.jpg','Kawah Ijen, Banyuwangi','2022-10-20 06:51:18','2022-10-20 06:51:18','https://goo.gl/maps/CUevFWofiqhNEwdC6'),(10,'http://localhost:5000/1666248738710-pantai-klingking.jpg','Pantai Kelingking, Kab. Klungkung','2022-10-20 06:52:18','2022-10-20 06:52:18','https://goo.gl/maps/YZH2K4bPNkqDPyif9'),(11,'http://localhost:5000/1666248771686-grand-luley.jpg','Grand Luley, Manado','2022-10-20 06:52:51','2022-10-20 06:52:51','https://goo.gl/maps/kCC1szBnvfQbX6b16'),(12,'http://localhost:5000/1666248804216-lawang-sewu.jpg','Lawang Sewu, Semarang','2022-10-20 06:53:24','2022-10-20 06:53:24','https://goo.gl/maps/GMbWHm958fGURM6Q8'),(13,'http://localhost:5000/1666248839049-situ-gunung.jpg','Situ Gunung, Sukabumi','2022-10-20 06:53:59','2022-10-20 06:53:59','https://goo.gl/maps/E3Gq5PHUU1T5XuLJ6'),(14,'http://localhost:5000/1666248878170-gunung-bromo.jpg','Gunung Bromo, Pasuruan','2022-10-20 06:54:38','2022-10-20 06:54:38','https://goo.gl/maps/dkwbaJQ2djxwojA89'),(15,'http://localhost:5000/1666248910648-jembrana.jpg','Jembrana, Bali','2022-10-20 06:55:10','2022-10-20 06:55:10','https://goo.gl/maps/b7HXEaMZAc89kPGu7');
/*!40000 ALTER TABLE `discovers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20210525134731-create-user.js'),('20221011150718-create-discover.js'),('20221011154606-create-connect.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `phone` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'loocaledb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-25  8:44:07
