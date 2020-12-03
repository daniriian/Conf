-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 03, 2020 at 08:39 AM
-- Server version: 10.4.16-MariaDB
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `videoconferinte`
--

-- --------------------------------------------------------

--
-- Table structure for table `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add content type', 4, 'add_contenttype'),
(14, 'Can change content type', 4, 'change_contenttype'),
(15, 'Can delete content type', 4, 'delete_contenttype'),
(16, 'Can view content type', 4, 'view_contenttype'),
(17, 'Can add session', 5, 'add_session'),
(18, 'Can change session', 5, 'change_session'),
(19, 'Can delete session', 5, 'delete_session'),
(20, 'Can view session', 5, 'view_session'),
(21, 'Can add instanta', 6, 'add_instanta'),
(22, 'Can change instanta', 6, 'change_instanta'),
(23, 'Can delete instanta', 6, 'delete_instanta'),
(24, 'Can view instanta', 6, 'view_instanta'),
(25, 'Can add sala judecata', 7, 'add_salajudecata'),
(26, 'Can change sala judecata', 7, 'change_salajudecata'),
(27, 'Can delete sala judecata', 7, 'delete_salajudecata'),
(28, 'Can view sala judecata', 7, 'view_salajudecata'),
(29, 'Can add terminal', 8, 'add_terminal'),
(30, 'Can change terminal', 8, 'change_terminal'),
(31, 'Can delete terminal', 8, 'delete_terminal'),
(32, 'Can view terminal', 8, 'view_terminal'),
(33, 'Can add todo', 9, 'add_todo'),
(34, 'Can change todo', 9, 'change_todo'),
(35, 'Can delete todo', 9, 'delete_todo'),
(36, 'Can view todo', 9, 'view_todo'),
(37, 'Can add terminale vc', 10, 'add_terminalevc'),
(38, 'Can change terminale vc', 10, 'change_terminalevc'),
(39, 'Can delete terminale vc', 10, 'delete_terminalevc'),
(40, 'Can view terminale vc', 10, 'view_terminalevc'),
(41, 'Can add my user', 11, 'add_myuser'),
(42, 'Can change my user', 11, 'change_myuser'),
(43, 'Can delete my user', 11, 'delete_myuser'),
(44, 'Can view my user', 11, 'view_myuser');

-- --------------------------------------------------------

--
-- Table structure for table `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) UNSIGNED NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `django_admin_log`
--

