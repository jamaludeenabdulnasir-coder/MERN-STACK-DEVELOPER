const express = require("express");

const router = express.Router();





router.get("/",(req,res)=>{
    res.json({
        message: "Welcome to the SHSEd Senior High School API",
        version: "1.0.0",
        endpoints: {
            register: "POST /user/register",
            login: "POST /user/login",
            profile: "GET /user/profile",
            contact: "POST /user/contact",
            welcomeMail: "POST /user/welcome-mailer"
        }
    })
})




module.exports = router;