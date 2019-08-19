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
-- Create and use database
--
CREATE DATABASE  IF NOT EXISTS `soundcool` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
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
  PRIMARY KEY (`project_id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (38,1,'Sample Project 1','2019-08-20 04:01:29','Project 1','{\"nextBlockId\":4,\"nextTypeId\":{\"Delay\":2,\"Transposer\":2,\"Pan\":2,\"Player\":1,\"SignalGen\":1,\"Speaker\":1,\"DirectInput\":1,\"Pitch\":1,\"VSTHost\":1,\"Routing\":1,\"Mixer\":1,\"Record\":1,\"Spectroscope\":1,\"Oscilloscope\":1,\"Envelope\":1,\"Filter\":1,\"Keyboard\":1,\"SamplePlayer\":1,\"Sequencer\":1},\"nowIn\":[],\"nowOut\":[],\"bs\":[{\"typeName\":\"Delay\",\"id\":1,\"typeId\":1,\"name\":\"D1\",\"collapse\":true,\"audioObj\":{\"context\":{},\"inputs\":[],\"outputs\":[],\"connPromise\":{},\"options\":{\"delayTime\":\"455\",\"feedback\":0.3},\"inNode\":{},\"outNode\":{},\"delayNode\":{},\"delayGain\":{},\"collapse\":true},\"inNode\":[],\"outNode\":[],\"color\":\"#d2bd78\",\"delayTime\":\"455\",\"feedback\":0.119,\"kinect\":false},{\"typeName\":\"Transposer\",\"id\":2,\"typeId\":1,\"name\":\"T1\",\"collapse\":false,\"inNode\":[],\"outNode\":[],\"color\":\"#c185c8\",\"buttonCents\":0,\"sliderCents\":0},{\"typeName\":\"Pan\",\"id\":3,\"typeId\":1,\"name\":\"P1\",\"collapse\":true,\"audioObj\":{\"context\":{},\"inputs\":[],\"outputs\":[],\"connPromise\":{},\"options\":{\"panVal\":0},\"outNode\":{},\"inNode\":{},\"collapse\":true},\"inNode\":[],\"outNode\":[],\"color\":\"#88b35f\",\"panVal\":0,\"kinect\":false}]}'),(39,1,'Sample project 2','2019-08-20 04:01:57','Project 2','{\"nextBlockId\":3,\"nextTypeId\":{\"Delay\":2,\"Transposer\":1,\"Pan\":1,\"Player\":1,\"SignalGen\":1,\"Speaker\":1,\"DirectInput\":1,\"Pitch\":1,\"VSTHost\":1,\"Routing\":1,\"Mixer\":1,\"Record\":2,\"Spectroscope\":1,\"Oscilloscope\":1,\"Envelope\":1,\"Filter\":1,\"Keyboard\":1,\"SamplePlayer\":1,\"Sequencer\":1},\"nowIn\":[],\"nowOut\":[],\"bs\":[{\"typeName\":\"Record\",\"id\":1,\"typeId\":1,\"name\":\"R1\",\"collapse\":true,\"inNode\":[],\"outNode\":[],\"color\":\"#9f7d77\",\"outDisabled\":true,\"module\":false,\"recording\":false,\"volume\":\"24\",\"timer\":0},{\"typeName\":\"Delay\",\"id\":2,\"typeId\":1,\"name\":\"D1\",\"collapse\":false,\"audioObj\":{\"context\":{},\"inputs\":[],\"outputs\":[],\"connPromise\":{},\"options\":{\"delayTime\":0.1,\"feedback\":0.3},\"inNode\":{},\"outNode\":{},\"delayNode\":{},\"delayGain\":{}},\"inNode\":[],\"outNode\":[],\"color\":\"#d2bd78\",\"delayTime\":76,\"feedback\":0.119,\"kinect\":false}]}'),(40,2,'Project 1','2019-08-20 04:02:50','Sample Project 1','{\"nextBlockId\":3,\"nextTypeId\":{\"Delay\":2,\"Transposer\":1,\"Pan\":1,\"Player\":1,\"SignalGen\":1,\"Speaker\":1,\"DirectInput\":1,\"Pitch\":1,\"VSTHost\":1,\"Routing\":1,\"Mixer\":2,\"Record\":1,\"Spectroscope\":1,\"Oscilloscope\":1,\"Envelope\":1,\"Filter\":1,\"Keyboard\":1,\"SamplePlayer\":1,\"Sequencer\":1},\"nowIn\":[],\"nowOut\":[],\"bs\":[{\"typeName\":\"Mixer\",\"id\":1,\"typeId\":1,\"name\":\"M1\",\"collapse\":true,\"inNode\":[],\"outNode\":[],\"color\":\"#67e3e5\",\"inDisabled\":true,\"volumeMaster\":60,\"volume1\":\"98\",\"volume2\":\"40\",\"volume3\":60,\"volume4\":60,\"volume5\":60,\"volume6\":60,\"volume7\":\"90\",\"volume8\":60},{\"typeName\":\"Delay\",\"id\":2,\"typeId\":1,\"name\":\"D1\",\"collapse\":false,\"audioObj\":{\"context\":{},\"inputs\":[],\"outputs\":[],\"connPromise\":{},\"options\":{\"delayTime\":0.1,\"feedback\":0.3},\"inNode\":{},\"outNode\":{},\"delayNode\":{},\"delayGain\":{}},\"inNode\":[],\"outNode\":[],\"color\":\"#d2bd78\",\"delayTime\":76,\"feedback\":0.119,\"kinect\":false}]}'),(41,2,'Project 2','2019-08-20 04:03:13','Sample Project 2','{\"nextBlockId\":2,\"nextTypeId\":{\"Delay\":1,\"Transposer\":1,\"Pan\":1,\"Player\":1,\"SignalGen\":1,\"Speaker\":1,\"DirectInput\":1,\"Pitch\":1,\"VSTHost\":1,\"Routing\":1,\"Mixer\":1,\"Record\":1,\"Spectroscope\":1,\"Oscilloscope\":1,\"Envelope\":1,\"Filter\":1,\"Keyboard\":1,\"SamplePlayer\":1,\"Sequencer\":2},\"nowIn\":[],\"nowOut\":[],\"bs\":[{\"typeName\":\"Sequencer\",\"id\":1,\"typeId\":1,\"name\":\"S1\",\"collapse\":true,\"inNode\":[],\"outNode\":[],\"color\":\"#caf0fd\",\"inDisabled\":true,\"outDisabled\":true,\"waveforms\":[\"Silence\",\"Silence\",\"Silence\",\"Silence\",\"Silence\",\"Silence\",\"Silence\",\"Silence\",\"Silence\"],\"modulations\":[\"No Mod\",\"No Mod\",\"No Mod\",\"No Mod\",\"No Mod\",\"No Mod\",\"No Mod\",\"No Mod\",\"No Mod\"],\"modulationValues\":[0,0,0,0,0,0,0,0],\"notes\":[0,4,8,10,14,18,22,0],\"durations\":[1000,1000,1000,1000,1000,1000,1000,1000,1000],\"selecteds\":[true,true,true,true,true,true,true,true],\"skippeds\":[false,false,false,false,false,false,false,false],\"looping\":false,\"playStyle\":\"None\"}]}');
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
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sounds`
--

LOCK TABLES `sounds` WRITE;
/*!40000 ALTER TABLE `sounds` DISABLE KEYS */;
INSERT INTO `sounds` VALUES (36,2,'file_example_WAV_1MG.wav','2019-08-20 04:04:30','/assets/sounds/1566254045265-file_example_WAV_1MG.wav'),(37,1,'file_example_WAV_1MG.wav','2019-08-20 04:04:44','/assets/sounds/1566254070017-file_example_WAV_1MG.wav');
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
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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

-- Dump completed on 2019-08-20  4:06:42
