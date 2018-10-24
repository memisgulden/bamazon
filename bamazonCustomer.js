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
    productView();
});

function productView() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            console.log(
                res[i].item_id + " | " +
                "Product Name: " + res[i].product_name + " | " +
                "Department Name: " + res[i].department_name + " | " +
                "Price: " + res[i].price + " | "
            );
        }
        console.log("-----------------------------------");

        userPrompts();

    });
}

// Prompt user 2 Questions: 1-user pick ID for product they want to buy 2- units? //
function userPrompts() {
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "Enter an ID number for the item you would like to purchase?",
        },
        {
            name: "units",
            type: "input",
            message: "How many units?",
        }
    ])
        .then(function (answer) {
            connection.query("SELECT * FROM products WHERE ?", { item_id: answer.id }, function(err, res) {

                if (answer.units > res[0].stock_quantity){
                    console.log("Insufficient quantity!");
                    connection.end();
                }
                else {
                connection.query("UPDATE products SET stock_quantity = stock_quantity-? WHERE item_id = ? ", 
                [ answer.units, answer.id ], function(err, res) {
                    // console.log(answer.units);
                });
                    console.log("New Stock Quantity: " + res[0].stock_quantity);
                var customerPrice = res[0].price * answer.units;
                    console.log("Your Price: " + customerPrice);
                }
        })
    });

}


