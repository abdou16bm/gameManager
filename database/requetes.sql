SELECT *,product_detail.detail_id "detail_id"
        ,coalesce(GROUP_CONCAT( CASE WHEN option_type = 1 THEN CONCAT(option_name) ELSE NULL END
                                ORDER BY product_detail.detail_id ASC SEPARATOR ","),"") AS sauces
        ,coalesce(GROUP_CONCAT( CASE WHEN option_type = 2 THEN CONCAT(option_name) ELSE NULL END
                                ORDER BY product_detail.detail_id ASC SEPARATOR ","),"") AS supplements
        ,coalesce(GROUP_CONCAT( CASE WHEN option_type = 3 THEN CONCAT(option_name) ELSE NULL END
                                ORDER BY product_detail.detail_id ASC SEPARATOR ","),"") AS others
        ,coalesce(CONCAT("[",GROUP_CONCAT( CASE WHEN option_type = 1 THEN CONCAT(option_name," ",option_price) ELSE NULL END
                                           ORDER BY product_detail.detail_id ASC SEPARATOR ","),"]"),"") AS saucesPrices
        ,coalesce(CONCAT("[",GROUP_CONCAT( CASE WHEN option_type = 2 THEN CONCAT(option_name," ",option_price) ELSE NULL END
                                           ORDER BY product_detail.detail_id ASC SEPARATOR ","),"]"),"") AS supplementsPrices
        ,coalesce(CONCAT("[",GROUP_CONCAT( CASE WHEN option_type = 3 THEN CONCAT(option_name," ",option_price) ELSE NULL END
                                           ORDER BY product_detail.detail_id ASC SEPARATOR ","),"]"),"") AS othersPrices
        ,coalesce(CONCAT("[",GROUP_CONCAT(option_name," ",option_price,"DA"),"]"),0) "options1"
        ,coalesce(sum(option_price),0)"options_price",(coalesce(sum(option_price),0)+product.product_price)"detail_price"
from order_client
         inner join product_detail on product_detail.order_id = order_client.order_id
         inner join product on product_detail.product_id = product.product_id
         left join product_option  on product_detail.detail_id = product_option.detail_id
         left join option_add on product_option.option_id = option_add.option_id
where order_client.order_id = 24
group by product_detail.detail_id


    SELECT  *,product_detail.detail_id "detail_id"
     ,coalesce(GROUP_CONCAT( CASE WHEN option_type = 1 THEN CONCAT(option_name) ELSE NULL END
                               ORDER BY product_detail.detail_id ASC SEPARATOR ","),"") AS sauces
     ,coalesce(GROUP_CONCAT( CASE WHEN option_type = 2 THEN CONCAT(option_name) ELSE NULL END
                               ORDER BY product_detail.detail_id ASC SEPARATOR ","),"") AS supplements
     ,coalesce(GROUP_CONCAT( CASE WHEN option_type = 3 THEN CONCAT(option_name) ELSE NULL END
                             ORDER BY product_detail.detail_id ASC SEPARATOR ","),"") AS others
     ,coalesce(CONCAT("[",GROUP_CONCAT( CASE WHEN option_type = 1 THEN CONCAT(option_name," ",option_price) ELSE NULL END
    ORDER BY product_detail.detail_id ASC SEPARATOR ","),"]"),"") AS saucesPrices
     ,coalesce(CONCAT("[",GROUP_CONCAT( CASE WHEN option_type = 2 THEN CONCAT(option_name," ",option_price) ELSE NULL END
    ORDER BY product_detail.detail_id ASC SEPARATOR ","),"]"),"") AS supplementsPrices
     ,coalesce(CONCAT("[",GROUP_CONCAT( CASE WHEN option_type = 3 THEN CONCAT(option_name," ",option_price) ELSE NULL END
    ORDER BY product_detail.detail_id ASC SEPARATOR ","),"]"),"") AS othersPrices
     ,coalesce(CONCAT("[",GROUP_CONCAT(option_name," ",option_price,"DA"),"]"),0) "options1"
     ,coalesce(sum(option_price),0)"options_price",(coalesce(sum(option_price),0)+product.product_price)"detail_price"
from order_client
         inner join product_detail on product_detail.order_id = order_client.order_id
         inner join product on product_detail.product_id = product.product_id
         left join product_option  on product_detail.detail_id = product_option.detail_id
         left join option_add on product_option.option_id = option_add.option_id
where order_client.order_id = 24
group by product_detail.detail_id;





SELECT order_client.order_id,product_detail.detail_id
                            ,product.product_id,product_price
#      ,option_price
                            ,coalesce(sum(option_price),0), (coalesce(sum(option_price),0)+product_price) as "total"
#        ,sum(product_price), (sum(option_price)+sum(product_price))"total"
from order_client
         inner join product_detail on product_detail.order_id = order_client.order_id
         inner join product on product_detail.product_id = product.product_id
         left join product_option  on product_detail.detail_id = product_option.detail_id
         left join option_add on product_option.option_id = option_add.option_id
where order_client.order_id = 29
group by product_detail.detail_id
order by detail_id



# calcule de la somme order
select sum(totalPrice) from product_detail
                                inner join
                            (SELECT product_detail.detail_id
                                  ,(coalesce(sum(option_price),0)+product_price) as "totalPrice"
                             from order_client
                                      inner join product_detail on product_detail.order_id = order_client.order_id
                                      inner join product on product_detail.product_id = product.product_id
                                      left join product_option  on product_detail.detail_id = product_option.detail_id
                                      left join option_add on product_option.option_id = option_add.option_id
                             where order_client.order_id = 29
                             group by product_detail.detail_id) total_table
                            on total_table.detail_id = product_detail.detail_id
group by order_id





delete from product_option
where detail_id in (    select detail_id from product_detail
                        where order_id = 38);
delete from product_detail
where order_id = 38;
delete from order_client
where order_id = 38
