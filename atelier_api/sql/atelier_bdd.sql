-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Hôte : db
-- Généré le : jeu. 19 mars 2020 à 16:17
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
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `joueur`
--

INSERT INTO `joueur` (`idjoueur`, `mail`, `password`, `pseudo`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'antoinegach@gmail.com', 'test', 'Giful54', '2020-03-19 16:11:44', '2020-03-19 16:11:44', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `partie`
--

CREATE TABLE `partie` (
  `idPartie` int(4) NOT NULL,
  `token` varchar(255) NOT NULL,
  `nb_photos` int(3) NOT NULL,
  `statut` varchar(20) NOT NULL,
  `score` int(3) NOT NULL,
  `refJoueur` int(4) NOT NULL,
  `refSerie` int(4) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `partie`
--

INSERT INTO `partie` (`idPartie`, `token`, `nb_photos`, `statut`, `score`, `refJoueur`, `refSerie`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'test', 10, 'Créée', 35, 1, 1, '2020-03-19 16:16:49', '2020-03-19 16:16:49', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `photo`
--

CREATE TABLE `photo` (
  `idPhoto` int(4) NOT NULL,
  `descr` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `longitude` int(15) NOT NULL,
  `latitude` int(15) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `photo`
--

INSERT INTO `photo` (`idPhoto`, `descr`, `url`, `longitude`, `latitude`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Superbe belle photo ', 'urlversmaphoto', 0, 0, '2020-03-19 16:14:44', '2020-03-19 16:14:44', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `serie`
--

CREATE TABLE `serie` (
  `idSerie` int(4) NOT NULL,
  `ville` varchar(40) NOT NULL,
  `mapRef` varchar(100) NOT NULL,
  `dist` int(4) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `serie`
--

INSERT INTO `serie` (`idSerie`, `ville`, `mapRef`, `dist`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Nancy', 'test', 55, '2020-03-19 16:12:52', '2020-03-19 16:12:52', NULL);

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
  ADD PRIMARY KEY (`idPhoto`);

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
  MODIFY `idjoueur` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `partie`
--
ALTER TABLE `partie`
  MODIFY `idPartie` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `photo`
--
ALTER TABLE `photo`
  MODIFY `idPhoto` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
