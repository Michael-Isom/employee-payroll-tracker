const inquirer = require('inquirer');

// Use inquirer.prompt directly
inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'What is your name?',
  }
]).then(answers => {
  console.log(`Hello, ${answers.name}!`);
});
inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'What is your name?',
  }
]).then(answers => {
  console.log(`Hello, ${answers.name}!`);
});
import { Pool } from 'pg';
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
export default pool;

const createDepartmentsTable = `
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50)
);
`;

const createRolesTable = `
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50),
    salary NUMERIC,
    department_id INT REFERENCES departments(id)
);
`;

const createEmployeesTable = `
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    role_id INT REFERENCES roles(id),
    manager_id INT REFERENCES employees(id)
);
`;

db.none(createDepartmentsTable)
  .then(() => db.none(createRolesTable))
  .then(() => db.none(createEmployeesTable))
  .then(() => {
    console.log('Tables created successfully.');
    pgp.end();
  })
  .catch((error) => {
    console.error('Error creating tables:', error);
    pgp.end();
  });
  export default db; inquirer.prompt