-- MySQL dump 10.13  Distrib 8.0.17, for Linux (x86_64)
--
-- Host: localhost    Database: soundcool
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `soundcool`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `soundcool` /*!40100 DEFAULT CHARACTER SET latin1 */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `soundcool`;

--
-- Table structure for table `audioSharing`
--

DROP TABLE IF EXISTS `audioSharing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audioSharing` (
  `user_id` int(11) NOT NULL,
  `sharing` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audioSharing`
--

LOCK TABLES `audioSharing` WRITE;
/*!40000 ALTER TABLE `audioSharing` DISABLE KEYS */;
INSERT INTO `audioSharing` VALUES (1,0),(2,0);
/*!40000 ALTER TABLE `audioSharing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `project_id` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `description` varchar(500) NOT NULL,
  `content` varchar(2000) DEFAULT NULL,
  `sharedUsers` varchar(500) DEFAULT NULL,
  `isPublic` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`project_id`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (78,1,'Project 1','2019-09-11 06:07:48','Player','{\"nextBlockId\":2,\"nextTypeId\":{\"Delay\":1,\"Transposer\":1,\"Pan\":1,\"Player\":2,\"SignalGen\":1,\"Speaker\":1,\"DirectInput\":1,\"Pitch\":1,\"VSTHost\":1,\"Routing\":1,\"Mixer\":1,\"Record\":1,\"Spectroscope\":1,\"Oscilloscope\":1,\"Envelope\":1,\"Filter\":1,\"Keyboard\":1,\"SamplePlayer\":1,\"Sequencer\":1},\"nowIn\":[],\"nowOut\":[],\"bs\":[{\"typeName\":\"Player\",\"id\":1,\"typeId\":1,\"name\":\"P1\",\"collapse\":true,\"audioObj\":{\"context\":{},\"inputs\":[],\"outputs\":[],\"connPromise\":{},\"options\":{\"path\":\"\",\"loop\":false,\"speed\":1,\"reverse\":false},\"collapse\":true,\"file\":{\"sound_id\":75,\"user\":1,\"name\":\"file_example_WAV_1MG.wav\"}},\"inNode\":[],\"outNode\":[],\"inDisabled\":true,\"color\":\"#e5777d\",\"playing\":false,\"reversed\":false,\"loop\":false,\"speed\":1,\"volume\":60,\"hour\":0,\"minute\":0,\"second\":0,\"file\":{\"sound_id\":75,\"user\":1,\"name\":\"file_example_WAV_1MG.wav\"},\"kinect\":false}]}',NULL,0),(79,2,'Project 1','2019-09-11 06:08:40','Player','{\"nextBlockId\":2,\"nextTypeId\":{\"Delay\":1,\"Transposer\":1,\"Pan\":1,\"Player\":2,\"SignalGen\":1,\"Speaker\":1,\"DirectInput\":1,\"Pitch\":1,\"VSTHost\":1,\"Routing\":1,\"Mixer\":1,\"Record\":1,\"Spectroscope\":1,\"Oscilloscope\":1,\"Envelope\":1,\"Filter\":1,\"Keyboard\":1,\"SamplePlayer\":1,\"Sequencer\":1},\"nowIn\":[],\"nowOut\":[],\"bs\":[{\"typeName\":\"Player\",\"id\":1,\"typeId\":1,\"name\":\"P1\",\"collapse\":true,\"audioObj\":{\"context\":{},\"inputs\":[],\"outputs\":[],\"connPromise\":{},\"options\":{\"path\":\"\",\"loop\":false,\"speed\":1,\"reverse\":false},\"collapse\":true,\"file\":{\"sound_id\":77,\"user\":2,\"name\":\"file_example_WAV_1MG.wav\"}},\"inNode\":[],\"outNode\":[],\"inDisabled\":true,\"color\":\"#e5777d\",\"playing\":false,\"reversed\":false,\"loop\":false,\"speed\":1,\"volume\":60,\"hour\":0,\"minute\":0,\"second\":0,\"file\":{\"sound_id\":77,\"user\":2,\"name\":\"file_example_WAV_1MG.wav\"},\"kinect\":false}]}',NULL,0);
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sounds`
--

DROP TABLE IF EXISTS `sounds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sounds` (
  `sound_id` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) DEFAULT NULL,
  `name` varchar(500) DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`sound_id`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sounds`
--

LOCK TABLES `sounds` WRITE;
/*!40000 ALTER TABLE `sounds` DISABLE KEYS */;
INSERT INTO `sounds` VALUES (75,1,'file_example_WAV_1MG.wav','2019-09-11 06:07:29'),(77,2,'file_example_WAV_1MG.wav','2019-09-11 06:08:24');
/*!40000 ALTER TABLE `sounds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `soundsLocation`
--

DROP TABLE IF EXISTS `soundsLocation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `soundsLocation` (
  `sound_id` int(11) DEFAULT NULL,
  `fileLocation` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `soundsLocation`
--

LOCK TABLES `soundsLocation` WRITE;
/*!40000 ALTER TABLE `soundsLocation` DISABLE KEYS */;
INSERT INTO `soundsLocation` VALUES (75,'/assets/sounds/1568162175466::-::file_example_WAV_1MG.wav'),(77,'/assets/sounds/1568162282458::-::file_example_WAV_1MG.wav');
/*!40000 ALTER TABLE `soundsLocation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Sample user 1','welcome','user1@welcome.com'),(2,'Sample user 2','welcome','user2@welcome.com');
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

-- Dump completed on 2019-09-11  6:09:27
