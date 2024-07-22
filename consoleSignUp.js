const inquirer = require("inquirer");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("./Models/Users");

var questions = [
  {
    type: "input",
    name: "name",
    message: "Enter name: ",
  },
  {
    type: "input",
    name: "email",
    message: "Enter email: ",
  },
  {
    type: "input",
    name: "password",
    message: "Enter password: ",
  },
];

inquirer.prompt(questions).then(async (answers) => {
  try {
    const salt = bcrypt.genSaltSync(saltRounds);
    let encPassword = bcrypt.hashSync(answers["password"], salt);
    let user = {
      name: answers["name"],
      email: answers["email"],
      password: encPassword,
    };
    user = await User.create(user);
    console.log("User has been successfully created");
  } catch (error) {
    console.log("Something went wrong!", error);
  }
});
