const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const connection = require("../connection");
const auth = require("../services/authentication");
const checkRole = require("../services/checkRole");

router.post("/signup", userController.signup);
router.post("/login", userController.login);

router.get('/get',auth.authenticateToken,checkRole.checkRole,(req,res)=>{
    var query = "select id,name,email,contactNumber,status from cafeUser where role='user'";
    connection.query(query,(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }else {
            return res.status(500).json(err);
        }
    })
})

router.patch('/update',auth.authenticateToken,(req,res)=>{
    let user = req.body;
    var query = "update user set status=? where id=?";
    connection.query(query,[user.status,user.id],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json("user id does not exist");  
            }
            return res.status(200).json("user updated successfully");
        }else {
            return res.status(500).json(err);
        }
    })
})

router.get('/checkToken',auth.authenticateToken,(req,res)=>{
    return res.status(200).json({message:"true"});
})


module.exports = router;




// const express = require("express");
// const router = express.Router();
// const connection = require("../connection");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// router.post("/signup", (req, res) => {
//   let user = req.body;
//   query = "select email,password,role,status from cafeUser where email=?";
//   connection.query(query, [user.email], (err, results) => {
//     if (!err) {
//       if (results <= 0) {
//         query =
//           "insert into cafeUser(name,contactNumber,email,password,status,role) values(?,?,?,?,'false','user')";
//         connection.query(
//           query,
//           [user.name, user.contact, user.email, user.password],
//           (err, results) => {
//             if (!err) {
//               return res
//                 .status(200)
//                 .json({ message: "Successfully Registered" });
//             } else {
//               return res.status(500).json(err);
//             }
//           }
//         );
//       } else {
//         return res.status(400).json({ message: "Email already exists." });
//       }
//     } else {
//       return res.status(500).json(err);
//     }
//   });
// });

// router.post("/login", (req, res) => {
//     const user = req.body;
//     console.log(user);
//     query = "select email, password, role, status from cafeUser where email=?";
//     connection.query(query, [user.email], (err, results) => {
//       if (!err) {
//         if (results.length <= 0 || results[0].password != user.password) {
//           return res.status(401).json({ message: "Incorrect Username or Password" });
//         } else if (results[0].status === false) {
//           return res.status(401).json({ message: "Wait for Admin Approval" });
//         } else {
//           const response = {
//             email: results[0].email,
//           };
//           try {
//             const accessToken = jwt.sign(response, process.env.JWT_SECRET, {
//               expiresIn: "8h",
//             });
//             return res.status(200).json({ token: accessToken });
//           } catch (tokenError) {
//             console.error("JWT generation error:", tokenError);
//             return res.status(500).json({ message: "Error generating token" });
//           }
//         }
//       } else {
//         return res.status(500).json(err);
//       }
//     });
//   });
  
// module.exports = router;
