import express from "express";
import pg from "pg";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // For development only; use proper certificates in production
  },
});

export default pool;


// try {
//     const res = await pool.query('select * from food_users');
//     console.log('Connected at:', res.rows[0]);
//   } catch (err) {
//     console.error('Connection error:', err);
//   }
  
// const db =  new pg.Client({
//     user: process.env.PG_USER,
//     host :process.env.PG_HOST,
//     database: process.env.PG_DATABASE,
//     password: process.env.PG_PASSWORD,
//     port: process.env.PG_PORT,
// })
// db.connect();

app.listen(port,()=>{
    console.log(`server running on port ${3000}`);
});
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));


app.get("/",(req,res)=>{
    res.render("home.ejs");
})
app.get("/home",(req,res)=>{
    res.render("home.ejs")
})
app.get("/about",(req,res)=>{
    res.render("about.ejs")
})
app.get("/contact",(req,res)=>{
    res.render("contact.ejs")
})
app.get("/profile",(req,res)=>{
    res.render("profile.ejs")
})
app.get("/login",(req,res)=>{
    res.render("login.ejs");
})
app.get("/register",(req,res)=>{
    res.render("register.ejs");
})
app.get("/editaddress",(req,res)=>{
    res.render("addressedit.ejs");
})
app.post("/register",async (req,res)=>{
    const username = req.body.username;
    const password  = req.body.password;
    const address = req.body.address;
    try{
        const checkResult = await pool.query("select * from food_users where username = $1",[username]);
        console.log(checkResult);
        if(checkResult.rows.length>0){
            return res.send("users already exists register with new email")
        }
        else{
            await pool.query("insert into food_users (username,password) values ($1,$2)",[username,password]);
            return res.send("registration successfull");
        }
    }catch(err){
        console.log("error occured");
    }
});
app.post("/login", async(req,res)=>{
    const username =req.body.username;
    const user1 = username.replace("@gmail.com","");
    const password = req.body.password;
    try{
        const checkUser = await pool.query("select * from food_users where username =$1",[username]);
        if(checkUser.rows.length>0){
            const user = checkUser.rows[0];
            const storedPassword = user.password;
            const user_address = user.address;
            const user_star = user.stars;
            const user_helped = user.people_helped;
            if(storedPassword== password){
                // res.render("profile.ejs",{username:user1,address:user_address,stars:user_star,helped:user_helped});
                res.render("home.ejs",{username:user1,address:user_address,stars:user_star,helped:user_helped});
            }else{
                res.render("login.ejs");
            }
        }else{
            res.render("login.ejs");
        }
    }catch(err){
        console.log("error occurred");
    }
})