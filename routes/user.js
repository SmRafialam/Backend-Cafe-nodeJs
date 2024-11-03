const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.post('/signup',(req,res)=>{
    let user = req.body;
    query = "select email,password,role,status from cafeUser where email=?"
    connection.query(query,[user.email],(err,results)=>{
       if(!err){
            if(results <= 0){
                query = "insert into cafeUser(name,contactNumber,email,password,status,role) values(?,?,?,?,'false','user')";
                connection.query(query,[user.name,user.contact,user.email,user.password],(err,results)=>{
                    if(!err){
                        return res.status(200).json({message: "Successfully Registered"});
                    }else{
                        return res.status(500).json(err);
                    }
                })
            }else{
                return res.status(400).json({message: "Email already exists."});
            }
        }else{
            return res.status(500).json(err);
        } 
    })
})

router.post('/login',(req,res)=>{
    const user = res.body;
    query = "select email,password,role,status from user where email=?"
    connection.query(query,[user.email],(err,results)=>{
        if(!err){
            
        }else{
            return res.status(500).json(err);  
        }
    })
})

module.exports = router;