const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

//here you will do coding
app.get('/',async(req,res)=>{
    try{
        res.json('WELCOME TO HR API')
    }catch(err){
        res.status(500).json({Error:err.message})
    }
});

//first API
app.get('/region',async(req,res)=>{
    try{
        const result = await pool.query('select * from regions');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message})
    }
});

//for countries
app.get('/country',async(req,res)=>{
    try{
        const result = await pool.query('select * from countries');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message})
    }
});

//for employees
app.get('/employee',async(req,res)=>{
    try{
        const result = await pool.query('select count(employee_id) as "Total_Employees" from employees');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message})
    }
});

const PORT = process.env.PORT || 6005; //if that port dosent show so run on this alternate port
app.listen(PORT,()=>{
    console.log(`Connected Successfully...on PORT ${PORT}`) //this is back tick above tab button.
});