USE `cosmic`;

# Adds the rebirth column if it doesn't exist.
DROP PROCEDURE IF EXISTS `enable_rebirth`;
DELIMITER //
CREATE PROCEDURE `enable_rebirth`()
BEGIN
    IF NOT EXISTS (
        SELECT NULL
          FROM INFORMATION_SCHEMA.COLUMNS
        WHERE table_name = 'characters'
          AND table_schema = 'cosmic'
          AND column_name = 'rebirths')
    THEN
        ALTER TABLE `characters` ADD COLUMN `rebirths` int(5) NOT NULL default '0';
    END IF;
END //
DELIMITER ;
CALL `enable_rebirth`();
DROP PROCEDURE `enable_rebirth`;
