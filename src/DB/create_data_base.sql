-- --------------------------------------------------------
-- Host:                         local
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

-- --------------------------------------------------------
-- Creating database
-- --------------------------------------------------------
CREATE DATABASE IF NOT EXISTS app 
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_general_ci;

-- --------------------------------------------------------
-- Using the database
-- --------------------------------------------------------
USE app;

-- --------------------------------------------------------
-- Creating table `accounts`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `accounts` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(50) NOT NULL,
  `lastName` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB 
  DEFAULT CHARSET=utf8mb4 
  COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Creating table `roles`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `roles` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL UNIQUE,
    `description` TEXT
) ENGINE=InnoDB 
  DEFAULT CHARSET=utf8mb4 
  COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Creating table `permissions`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `permissions` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL UNIQUE,
    `description` TEXT
) ENGINE=InnoDB 
  DEFAULT CHARSET=utf8mb4 
  COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Creating table `role_permissions`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `role_permissions` (
    `role_id` INT,
    `permission_id` INT,
    FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`id`) ON DELETE CASCADE,
    PRIMARY KEY (`role_id`, `permission_id`)
) ENGINE=InnoDB 
  DEFAULT CHARSET=utf8mb4 
  COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Creating table `accounts_roles`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `accounts_roles` (
    `user_id` INT,
    `role_id` INT,
    FOREIGN KEY (`user_id`) REFERENCES `accounts`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE CASCADE,
    PRIMARY KEY (`user_id`, `role_id`)
) ENGINE=InnoDB 
  DEFAULT CHARSET=utf8mb4 
  COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Inserting data into `roles`
-- --------------------------------------------------------
INSERT INTO roles (name, description) VALUES
('Master', 'Role with full access to the system'),
('Admin', 'Role with full access to the system'),
('Editor', 'Role with permissions to create and edit posts'),
('Viewer', 'Role with read-only access to public content');

-- --------------------------------------------------------
-- Inserting data into `permissions`
-- --------------------------------------------------------
INSERT INTO permissions (name, description) VALUES
('create_post', 'Permission to create new posts'),
('edit_post', 'Permission to edit existing posts'),
('manage_public_page', 'Permission to make changes to the public page');

-- --------------------------------------------------------
-- Inserting data into `role_permissions`
-- --------------------------------------------------------
-- Master has all permissions
INSERT INTO role_permissions (role_id, permission_id) VALUES
((SELECT id FROM roles WHERE name = 'Master'), (SELECT id FROM permissions WHERE name = 'create_post')),
((SELECT id FROM roles WHERE name = 'Master'), (SELECT id FROM permissions WHERE name = 'edit_post')),
((SELECT id FROM roles WHERE name = 'Master'), (SELECT id FROM permissions WHERE name = 'manage_public_page'));

-- Admin has all permissions
INSERT INTO role_permissions (role_id, permission_id) VALUES
((SELECT id FROM roles WHERE name = 'Admin'), (SELECT id FROM permissions WHERE name = 'create_post')),
((SELECT id FROM roles WHERE name = 'Admin'), (SELECT id FROM permissions WHERE name = 'edit_post')),
((SELECT id FROM roles WHERE name = 'Admin'), (SELECT id FROM permissions WHERE name = 'manage_public_page'));

-- Editor can create and edit posts, but not manage the public page
INSERT INTO role_permissions (role_id, permission_id) VALUES
((SELECT id FROM roles WHERE name = 'Editor'), (SELECT id FROM permissions WHERE name = 'create_post')),
((SELECT id FROM roles WHERE name = 'Editor'), (SELECT id FROM permissions WHERE name = 'edit_post'));

-- Viewer can only view public content, no permissions for posts
INSERT INTO role_permissions (role_id, permission_id) VALUES
((SELECT id FROM roles WHERE name = 'Viewer'), (SELECT id FROM permissions WHERE name = 'manage_public_page'));

-- --------------------------------------------------------
-- Inserting data into `accounts`
-- --------------------------------------------------------
INSERT INTO `accounts` (`firstName`, `lastName`, `email`, `password`) VALUES
('Web', 'master', 'webmaster@app.com', '$2b$10$4udq/SihPXae4GLiF.frPOX6nD8VS.OZoG0hh5fEJeCWOs09NR7de'),
('alevi', 'rodriguez', 'alevi@example.com', '$2b$10$4udq/SihPXae4GLiF.frPOX6nD8VS.OZoG0hh5fEJeCWOs09NR7de'),
('isaac', 'rodriguez', 'isaac@example.com', '$2b$10$4udq/SihPXae4GLiF.frPOX6nD8VS.OZoG0hh5fEJeCWOs09NR7de');

-- --------------------------------------------------------
-- Assign roles to users
-- --------------------------------------------------------
INSERT INTO `accounts_roles` (user_id, role_id) VALUES
((SELECT id FROM accounts WHERE email = 'webmaster@app.com'), (SELECT id FROM roles WHERE name = 'Admin')),
((SELECT id FROM accounts WHERE email = 'alevi@example.com'), (SELECT id FROM roles WHERE name = 'Admin')),
((SELECT id FROM accounts WHERE email = 'isaac@example.com'), (SELECT id FROM roles WHERE name = 'Editor'));






-- --------------------------------------------------------
-- Product
-- --------------------------------------------------------
CREATE TABLE product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- --------------------------------------------------------
-- Gallery
-- --------------------------------------------------------
CREATE TABLE gallery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    url VARCHAR(255),
    path VARCHAR(255),
    description TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- --------------------------------------------------------
-- Committing changes
-- --------------------------------------------------------
COMMIT;
