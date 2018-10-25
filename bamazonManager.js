var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    runSearch();
});

function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product",
                "Exit",
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View Products for Sale":
                    viewProducts();
                    break;

                case "View Low Inventory":
                    lowInventory();
                    break;

                case "Add to Inventory":
                    addInventory();
                    break;

                case "Add New Product":
                    addNewProduct();
                    break;

                case "Exit":
                    connection.end();
                    break;
            }
        });
}

function viewProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(
                res[i].item_id + " | " +
                "Product Name: " + res[i].product_name + " | " +
                "Department Name: " + res[i].department_name + " | " +
                "Price: " + res[i].price + " | " +
                "Stock: " + res[i].stock_quantity + " | "

            );
        }
        console.log("-----------------------------------");
        runSearch();
    });
}

function lowInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity < 100) {
                console.log(
                    "Product with Stock Less Than 100 units: " +
                    res[i].product_name,
                    res[i].stock_quantity,
                );
            }

            else {
                res.length = 0,
                    console.log("-----------------------------------");

                console.log("No products less than 100 units.")
            }
        }
        console.log("-----------------------------------");
        runSearch();
    });
}

// TO DO: fix this function //
function addInventory() {
    inquirer.prompt([
        {
            name: "itemId",
            type: "input",
            message: "Enter item ID to add inventory to.",
        },
        {
            name: "amount",
            type: "input",
            message: "How much?"
        }
    ])
        .then(function (answer) {
            connection.query(
                "UPDATE products SET ? WHERE ?",
                {
                    item_id: answer.item_id,
                    stock_quantity: answer.amount
                },
                function (err, res) {
                    console.log("Inventory Updated"),
                        console.log(res),
                        runSearch();
                });
        })
}

function addNewProduct() {
    inquirer.prompt([
        {
            name: "item",
            type: "input",
            message: "Product Name?"
        },
        {
            name: "department",
            type: "input",
            message: "Department Name?"
        },
        {
            name: "price",
            type: "input",
            message: "Price?",

        },
        {
            name: "stock",
            type: "input",
            message: "Stock Quantity?",
        }
    ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO products SET ?",
                {
                    product_name: answer.item,
                    department_name: answer.department,
                    price: answer.price,
                    stock_quantity: answer.stock,
                },
                function (err, res) {
                    if (err) throw err;
                    console.log("Your item has been added.");
                    runSearch();
                }

            );

        });

}