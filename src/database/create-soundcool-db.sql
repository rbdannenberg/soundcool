-- MySQL dump 10.13  Distrib 8.0.18, for Linux (x86_64)
--
-- Host: localhost    Database: soundcool
-- ------------------------------------------------------
-- Server version	8.0.18

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
INSERT INTO `audioSharing` VALUES (100,0),(101,0);
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
INSERT INTO `projects` VALUES (117,100,'Project 1','2019-10-22 18:44:48','Delay and Transposer','{\"nextBlockId\":3,\"nextTypeId\":{\"Delay\":2,\"Transposer\":2,\"Pan\":1,\"Player\":1,\"SignalGen\":1,\"Speaker\":1,\"DirectInput\":1,\"Pitch\":1,\"VSTHost\":1,\"Routing\":1,\"Mixer\":1,\"Record\":1,\"Spectroscope\":1,\"Oscilloscope\":1,\"Envelope\":1,\"Filter\":1,\"Keyboard\":1,\"SamplePlayer\":1,\"Sequencer\":1},\"nowIn\":[],\"nowOut\":[],\"bs\":[{\"typeName\":\"Delay\",\"id\":1,\"typeId\":1,\"name\":\"D1\",\"collapse\":true,\"audioObj\":{\"context\":{},\"inputs\":[{}],\"outputs\":[{}],\"options\":{\"delayTime\":0.1,\"feedback\":0.3},\"inNode\":{},\"outNode\":{},\"delayNode\":{},\"delayGain\":{},\"collapse\":true},\"inNode\":[],\"outNode\":[],\"color\":\"#d2bd78\",\"delayTime\":76,\"delayFeedback\":0.119,\"kinect\":false},{\"typeName\":\"Transposer\",\"id\":2,\"typeId\":1,\"name\":\"T1\",\"collapse\":true,\"inNode\":[],\"outNode\":[],\"color\":\"#c185c8\",\"buttonCents\":0,\"sliderCents\":0}]}',NULL,0),(118,100,'Project 2','2019-10-22 18:45:44','Shared with user 2','{\"nextBlockId\":2,\"nextTypeId\":{\"Delay\":1,\"Transposer\":1,\"Pan\":1,\"Player\":2,\"SignalGen\":1,\"Speaker\":1,\"DirectInput\":1,\"Pitch\":1,\"VSTHost\":1,\"Routing\":1,\"Mixer\":1,\"Record\":1,\"Spectroscope\":1,\"Oscilloscope\":1,\"Envelope\":1,\"Filter\":1,\"Keyboard\":1,\"SamplePlayer\":1,\"Sequencer\":1},\"nowIn\":[],\"nowOut\":[],\"bs\":[{\"typeName\":\"Player\",\"id\":1,\"typeId\":1,\"name\":\"P1\",\"collapse\":true,\"audioObj\":{\"context\":{},\"inputs\":[],\"outputs\":[{}],\"offset\":0,\"options\":{\"path\":\"\",\"loop\":false,\"speed\":1,\"reverse\":false},\"startTime\":null,\"inNode\":{},\"outNode\":{},\"collapse\":true,\"file\":{\"sound_id\":118,\"user\":100,\"name\":\"sound.wav\"}},\"inNode\":[],\"outNode\":[],\"inDisabled\":true,\"color\":\"#e5777d\",\"playing\":false,\"reversed\":false,\"loop\":false,\"speed\":1,\"volume\":60,\"hour\":0,\"minute\":0,\"second\":0,\"kinect\":false,\"file\":{\"sound_id\":118,\"user\":100,\"name\":\"sound.wav\"}}]}','{\"users\":[{\"user_id\":101,\"name\":\"User 2\",\"email\":\"user2@welcome.com\"}]}',0),(119,101,'Project 1','2019-10-22 18:46:30','Delay and Pan','{\"nextBlockId\":3,\"nextTypeId\":{\"Delay\":2,\"Transposer\":1,\"Pan\":2,\"Player\":1,\"SignalGen\":1,\"Speaker\":1,\"DirectInput\":1,\"Pitch\":1,\"VSTHost\":1,\"Routing\":1,\"Mixer\":1,\"Record\":1,\"Spectroscope\":1,\"Oscilloscope\":1,\"Envelope\":1,\"Filter\":1,\"Keyboard\":1,\"SamplePlayer\":1,\"Sequencer\":1},\"nowIn\":[],\"nowOut\":[],\"bs\":[{\"typeName\":\"Delay\",\"id\":1,\"typeId\":1,\"name\":\"D1\",\"collapse\":true,\"audioObj\":{\"context\":{},\"inputs\":[{}],\"outputs\":[{}],\"options\":{\"delayTime\":0.1,\"feedback\":0.3},\"inNode\":{},\"outNode\":{},\"delayNode\":{},\"delayGain\":{},\"collapse\":true},\"inNode\":[],\"outNode\":[],\"color\":\"#d2bd78\",\"delayTime\":76,\"delayFeedback\":0.119,\"kinect\":false},{\"typeName\":\"Pan\",\"id\":2,\"typeId\":1,\"name\":\"P1\",\"collapse\":true,\"audioObj\":{\"context\":{},\"inputs\":[{}],\"outputs\":[{}],\"options\":{\"panVal\":0},\"outNode\":{},\"inNode\":{},\"collapse\":true},\"inNode\":[],\"outNode\":[],\"color\":\"#88b35f\",\"panVal\":0,\"kinect\":false}]}',NULL,0),(120,101,'Project 2','2019-10-22 18:46:45','Shared with User 1','{\"nextBlockId\":2,\"nextTypeId\":{\"Delay\":1,\"Transposer\":1,\"Pan\":1,\"Player\":2,\"SignalGen\":1,\"Speaker\":1,\"DirectInput\":1,\"Pitch\":1,\"VSTHost\":1,\"Routing\":1,\"Mixer\":1,\"Record\":1,\"Spectroscope\":1,\"Oscilloscope\":1,\"Envelope\":1,\"Filter\":1,\"Keyboard\":1,\"SamplePlayer\":1,\"Sequencer\":1},\"nowIn\":[],\"nowOut\":[],\"bs\":[{\"typeName\":\"Player\",\"id\":1,\"typeId\":1,\"name\":\"P1\",\"collapse\":true,\"audioObj\":{\"context\":{},\"inputs\":[],\"outputs\":[{}],\"offset\":0,\"options\":{\"path\":\"\",\"loop\":false,\"speed\":1,\"reverse\":false},\"startTime\":null,\"inNode\":{},\"outNode\":{},\"collapse\":true},\"inNode\":[],\"outNode\":[],\"inDisabled\":true,\"color\":\"#e5777d\",\"playing\":false,\"reversed\":false,\"loop\":false,\"speed\":1,\"volume\":60,\"hour\":0,\"minute\":0,\"second\":0,\"kinect\":false}]}','{\"users\":[{\"user_id\":100,\"name\":\"User 1\",\"email\":\"user1@welcome.com\"}]}',0),(121,101,'Project 3','2019-10-22 18:47:01','Shared with everyone','{\"nextBlockId\":2,\"nextTypeId\":{\"Delay\":1,\"Transposer\":1,\"Pan\":1,\"Player\":1,\"SignalGen\":2,\"Speaker\":1,\"DirectInput\":1,\"Pitch\":1,\"VSTHost\":1,\"Routing\":1,\"Mixer\":1,\"Record\":1,\"Spectroscope\":1,\"Oscilloscope\":1,\"Envelope\":1,\"Filter\":1,\"Keyboard\":1,\"SamplePlayer\":1,\"Sequencer\":1},\"nowIn\":[],\"nowOut\":[],\"bs\":[{\"typeName\":\"SignalGen\",\"id\":1,\"typeId\":1,\"name\":\"S1\",\"collapse\":true,\"audioObj\":{\"context\":{},\"inputs\":[{}],\"outputs\":[{}],\"options\":{\"waveType\":\"Silence\",\"freq\":440,\"mod\":\"No Mod\",\"modParam\":1},\"gainNode\":{},\"mod\":{},\"inNode\":{},\"carr\":{\"context\":{},\"options\":{\"waveType\":\"Silence\",\"freq\":440,\"mod\":\"No Mod\",\"modParam\":1},\"bufferSources\":[\"Silence\",\"White Noise\",\"Pink Noise\"],\"oscSources\":[\"Sine Wave\",\"Triangle\",\"Sawtooth\",\"Square\"],\"outNode\":{},\"inNode\":{}},\"outNode\":{},\"modParamNode\":{},\"collapse\":true},\"inNode\":[],\"outNode\":[],\"color\":\"#59c7c6\",\"frequency\":440,\"waveform\":\"Silence\",\"modulation\":\"No Mod\",\"MI\":0,\"FD\":0,\"volume\":0.6,\"kinect\":false}]}',NULL,1),(122,101,'Project 4','2019-10-22 18:47:51','Player with sound','{\"nextBlockId\":2,\"nextTypeId\":{\"Delay\":1,\"Transposer\":1,\"Pan\":1,\"Player\":2,\"SignalGen\":1,\"Speaker\":1,\"DirectInput\":1,\"Pitch\":1,\"VSTHost\":1,\"Routing\":1,\"Mixer\":1,\"Record\":1,\"Spectroscope\":1,\"Oscilloscope\":1,\"Envelope\":1,\"Filter\":1,\"Keyboard\":1,\"SamplePlayer\":1,\"Sequencer\":1},\"nowIn\":[],\"nowOut\":[],\"bs\":[{\"typeName\":\"Player\",\"id\":1,\"typeId\":1,\"name\":\"P1\",\"collapse\":true,\"audioObj\":{\"context\":{},\"inputs\":[],\"outputs\":[{}],\"offset\":0,\"options\":{\"path\":\"\",\"loop\":false,\"speed\":1,\"reverse\":false},\"startTime\":null,\"inNode\":{},\"outNode\":{},\"collapse\":true,\"file\":{\"sound_id\":117,\"user\":101,\"name\":\"sound.wav\"}},\"inNode\":[],\"outNode\":[],\"inDisabled\":true,\"color\":\"#e5777d\",\"playing\":false,\"reversed\":false,\"loop\":false,\"speed\":1,\"volume\":60,\"hour\":0,\"minute\":0,\"second\":0,\"kinect\":false,\"file\":{\"sound_id\":117,\"user\":101,\"name\":\"sound.wav\"}}]}',NULL,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sounds`
--

LOCK TABLES `sounds` WRITE;
/*!40000 ALTER TABLE `sounds` DISABLE KEYS */;
INSERT INTO `sounds` VALUES (117,101,'sound.wav','2019-10-22 18:47:57'),(118,100,'sound.wav','2019-10-22 18:48:56');
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
INSERT INTO `soundsLocation` VALUES (117,'/uploads/sounds/1571749887170::-::sound.wav'),(118,'/uploads/sounds/1571750277915::-::sound.wav');
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

-- Dump completed on 2019-10-22 18:50:35
