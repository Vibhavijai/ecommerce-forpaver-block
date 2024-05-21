var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended:true
}));

mongoose.connect('mongodb+srv://slcorp:slcorp123@cluster0.4zh8edn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, "Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"));

// Schema for the User collection
var userSchema = new mongoose.Schema({
    email: String,
    no: String
});
var User = mongoose.model('users', userSchema);

// Route to serve the HTML file
app.get("/", (req, res) => {
    res.set({
        "Access-Control-Allow-Origin": "*"
    });
    res.sendFile(__dirname + '/index.html');
});

// Route to count total users in the database
app.get("/countUsers", async (req, res) => {
    try {
        const count = await User.countDocuments();
        res.send(String(count)); // Send the count as plain text
    } catch (error) {
        console.error('Error counting users:', error);
        res.status(500).send("Internal server error");
    }
});



app.listen(1300, () => {
    console.log("Listening on PORT 1300");
});
