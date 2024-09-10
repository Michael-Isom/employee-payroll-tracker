CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50),
    salary NUMERIC,
    department_id INT REFERENCES departments(id)
);

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    role_id INT REFERENCES roles(id),
    manager_id INT REFERENCES employees(id)
);