const express = require('express');
const cors = require('cors');

const  authRoutes = require("./routes/auth.js");

const app = express();
const PORT = process.env.PORT ||5000;

require('dotenv').config();

//middle ware  in express
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get('/',(req,res)=>{
    res.send('Server is up ');
});

app.use('/auth',authRoutes);

app.listen(PORT,()=>(`Server is running successfully on ${PORT}`));