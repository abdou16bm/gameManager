use food_management;

insert into privilege values (1,'superadmin'),(2,'admin'),(3,'service');


INSERT INTO user (user_id, user_id_s, user_name, user_lastname, user_email, user_phone, user_address, user_username, user_password, user_status, priv_id) VALUES (1, null, null, null, null, null, null, 'superadmin', '$2b$10$dMNGK6CkrX/e7/hSvipak.2QWfzn521IphggKJ.91vwYVK6h.GHne', 1, 1);
INSERT INTO user (user_id, user_id_s, user_name, user_lastname, user_email, user_phone, user_address, user_username, user_password, user_status, priv_id) VALUES (2, null, null, null, null, null, null, 'guichet1', '$2a$10$dEznUlsOHytxwmxKD7EOg.6XKaOAS7ouJmwfvW9FmSr9kl3J.QB3W', 1, 3);


insert into category (cat_name) values ('Burgers'),('Poulet'),('Pizzas'),('Boisson'),('Café');
insert into product (product_name, product_price, cat_id) values ('Burger Bro',600,1),('Burger Bistro',400,1);

insert into option_add (option_type, option_name) values (1,'Mayonnaise');
insert into option_add (option_type, option_name,option_price) values (1,'Gruyère',100);

insert into option_cat (option_id, cat_id) values (1,1);
insert into option_cat (option_id, cat_id) values (2,1);


insert into order_client (order_id, order_number,order_statut, order_total_price)
values  (1, '1', 0, 1000.00);

insert into product_detail (product_id, order_id)
values  (1, 1),
        (2, 1);
