-- MySQL Workbench Forward Engineering

-- SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
-- SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
-- SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mifincaDB
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mifincaDB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mifincaDB` DEFAULT CHARACTER SET utf8 ;
USE `mifincaDB` ;

-- -----------------------------------------------------
-- Table `mifincaDB`.`heroes`
-- -----------------------------------------------------
-- CREATE TABLE IF NOT EXISTS `mifincaDB`.`heroes` (
--   `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
--   `nombre` VARCHAR(45) NOT NULL,
--   `kills` FLOAT NOT NULL,
--   `fecha`  DATETIME NOT NULL DEFAULT NOW(),
--   PRIMARY KEY (`id`))

-- ENGINE = InnoDB;


-- -- -----------------------------------------------------
-- -- Table `mifincaDB`.`proyecto`
-- -- -----------------------------------------------------
-- CREATE TABLE IF NOT EXISTS `mifincaDB`.`proyecto` (
--   `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
--   `nombre` VARCHAR(45) NOT NULL,
--   `pago` TINYINT NULL,
--   PRIMARY KEY (`id`))
-- ENGINE = InnoDB;


-- -- -----------------------------------------------------
-- -- Table `mifincaDB`.`sensor`
-- -- -----------------------------------------------------
-- CREATE TABLE IF NOT EXISTS `mifincaDB`.`sensor` (
--   `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
--   `proyecto_id` INT UNSIGNED NOT NULL,
--   `nombre` VARCHAR(45) NOT NULL,
--   `ubicacion` VARCHAR(45) NOT NULL,
--   `lastLogID` INT UNSIGNED NULL,
--   PRIMARY KEY (`id`, `proyecto_id`),
--   INDEX `fk_sensor_proyecto1_idx` (`proyecto_id` ASC),
--   CONSTRAINT `fk_sensor_proyecto1`
--     FOREIGN KEY (`proyecto_id`)
--     REFERENCES `mifincaDB`.`proyecto` (`id`)
--     ON DELETE NO ACTION
--     ON UPDATE NO ACTION)
-- ENGINE = InnoDB;


-- -- -----------------------------------------------------
-- -- Table `mifincaDB`.`log`
-- -- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mifincaDB`.`logs` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `sensor_id` INT UNSIGNED NOT NULL,
  `fecha`  DATETIME NOT NULL DEFAULT NOW(),
  `temperaturaH` FLOAT NULL,
  `temperaturaS` FLOAT NULL,
  `humedad` FLOAT NULL,
  -- `velViento` FLOAT NULL,
  PRIMARY KEY (`id`, `sensor_id`)
  -- INDEX `fk_log_sensor1_idx` (`sensor_id` ASC),
  -- CONSTRAINT `fk_log_sensor1`
    -- FOREIGN KEY (`sensor_id`)
    -- REFERENCES `mifincaDB`.`sensor` (`id`)
    -- ON DELETE NO ACTION
    -- ON UPDATE NO ACTION
    )
ENGINE = InnoDB;


-- -- -----------------------------------------------------
-- -- Table `mifincaDB`.`prediccion`
-- -- -----------------------------------------------------
-- CREATE TABLE IF NOT EXISTS `mifincaDB`.`prediccion` (
--   `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
--   `sensor_id` INT UNSIGNED NOT NULL,
--   `fecha` DATETIME NOT NULL,
--   `tempMinPred` FLOAT NULL,
--   `tempMinReal` FLOAT NULL,
--   `inTempMin` FLOAT NULL,
--   `inTempMax` FLOAT NULL,
--   `inHumedad` FLOAT NULL,
--   `inTemperatura` FLOAT NULL,
--   PRIMARY KEY (`id`, `sensor_id`),
--   INDEX `fk_prediccion_sensor1_idx` (`sensor_id` ASC),
--   CONSTRAINT `fk_prediccion_sensor1`
--     FOREIGN KEY (`sensor_id`)
--     REFERENCES `mifincaDB`.`sensor` (`id`)
--     ON DELETE NO ACTION
--     ON UPDATE NO ACTION)
-- ENGINE = InnoDB;


-- -- -----------------------------------------------------
-- -- Table `mifincaDB`.`usuario`
-- -- -----------------------------------------------------
-- CREATE TABLE IF NOT EXISTS `mifincaDB`.`usuario` (
--   `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
--   `proyecto_id` INT UNSIGNED NOT NULL,
--   `nombre` VARCHAR(45) NOT NULL,
--   `apellido` VARCHAR(45) NOT NULL,
--   `dirMail` VARCHAR(45) NOT NULL,
--   `numTelef` VARCHAR(45) NOT NULL,
--   PRIMARY KEY (`id`, `proyecto_id`),
--   INDEX `fk_usuario_proyecto1_idx` (`proyecto_id` ASC),
--   CONSTRAINT `fk_usuario_proyecto1`
--     FOREIGN KEY (`proyecto_id`)
--     REFERENCES `mifincaDB`.`proyecto` (`id`)
--     ON DELETE NO ACTION
--     ON UPDATE NO ACTION)
-- ENGINE = InnoDB;


-- SET SQL_MODE=@OLD_SQL_MODE;
-- SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
-- SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
