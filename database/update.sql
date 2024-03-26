use food_management;

--
-- creation de la table product_option_limit
--
DROP TABLE IF EXISTS product_option_limit;
CREATE TABLE IF NOT EXISTS product_option_limit (
    product_id int NOT NULL,
    option_id int NOT NULL,
    PRIMARY KEY (option_id,product_id)
);

--
-- Déchargement des données de la table product_option_limit
--
INSERT INTO product_option_limit (product_id, option_id) VALUES (1, 2),(1, 3);


--
-- Contraintes pour la table product_option_limit
--
ALTER TABLE product_option_limit
    ADD CONSTRAINT product_option_limit_option_FK FOREIGN KEY (option_id) REFERENCES option_add (option_id),
    ADD CONSTRAINT product_option_limit_product_FK FOREIGN KEY (product_id) REFERENCES product (product_id);
