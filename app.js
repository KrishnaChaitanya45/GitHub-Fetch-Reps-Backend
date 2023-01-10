const express = require("express");
require('dotenv').config();
const reposAndUsers = require('./routes/reposAndUsers');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use('/api/v1/',reposAndUsers);
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`listening on ${port}`);
});

