-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 21, 2020 at 07:40 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gardeshgari_db`
--

DELIMITER $$
--
-- Functions
--
CREATE DEFINER=`root`@`localhost` FUNCTION `BIN_TO_UUID` (`bin` BINARY(16)) RETURNS VARCHAR(36) CHARSET utf8mb4 BEGIN
  DECLARE hex varchar(32);
  SET hex = HEX(bin);
  RETURN LOWER(CONCAT(LEFT(hex, 8), '-', MID(hex, 9, 4), '-', MID(hex, 13, 4), '-', MID(hex, 17, 4), '-', RIGHT(hex, 12)));
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `UUID_TO_BIN` (`uuid` VARCHAR(36)) RETURNS BINARY(16) BEGIN
  return UNHEX(CONCAT(REPLACE(uuid, '-', '')));
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `likes_tbl`
--

CREATE TABLE `likes_tbl` (
  `user_id` binary(16) NOT NULL,
  `twitt_id` binary(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Stand-in structure for view `likes_tbl_view`
-- (See below for the actual view)
--
CREATE TABLE `likes_tbl_view` (
`twitt_id` varchar(36)
,`user_id` varchar(36)
);

-- --------------------------------------------------------

--
-- Table structure for table `retwitters_tbl`
--

CREATE TABLE `retwitters_tbl` (
  `user_id` binary(16) NOT NULL,
  `twitt_id` binary(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Stand-in structure for view `retwitters_tbl_view`
-- (See below for the actual view)
--
CREATE TABLE `retwitters_tbl_view` (
`twitt_id` varchar(36)
,`user_id` varchar(36)
);

-- --------------------------------------------------------

--
-- Table structure for table `twitts_tbl`
--

CREATE TABLE `twitts_tbl` (
  `twitt_id` binary(16) NOT NULL,
  `text` text NOT NULL,
  `img_link` char(100) DEFAULT NULL,
  `user_id` binary(16) NOT NULL,
  `date` char(24) NOT NULL,
  `replay_to_id` binary(16) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `twitts_tbl`
--

INSERT INTO `twitts_tbl` (`twitt_id`, `text`, `img_link`, `user_id`, `date`, `replay_to_id`, `deleted`) VALUES
(0x025e7819f8ad11eab465dc4a3e8751b4, 'twitt text1', 'null', 0x5e3753aef8ab11eab465dc4a3e8751b4, '1600323254096', 0xcb07f97bf8ac11eab465dc4a3e8751b4, 0),
(0x392808e1f8bc11eab465dc4a3e8751b4, 'twitt text2 user2', 'null', 0x0850fd5bf8bc11eab465dc4a3e8751b4, '1600329788465', 0xcb07f97bf8ac11eab465dc4a3e8751b4, 0),
(0xc53cf7e1fa5311ea8dc0dc4a3e8751b4, 'twitt text2 user2', 'null', 0x0850fd5bf8bc11eab465dc4a3e8751b4, '1600504828652', 0xcb07f97bf8ac11eab465dc4a3e8751b4, 0),
(0xcb07f97bf8ac11eab465dc4a3e8751b4, 'twitt text1', 'null', 0x5e3753aef8ab11eab465dc4a3e8751b4, '1600323161252', NULL, 0);

--
-- Triggers `twitts_tbl`
--
DELIMITER $$
CREATE TRIGGER `twitts_tbl_set_id_insert_trigger` BEFORE INSERT ON `twitts_tbl` FOR EACH ROW BEGIN
set NEW.twitt_id = UUID_TO_BIN(UUID());
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Stand-in structure for view `twitts_tbl_view`
-- (See below for the actual view)
--
CREATE TABLE `twitts_tbl_view` (
`twitt_id` varchar(36)
,`text` text
,`img_link` char(100)
,`user_id` varchar(36)
,`date` char(24)
,`replay_to_id` varchar(36)
,`deleted` tinyint(1)
);

-- --------------------------------------------------------

--
-- Table structure for table `users_tbl`
--

CREATE TABLE `users_tbl` (
  `user_id` binary(16) NOT NULL,
  `username` varchar(50) DEFAULT 'user',
  `userfamily` varchar(50) DEFAULT NULL,
  `phonenumber` varchar(11) NOT NULL,
  `national_id_number` varchar(10) NOT NULL,
  `verified` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users_tbl`
