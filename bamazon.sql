DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Plasma TV", "electronics", 250.00, 600);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Winter Coat", "clothing", 170.95, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bed Frame", "furniture", 550.00, 330);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Vans High Top", "shoes", 75.00, 4000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPod", "electronics", 100.00, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bike", "outdoor equipment", 175.95, 900);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Paint Brush", "arts", 5.75, 3000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Carry On", "luggage", 50.00, 400);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dog Leash", "pet supplies", 17.50, 4000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Vitamins", "health", 18.75, 675);

SELECT * FROM products;