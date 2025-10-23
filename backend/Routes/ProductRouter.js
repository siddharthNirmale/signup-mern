const ensureAuthinticated = require("../Middlewares/Auth");


const router = require("express").Router();


router.get("/",ensureAuthinticated,(req,res)=>{
  console.log("--- Logged in user detail ---", req.user);
  res.status(200).json([
    {
      name: "Mobile",
      price:10000,
      
    },
    {
      name: "TV",
      price:20000,

    }
  ])
});



module.exports = router;