--

INSERT INTO `users_tbl` (`user_id`, `username`, `userfamily`, `phonenumber`, `national_id_number`, `verified`) VALUES
(0x0850fd5bf8bc11eab465dc4a3e8751b4, 'farid', 'test', '09140466902', '0418319057', 0),
(0x5e3753aef8ab11eab465dc4a3e8751b4, 'farid', 'test', '09140466901', '0047422270', 0);

--
-- Triggers `users_tbl`
--
DELIMITER $$
CREATE TRIGGER `users_tbl_set_id_insert_trigger` BEFORE INSERT ON `users_tbl` FOR EACH ROW BEGIN
set NEW.user_id = UUID_TO_BIN(UUID());
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Stand-in structure for view `users_tbl_view`
-- (See below for the actual view)
--
CREATE TABLE `users_tbl_view` (
`user_id` varchar(36)
,`username` varchar(50)
,`userfamily` varchar(50)
,`phonenumber` varchar(11)
,`national_id_number` varchar(10)
,`verified` tinyint(1)
);

-- --------------------------------------------------------

--
-- Table structure for table `verification_log_tbl`
--

CREATE TABLE `verification_log_tbl` (
  `log_id` binary(16) NOT NULL,
  `phonenumber` char(11) DEFAULT NULL,
  `code` varchar(5) DEFAULT NULL,
  `ip` char(20) DEFAULT NULL,
  `device_type` char(15) DEFAULT NULL,
  `verified` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `verification_log_tbl`
--

INSERT INTO `verification_log_tbl` (`log_id`, `phonenumber`, `code`, `ip`, `device_type`, `verified`) VALUES
(0xc8a1060df8bb11eab465dc4a3e8751b4, '09140466902', '74743', NULL, NULL, 1),
(0xe5fe7ffff8aa11eab465dc4a3e8751b4, '09140466901', '96311', NULL, NULL, 1);

--
-- Triggers `verification_log_tbl`
--
DELIMITER $$
CREATE TRIGGER `verification_log_tbl_set_id_insert_trigger` BEFORE INSERT ON `verification_log_tbl` FOR EACH ROW BEGIN
set NEW.log_id = UUID_TO_BIN(UUID());
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Stand-in structure for view `verification_log_tbl_view`
-- (See below for the actual view)
--
CREATE TABLE `verification_log_tbl_view` (
`log_id` varchar(36)
,`phonenumber` char(11)
,`code` varchar(5)
,`ip` char(20)
,`device_type` char(15)
,`verified` tinyint(1)
);

-- --------------------------------------------------------

--
-- Table structure for table `wait_for_register_tbl`
--

CREATE TABLE `wait_for_register_tbl` (
  `phonenumber` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure for view `likes_tbl_view`
--
DROP TABLE IF EXISTS `likes_tbl_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `likes_tbl_view`  AS  select `BIN_TO_UUID`(`likes_tbl`.`twitt_id`) collate utf8mb4_unicode_ci AS `twitt_id`,`BIN_TO_UUID`(`likes_tbl`.`user_id`) collate utf8mb4_unicode_ci AS `user_id` from `likes_tbl` ;

-- --------------------------------------------------------

--
-- Structure for view `retwitters_tbl_view`
--
DROP TABLE IF EXISTS `retwitters_tbl_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `retwitters_tbl_view`  AS  select `BIN_TO_UUID`(`retwitters_tbl`.`twitt_id`) collate utf8mb4_unicode_ci AS `twitt_id`,`BIN_TO_UUID`(`retwitters_tbl`.`user_id`) collate utf8mb4_unicode_ci AS `user_id` from `retwitters_tbl` ;

-- --------------------------------------------------------

--
-- Structure for view `twitts_tbl_view`
--
DROP TABLE IF EXISTS `twitts_tbl_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `twitts_tbl_view`  AS  select `BIN_TO_UUID`(`twitts_tbl`.`twitt_id`) collate utf8mb4_unicode_ci AS `twitt_id`,`twitts_tbl`.`text` AS `text`,`twitts_tbl`.`img_link` AS `img_link`,`BIN_TO_UUID`(`twitts_tbl`.`user_id`) AS `user_id`,`twitts_tbl`.`date` AS `date`,`BIN_TO_UUID`(`twitts_tbl`.`replay_to_id`) AS `replay_to_id`,`twitts_tbl`.`deleted` AS `deleted` from `twitts_tbl` ;

-- --------------------------------------------------------

--
-- Structure for view `users_tbl_view`
--
DROP TABLE IF EXISTS `users_tbl_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `users_tbl_view`  AS  select `BIN_TO_UUID`(`users_tbl`.`user_id`) collate utf8mb4_unicode_ci AS `user_id`,`users_tbl`.`username` AS `username`,`users_tbl`.`userfamily` AS `userfamily`,`users_tbl`.`phonenumber` AS `phonenumber`,`users_tbl`.`national_id_number` AS `national_id_number`,`users_tbl`.`verified` AS `verified` from `users_tbl` ;

-- --------------------------------------------------------

--
-- Structure for view `verification_log_tbl_view`
--
DROP TABLE IF EXISTS `verification_log_tbl_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `verification_log_tbl_view`  AS  select `BIN_TO_UUID`(`verification_log_tbl`.`log_id`) collate utf8mb4_unicode_ci AS `log_id`,`verification_log_tbl`.`phonenumber` AS `phonenumber`,`verification_log_tbl`.`code` AS `code`,`verification_log_tbl`.`ip` AS `ip`,`verification_log_tbl`.`device_type` AS `device_type`,`verification_log_tbl`.`verified` AS `verified` from `verification_log_tbl` ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `likes_tbl`
--
ALTER TABLE `likes_tbl`
  ADD KEY `user_id` (`user_id`),
  ADD KEY `twitt_id` (`twitt_id`);

--
-- Indexes for table `retwitters_tbl`
--
ALTER TABLE `retwitters_tbl`
  ADD KEY `user_id` (`user_id`),
  ADD KEY `twitt_id` (`twitt_id`);

--
-- Indexes for table `twitts_tbl`
--
ALTER TABLE `twitts_tbl`
  ADD PRIMARY KEY (`twitt_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `replay_to_id` (`replay_to_id`);

--
-- Indexes for table `users_tbl`
--
ALTER TABLE `users_tbl`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `phonenumber` (`phonenumber`),
  ADD UNIQUE KEY `national_id_number` (`national_id_number`);

--
-- Indexes for table `verification_log_tbl`
--
ALTER TABLE `verification_log_tbl`
  ADD PRIMARY KEY (`log_id`),
  ADD UNIQUE KEY `phonenumber` (`phonenumber`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `likes_tbl`
--
ALTER TABLE `likes_tbl`
  ADD CONSTRAINT `likes_tbl_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users_tbl` (`user_id`),
  ADD CONSTRAINT `likes_tbl_ibfk_2` FOREIGN KEY (`twitt_id`) REFERENCES `twitts_tbl` (`twitt_id`);

--
-- Constraints for table `retwitters_tbl`
--
ALTER TABLE `retwitters_tbl`
  ADD CONSTRAINT `retwitters_tbl_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users_tbl` (`user_id`),
  ADD CONSTRAINT `retwitters_tbl_ibfk_2` FOREIGN KEY (`twitt_id`) REFERENCES `twitts_tbl` (`twitt_id`);

--
-- Constraints for table `twitts_tbl`
--
ALTER TABLE `twitts_tbl`
  ADD CONSTRAINT `twitts_tbl_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users_tbl` (`user_id`),
  ADD CONSTRAINT `twitts_tbl_ibfk_2` FOREIGN KEY (`replay_to_id`) REFERENCES `twitts_tbl` (`twitt_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
