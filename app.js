const express =require("express");
const exphbs=require("express-handlebars");
const bodyparser=require("body-parser");


require('dotenv').config();

const app =express();
const port = process.env.PORT||4000;

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());


app.use(express.static("public"));

const handlebars=exphbs.create({extname:".hbs"});
app.engine('hbs',handlebars.engine);
app.set("view engine","hbs");




const routes =require("./server/routes/students");
app.use('/',routes);




app.listen(port,()=>{
    console.log("Listening port:"+ port);
})

