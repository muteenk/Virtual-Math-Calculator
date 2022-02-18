const express = require("express");
const cors = require("cors");
const nlp = require("natural");


// Important Variables
const app = express();
const port = process.env.PORT || 8000;
var tokenizer = new nlp.WordTokenizer();



// MiddleWares
app.use(cors({
    origin: "http://127.0.0.1:5500/client/"
})); 

app.use(express.json());




// GET request to compute the data
app.get("/calculate", async(req, res) => {

    try{

        console.log(tokenizer.tokenize(req.query.calc));

        res.status(200).send("Done");
    }
    catch(err){
        res.status(400).send(err);
    }

})




// Listening Requests
app.listen(port, () => {
    console.log("Listening on port "+port);
})