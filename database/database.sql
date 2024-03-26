#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------

drop database if exists food_management;
create database food_management;
use food_management;



#------------------------------------------------------------
# Table: privilege
#------------------------------------------------------------

CREATE TABLE privilege(
                          priv_id   Int  Auto_increment  NOT NULL ,
                          priv_name Varchar (30)
    ,CONSTRAINT privilege_PK PRIMARY KEY (priv_id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: user
#------------------------------------------------------------

CREATE TABLE user(
                     user_id       Int  Auto_increment  NOT NULL ,
                     user_id_s     Varchar (32) ,
                     user_name     Varchar (50) ,
                     user_lastname Varchar (50) ,
                     user_email    Varchar (50) ,
                     user_phone    Varchar (15) ,
                     user_address  Varchar (200) ,
                     user_username Varchar (50) ,
                     user_password Varchar (200) ,
                     user_status   Int ,
                     priv_id       Int NOT NULL
    ,CONSTRAINT user_PK PRIMARY KEY (user_id)

    ,CONSTRAINT user_privilege_FK FOREIGN KEY (priv_id) REFERENCES privilege(priv_id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: waiting
#------------------------------------------------------------

CREATE TABLE waiting(
                        waiting_id        Int  Auto_increment  NOT NULL ,
                        waiting_date      Date ,
                        waiting_total     Int ,
                        waiting_remaining Int
    ,CONSTRAINT waiting_PK PRIMARY KEY (waiting_id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: order
#------------------------------------------------------------

CREATE TABLE order_client(
                             order_id          Int  Auto_increment  NOT NULL ,
                             order_number      Varchar (10) ,
                             order_in          Datetime ,
                             order_on          Datetime ,
                             order_out         Datetime ,
                             order_remark      Text ,
                             order_statut      Int ,
                             order_total_price  DECIMAL (15,2)  default 0  ,
                             waiting_id        Int  NULL,
                             user_id           Int  NULL
    ,CONSTRAINT order_PK PRIMARY KEY (order_id)

    ,CONSTRAINT order_waiting_FK FOREIGN KEY (waiting_id) REFERENCES waiting(waiting_id)
    ,CONSTRAINT order_user0_FK FOREIGN KEY (user_id) REFERENCES user(user_id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: category
#------------------------------------------------------------

CREATE TABLE category(
                         cat_id        Int  Auto_increment  NOT NULL ,
                         cat_name      Varchar (30) ,
                         cat_pic_count Int
    ,CONSTRAINT category_PK PRIMARY KEY (cat_id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: product
#------------------------------------------------------------

CREATE TABLE product(
                        product_id        Int  Auto_increment  NOT NULL ,
                        product_ref       Varchar (100) ,
                        product_name      Varchar (200) ,
                        product_desig     Varchar (500) ,
                        product_price      DECIMAL (15,2)  default 0  ,
                        product_pic_count Int ,
                        cat_id            Int  NULL
    ,CONSTRAINT product_PK PRIMARY KEY (product_id)

    ,CONSTRAINT product_category_FK FOREIGN KEY (cat_id) REFERENCES category(cat_id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: option
#------------------------------------------------------------

CREATE TABLE option_add(
                       option_id Int  Auto_increment  NOT NULL ,
                       option_type  Int ,
                       option_name Varchar (200) ,
                       option_price  DECIMAL (15,2)  default 0  ,
                       option_pic_count Int
    ,CONSTRAINT option_PK PRIMARY KEY (option_id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: product_detail
#------------------------------------------------------------

CREATE TABLE product_detail(
                               detail_id  Int  Auto_increment  NOT NULL ,
                               product_id Int NOT NULL ,
                               order_id   Int NOT NULL
    ,CONSTRAINT product_detail_PK PRIMARY KEY (detail_id)

    ,CONSTRAINT product_detail_product_FK FOREIGN KEY (product_id) REFERENCES product(product_id)
    ,CONSTRAINT product_detail_order0_FK FOREIGN KEY (order_id) REFERENCES order_client(order_id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: product_option
#------------------------------------------------------------

CREATE TABLE product_option(
                               option_id Int NOT NULL ,
                               detail_id  Int NOT NULL
    ,CONSTRAINT product_option_PK PRIMARY KEY (option_id,detail_id)

    ,CONSTRAINT product_option_option_FK FOREIGN KEY (option_id) REFERENCES option_add(option_id)
    ,CONSTRAINT product_option_product_detail0_FK FOREIGN KEY (detail_id) REFERENCES product_detail(detail_id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: option_cat
#------------------------------------------------------------

CREATE TABLE option_cat(
                           option_id Int NOT NULL ,
                           cat_id     Int NOT NULL
    ,CONSTRAINT option_cat_PK PRIMARY KEY (option_id,cat_id)

    ,CONSTRAINT option_cat_option_FK FOREIGN KEY (option_id) REFERENCES option_add(option_id)
    ,CONSTRAINT option_cat_category0_FK FOREIGN KEY (cat_id) REFERENCES category(cat_id)
)ENGINE=InnoDB;