INSERT INTO `django_admin_log` (`id`, `action_time`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`) VALUES
(1, '2020-11-17 06:19:15.597174', '1', 'Tribunalul Cluj', 1, '[{\"added\": {}}]', 6, 2),
(2, '2020-11-17 06:20:43.112617', '55', 'ANP-Bucuresti', 1, 'new through import_export', 8, 2),
(3, '2020-11-17 06:20:43.123840', '56', 'Penitenciarul Aiud', 1, 'new through import_export', 8, 2),
(4, '2020-11-17 06:20:43.135161', '57', 'Penitenciarul Arad', 1, 'new through import_export', 8, 2),
(5, '2020-11-17 06:20:43.147722', '58', 'Penitenciarul Arad - sectia exterioara  ', 1, 'new through import_export', 8, 2),
(6, '2020-11-17 06:20:43.150890', '59', 'Penitenciarul Bacau', 1, 'new through import_export', 8, 2),
(7, '2020-11-17 06:20:43.160147', '60', 'Penitenciarul Baia Mare', 1, 'new through import_export', 8, 2),
(8, '2020-11-17 06:20:43.167334', '61', 'Penitenciar Bistrita', 1, 'new through import_export', 8, 2),
(9, '2020-11-17 06:20:43.178397', '62', 'Penitenciarul Botosani', 1, 'new through import_export', 8, 2),
(10, '2020-11-17 06:20:43.189531', '63', 'Penitenciarul Braila', 1, 'new through import_export', 8, 2),
(11, '2020-11-17 06:20:43.200832', '64', 'Centrul Educativ Buziaş', 1, 'new through import_export', 8, 2),
(12, '2020-11-17 06:20:43.212198', '65', 'Penitenciarul Codlea', 1, 'new through import_export', 8, 2),
(13, '2020-11-17 06:20:43.222427', '66', 'Penitenciarul Colibasi (Mioveni)', 1, 'new through import_export', 8, 2),
(14, '2020-11-17 06:20:43.225440', '67', 'Centrul Educativ Tg.Ocna', 1, 'new through import_export', 8, 2),
(15, '2020-11-17 06:20:43.234923', '68', 'Penitenciarul Craiova', 1, 'new through import_export', 8, 2),
(16, '2020-11-17 06:20:43.245921', '69', 'Penitenciarul Deva', 1, 'new through import_export', 8, 2),
(17, '2020-11-17 06:20:43.249367', '70', 'Penitenciarul Focsani', 1, 'new through import_export', 8, 2),
(18, '2020-11-17 06:20:43.261372', '71', 'Penitenciarul Gaesti', 1, 'new through import_export', 8, 2),
(19, '2020-11-17 06:20:43.272304', '72', 'Penitenciarul Galati', 1, 'new through import_export', 8, 2),
(20, '2020-11-17 06:20:43.276529', '73', 'Penitenciarul Gherla', 1, 'new through import_export', 8, 2),
(21, '2020-11-17 06:20:43.286554', '74', 'Penitenciarul Gherla \nsectia exterioara Cluj ', 1, 'new through import_export', 8, 2),
(22, '2020-11-17 06:20:43.297908', '75', 'Penitenciarul Giurgiu', 1, 'new through import_export', 8, 2),
(23, '2020-11-17 06:20:43.309267', '76', 'Penitenciarul Iasi', 1, 'new through import_export', 8, 2),
(24, '2020-11-17 06:20:43.312258', '77', 'Penitenciarul Bucuresti-Jilava', 1, 'new through import_export', 8, 2),
(25, '2020-11-17 06:20:43.323582', '78', 'Penitenciarul Margineni', 1, 'new through import_export', 8, 2),
(26, '2020-11-17 06:20:43.327466', '79', 'Penitenciarul Miercurea Ciuc', 1, 'new through import_export', 8, 2),
(27, '2020-11-17 06:20:43.338432', '80', 'Penitenciarul Oradea', 1, 'new through import_export', 8, 2),
(28, '2020-11-17 06:20:43.349389', '81', 'Penitenciarul Craiova - Pelendava', 1, 'new through import_export', 8, 2),
(29, '2020-11-17 06:20:43.361331', '82', 'Penitenciarul Craiova - Pelendava\nsectia exterioara Facai ', 1, 'new through import_export', 8, 2),
(30, '2020-11-17 06:20:43.364323', '83', 'Penitenciarul Ploiesti', 1, 'new through import_export', 8, 2),
(31, '2020-11-17 06:20:43.375500', '84', 'Centrul de Detenţie Craiova', 1, 'new through import_export', 8, 2),
(32, '2020-11-17 06:20:43.386714', '85', 'Centrul de Detenţie Brăila - Tichilesti', 1, 'new through import_export', 8, 2),
(33, '2020-11-17 06:20:43.398639', '86', 'Penitenciarul Constanta – Poarta Alba', 1, 'new through import_export', 8, 2),
(34, '2020-11-17 06:20:43.401631', '87', 'Penitenciarul Bucuresti - Rahova', 1, 'new through import_export', 8, 2),
(35, '2020-11-17 06:20:43.414598', '88', 'Penitenciarul Satu Mare', 1, 'new through import_export', 8, 2),
(36, '2020-11-17 06:20:43.423570', '89', 'Penitenciarul Slobozia', 1, 'new through import_export', 8, 2),
(37, '2020-11-17 06:20:43.434541', '90', 'Penitenciarul Spital Dej', 1, 'new through import_export', 8, 2),
(38, '2020-11-17 06:20:43.437531', '91', 'Penitenciarul Spital Constanta – Poarta Alba', 1, 'new through import_export', 8, 2),
(39, '2020-11-17 06:20:43.446508', '92', 'Penitenciarul Spital Tg.Ocna', 1, 'new through import_export', 8, 2),
(40, '2020-11-17 06:20:43.456509', '93', 'Penitenciarul de Femei Ploieşti – Targsorul Nou', 1, 'new through import_export', 8, 2),
(41, '2020-11-17 06:20:43.459472', '94', 'Penitenciarul Targu-Jiu', 1, 'new through import_export', 8, 2),
(42, '2020-11-17 06:20:43.469447', '95', 'Penitenciarul Targu-Mures', 1, 'new through import_export', 8, 2),
(43, '2020-11-17 06:20:43.480493', '96', 'Penitenciarul Timisoara', 1, 'new through import_export', 8, 2),
(44, '2020-11-17 06:20:43.491581', '97', 'Penitenciarul Tulcea', 1, 'new through import_export', 8, 2),
(45, '2020-11-17 06:20:43.504706', '98', 'Penitenciarul Tulcea -sectia Chilia Veche ', 1, 'new through import_export', 8, 2),
(46, '2020-11-17 06:20:43.515091', '99', 'Penitenciarul Drobeta Turnu-Severin', 1, 'new through import_export', 8, 2),
(47, '2020-11-17 06:20:43.525862', '100', 'Penitenciarul Drobeta Turnu-Severin\nSectia exterioara Vanjulet ', 1, 'new through import_export', 8, 2),
(48, '2020-11-17 06:20:43.527862', '101', 'Penitenciarul Vaslui', 1, 'new through import_export', 8, 2),
(49, '2020-11-17 06:25:50.390029', '102', 'TRCJ - Sala 34', 1, '[{\"added\": {}}]', 8, 2),
(50, '2020-11-17 06:26:08.456704', '102', 'TRCJ - Sala 31', 2, '[{\"changed\": {\"fields\": [\"Nume\"]}}]', 8, 2),
(51, '2020-11-17 06:27:04.466122', '103', 'TRCJ - sala 34', 1, '[{\"added\": {}}]', 8, 2),
(52, '2020-11-17 06:27:44.599235', '104', 'JCN - Sala 172', 1, '[{\"added\": {}}]', 8, 2),
(53, '2020-11-17 06:28:05.551761', '105', 'JCN - Sala 165', 1, '[{\"added\": {}}]', 8, 2),
(54, '2020-11-17 06:28:57.603787', '1', 'TRCJ - Sala 31', 1, '[{\"added\": {}}]', 7, 2),
(55, '2020-11-17 06:29:09.586476', '2', 'TRCJ - sala 34', 1, '[{\"added\": {}}]', 7, 2),
(56, '2020-11-17 06:29:21.217478', '3', 'JCN - Sala 172', 1, '[{\"added\": {}}]', 7, 2),
(57, '2020-11-17 06:29:30.988534', '4', 'JCN - Sala 165', 1, '[{\"added\": {}}]', 7, 2),
(58, '2020-11-17 06:32:57.641571', '2', 'Judecatoria Cluj-Napoca', 1, '[{\"added\": {}}]', 6, 1),
(59, '2020-11-17 06:35:41.310714', '3', 'daniel', 2, '[{\"changed\": {\"fields\": [\"Instanta\"]}}]', 11, 1),
(60, '2020-11-17 06:35:53.233468', '3', 'daniel', 3, '', 11, 1),
(61, '2020-11-17 06:48:40.124411', '4', 'daniel', 3, '', 11, 1),
(62, '2020-11-17 06:59:00.084169', '5', 'daniel', 3, '', 11, 1),
(63, '2020-11-18 08:05:40.188152', '6', '31', 2, '[{\"changed\": {\"fields\": [\"Call to\"]}}]', 9, 1),
(64, '2020-11-23 10:00:22.447738', '7', '172', 1, '[{\"added\": {}}]', 9, 1);

-- --------------------------------------------------------

--
-- Table structure for table `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(4, 'contenttypes', 'contenttype'),
(5, 'sessions', 'session'),
(6, 'todoapp', 'instanta'),
(7, 'todoapp', 'salajudecata'),
(8, 'todoapp', 'terminal'),
(10, 'todoapp', 'terminalevc'),
(9, 'todoapp', 'todo'),
(11, 'users', 'myuser');

-- --------------------------------------------------------

--
-- Table structure for table `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` int(11) NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'users', '0001_initial', '2020-11-16 13:05:51.151860'),
(2, 'contenttypes', '0001_initial', '2020-11-16 13:05:51.343472'),
(3, 'admin', '0001_initial', '2020-11-16 13:05:51.452096'),
(4, 'admin', '0002_logentry_remove_auto_add', '2020-11-16 13:05:52.024656'),
(5, 'admin', '0003_logentry_add_action_flag_choices', '2020-11-16 13:05:52.086461'),
(6, 'contenttypes', '0002_remove_content_type_name', '2020-11-16 13:05:52.391889'),
(7, 'auth', '0001_initial', '2020-11-16 13:05:52.639452'),
(8, 'auth', '0002_alter_permission_name_max_length', '2020-11-16 13:05:53.864764'),
(9, 'auth', '0003_alter_user_email_max_length', '2020-11-16 13:05:53.896664'),
(10, 'auth', '0004_alter_user_username_opts', '2020-11-16 13:05:53.949521'),
(11, 'auth', '0005_alter_user_last_login_null', '2020-11-16 13:05:54.001379'),
(12, 'auth', '0006_require_contenttypes_0002', '2020-11-16 13:05:54.048239'),
(13, 'auth', '0007_alter_validators_add_error_messages', '2020-11-16 13:05:54.054600'),
(14, 'auth', '0008_alter_user_username_max_length', '2020-11-16 13:05:54.062624'),
(15, 'auth', '0009_alter_user_last_name_max_length', '2020-11-16 13:05:54.069501'),
(16, 'auth', '0010_alter_group_name_max_length', '2020-11-16 13:05:54.151282'),
(17, 'auth', '0011_update_proxy_permissions', '2020-11-16 13:05:54.173002'),
(18, 'auth', '0012_alter_user_first_name_max_length', '2020-11-16 13:05:54.179985'),
(19, 'sessions', '0001_initial', '2020-11-16 13:05:54.285596'),
(20, 'todoapp', '0001_initial', '2020-11-16 13:05:55.733738'),
(21, 'todoapp', '0002_todo_adaugat_de', '2020-11-16 13:05:57.706927'),
(22, 'todoapp', '0003_auto_20201026_1235', '2020-11-16 13:05:57.808652'),
(23, 'users', '0002_myuser_instanta', '2020-11-16 13:05:58.066930'),
(24, 'users', '0003_auto_20201026_1259', '2020-11-16 13:05:59.134073'),
(25, 'users', '0004_auto_20201116_1524', '2020-11-16 13:24:21.436512');

