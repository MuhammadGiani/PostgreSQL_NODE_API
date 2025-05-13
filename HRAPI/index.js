const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();
const app = express();

//******************* */
const { Pool } = require('pg');
const path = require('path'); // Add this line

app.use(express.static(path.join(__dirname, 'public')));
//******************* */

app.use(cors());
app.use(express.json());

//here you will do coding
app.get('/', async (req, res) => {
    try {
        res.json('WELCOME TO HR API')
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});

//first API
app.get('/region', async (req, res) => {
    try {
        const result = await pool.query('select * from regions');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});

//for countries
app.get('/country', async (req, res) => {
    try {
        const result = await pool.query('select * from countries');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});

app.get('/employee', async (req, res) => {
    try {
        const result = await pool.query('select * from employees');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

//Jobs
app.get('/job', async (req, res) => {
    try {
        const result = await pool.query('select * from jobs');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

//depts
app.get('/department', async (req, res) => {
    try {
        const result = await pool.query('select * from departments');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

//locations
app.get('/location', async (req, res) => {
    try {
        const result = await pool.query('select * from locations');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

//for employees COUNT
app.get('/totalemp', async (req, res) => {
    try {
        const result = await pool.query('select count(employee_id) as "Total_Employees" from employees');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});

//total countries
app.get('/totalcountries', async (req, res) => {
    try {
        const result = await pool.query('select count(country_id) as "Total_countries" from countries');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});

//total locations
app.get('/totalLoc', async (req, res) => {
    try {
        const result = await pool.query('select count(location_id) as "Total_Locations" from locations');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});

//total regions
app.get('/totalReg', async (req, res) => {
    try {
        const result = await pool.query('select count(region_id) as "Total_Regions" from regions');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});

//for jobs COUNT
app.get('/totalJobs', async (req, res) => {
    try {
        const result = await pool.query('select count(job_id) as "Total_Jobs" from jobs');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});

//********************************************* */
app.get('/q50', async (req, res) => {
    try {
        const result = await pool.query('SELECT jh.employee_id, e.first_name, e.last_name, j.job_title, c.country_name FROM job_history jh JOIN employees e ON jh.employee_id = e.employee_id JOIN jobs j ON jh.job_id = j.job_id JOIN departments d ON jh.department_id = d.department_id JOIN locations l ON d.location_id = l.location_id JOIN countries c ON l.country_id = c.country_id;');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});

//************************************* */
app.get('/q51', async (req, res) => {
    try {
        const result = await pool.query('SELECT r.region_name, c.country_name, l.city, l.street_address FROM regions r JOIN countries c ON r.region_id = c.region_id JOIN locations l ON c.country_id = l.country_id;');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});



////************************************* */
app.get('/q52', async (req, res) => {
    try {
        const result = await pool.query('SELECT c.country_name, r.region_name, l.city, l.street_address FROM countries c JOIN regions r ON c.region_id = r.region_id JOIN locations l ON c.country_id = l.country_id;');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});




////************************************* */
app.get('/q53', async (req, res) => {
    try {
        const result = await pool.query('SELECT l.street_address, l.city, c.country_name, r.region_name FROM locations l JOIN countries c ON l.country_id = c.country_id JOIN regions r ON c.region_id = r.region_id;');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});



////************************************* */
app.get('/q54', async (req, res) => {
    try {
        const result = await pool.query('SELECT d.department_name, e.first_name, e.last_name, l.city, l.street_address FROM departments d JOIN employees e ON d.department_id = e.department_id JOIN locations l ON d.location_id = l.location_id;');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});



//************************************* */
app.get('/q55', async (req, res) => {
    try {
        const result = await pool.query('SELECT e.first_name, e.last_name, d.department_name, l.city, c.country_name FROM employees e JOIN departments d ON e.department_id = d.department_id JOIN locations l ON d.location_id = l.location_id JOIN countries c ON l.country_id = c.country_id;');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});



////************************************* */
app.get('/q56', async (req, res) => {
    try {
        const result = await pool.query('SELECT e.first_name AS employee_first_name, e.last_name AS employee_last_name, m.first_name AS manager_first_name, m.last_name AS manager_last_name, d.department_name, l.city FROM employees e LEFT JOIN employees m ON e.manager_id = m.employee_id JOIN departments d ON e.department_id = d.department_id JOIN locations l ON d.location_id = l.location_id;');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});




////************************************* */
app.get('/q57', async (req, res) => {
    try {
        const result = await pool.query('SELECT e.first_name, e.last_name, j.job_title, d.department_name, l.city FROM employees e JOIN jobs j ON e.job_id = j.job_id JOIN departments d ON e.department_id = d.department_id JOIN locations l ON d.location_id = l.location_id;');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});



////************************************* */
app.get('/q58', async (req, res) => {
    try {
        const result = await pool.query('SELECT e.first_name AS employee_first_name, e.last_name AS employee_last_name, j.job_title, d.department_name, m.first_name AS manager_first_name, m.last_name AS manager_last_name FROM employees e JOIN jobs j ON e.job_id = j.job_id JOIN departments d ON e.department_id = d.department_id LEFT JOIN employees m ON e.manager_id = m.employee_id;');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});



//************************************* */
app.get('/q59', async (req, res) => {
    try {
        const result = await pool.query('SELECT e.first_name AS employee_first_name, e.last_name AS employee_last_name, j.job_title, d.department_name, m.first_name AS manager_first_name, m.last_name AS manager_last_name, l.city, l.street_address FROM employees e JOIN jobs j ON e.job_id = j.job_id JOIN departments d ON e.department_id = d.department_id JOIN locations l ON d.location_id = l.location_id LEFT JOIN employees m ON e.manager_id = m.employee_id;');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});



////************************************* */
app.get('/q60', async (req, res) => {
    try {
        const result = await pool.query('SELECT country_name FROM countries WHERE region_id = 1;');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});




////************************************* */
app.get('/q61', async (req, res) => {
    try {
        const result = await pool.query(`SELECT d.department_name FROM departments d JOIN locations l ON d.location_id = l.location_id WHERE l.city LIKE 'N%';`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});



////************************************* */
app.get('/62', async (req, res) => {
    try {
        const result = await pool.query('SELECT e.first_name, e.last_name FROM employees e JOIN departments d ON e.department_id = d.department_id JOIN employees m ON d.manager_id = m.employee_id WHERE m.commission_pct > 0.15;');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});



//************************************* */
app.get('/q63', async (req, res) => {
    try {
        const result = await pool.query('SELECT DISTINCT j.job_title FROM jobs j JOIN employees e ON j.job_id = e.job_id WHERE e.employee_id IN (SELECT DISTINCT manager_id FROM employees WHERE manager_id IS NOT NULL);');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});



////************************************* */
app.get('/q64', async (req, res) => {
    try {
        const result = await pool.query(`SELECT DISTINCT l.postal_code FROM locations l JOIN countries c ON l.country_id = c.country_id JOIN regions r ON c.region_id = r.region_id WHERE r.region_name = 'Asia';`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});




////************************************* */
app.get('/q65', async (req, res) => {
    try {
        const result = await pool.query('SELECT DISTINCT d.department_name FROM departments d JOIN employees e ON d.department_id = e.department_id WHERE e.commission_pct < (SELECT AVG(commission_pct) FROM employees WHERE commission_pct IS NOT NULL);');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});



////************************************* */
app.get('/q66', async (req, res) => {
    try {
        const result = await pool.query('SELECT DISTINCT j.job_title FROM employees e JOIN jobs j ON e.job_id = j.job_id WHERE e.salary > (SELECT AVG(salary) FROM employees WHERE department_id = e.department_id);');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});



//************************************* */
app.get('/q67', async (req, res) => {
    try {
        const result = await pool.query('SELECT employee_id FROM employees WHERE department_id IS NULL;');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});



////************************************* */
app.get('/q68', async (req, res) => {
    try {
        const result = await pool.query('SELECT e.first_name, e.last_name FROM employees e WHERE e.employee_id IN (SELECT employee_id FROM job_history GROUP BY employee_id HAVING COUNT(DISTINCT job_id) > 1);');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});




////************************************* */
app.get('/q69', async (req, res) => {
    try {
        const result = await pool.query('SELECT d.department_name, COUNT(e.employee_id) AS employee_count FROM departments d LEFT JOIN employees e ON d.department_id = e.department_id GROUP BY d.department_name;');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});



////************************************* */
app.get('/q70', async (req, res) => {
    try {
        const result = await pool.query('SELECT j.job_title, SUM(e.salary) AS total_salary FROM jobs j JOIN employees e ON j.job_id = e.job_id GROUP BY j.job_title;');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});



//************************************* */
app.get('/q71', async (req, res) => {
    try {
        const result = await pool.query('SELECT d.department_name, AVG(e.commission_pct) AS avg_commission FROM departments d JOIN employees e ON d.department_id = e.department_id GROUP BY d.department_name;');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});



////************************************* */
app.get('/72', async (req, res) => {
    try {
        const result = await pool.query('SELECT c.country_name, MAX(e.salary) AS max_salary FROM countries c JOIN locations l ON c.country_id = l.country_id JOIN departments d ON l.location_id = d.location_id JOIN employees e ON d.department_id = e.department_id GROUP BY c.country_name;');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});




////************************************* */
app.get('/73', async (req, res) => {
    try {
        const result = await pool.query('SELECT e.first_name, e.last_name, d.department_name, l.city, l.state_province FROM employees e JOIN departments d ON e.department_id = d.department_id JOIN locations l ON d.location_id = l.location_id WHERE e.first_name ILIKE '%z%';');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});



////************************************* */
app.get('/74', async (req, res) => {
    try {
        const result = await pool.query(`SELECT j.job_title, d.department_name, e.first_name || ' ' || e.last_name AS full_name, jh.start_date FROM job_history jh JOIN jobs j ON jh.job_id = j.job_id JOIN departments d ON jh.department_id = d.department_id JOIN employees e ON jh.employee_id = e.employee_id WHERE jh.start_date >= '1993-01-01' AND jh.end_date <= '1997-08-31';`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});



//************************************* */
app.get('/75', async (req, res) => {
    try {
        const result = await pool.query(`SELECT j.job_title, d.department_name, e.first_name || ' ' || e.last_name AS full_name, jh.start_date FROM job_history jh JOIN jobs j ON jh.job_id = j.job_id JOIN departments d ON jh.department_id = d.department_id JOIN employees e ON jh.employee_id = e.employee_id WHERE jh.start_date >= '1993-01-01' AND jh.end_date <= '1997-08-31';`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});



////************************************* */
app.get('/q76', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.first_name || ' ' || e.last_name AS full_name, j.job_title, jh.start_date, jh.end_date FROM employees e JOIN job_history jh ON e.employee_id = jh.employee_id JOIN jobs j ON jh.job_id = j.job_id WHERE e.commission_pct IS NULL;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});




////************************************* */
app.get('/q77', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.first_name || ' ' || e.last_name AS full_name, e.employee_id, c.country_name FROM employees e JOIN departments d ON e.department_id = d.department_id JOIN locations l ON d.location_id = l.location_id JOIN countries c ON l.country_id = c.country_id;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});




////************************************* */
app.get('/q78', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.first_name, e.last_name, e.salary, e.department_id FROM employees e WHERE e.salary = (SELECT MIN(salary) FROM employees WHERE department_id = e.department_id);`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});




////************************************* */
app.get('/q79', async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM employees WHERE salary = (SELECT DISTINCT salary FROM employees ORDER BY salary DESC OFFSET 2 LIMIT 1);`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});




////************************************* */
app.get('/q80', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.employee_id, e.first_name || ' ' || e.last_name AS full_name, e.salary FROM employees e WHERE e.salary > (SELECT AVG(salary) FROM employees) AND e.department_id IN (SELECT department_id FROM employees WHERE first_name ILIKE '%j%' OR last_name ILIKE '%j%');`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});




////************************************* */
app.get('/q81', async (req, res) => {
    try {
        const result = await pool.query(`SELECT department_id, SUM(salary) AS total_salary FROM employees GROUP BY department_id HAVING COUNT(*) > 0;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});




////************************************* */
app.get('/q82', async (req, res) => {
    try {
        const result = await pool.query(`SELECT employee_id, first_name, last_name, salary, CASE WHEN salary > (SELECT AVG(salary) FROM employees) THEN 'HIGH' ELSE 'LOW' END AS salary_status FROM employees;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});




////************************************* */
app.get('/q83', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.* FROM employees e JOIN departments d ON e.department_id = d.department_id JOIN locations l ON d.location_id = l.location_id JOIN countries c ON l.country_id = c.country_id WHERE c.country_name = 'United Kingdom';`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});




////************************************* */
app.get('/q84', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.first_name, e.last_name, e.salary, e.department_id FROM employees e JOIN (SELECT department_id, SUM(salary) AS dept_total FROM employees GROUP BY department_id) dt ON e.department_id = dt.department_id WHERE e.salary > 0.5 * dt.dept_total;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});




////************************************* */
app.get('/q85', async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM employees WHERE employee_id IN (SELECT DISTINCT manager_id FROM departments WHERE manager_id IS NOT NULL UNION SELECT DISTINCT manager_id FROM employees WHERE manager_id IS NOT NULL);`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});




////************************************* */
app.get('/q86', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.employee_id, e.first_name || ' ' || e.last_name AS full_name, e.salary, d.department_name, l.city FROM employees e JOIN departments d ON e.department_id = d.department_id JOIN locations l ON d.location_id = l.location_id WHERE e.salary = (SELECT MAX(salary) FROM employees WHERE hire_date BETWEEN '2002-01-01' AND '2003-12-31');`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});




////************************************* */
app.get('/q87', async (req, res) => {
    try {
        const result = await pool.query(`SELECT first_name, last_name, salary, department_id FROM employees WHERE salary < (SELECT AVG(salary) FROM employees) AND department_id = (SELECT department_id FROM employees WHERE first_name = 'Laura' LIMIT 1);`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});




////************************************* */
app.get('/q88', async (req, res) => {
    try {
        const result = await pool.query(`SELECT d.* FROM departments d WHERE department_id IN (SELECT department_id FROM job_history GROUP BY department_id HAVING MAX((SELECT salary FROM employees WHERE employees.employee_id = job_history.employee_id)) >= 7000);`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});




////************************************* */
app.get('/q89', async (req, res) => {
    try {
        const result = await pool.query(`SELECT r.region_name, MIN(LENGTH(l.postal_code)) AS min_postal_length FROM regions r JOIN countries c ON r.region_id = c.region_id JOIN locations l ON c.country_id = l.country_id GROUP BY r.region_name;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});




////************************************* */
app.get('/q90', async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM employees ORDER BY hire_date DESC;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});




////************************************* */
app.get('/q91', async (req, res) => {
    try {
        const result = await pool.query(`SELECT c.country_name, COUNT(l.location_id) AS location_count FROM countries c JOIN locations l ON c.country_id = l.country_id GROUP BY c.country_name ORDER BY location_count DESC;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});




////************************************* */
app.get('/q92', async (req, res) => {
    try {
        const result = await pool.query(`SELECT d.department_name, COUNT(e.employee_id) AS employee_count FROM departments d JOIN employees e ON d.department_id = e.department_id GROUP BY d.department_name HAVING COUNT(e.employee_id) > 5;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});




////************************************* */
app.get('/q93', async (req, res) => {
    try {
        const result = await pool.query(`SELECT j.job_title, AVG(e.salary) AS avg_salary FROM jobs j JOIN employees e ON j.job_id = e.job_id GROUP BY j.job_title HAVING AVG(e.salary) > 15000;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});




////************************************* */
app.get('/q94', async (req, res) => {
    try {
        const result = await pool.query(`SELECT c.country_name FROM countries c JOIN locations l ON c.country_id = l.country_id GROUP BY c.country_name HAVING COUNT(l.location_id) > 3;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});




////************************************* */
app.get('/q95', async (req, res) => {
    try {
        const result = await pool.query(`SELECT employee_id, LENGTH(first_name) AS first_name_length FROM employees;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});




////************************************* */
app.get('/q96', async (req, res) => {
    try {
        const result = await pool.query(`SELECT country_id, UPPER(country_name) AS country_name_upper FROM countries;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});




////************************************* */
app.get('/q97', async (req, res) => {
    try {
        const result = await pool.query(`SELECT job_id, LEFT(job_title, 3) AS job_title_prefix FROM jobs;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});




////************************************* */
app.get('/q98', async (req, res) => {
    try {
        const result = await pool.query(`SELECT location_id, RIGHT(postal_code, 4) AS postal_code_suffix FROM locations;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
});

//****************************************************************************************** */


// API Endpoints for all 7 tables

// 1. Employees
app.get('/api/employees', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM employees ORDER BY employee_id');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching employees:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 2. Departments
app.get('/api/departments', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM departments ORDER BY department_id');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Jobs
app.get('/api/jobs', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM jobs ORDER BY job_id');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Locations
app.get('/api/locations', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT location_id, street_address, postal_code, city, state_province, country_id 
      FROM locations
      ORDER BY location_id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Countries
app.get('/api/countries', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT country_id, country_name, region_id 
      FROM countries
      ORDER BY country_id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Regions
app.get('/api/regions', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM regions ORDER BY region_id');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 7. Job History
app.get('/api/job_history', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT employee_id, start_date, end_date, job_id, department_id 
      FROM job_history
      ORDER BY employee_id, start_date
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//****************************************************************************************** */

// Code End Here

const PORT = process.env.PORT || 6005; //if that port dosent show so run on this alternate port
app.listen(PORT, () => {
    console.log(`Connected Successfully...on PORT ${PORT}`) //this is back tick above tab button.
});