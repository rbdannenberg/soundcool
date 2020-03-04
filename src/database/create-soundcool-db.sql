-- MySQL dump 10.13  Distrib 8.0.19, for Linux (x86_64)
--
-- Host: localhost    Database: soundcool
-- ------------------------------------------------------
-- Server version	8.0.19-0ubuntu0.19.10.3

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
-- Table structure for table `audioSharing`
--

USE soundcool
DROP TABLE IF EXISTS `audioSharing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audioSharing` (
  `user_id` int NOT NULL,
  `sharing` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audioSharing`
--

LOCK TABLES `audioSharing` WRITE;
/*!40000 ALTER TABLE `audioSharing` DISABLE KEYS */;
INSERT INTO `audioSharing` VALUES (100,0),(101,0);
/*!40000 ALTER TABLE `audioSharing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `presets`
--

DROP TABLE IF EXISTS `presets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `presets` (
  `preset_id` int NOT NULL AUTO_INCREMENT,
  `user` int DEFAULT NULL,
  `name` varchar(500) DEFAULT NULL,
  `location` varchar(500) DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`preset_id`)
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `presets`
--

LOCK TABLES `presets` WRITE;
/*!40000 ALTER TABLE `presets` DISABLE KEYS */;
INSERT INTO `presets` VALUES (1,NULL,'CCRMAStairwell.wav','/assets/presets/1578618278209-CCRMAStairwell.wav','2020-01-10 05:43:43'),(2,101,'RoomPool.wav','/assets/presets/1578618278209-RoomPool.wav','2020-01-10 06:34:44');
/*!40000 ALTER TABLE `presets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `project_id` int NOT NULL AUTO_INCREMENT,
  `user` int DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `description` varchar(500) NOT NULL,
  `content` varchar(15300) DEFAULT NULL,
  `sharedUsers` varchar(500) DEFAULT NULL,
  `isPublic` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`project_id`)
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sounds`
--

DROP TABLE IF EXISTS `sounds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sounds` (
  `sound_id` int NOT NULL AUTO_INCREMENT,
  `user` int DEFAULT NULL,
  `name` varchar(500) DEFAULT NULL,
  `fileLocation` varchar(500) DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `type` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`sound_id`)
) ENGINE=InnoDB AUTO_INCREMENT=133 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sounds`
--

LOCK TABLES `sounds` WRITE;
/*!40000 ALTER TABLE `sounds` DISABLE KEYS */;
INSERT INTO `sounds` VALUES (127,100,'sound.wav','/uploads/sounds/1582037622837-sound.wav','2020-02-18 20:24:11','upload'),(128,100,'Sound Link','https://freesound.org/data/previews/210/210533_985466-lq.mp3','2020-02-18 20:24:21','Sound Link'),(129,100,'Youtube','https://youtu.be/cphNpqKpKc4','2020-02-18 20:24:31','Youtube'),(130,101,'sound.wav','/uploads/sounds/1582037651668-sound.wav','2020-02-18 20:26:16','upload'),(131,101,'Sound Link','https://freesound.org/data/previews/210/210533_985466-lq.mp3','2020-02-18 20:26:25','Sound Link'),(132,101,'Youtube','https://youtu.be/cphNpqKpKc4','2020-02-18 20:26:32','Youtube');
/*!40000 ALTER TABLE `sounds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (100,'User 1','$2b$10$zoD.V4IYLhWmwz5Kld3gAu/jhYsPZYDYAWamQToQeC4tenQ1p1wwS','user1@welcome.com'),(101,'User 2','$2b$10$9nG9wvklANoTJIlO.WBrzu0wh6oTHHjh8hviJQ0pj7eEcY3aN4mMC','user2@welcome.com');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-18 20:28:12
