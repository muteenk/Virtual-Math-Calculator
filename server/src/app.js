const express = require("express");
const cors = require("cors");
const nlp = require("natural");


// Important Variables
const app = express();
const port = process.env.PORT || 8000;
var tokenizer = new nlp.WordTokenizer();



// MiddleWares
app.use(cors({
    origin: "http://127.0.0.1:5500"
})); 

app.use(express.json());
app.use(express.text());




// GET request to compute the data
app.post("/calculate", async(req, res) => {

    try{

        console.log(eval("what is 2+4"));
        console.log(req.body);
        data = tokenizer.tokenize(req.body);
        res.status(200).send(data);
    }
    catch(err){
        res.status(400).send("Something Went Wrong");
    }

})




// Listening Requests
app.listen(port, () => {
    console.log("Listening on port "+port);
})