-- --------------------------------------------------------

--
-- Table structure for table `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `django_session`
--

INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES
('buaqc7ysmw45nlfnbymuaeclzozry4jr', '.eJxVjDsOwjAQBe_iGln-fyjpOYO19q5xADlSnFSIu0OkFNC-mXkvlmBbW9oGLWlCdmaSnX63DOVBfQd4h36beZn7ukyZ7wo_6ODXGel5Ody_gwajfWuKXgRRvQPSVWWXqdQAyggdqjfF6EiCSIqqS9Q5WifRCnTGR6tcxsDeH-mJN7U:1kfISy:OJqXPeIHUbVqjIoHHjpusFX7kJayYB9xp6UHOAo8zvA', '2020-12-02 08:05:24.584353'),
('byfs57kbo8cria34nodo4dlsgbuafbxp', '.eJxVjDsOwjAQBe_iGln-fyjpOYO19q5xADlSnFSIu0OkFNC-mXkvlmBbW9oGLWlCdmaSnX63DOVBfQd4h36beZn7ukyZ7wo_6ODXGel5Ody_gwajfWuKXgRRvQPSVWWXqdQAyggdqjfF6EiCSIqqS9Q5WifRCnTGR6tcxsDeH-mJN7U:1khzr5:EdSti67PkaLmBU8gotxFe6W0Um9-BzLbAfhKJNqovcg', '2020-12-09 18:49:27.777837'),
('ny9k9x12le6kmg2ybm0f99b2wgk74z64', '.eJxVjDsOwjAQBe_iGln-fyjpOYO19q5xADlSnFSIu0OkFNC-mXkvlmBbW9oGLWlCdmaSnX63DOVBfQd4h36beZn7ukyZ7wo_6ODXGel5Ody_gwajfWuKXgRRvQPSVWWXqdQAyggdqjfF6EiCSIqqS9Q5WifRCnTGR6tcxsDeH-mJN7U:1kh8dd:1_1Hh9dnOuV7KdT_aBP7jC_w_5bNFsMsDjJtnEAayxo', '2020-12-07 10:00:01.170716'),
('st2jhagr3sj6jzh2v5vpor3nvbpcb4pz', '.eJxVi0sKAjEQBe_SaxmSMb92qQcJ6U-IiApmshLvriMKuqx6r-6Qy1haHl1v-SiwgwCbX0eFT3pZhxX7xKMv1_NXT4c37j-nv7KV3l5ZxeAjawizQ6yJONlI6ilh9VtWVC3GRm8CSknikNWITzVaMqKzOHg8AW24NjI:1kevDz:rU0ufqJuwQ4I0N-JsTQVuKcAhOuBuNkr85bzvwfrafk', '2020-12-01 07:16:23.247708');

-- --------------------------------------------------------

--
-- Table structure for table `todoapp_instanta`
--

CREATE TABLE `todoapp_instanta` (
  `id` int(11) NOT NULL,
  `id_Ecris` int(11) NOT NULL,
  `nume` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `todoapp_instanta`
--

INSERT INTO `todoapp_instanta` (`id`, `id_Ecris`, `nume`) VALUES
(1, 117, 'Tribunalul Cluj'),
(2, 211, 'Judecatoria Cluj-Napoca');

-- --------------------------------------------------------

--
-- Table structure for table `todoapp_salajudecata`
--

CREATE TABLE `todoapp_salajudecata` (
  `id` int(11) NOT NULL,
  `nr_sala` varchar(5) NOT NULL,
  `id_echipament_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `todoapp_salajudecata`
