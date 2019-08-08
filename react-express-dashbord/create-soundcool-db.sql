CREATE DATABASE  IF NOT EXISTS `soundcool` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `soundcool`;
-- MySQL dump 10.13  Distrib 8.0.16, for macos10.14 (x86_64)
--
-- Host: 127.0.0.1    Database: soundcool
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `projects` (
  `project_id` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `date` varchar(50) DEFAULT NULL,
  `description` varchar(500) NOT NULL,
  `content` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`project_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,1,'Project1','2012-10-16T17:57:28.556094Z','My first project','{\"nowIn\":[],\"nowOut\":[],\"bs\":[{\"typeName\":\"SignalGen\",\"id\":1,\"typeId\":1,\"name\":\"S1\",\"collapse\":false,\"audioObj\":{\"context\":{},\"inputs\":[],\"outputs\":[],\"connPromise\":{},\"options\":{\"waveType\":\"Silence\",\"freq\":440,\"mod\":\"No Mod\",\"modParam\":1},\"gainNode\":{},\"mod\":{},\"inNode\":{},\"carr\":{\"context\":{},\"options\":{\"waveType\":\"Silence\",\"freq\":440,\"mod\":\"No Mod\",\"modParam\":1},\"bufferSources\":[\"Silence\",\"White Noise\",\"Pink Noise\"],\"oscSources\":[\"Sine Wave\",\"Triangle\",\"Sawtooth\",\"Square\"],\"outNode\":{},\"inNode\":{}},\"outNode\":{},\"modParamNode\":{}},\"inNode\":[],\"outNode\":[],\"color\":\"#59c7c6\",\"frequency\":440,\"waveform\":\"Silence\",\"modulation\":\"No Mod\",\"MI\":0,\"FD\":0,\"volume\":0.6,\"kinect\":false}],\"nextBlockId\":2,\"nextTypeId\":{\"Delay\":1,\"Transposer\":1,\"Pan\":1,\"Player\":1,\"SignalGen\":2,\"Speaker\":1,\"DirectInput\":1,\"Pitch\":1,\"VSTHost\":1,\"Routing\":1,\"Mixer\":1,\"Record\":1,\"Spectroscope\":1,\"Oscilloscope\":1,\"Envelope\":1,\"Filter\":1,\"Keyboard\":1,\"SamplePlayer\":1,\"Sequencer\":1}}'),(2,2,'Project2','2014-09-05T17:57:28.556094Z','',NULL),(3,1,'Project3','2015-02-13T17:57:28.556094Z','','{\"nextBlockId\":7,\"nextTypeId\":{\"Delay\":1,\"Transposer\":1,\"Pan\":2,\"Player\":2,\"SignalGen\":1,\"Speaker\":2,\"DirectInput\":1,\"Pitch\":1,\"VSTHost\":1,\"Routing\":1,\"Mixer\":1,\"Record\":3,\"Spectroscope\":1,\"Oscilloscope\":1,\"Envelope\":1,\"Filter\":1,\"Keyboard\":1,\"SamplePlayer\":1,\"Sequencer\":2},\"nowIn\":[],\"nowOut\":[],\"bs\":[{\"typeName\":\"Record\",\"id\":2,\"typeId\":1,\"name\":\"R1\",\"collapse\":true,\"inNode\":[],\"outNode\":[],\"color\":\"#9f7d77\",\"outDisabled\":true,\"module\":false,\"recording\":false,\"volume\":60,\"timer\":0},{\"typeName\":\"Sequencer\",\"id\":4,\"typeId\":1,\"name\":\"S1\",\"collapse\":false,\"inNode\":[],\"outNode\":[],\"color\":\"#caf0fd\",\"inDisabled\":true,\"outDisabled\":true,\"waveforms\":[\"Silence\",\"Silence\",\"Silence\",\"Silence\",\"Silence\",\"Silence\",\"Silence\",\"Silence\",\"Silence\"],\"modulations\":[\"No Mod\",\"No Mod\",\"No Mod\",\"No Mod\",\"No Mod\",\"No Mod\",\"No Mod\",\"No Mod\",\"No Mod\"],\"modulationValues\":[0,0,0,0,0,0,0,0],\"notes\":[0,4,8,10,14,18,22,0],\"durations\":[1000,1000,1000,1000,1000,1000,1000,1000,1000],\"selecteds\":[true,true,true,true,true,true,true,true],\"skippeds\":[false,false,false,false,false,false,false,false],\"looping\":false,\"playStyle\":\"None\"},{\"typeName\":\"Player\",\"id\":5,\"typeId\":1,\"name\":\"P1\",\"collapse\":false,\"audioObj\":{\"context\":{},\"inputs\":[],\"outputs\":[],\"connPromise\":{},\"options\":{\"path\":\"\",\"loop\":false,\"speed\":1,\"reverse\":false}},\"inNode\":[],\"outNode\":[],\"inDisabled\":true,\"color\":\"#e5777d\",\"playing\":false,\"reversed\":false,\"loop\":false,\"speed\":1,\"volume\":60,\"hour\":0,\"minute\":0,\"second\":0,\"kinect\":false},{\"typeName\":\"Pan\",\"id\":6,\"typeId\":1,\"name\":\"P1\",\"collapse\":true,\"audioObj\":{\"context\":{},\"inputs\":[],\"outputs\":[],\"connPromise\":{},\"options\":{\"panVal\":0},\"outNode\":{},\"inNode\":{},\"collapse\":true},\"inNode\":[],\"outNode\":[],\"color\":\"#88b35f\",\"panVal\":0,\"kinect\":false}]}'),(4,1,'Project4','2015-02-13T17:57:28.556094Z','',NULL);
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sounds`
--

DROP TABLE IF EXISTS `sounds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sounds` (
  `sound_id` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `date` varchar(50) DEFAULT NULL,
  `description` varchar(500) NOT NULL,
  PRIMARY KEY (`sound_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sounds`
--

LOCK TABLES `sounds` WRITE;
/*!40000 ALTER TABLE `sounds` DISABLE KEYS */;
INSERT INTO `sounds` VALUES (1,1,'Sound1','2012-10-16T17:57:28.556094Z','The roaring sound of a motorcycle revving on the other side of the cemetery intrudes like a profanity'),(2,1,'Sound2','2014-09-05T17:57:28.556094Z',''),(3,2,'Sound3','2015-02-13T17:57:28.556094Z',''),(4,1,'Sound4','2015-02-13T17:57:28.556094Z',''),(11,1,'hello','2019-07-23T01:18:05.625Z','hello'),(12,2,'pigsound','2019-07-23T01:18:17.403Z','this is a pigsound'),(13,1,'new sound','2019-07-23T13:58:32.311Z','this is new sound'),(14,1,'sound5','2019-07-23T14:34:54.031Z','this is new sound5');
/*!40000 ALTER TABLE `sounds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'user1','123456','user1@outlook.com'),(2,'user2','123456','user2@gmail.com'),(19,'happy2','123456','123@gmail.com'),(20,'andy','5671829','123444@gmail.com'),(21,'ggg','12345','hllo@ggg.com'),(22,'gggab','12345','heello@ggg.com'),(23,'user30','123456','user30@gmail.com'),(24,'user22','123456','user22@gmail.com'),(26,'user22','$2b$10$m4.O7JG/iIFSjMsHhpQ8LuNFFsr5r3Bel.dHMHWNfCOojmPeticfS','user22@gmail.com'),(27,'user14','$2b$10$UroX93Sj/lgkHRTFST/Uq.K7IX6tE/XGNCu9hkO8IVELy9R18uqcu','user14@gmail.com');
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

-- Dump completed on 2019-08-07 21:59:02
