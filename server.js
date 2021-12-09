const express = require('express');
const mongoose = require('mongoose');
const { articleModel } = require('./models/articles');
const articleRoutes = require("./routes/articles");

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blog',{
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    useCreateIndex: true
})
.then(() => {
    console.log("DB CONNECTED")
}).catch(() => {
    console.log("UNABLE to connect to DB")
})

// engine
app.set('view engine', 'ejs')

// middleware
app.use(express.urlencoded({extended: true}))


// Using routes
app.get('/', async(req, res) => {
    let articles = await articleModel.find().sort({createdAt: -1})    
    res.render('index', {articles : articles});
});

app.use('/articles', articleRoutes)

// Starting server
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`SERVER IS RUNNING ON ${port}`)
});