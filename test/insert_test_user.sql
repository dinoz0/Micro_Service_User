LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1, 'nom-admin', 'prenom-admin', 'pseudo-admin', 'admin@admin.admin','$2b$10$otzdb43cjJgH/3giSOAxO.5ZSidotttRWDVHum1he.O/gts2X4kwW','2023-11-14 14:19:01','2023-11-17 15:30:10', null);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;