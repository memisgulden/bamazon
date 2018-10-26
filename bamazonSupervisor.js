var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

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
                "View Product Sales by Department",
                "Create New Department",
                "Exit",
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View Product Sales by Department":
                    viewProductbyDept();
                    break;

                case "Create New Department":
                    createNewDept();
                    break;

                case "Exit":
                    connection.end();
                    break;
            }
        });
}

function viewProductbyDept() {
    connection.query("SELECT * FROM products", function (err, res) {

        var table = new Table({
            head: ['department_id', 'department_name', 'over_head_costs', 'product_sales', 'total_profit']
        });

        for (var i = 0; i < res.length; i++) {

            table.push(

                [res[i].item_id, res[i].department_name, res[i].item_id, res[i].price, res[i].price]

            );

        }


        console.log(table.toString());
        runSearch();

    });
}

function createNewDept() {
    console.log("create");

    runSearch();


}

