ALTER TABLE product
ADD product_status INT;

UPDATE product
SET product_status = 1 

-- ////////////////////////////////////////////////

ALTER TABLE category
ADD cat_priority INT;