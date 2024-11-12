import inquirer from 'inquirer';
import pool from './db.mjs';

async function askQuestions() {
  const choices = [
    'View All Employees',
    'Add Employee',
    'Remove Employee',
    'Exit'
  ];

  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: choices,
    },
  ]);

  switch (action) {
    case 'View All Employees':
      await viewAllEmployees();
      break;
    case 'Add Employee':
      await addEmployee();
      break;
    case 'Remove Employee':
      await removeEmployee();
      break;
    case 'Exit':
      console.log('Goodbye!');
      process.exit();
  }
}

async function viewAllEmployees() {
  try {
    const result = await pool.query('SELECT * FROM employees');
    console.table(result.rows);
  } catch (error) {
    console.error('Error fetching employees:', error);
  }
  await askQuestions(); // Return to main menu
}

async function addEmployee() {
  try {
    const answers = await inquirer.prompt([
      { name: 'first_name', message: 'First Name:' },
      { name: 'last_name', message: 'Last Name:' },
      { name: 'department', message: 'Department:' },
      {
        name: 'salary',
        message: 'Salary:',
        validate: (val) => (!isNaN(val) ? true : 'Please enter a valid number'),
      },
    ]);

    await pool.query(
      'INSERT INTO employees (first_name, last_name, department, salary) VALUES ($1, $2, $3, $4)',
      [answers.first_name, answers.last_name, answers.department, answers.salary]
    );
    console.log('Employee added successfully!');
  } catch (error) {
    console.error('Error adding employee:', error);
  }
  await askQuestions(); // Return to main menu
}

async function removeEmployee() {
  try {
    const result = await pool.query('SELECT id, first_name, last_name FROM employees');
    const employees = result.rows.map((emp) => ({
      name: `${emp.first_name} ${emp.last_name}`,
      value: emp.id,
    }));

    const { employeeId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: 'Which employee would you like to remove?',
        choices: employees,
      },
    ]);

    await pool.query('DELETE FROM employees WHERE id = $1', [employeeId]);
    console.log('Employee removed successfully!');
  } catch (error) {
    console.error('Error removing employee:', error);
  }
  await askQuestions(); // Return to main menu
}

// Start the application
askQuestions();