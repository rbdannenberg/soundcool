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
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (52,1,'Project 1','2019-08-25 05:48:32','Sample Project','{\"nextBlockId\":3,\"nextTypeId\":{\"Delay\":2,\"Transposer\":1,\"Pan\":2,\"Player\":1,\"SignalGen\":1,\"Speaker\":1,\"DirectInput\":1,\"Pitch\":1,\"VSTHost\":1,\"Routing\":1,\"Mixer\":1,\"Record\":1,\"Spectroscope\":1,\"Oscilloscope\":1,\"Envelope\":1,\"Filter\":1,\"Keyboard\":1,\"SamplePlayer\":1,\"Sequencer\":1},\"nowIn\":[],\"nowOut\":[],\"bs\":[{\"typeName\":\"Delay\",\"id\":1,\"typeId\":1,\"name\":\"D1\",\"collapse\":true,\"audioObj\":{\"context\":{},\"inputs\":[],\"outputs\":[],\"connPromise\":{},\"options\":{\"delayTime\":0.1,\"feedback\":0.3},\"inNode\":{},\"outNode\":{},\"delayNode\":{},\"delayGain\":{},\"collapse\":true},\"inNode\":[],\"outNode\":[],\"color\":\"#d2bd78\",\"delayTime\":76,\"feedback\":0.119,\"kinect\":false},{\"typeName\":\"Pan\",\"id\":2,\"typeId\":1,\"name\":\"P1\",\"collapse\":false,\"audioObj\":{\"context\":{},\"inputs\":[],\"outputs\":[],\"connPromise\":{},\"options\":{\"panVal\":0},\"outNode\":{},\"inNode\":{}},\"inNode\":[],\"outNode\":[],\"color\":\"#88b35f\",\"panVal\":0,\"kinect\":false}]}',NULL,0),(53,1,'Project 2','2019-08-25 05:49:22','Shared Project','{\"nextBlockId\":3,\"nextTypeId\":{\"Delay\":2,\"Transposer\":2,\"Pan\":1,\"Player\":1,\"SignalGen\":1,\"Speaker\":1,\"DirectInput\":1,\"Pitch\":1,\"VSTHost\":1,\"Routing\":1,\"Mixer\":1,\"Record\":1,\"Spectroscope\":1,\"Oscilloscope\":1,\"Envelope\":1,\"Filter\":1,\"Keyboard\":1,\"SamplePlayer\":1,\"Sequencer\":1},\"nowIn\":[],\"nowOut\":[],\"bs\":[{\"typeName\":\"Transposer\",\"id\":1,\"typeId\":1,\"name\":\"T1\",\"collapse\":true,\"inNode\":[],\"outNode\":[],\"color\":\"#c185c8\",\"buttonCents\":0,\"sliderCents\":0},{\"typeName\":\"Delay\",\"id\":2,\"typeId\":1,\"name\":\"D1\",\"collapse\":false,\"audioObj\":{\"context\":{},\"inputs\":[],\"outputs\":[],\"connPromise\":{},\"options\":{\"delayTime\":0.1,\"feedback\":0.3},\"inNode\":{},\"outNode\":{},\"delayNode\":{},\"delayGain\":{}},\"inNode\":[],\"outNode\":[],\"color\":\"#d2bd78\",\"delayTime\":76,\"feedback\":0.119,\"kinect\":false}]}','{\"users\":[{\"user_id\":2,\"name\":\"Sample user 2\",\"email\":\"user2@welcome.com\"}]}',0),(54,1,'Project 3','2019-08-25 05:50:00','Public Project','{\"nextBlockId\":3,\"nextTypeId\":{\"Delay\":3,\"Transposer\":1,\"Pan\":1,\"Player\":1,\"SignalGen\":1,\"Speaker\":1,\"DirectInput\":1,\"Pitch\":1,\"VSTHost\":1,\"Routing\":1,\"Mixer\":1,\"Record\":1,\"Spectroscope\":1,\"Oscilloscope\":1,\"Envelope\":1,\"Filter\":1,\"Keyboard\":1,\"SamplePlayer\":1,\"Sequencer\":1},\"nowIn\":[],\"nowOut\":[],\"bs\":[{\"typeName\":\"Delay\",\"id\":1,\"typeId\":1,\"name\":\"D1\",\"collapse\":true,\"audioObj\":{\"context\":{},\"inputs\":[],\"outputs\":[],\"connPromise\":{},\"options\":{\"delayTime\":0.1,\"feedback\":0.3},\"inNode\":{},\"outNode\":{},\"delayNode\":{},\"delayGain\":{},\"collapse\":true},\"inNode\":[],\"outNode\":[],\"color\":\"#d2bd78\",\"delayTime\":76,\"feedback\":0.119,\"kinect\":false},{\"typeName\":\"Delay\",\"id\":2,\"typeId\":2,\"name\":\"D2\",\"collapse\":false,\"audioObj\":{\"context\":{},\"inputs\":[],\"outputs\":[],\"connPromise\":{},\"options\":{\"delayTime\":0.1,\"feedback\":0.3},\"inNode\":{},\"outNode\":{},\"delayNode\":{},\"delayGain\":{}},\"inNode\":[],\"outNode\":[],\"color\":\"#d2bd78\",\"delayTime\":76,\"feedback\":0.119,\"kinect\":false}]}',NULL,1),(55,2,'Project 6','2019-08-25 05:50:59','Project user 2','{\"nextBlockId\":3,\"nextTypeId\":{\"Delay\":2,\"Transposer\":1,\"Pan\":1,\"Player\":1,\"SignalGen\":1,\"Speaker\":1,\"DirectInput\":1,\"Pitch\":1,\"VSTHost\":1,\"Routing\":1,\"Mixer\":2,\"Record\":1,\"Spectroscope\":1,\"Oscilloscope\":1,\"Envelope\":1,\"Filter\":1,\"Keyboard\":1,\"SamplePlayer\":1,\"Sequencer\":1},\"nowIn\":[],\"nowOut\":[],\"bs\":[{\"typeName\":\"Delay\",\"id\":1,\"typeId\":1,\"name\":\"D1\",\"collapse\":true,\"audioObj\":{\"context\":{},\"inputs\":[],\"outputs\":[],\"connPromise\":{},\"options\":{\"delayTime\":0.1,\"feedback\":0.3},\"inNode\":{},\"outNode\":{},\"delayNode\":{},\"delayGain\":{},\"collapse\":true},\"inNode\":[],\"outNode\":[],\"color\":\"#d2bd78\",\"delayTime\":76,\"feedback\":0.119,\"kinect\":false},{\"typeName\":\"Mixer\",\"id\":2,\"typeId\":1,\"name\":\"M1\",\"collapse\":true,\"inNode\":[],\"outNode\":[],\"color\":\"#67e3e5\",\"inDisabled\":true,\"volumeMaster\":60,\"volume1\":60,\"volume2\":60,\"volume3\":60,\"volume4\":60,\"volume5\":60,\"volume6\":60,\"volume7\":60,\"volume8\":60}]}',NULL,0);
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
  `fileLocation` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`sound_id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sounds`
--

LOCK TABLES `sounds` WRITE;
/*!40000 ALTER TABLE `sounds` DISABLE KEYS */;
INSERT INTO `sounds` VALUES (43,1,'file_example_WAV_1MG.wav','2019-08-25 05:50:15','/assets/sounds/1566691159597-file_example_WAV_1MG.wav'),(44,2,'file_example_WAV_1MG.wav','2019-08-25 05:51:10','/assets/sounds/1566692415164-file_example_WAV_1MG.wav');
/*!40000 ALTER TABLE `sounds` ENABLE KEYS */;
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

-- Dump completed on 2019-08-25  5:52:10
