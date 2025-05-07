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

app.get('/employee',async(req,res)=>{
    try{
        const result = await pool.query('select * from employees');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

//Jobs
app.get('/job',async(req,res)=>{
    try{
        const result = await pool.query('select * from jobs');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

//depts
app.get('/department',async(req,res)=>{
    try{
        const result = await pool.query('select * from departments');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

//locations
app.get('/location',async(req,res)=>{
    try{
        const result = await pool.query('select * from locations');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

//for employees COUNT
app.get('/totalemp',async(req,res)=>{
    try{
        const result = await pool.query('select count(employee_id) as "Total_Employees" from employees');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message})
    }
});

//total countries
app.get('/totalcountries',async(req,res)=>{
    try{
        const result = await pool.query('select count(country_id) as "Total_countries" from countries');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message})
    }
});

//total locations
app.get('/totalLoc',async(req,res)=>{
    try{
        const result = await pool.query('select count(location_id) as "Total_Locations" from locations');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message})
    }
});

//total regions
app.get('/totalReg',async(req,res)=>{
    try{
        const result = await pool.query('select count(region_id) as "Total_Regions" from regions');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message})
    }
});

//for jobs COUNT
app.get('/totalJobs',async(req,res)=>{
    try{
        const result = await pool.query('select count(job_id) as "Total_Jobs" from jobs');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message})
    }
});



//

const PORT = process.env.PORT || 6005; //if that port dosent show so run on this alternate port
app.listen(PORT,()=>{
    console.log(`Connected Successfully...on PORT ${PORT}`) //this is back tick above tab button.
});