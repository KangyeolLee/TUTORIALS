-- -----------------------------------------------------
-- Table `woowaledger`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `woowaledger`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `token` VARCHAR(300) NOT NULL,
  PRIMARY KEY (`id`));

-- -----------------------------------------------------
-- Table `woowaledger`.`history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `woowaledger`.`history` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `category` VARCHAR(50) NOT NULL,
  `payment` VARCHAR(50) NOT NULL,
  `user_id` INT NOT NULL,
  `price` INT NOT NULL,
  `content` VARCHAR(45) NOT NULL,
  `type` TINYINT NOT NULL,
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `FK_user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `FK_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `woowaledger`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

-- -----------------------------------------------------
-- Table `woowaledger`.`payment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `woowaledger`.`payment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(50) NULL,
  PRIMARY KEY (`id`));

-- -----------------------------------------------------
-- Table `woowaledger`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `woowaledger`.`category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`));

-- -----------------------------------------------------
-- Table `woowaledger`.`user_payment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `woowaledger`.`user_payment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `payment_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_user_id_idx` (`user_id` ASC) VISIBLE,
  INDEX `FK_payment_id_idx` (`payment_id` ASC) VISIBLE,
  CONSTRAINT `FK_p_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `woowaledger`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK_payment_id`
    FOREIGN KEY (`payment_id`)
    REFERENCES `woowaledger`.`payment` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

-- -----------------------------------------------------
-- Table `woowaledger`.`user_category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `woowaledger`.`user_category` (
  `id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `category_id` INT NOT NULL,
  INDEX `FK_user_id_idx` (`user_id` ASC) VISIBLE,
  INDEX `FK_category_id_idx` (`category_id` ASC) VISIBLE,
  CONSTRAINT `FK_c_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `woowaledger`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK_category_id`
    FOREIGN KEY (`category_id`)
    REFERENCES `woowaledger`.`category` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);