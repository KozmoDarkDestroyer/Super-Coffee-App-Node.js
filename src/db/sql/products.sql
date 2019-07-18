
/*
-- Create the table in the specified schema
CREATE TABLE products
(
    id_products INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name_products` VARCHAR(50) NOT NULL,
    price_uni_products DOUBLE(6,2) NOT NULL,
    `description_products` VARCHAR(150) NOT NULL,
    `img_products` VARCHAR(500),
    `available_products` TINYINT(1) DEFAULT 1 NOT NULL,
    `create_at_products` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_at_products` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE products ADD id_users INT(11) NOT NULL;

ALTER TABLE products ADD id_categories INT(11) NOT NULL;

ALTER TABLE products ADD CONSTRAINT fk_products_users FOREIGN KEY (id_users) REFERENCES users (id_users) ON DELETE CASCADE ON UPDATE CASCADE; 

ALTER TABLE products ADD CONSTRAINT fk_products_categories FOREIGN KEY (id_categories) REFERENCES categories (id_categories) ON DELETE CASCADE ON UPDATE CASCADE;
*/