require('dotenv').config();

const MongoClient = require("mongodb").MongoClient;
const mongoUrl = process.env.mongoUrl
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const PORT = process.env.PORT || 5005;
const app = express();
app.set('view engine', 'ejs');
const cors = require('cors');
app.use(cors({
  origin: 'https://house-of-frenchiess.netlify.app/'  
}));


app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))

MongoClient.connect(mongoUrl)
.then(client => {
    console.log("Connected to Mong");
    const db = client.db("reviewDatabase1");
    const colloctions = db.collection("reviews");

    app.get("/" , (req, res) => {
        colloctions
        .find()
        .toArray()
        .then(result => {
            console.table(result)
            res.render('index.ejs', {reviews: result})

        })
        .catch(error => {
            console.error('server error', error)
            res.status(500).json(error)
        })
    });


    app.post("/reviews", (req, res) => {
        const data = req.body
        if (!data.name || !data.review) {
            
            return res.status(400)
            }
            
        colloctions
        .insertOne(data)
        .then(result => {
           
            
            console.log("Review Added")
            res.redirect("/")
        })
        .catch(error => {
            console.error("unable to add review", error)
            res.status(500).json("Server Error")
        })
    });
    








    app.listen(PORT, () => {
        console.log(`Testing at http://localhost:${PORT}`);
    });
    app.use(express.static(path.join(__dirname, "public")))
})
.catch(error => {
    console.error("Unable to Connect to Mongo", error);
    
});
