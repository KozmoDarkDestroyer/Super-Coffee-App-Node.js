
-- Create the table in the specified schema
/*
CREATE TABLE categories
(
    id_categories INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name_categories` VARCHAR(50) NOT NULL,
    `create_at_categories` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_at_categories` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE(name_categories)
);

ALTER TABLE categories ADD id_users INT(11) NOT NULL;

ALTER TABLE categories ADD CONSTRAINT  fk_categories_users FOREIGN KEY (id_users) REFERENCES users (id_users) ON DELETE CASCADE ON UPDATE CASCADE;
*/