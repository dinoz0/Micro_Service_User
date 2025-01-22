LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1, 'nom-admin', 'prenom-admin', 'pseudo-admin', 'admin@admin.admin','$2b$10$otzdb43cjJgH/3giSOAxO.5ZSidotttRWDVHum1he.O/gts2X4kwW');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;