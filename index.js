import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import env from "dotenv";

const app = express();
const port = 3000;
env.config();

const db =  new pg.Client({
    user: process.env.PG_USER,
    host :process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
})
db.connect();

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

app.post("/register",async (req,res)=>{
    const username = req.body.username;
    const password  = req.body.password;
    try{
        const checkResult = await db.query("select * from food_users where username = $1",[username]);
        if(checkResult.rows.length>0){
            res.send("users already exists register with new email")
        }
        else{
            await db.query("insert into food_users (username,password) values ($1,$2)",[username,password]);
            res.send("registration successfull");
        }
    }catch(err){
        console.log("error occured");
    }
});
app.post("/login", async(req,res)=>{
    const username =req.body.username;
    const password = req.body.password;
    try{
        const checkUser = await db.query("select * from food_users where username =$1",[username]);
        if(checkUser.rows.length>0){
            const user = checkUser.rows[0];
            const storedPassword = user.password;
            if(storedPassword== password){
                res.render("profile.ejs");
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