--

INSERT INTO `todoapp_salajudecata` (`id`, `nr_sala`, `id_echipament_id`) VALUES
(1, '31', 102),
(2, '34', 103),
(3, '172', 104),
(4, '165', 105);

-- --------------------------------------------------------

--
-- Table structure for table `todoapp_terminal`
--

CREATE TABLE `todoapp_terminal` (
  `id` int(11) NOT NULL,
  `nume` varchar(200) NOT NULL,
  `model` varchar(200) DEFAULT NULL,
  `ip` varchar(200) NOT NULL,
  `nr_apel` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `todoapp_terminal`
--

INSERT INTO `todoapp_terminal` (`id`, `nume`, `model`, `ip`, `nr_apel`) VALUES
(55, 'ANP-Bucuresti', 'Cisco', '100.65.109.202', '01212100'),
(56, 'Penitenciarul Aiud', 'Avaya', '100.98.109.26', '058212101'),
(57, 'Penitenciarul Arad', 'Avaya', '100.97.109.26', '057212102'),
(58, 'Penitenciarul Arad - sectia exterioara  ', 'Avaya', '100.97.109.34', '057212103'),
(59, 'Penitenciarul Bacau', 'Avaya', '100.74.109.58', '034212104'),
(60, 'Penitenciarul Baia Mare', 'Avaya', '100.102.109.26', '062212105'),
(61, 'Penitenciar Bistrita', 'Avaya', '100.103.109.26', '063212106'),
(62, 'Penitenciarul Botosani', 'Avaya', '100.71.109.26', '031212107'),
(63, 'Penitenciarul Braila', 'Cisco', '100.79.109.26', '039212108'),
(64, 'Centrul Educativ Buziaş', 'Avaya', '100.96.109.34', '056212109'),
(65, 'Penitenciarul Codlea', 'Avaya', '100.108.109.42', '068212110'),
(66, 'Penitenciarul Colibasi (Mioveni)', 'Cisco', '100.88.109.34', '048212111'),
(67, 'Centrul Educativ Tg.Ocna', 'Avaya', '100.74.109.50', '034212112'),
(68, 'Penitenciarul Craiova', 'Avaya', '100.91.109.34', '051212113'),
(69, 'Penitenciarul Deva', 'Avaya', '100.94.109.26', '054212114'),
(70, 'Penitenciarul Focsani', 'Cisco', '100.77.109.26', '037212115'),
(71, 'Penitenciarul Gaesti', 'Cisco', '100.85.109.34', '045212116'),
(72, 'Penitenciarul Galati', 'Cisco', '100.76.109.34', '036212117'),
(73, 'Penitenciarul Gherla', 'Avaya', '100.104.109.34', '064212118'),
(74, 'Penitenciarul Gherla \nsectia exterioara Cluj ', 'Avaya', '100.104.109.58', '064212119'),
(75, 'Penitenciarul Giurgiu', 'Cisco', '100.86.109.26', '046212120'),
(76, 'Penitenciarul Iasi', 'Avaya', '100.72.109.34', '032212121'),
(77, 'Penitenciarul Bucuresti-Jilava', 'Cisco', '100.65.109.218', '01212122'),
(78, 'Penitenciarul Margineni', 'Cisco', '100.85.109.26', '045212123'),
(79, 'Penitenciarul Miercurea Ciuc', 'Avaya', '100.106.109.26', '066212124'),
(80, 'Penitenciarul Oradea', 'Avaya', '100.99.109.34', '059212125'),
(81, 'Penitenciarul Craiova - Pelendava', 'Avaya', '100.91.109.50', '051212127'),
(82, 'Penitenciarul Craiova - Pelendava\nsectia exterioara Facai ', 'Avaya', '100.91.109.75', '051212126'),
(83, 'Penitenciarul Ploiesti', 'Cisco', '100.84.109.34', '044212128'),
(84, 'Centrul de Detenţie Craiova', 'Avaya', '100.91.109.42', '051212129'),
(85, 'Centrul de Detenţie Brăila - Tichilesti', 'Cisco', '100.79.109.34', '039212130'),
(86, 'Penitenciarul Constanta – Poarta Alba', 'Cisco', '100.81.109.42', '041212131'),
(87, 'Penitenciarul Bucuresti - Rahova', 'Cisco', '100.65.109.210', '01212132'),
(88, 'Penitenciarul Satu Mare', 'Avaya', '100.101.109.26', '061212133'),
(89, 'Penitenciarul Slobozia', 'Cisco', '100.83.109.34', '043212134'),
(90, 'Penitenciarul Spital Dej', 'Avaya', '100.104.109.42', '064212135'),
(91, 'Penitenciarul Spital Constanta – Poarta Alba', 'Avaya', '100.81.109.50', '041212136'),
(92, 'Penitenciarul Spital Tg.Ocna', 'Avaya', '100.74.109.34', '034212137'),
(93, 'Penitenciarul de Femei Ploieşti – Targsorul Nou', 'Cisco', '100.84.109.42', '044212138'),
(94, 'Penitenciarul Targu-Jiu', 'Avaya', '100.93.109.26', '053212139'),
(95, 'Penitenciarul Targu-Mures', 'Avaya', '100.105.109.42', '065212140'),
(96, 'Penitenciarul Timisoara', 'Avaya', '100.96.109.42', '056212141'),
(97, 'Penitenciarul Tulcea', 'Cisco', '100.80.109.26', '040212142'),
(98, 'Penitenciarul Tulcea -sectia Chilia Veche ', 'Avaya', '100.80.109.50', '040212143'),
(99, 'Penitenciarul Drobeta Turnu-Severin', 'Avaya', '100.92.109.26', '052212144'),
(100, 'Penitenciarul Drobeta Turnu-Severin\nSectia exterioara Vanjulet ', 'Avaya', '100.92.109.42', '052212145'),
(101, 'Penitenciarul Vaslui', 'Avaya', '100.75.109.26', '035212146'),
(102, 'TRCJ - Sala 31', 'Yealink', '100.104.109.14', '064202904'),
(103, 'TRCJ - sala 34', 'Polycom', '100.104.109.13', '-'),
(104, 'JCN - Sala 172', 'Yealink', '100.104.109.21', '-'),
(105, 'JCN - Sala 165', 'Polycom', '-', '-');

-- --------------------------------------------------------

--
-- Table structure for table `todoapp_terminalevc`
--

CREATE TABLE `todoapp_terminalevc` (
  `id` int(11) NOT NULL,
  `prin_STS` tinyint(1) NOT NULL,
  `apeleaza_pe_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `todoapp_todo`
--

CREATE TABLE `todoapp_todo` (
  `id` int(11) NOT NULL,
  `start_time` time(6) NOT NULL,
  `end_time` time(6) NOT NULL,
  `data` date NOT NULL,
  `completed` tinyint(1) NOT NULL,
  `caller_id` int(11) NOT NULL,
  `adaugat_de_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `todoapp_todo`
--

INSERT INTO `todoapp_todo` (`id`, `start_time`, `end_time`, `data`, `completed`, `caller_id`, `adaugat_de_id`) VALUES
(6, '13:49:00.000000', '14:00:00.000000', '2020-11-18', 0, 1, 6),
(7, '12:00:09.000000', '12:00:10.000000', '2020-11-23', 0, 3, 6);

-- --------------------------------------------------------

--
-- Table structure for table `todoapp_todo_call_to`
--

CREATE TABLE `todoapp_todo_call_to` (
  `id` int(11) NOT NULL,
  `todo_id` int(11) NOT NULL,
  `terminal_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `todoapp_todo_call_to`
--

INSERT INTO `todoapp_todo_call_to` (`id`, `todo_id`, `terminal_id`) VALUES
(8, 6, 59),
(7, 6, 64),
(9, 7, 60),
(10, 7, 61),
(11, 7, 63);

-- --------------------------------------------------------

--
-- Table structure for table `users_myuser`
--

CREATE TABLE `users_myuser` (
  `id` int(11) NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `utilizator` varchar(50) NOT NULL,
  `nume` varchar(50) NOT NULL,
  `prenume` varchar(50) NOT NULL,
  `telefon` varchar(10) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  `instanta_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users_myuser`
--

INSERT INTO `users_myuser` (`id`, `password`, `last_login`, `utilizator`, `nume`, `prenume`, `telefon`, `is_active`, `is_admin`, `instanta_id`) VALUES
(1, 'pbkdf2_sha256$216000$WEx3co1qxCfO$Tv0etk0IOeJc/mgx6DukTca2qoyzf8snnALbY4aDXSE=', '2020-11-25 18:49:27.774837', 'Admin', 'General', 'Admin', NULL, 1, 1, NULL),
(2, 'pbkdf2_sha256$216000$OLrdl70RQ2Ur$L+WPKrLDMsFwvY0EZLSq8rcgogeDVyOWyc/Jg3cy9QA=', '2020-11-16 13:35:31.491115', 'Adm', 'a', 'a', NULL, 1, 1, NULL),
(6, '', '2020-11-23 09:07:23.340601', 'daniel', 'Tămaş', 'Daniel-Riian', NULL, 1, 0, 117);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Indexes for table `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Indexes for table `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- Indexes for table `todoapp_instanta`
--
ALTER TABLE `todoapp_instanta`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `todoapp_instanta_id_Ecris_74343573_uniq` (`id_Ecris`);

--
-- Indexes for table `todoapp_salajudecata`
--
ALTER TABLE `todoapp_salajudecata`
  ADD PRIMARY KEY (`id`),
  ADD KEY `todoapp_salajudecata_id_echipament_id_f0b9098f_fk_todoapp_t` (`id_echipament_id`);

--
-- Indexes for table `todoapp_terminal`
--
ALTER TABLE `todoapp_terminal`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `todoapp_terminalevc`
--
ALTER TABLE `todoapp_terminalevc`
  ADD PRIMARY KEY (`id`),
  ADD KEY `todoapp_terminalevc_apeleaza_pe_id_7dd549b6_fk_todoapp_t` (`apeleaza_pe_id`);

--
-- Indexes for table `todoapp_todo`
--
ALTER TABLE `todoapp_todo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `todoapp_todo_caller_id_09170a06_fk_todoapp_salajudecata_id` (`caller_id`),
  ADD KEY `todoapp_todo_adaugat_de_id_490aa74e_fk_users_myuser_id` (`adaugat_de_id`);

--
-- Indexes for table `todoapp_todo_call_to`
--
ALTER TABLE `todoapp_todo_call_to`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `todoapp_todo_call_to_todo_id_terminal_id_e6d7756f_uniq` (`todo_id`,`terminal_id`),
  ADD KEY `todoapp_todo_call_to_terminal_id_e845cc5c_fk_todoapp_terminal_id` (`terminal_id`);

--
-- Indexes for table `users_myuser`
--
ALTER TABLE `users_myuser`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `utilizator` (`utilizator`),
  ADD KEY `users_myuser_instanta_id_8f8065eb_fk_todoapp_instanta_id_Ecris` (`instanta_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
