const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path= require("path")
const cors= require("cors");

const allowedOrigins = ['https://quick.dauqu.host',];
app.use(cors({ 
    origin: allowedOrigins,
    credentials: true,})
);



function root(page){
    const static_path = path.join(__dirname, `./public/${page}`);
    return static_path;
}

const static_path = path.join(__dirname, `./public/`);
//allow json to be parsed
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(static_path));


app.get("/login", (req, res) =>{
    return res.sendFile(root('/login/login.html'))
    
    
})

app.get("/register", (req, res) =>{
    return res.sendFile(root('/register/register.html'))
})

app.get("/dashboard", (req,res)=>{
    return res.sendFile(root('/home/index.html'))
})



// app.post("/login", async(req, res) =>{
//     try {
//         const email= req.body.login_email;
//         const password= req.body.login_password;
//         console.log(`${email} ${password}`);
//     } catch (error) {
//         res.status(400).json({message: "Login failed", message: error.message});
//     }
// })


//database connection
const connectDB = require('./config/connection');
connectDB();

//routes
app.use('/api/register', require('./routes/register'));
app.use('/api/login', require('./routes/login'));
app.use('/api/sign_out',require('./routes/sign_out'));
app.use('/api/customer', require('./routes/customers'));
app.use('/api/invoice', require('./routes/invoice'));
app.use('/api/notice_board', require('./routes/notice_board'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/journal', require('./routes/journal'));
app.use('/api/balance_sheet', require('./routes/balance_sheet'));
app.use('/api/cash_flow', require('./routes/cash_flow'));

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
