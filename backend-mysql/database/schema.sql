CREATE DATABASE IF NOT EXISTS SCMS;
USE SCMS;
CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(50) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL);
CREATE TABLE IF NOT EXISTS suppliers (supplier_code VARCHAR(30) PRIMARY KEY, supplier_name VARCHAR(100) NOT NULL, telephone VARCHAR(20) NOT NULL, address VARCHAR(255) NOT NULL, email VARCHAR(100) NOT NULL);
CREATE TABLE IF NOT EXISTS shipments (shipment_number VARCHAR(30) PRIMARY KEY, shipment_date DATETIME NOT NULL, shipment_status VARCHAR(40) NOT NULL, destination VARCHAR(255) NOT NULL, supplier_code VARCHAR(30) NOT NULL, FOREIGN KEY (supplier_code) REFERENCES suppliers(supplier_code));
CREATE TABLE IF NOT EXISTS deliveries (delivery_code VARCHAR(30) PRIMARY KEY, delivery_date DATETIME NOT NULL, quantity_delivered INT NOT NULL, delivery_status VARCHAR(40) NOT NULL, shipment_number VARCHAR(30) NOT NULL, FOREIGN KEY (shipment_number) REFERENCES shipments(shipment_number));
INSERT INTO users (username, password) VALUES ('admin', '$2b$10$aULsUjp9bb9lf5CZZyY.7./KhwsocVO0duyPlqu0Qnte75xHBdG5C') ON DUPLICATE KEY UPDATE username = username;