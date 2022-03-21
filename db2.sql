-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : jeu. 19 août 2021 à 09:18
-- Version du serveur :  5.7.32
-- Version de PHP : 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données : `miss_coquette`
--

-- --------------------------------------------------------

--
-- Structure de la table `brands`
--

CREATE TABLE `brands` (
  `id_brand` int(11) NOT NULL,
  `brand` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `brands`
--

INSERT INTO `brands` (`id_brand`, `brand`) VALUES
(1, 'levis'),
(2, 'IKKS'),
(3, 'nike'),
(4, 'temps des cerises'),
(5, 'desigual');

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `id_category` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id_category`, `name`) VALUES
(1, 'pull de noel'),
(2, 'cagoule d\'aout'),
(3, 'jeans'),
(4, 'jupe'),
(5, 'chemise'),
(6, 'chemise'),
(7, 'pantalons');

-- --------------------------------------------------------

--
-- Structure de la table `colors`
--

CREATE TABLE `colors` (
  `id_color` int(11) NOT NULL,
  `color` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `colors`
--

INSERT INTO `colors` (`id_color`, `color`) VALUES
(1, 'bleu'),
(2, 'rouge'),
(3, 'noir'),
(4, 'gris');

-- --------------------------------------------------------

--
-- Structure de la table `link_sizes_colors_products`
--

CREATE TABLE `link_sizes_colors_products` (
  `id_sizes` int(11) NOT NULL,
  `id_colors` int(11) NOT NULL,
  `id_products` int(11) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `link_sizes_colors_products`
--

INSERT INTO `link_sizes_colors_products` (`id_sizes`, `id_colors`, `id_products`, `stock`) VALUES
(1, 1, 4, 0),
(2, 1, 4, 10),
(3, 2, 4, 8);

-- --------------------------------------------------------

--
-- Structure de la table `orderdetails`
--

CREATE TABLE `orderdetails` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `id_sizes` int(11) NOT NULL,
  `id_colors` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `totalAmount` double NOT NULL,
  `creationTimestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `totalAmount`, `creationTimestamp`, `status`) VALUES
(1, 3, 0, '2021-08-18 09:41:40', 'not payed'),
(2, 3, 0, '2021-08-18 09:56:06', 'not payed'),
(3, 3, 0, '2021-08-18 09:56:55', 'not payed'),
(4, 3, 0, '2021-08-18 09:59:05', 'not payed'),
(5, 3, 0, '2021-08-18 16:41:08', 'not payed'),
(6, 4, 0, '2021-08-18 16:41:27', 'not payed'),
(7, 3, 0, '2021-08-18 16:41:41', 'not payed'),
(8, 3, 0, '2021-08-18 16:53:40', 'not payed'),
(9, 3, 0, '2021-08-18 16:53:53', 'not payed'),
(10, 3, 0, '2021-08-19 10:42:25', 'not payed'),
(11, 3, 0, '2021-08-19 10:56:02', 'not payed');

-- --------------------------------------------------------

--
-- Structure de la table `products`
--

CREATE TABLE `products` (
  `id_product` int(11) NOT NULL,
  `name` varchar(60) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `description` text CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `brand_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `price` double NOT NULL,
  `picture` varchar(255) NOT NULL,
  `creationTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `products`
--

INSERT INTO `products` (`id_product`, `name`, `description`, `brand_id`, `category_id`, `price`, `picture`, `creationTimestamp`) VALUES
(4, 't shirt', 'quand il fait chaud mais pas aujourd hui', 4, 1, 10, 'test.jpg', '2021-08-10 14:34:42'),
(9, 'jupe', 'petite jupe de saison', 2, 4, 150, 'no-pic.jpg', '2021-08-13 12:15:52');

-- --------------------------------------------------------

--
-- Structure de la table `sizes`
--

CREATE TABLE `sizes` (
  `id_size` int(11) NOT NULL,
  `size` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `sizes`
--

INSERT INTO `sizes` (`id_size`, `size`) VALUES
(1, 'XS'),
(2, 'M'),
(3, 'L'),
(4, 'XL');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(60) CHARACTER SET latin1 COLLATE latin1_general_cs NOT NULL,
  `lastName` varchar(60) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `email` varchar(90) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `password` varchar(120) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `role` varchar(15) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `address` varchar(60) DEFAULT NULL,
  `zip` varchar(20) DEFAULT NULL,
  `city` varchar(40) CHARACTER SET latin1 COLLATE latin1_general_ci DEFAULT NULL,
  `country` varchar(255) NOT NULL,
  `phone` varchar(16) CHARACTER SET latin1 COLLATE latin1_general_ci DEFAULT NULL,
  `creationTimestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_connexionTimestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `role`, `address`, `zip`, `city`, `country`, `phone`, `creationTimestamp`, `id_connexionTimestamp`) VALUES
(3, 'samiii', 'brahim', 'sami.brahim@3wa.io', '$2b$10$z7hoITPm8gTap3qm/g3xwOp5KoaQ2MgVEqfzJybdT3Aknmgjv4aSm', 'user', 'chez moi', '59400', 'CAMBRAI', 'FRANCE', '0102030405', '2021-08-18 09:27:48', '2021-08-18 09:27:48');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id_brand`);

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id_category`);

--
-- Index pour la table `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`id_color`);

--
-- Index pour la table `link_sizes_colors_products`
--
ALTER TABLE `link_sizes_colors_products`
  ADD PRIMARY KEY (`id_sizes`,`id_colors`,`id_products`),
  ADD KEY `id_color` (`id_colors`),
  ADD KEY `id_product` (`id_products`);

--
-- Index pour la table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Index pour la table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id_product`),
  ADD KEY `brand_id` (`brand_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Index pour la table `sizes`
--
ALTER TABLE `sizes`
  ADD PRIMARY KEY (`id_size`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_connexionTimestamp` (`id_connexionTimestamp`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `brands`
--
ALTER TABLE `brands`
  MODIFY `id_brand` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `id_category` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `colors`
--
ALTER TABLE `colors`
  MODIFY `id_color` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `orderdetails`
--
ALTER TABLE `orderdetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `products`
--
ALTER TABLE `products`
  MODIFY `id_product` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `sizes`
--
ALTER TABLE `sizes`
  MODIFY `id_size` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `link_sizes_colors_products`
--
ALTER TABLE `link_sizes_colors_products`
  ADD CONSTRAINT `id_color` FOREIGN KEY (`id_colors`) REFERENCES `colors` (`id_color`),
  ADD CONSTRAINT `id_product` FOREIGN KEY (`id_products`) REFERENCES `products` (`id_product`) ON DELETE NO ACTION,
  ADD CONSTRAINT `id_size` FOREIGN KEY (`id_sizes`) REFERENCES `sizes` (`id_size`);

--
-- Contraintes pour la table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE NO ACTION,
  ADD CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id_product`) ON DELETE NO ACTION;

--
-- Contraintes pour la table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id_brand`) ON DELETE NO ACTION,
  ADD CONSTRAINT `products_ibfk_4` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id_category`) ON DELETE NO ACTION;

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`id`) REFERENCES `orders` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
