const mysql = require ('mysql');
const inquirer = require ('inquirer');
const util = require('util');

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Myles123",
    database: "employee_db"
  });


  connection.query = util.promisify(connection.query)
  connection.connect(function(err) {
    if (err) throw err;
    // console.log('success')
    runSearch();
  });

  const addEmpPrompt = [
    {
      name: "first_name",
      message: "Add employee's first name."
    },
    {
      name: "last_name",
      message: "Add employee's last name."
    },
    {
      name: "title",
      message: "Add employee's title."
    },
    {
      name: "department",
      message: "Add employee's department."
    },
    {
      name: "salary",
      message: "Add employee's salary."
    },
    {
      name: "manager",
      message: "Add employee's manager."
    }

  ]

  function runSearch() {
    inquirer
      .prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
          "View all employees",
          "View all employees by department",
          "View all employees by manager",
          "Add employee",
          "Remove employee",
          "Update employee role",
          "Update employee manager"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "View all employees":
            viewAll();
          break;
  
        case "View all employees by department":
            viewByDept();
          break;
  
        case "View all employees by manager":
            viewByMan();
          break;
  
        case "Add employee":
            addEmp();
          break;
  
        case "Remove employee":
          removeEmp();
          break;
        
        case "Update employee role":
            updateEmp();
            break;
        
        case "Update employee manager":
          updateMan();
            break;
        }
        })
      

}

function viewAll(){
  connection.query("SELECT * FROM employee").then(function(res) {
        for (var i = 0; i < res.length; i++) {
           
          console.table(res[i].id + " | " + res[i].first_name+ " | " + res[i].last_name + " | " + res[i].title + " | " + res[i].department + " | " + res[i].salary + " | " + res[i].manager);
        }
        setTimeout(() => runSearch(), 500);
      });
      

};


function viewByDept(){
  inquirer
  .prompt({
    name: "action",
    type: "list",
    message: "What department are you looking for?",
    choices: [
      "Manager",
      "Sales",
      "Engineer"
    ]
  })
  .then(function(answer) {
    connection.query("SELECT * FROM employee").then(function(res) {
        for (var i = 0; i < res.length; i++) {
           if(answer.action === res[i].department){
          console.table(res[i]);
           } else if(answer.action !== res[i].department){
            console.log('Department not found.');
            
          }
       }
       setTimeout(() => runSearch(), 1000);
      });
      

    }
  
  )};


function viewByMan(){
  inquirer
  .prompt({
    name: "action",
    type: "list",
    message: "Please select manager.",
    choices: [
      "Travis",
      "Versace",
      "Neo"
    ]
  })
  .then(function(answer) {
    connection.query("SELECT * FROM employee").then(function(res){
        for (var i = 0; i < res.length; i++) {
           if(answer.action === res[i].manager){
          console.table(res[i]);
           } else if(answer.action !== res[i].manager){
            console.log('Department not found.');
            
          }
       }
       setTimeout(() => runSearch(), 1000);
      });
      
    }
  
  )};

  function addEmp(){
    inquirer
    .prompt(addEmpPrompt)
    .then(function(answer) {
      connection.query("INSERT INTO employee SET ?", answer).then(function(res) {
         setTimeout(() => runSearch(), 1000);
        });
      }
    
    )};
  
async function removeEmp(){
const employees = await connection.query("SELECT * FROM employee")
const empDisplay = employees.map(a=> a.id + " " +a.first_name + ' ' + a.last_name)
const {remove} = await inquirer.prompt(
    {
      name: "remove",
      type: "list",
      choices: empDisplay,
      message: "Which employee would you like to remove?"
    }
  )
await connection.query(`DELETE FROM employee WHERE id = ${remove.split(' ')[0]}`)
console.log('removed '+remove)
};


async function updateEmp(){
  const employee = await connection.query("SELECT * FROM employee")
  const employeeDisplay = employee.map(a=> a.id + " " +a.first_name + ' ' + a.last_name + ' | ' + a.title)
  const {update} = await inquirer.prompt([
      {
        name: "employee",
        type: "list",
        choices: employeeDisplay,
        message: "Which employee would you like to update?"
      },
      {
        name: "update",
        message: "Update employee role."
      }
  ])
  var upd = `UPDATE employee SET title = "${update}" WHERE id = 1`;
  await connection.query(upd)
  console.log('updated' + update)

  setTimeout(() => runSearch(), 1000);
    
  };


  async function updateMan(){
    const employee = await connection.query("SELECT * FROM employee")
    const employeeDisplay = employee.map(a=> a.id + " " +a.first_name + ' ' + a.last_name + ' | ' + a.title + ' | ' + a.manager)
    const {update} = await inquirer.prompt([
        {
          name: "employee",
          type: "list",
          choices: employeeDisplay,
          message: "Which employee would you like to update?"
        },
        {
          name: "update",
          message: "Update employee manager."
        }
    ])
    var upd = `UPDATE employee SET manager = "${update}" WHERE id = 1`;
    await connection.query(upd)
    console.log('updated' + update)
  
    setTimeout(() => runSearch(), 1000);
      
    };

