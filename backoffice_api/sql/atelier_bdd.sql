-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Hôte : db
-- Généré le : ven. 27 mars 2020 à 22:55
-- Version du serveur :  10.4.10-MariaDB-1:10.4.10+maria~bionic
-- Version de PHP : 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `atelier_bdd`
--

-- --------------------------------------------------------

--
-- Structure de la table `joueur`
--

CREATE TABLE `joueur` (
  `idjoueur` int(4) NOT NULL,
  `mail` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `pseudo` varchar(40) NOT NULL,
  `role` varchar(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `joueur`
--

INSERT INTO `joueur` (`idjoueur`, `mail`, `password`, `pseudo`, `role`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'admin@admin.com', 'sha1$33217def$1$ed5140cec07c18021aae61d3e6ca8f8552bd8a91', 'admin', 'a', '2020-03-27 17:41:13', '2020-03-27 17:41:13', NULL),
(2, 'user@user.com', 'sha1$ff90df21$1$6bf3b9946c8d163b94533ba774a692cd3deeecd1', 'User', 'u', '2020-03-27 18:29:25', '2020-03-27 18:29:25', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `partie`
--

CREATE TABLE `partie` (
  `idPartie` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `nb_photos` int(3) NOT NULL,
  `statut` varchar(20) NOT NULL,
  `score` int(3) NOT NULL DEFAULT 0,
  `temps` int(4) NOT NULL,
  `refJoueur` int(4) NOT NULL,
  `refSerie` int(4) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `partie`
--

INSERT INTO `partie` (`idPartie`, `token`, `nb_photos`, `statut`, `score`, `temps`, `refJoueur`, `refSerie`, `created_at`, `updated_at`, `deleted_at`) VALUES
('032b8f70-705c-11ea-bf83-6119755a76f1', 'sha1$419ae0ed$1$7b6ccf3154799a0010e010e80c89a4c62c9c8f72', 5, 'Terminée', 39, 44, 2, 1, '2020-03-27 18:51:48', '2020-03-27 18:52:36', NULL),
('47194f30-705a-11ea-997b-a1367d26846d', 'sha1$c86415f8$1$f536b07df60615e365128084d841529f07f3f3d5', 15, 'Terminée', 81, 156, 2, 1, '2020-03-27 18:39:23', '2020-03-27 18:42:06', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `photo`
--

CREATE TABLE `photo` (
  `idPhoto` int(4) NOT NULL,
  `descr` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `latitude` decimal(20,15) NOT NULL,
  `longitude` decimal(20,15) NOT NULL,
  `refSerie` int(4) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `photo`
--

INSERT INTO `photo` (`idPhoto`, `descr`, `url`, `latitude`, `longitude`, `refSerie`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Place Stanislas', 'https://www.petitfute.com/medias/professionnel/30049/premium/600_450/223989-nancy-place-stanislas.jpg', '48.693618400000000', '6.183241299999999', 1, '2020-03-27 17:43:27', '2020-03-27 17:43:27', NULL),
(2, 'Jardin d\'eau', 'https://tourisme-meurtheetmoselle.fr/timthumb/script.php?src=https://www.sitlor.fr/photos/737/737004215_6.jpg&w=750&h=450', '48.693265399999990', '6.194023500000001', 1, '2020-03-27 17:44:44', '2020-03-27 17:44:44', NULL),
(3, 'Place Thiers', 'https://www.amc-archi.com/mediatheque/4/7/0/000038074/serie-d-assises-bw-sebastien-wierinck-edition.jpg', '48.690022400000000', '6.175502300000000', 1, '2020-03-27 17:47:00', '2020-03-27 17:47:00', NULL),
(4, 'Arrangés du Bocal', 'https://www.bra-tendances-restauration.com/wp-content/uploads/sites/3/2019/01/397_Page_33_Image_0001.jpg', '48.691192600000000', '6.180432499999999', 1, '2020-03-27 17:47:29', '2020-03-27 17:47:29', NULL),
(5, 'IUT Nancy Charlemagne', 'https://france3-regions.francetvinfo.fr/grand-est/sites/regions_france3/files/styles/top_big/public/assets/images/2015/01/03/iut_charlemagne.jpg?itok=dz-YvtdV', '48.682836100000000', '6.161134000000001', 1, '2020-03-27 17:48:20', '2020-03-27 17:48:20', NULL),
(6, 'Place Carrière', 'https://i2.wp.com/mon-grand-est.fr/wp-content/uploads/2016/09/Nancy-Place-de-la-Carri%C3%A8re-from-Arc-de-Triomphe-%C2%A9-French-Moments-1.jpg?fit=1200%2C801&ssl=1', '48.695946799999990', '6.181963199999999', 1, '2020-03-27 17:56:01', '2020-03-27 17:56:01', NULL),
(7, 'Place Dombasle', 'https://e-monumen.net/wp-content/uploads/8914_image_21.jpg', '48.691592600000000', '6.178078499999999', 1, '2020-03-27 17:56:52', '2020-03-27 17:56:52', NULL),
(8, 'Pépinière', 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Parc_de_la_P%C3%A9pini%C3%A8re_-_kiosque_%28Nancy%29.jpg', '48.698056000000010', '6.185000000000000', 1, '2020-03-27 17:59:08', '2020-03-27 17:59:08', NULL),
(9, 'Taureau rouge', 'https://img.over-blog-kiwi.com/0/57/24/66/20180622/ob_0568b9_taureau-pellini1.jpg', '48.688314499999990', '6.177217499999999', 1, '2020-03-27 18:02:39', '2020-03-27 18:02:39', NULL),
(10, 'L\'autre Canal', 'https://files.structurae.net/files/photos/5256/2017-07-26/dsc02042.jpg', '48.694126999999990', '6.198295400000000', 1, '2020-03-27 18:04:18', '2020-03-27 18:04:18', NULL),
(11, 'La quincaillerie', 'https://www.pagesjaunes.fr/media/resto/la_quincaillerie_OSD50037057-78618.jpeg', '48.690003100000000', '6.184415600000000', 1, '2020-03-27 18:06:04', '2020-03-27 18:06:04', NULL),
(12, 'Obélisque Carnot', 'https://cdn-s-www.estrepublicain.fr/images/F4B88CBC-7B2E-4F0E-8AFE-29776B675AC4/NW_raw/place-carnot-cours-leopold-nancy-photo-er-1582898373.jpg', '48.694047000000000', '6.176914000000001', 1, '2020-03-27 18:10:20', '2020-03-27 18:10:20', NULL),
(13, 'Basilique St Epvre', 'https://www.tourisme-lorraine.fr/sitlorimg/1920/0/aHR0cHM6Ly93d3cuc2l0bG9yLmZyL3Bob3Rvcy83MzcvYmFzaWxpcXVlX3NhaW50X2VwdnJlLmpwZw==.jpg', '48.696001100000000', '6.179925400000001', 1, '2020-03-27 18:11:32', '2020-03-27 18:11:32', NULL),
(14, 'Kinépolis', 'https://www.boydens.be/echo_files/tmb2_319-xx-imgPicture.png', '48.691721900000000', '6.196312799999999', 1, '2020-03-27 18:24:24', '2020-03-27 18:24:24', NULL),
(15, 'Cathédrale de Nancy', 'https://lh3.googleusercontent.com/proxy/7B0lhLl782x3vURDtEzerGtxuh8QIXXk6EdldKpk1aYm5k1sGpmbK232ERfaHuV7UT9M09Juv6ri5lvZSR1FlAz0sgW9hISTpFMBBBiLQ74-PEYfwVAR6wS4cuILAg', '48.691850000000000', '6.185728000000000', 1, '2020-03-27 18:25:21', '2020-03-27 18:25:21', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `serie`
--

CREATE TABLE `serie` (
  `idSerie` int(4) NOT NULL,
  `ville` varchar(40) NOT NULL,
  `latitude` decimal(15,9) NOT NULL,
  `longitude` decimal(15,9) NOT NULL,
  `zoom` int(2) NOT NULL,
  `dist` int(4) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `serie`
--

INSERT INTO `serie` (`idSerie`, `ville`, `latitude`, `longitude`, `zoom`, `dist`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Nancy', '48.692054000', '6.184417000', 15, 50, '2020-03-27 17:42:32', '2020-03-27 17:42:32', NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `joueur`
--
ALTER TABLE `joueur`
  ADD PRIMARY KEY (`idjoueur`);

--
-- Index pour la table `partie`
--
ALTER TABLE `partie`
  ADD PRIMARY KEY (`idPartie`),
  ADD KEY `FOREIGN_Joueur` (`refJoueur`),
  ADD KEY `FOREIGN_Serie` (`refSerie`);

--
-- Index pour la table `photo`
--
ALTER TABLE `photo`
  ADD PRIMARY KEY (`idPhoto`),
  ADD KEY `FOREIGN_PHOTO` (`refSerie`);

--
-- Index pour la table `serie`
--
ALTER TABLE `serie`
  ADD PRIMARY KEY (`idSerie`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `joueur`
--
ALTER TABLE `joueur`
  MODIFY `idjoueur` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `photo`
--
ALTER TABLE `photo`
  MODIFY `idPhoto` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pour la table `serie`
--
ALTER TABLE `serie`
  MODIFY `idSerie` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `partie`
--
ALTER TABLE `partie`
  ADD CONSTRAINT `FOREIGN_Joueur` FOREIGN KEY (`refJoueur`) REFERENCES `joueur` (`idjoueur`),
  ADD CONSTRAINT `FOREIGN_Serie` FOREIGN KEY (`refSerie`) REFERENCES `serie` (`idSerie`);

--
-- Contraintes pour la table `photo`
--
ALTER TABLE `photo`
  ADD CONSTRAINT `FOREIGN_PHOTO` FOREIGN KEY (`refSerie`) REFERENCES `serie` (`idSerie`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
