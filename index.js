var express = require("express")
var http = require('http')
var path = require('path')
var nodemailer =require('nodemailer')
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
const { Int32 } = require("mongodb")
const app = express()
var server =http.Server(app)
var port=500;
app.set("port",port);
app.set('view engine', 'ejs');
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))
mongoose.connect('mongodb+srv://slcorp:slcorp123@cluster0.4zh8edn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var db = mongoose.connection;
db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))
var crrntemail="";
app.post("/add", async (req, res) => {
    var email = req.body.emailInput;
    var number = req.body.mobileInput;
    crrntemail = email;
    // Check if email and phone match admin credentials
    if (email === 'lakshmithacorp@gmail.com' && number === '9965599005') {
        // If matches, redirect to admin page
        return res.redirect('/index.html');
    }


    // Check if user exists
    db.collection('users').findOne({ email: email, no: number }, (err, user) => {
        
        if (err) {
            console.error('Error finding user:', err);
        }

        if (user) {
            // If user exists, login is enough
            return res.redirect('/index.html');
        } else {
            // If user does not exist, insert into database and login
            var data = {
                "email": email,
                "no": number
            }
            
            db.collection('users').insertOne(data, (err, collection) => {
                if (err) {
                    throw err;
                }
                console.log("Record Inserted Successfully");
                return res.redirect('/index.html');
            });
        }
    });
});

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(1200);
console.log("Listening on PORT 1200");

app.post("/sendemail",async(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var subject = req.body.subject;
    var message = req.body.message;
    var to ='21i365@psgtech.ac.in';
    var transporter = nodemailer.createTransport({
        service : 'gmail',
        auth:{
            user: 'rharrish8@gmail.com',
            pass: 'oyythxssrqoxsdtz'
        }
    })
    var mailOptions = {
        to: to,
        from: email,
        subject: subject,
        html: '<b>Name:</b> ' + name + '<br>' +
        '<b>Phone:</b> ' + phone + '<br>' +
        '<b>Message:</b> ' + message
    }
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error)
            }
            else{
                console.log("Email Send :" + info.res)
            }
        

        })
    
});
app.post("/sendemail1", async (req, res) => {
    var email = localStorage.getItem("email"); // Assuming the email is sent in the request body
    var to = '21i365@psgtech.ac.in'; // The recipient's email address

    // Fetch product names from "cart" database based on the email
    var products = await Cart.find({ userEmail: email }).select('productName');

    // Extracting product names from the fetched data
    var productNames = products.map(product => product.productName).join(', ');
    
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'rharrish8@gmail.com',
            pass: 'oyythxssrqoxsdtz'
        }
    });

    var mailOptions = {
        to: to,
        from: email, // Sender's email address
        subject: 'Product Inquiry', // You can customize the subject as needed
        html: '<b>Product Names:</b> ' + productNames // Including the product names in the email body
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log(productNames);
            console.log("Email Sent: " + info.response);
        }
    });
});

server.listen(port, function(){
    console.log("Starting server on port :" + port)
})
// Update your existing route to handle adding products to the cart
app.post("/add-to-cart", async (req, res) => {
    try {
        var productName = req.body.productName;
        var productImage = req.body.productImage;
        var userEmail = req.body.userEmail;
        crrntemail = userEmail;
       

        // Check if the product already exists in the cart
        let existingProduct = await db.collection('cart').findOne({ userEmail:userEmail ,productName:productName });
        
        if (!existingProduct) {
            var data = {
                "productName": productName,
                "productImage": productImage,
                "userEmail": userEmail
            };

            // Insert the new product into the cart collection
            
            db.collection('cart').insertOne(data);
         
            console.log("Record Inserted Successfully");
        } else {
            
            console.log("Product already exists in the cart");
        }

        res.sendStatus(200); // Send success response
    } catch (error) {
        console.error("Error adding product to cart:", error);
        res.sendStatus(500); // Send error response
    }
});

app.delete("/delete/:productName", async (req, res) => {
    try {
        var productName = req.params.productName;
        console.log(productName);
        console.log(crrntemail);
        // Assuming 'faculty1' is the collection where data is stored
        const result = await db.collection('cart').deleteOne({ productName: productName, userEmail:crrntemail});
     
        if (result.deletedCount > 0) {
            res.json({ success: true, message: 'Deleted successfully' });
        } else {
            res.json({ success: false, message: 'Course ID not found' });
        }
    } catch (error) {
        console.error('Error during delete:', error);
        res.json({ success: false, message: 'Error during delete' });
    }
});

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



app.get("/cart", async(req, res) => {
    console.log(crrntemail);
    console.log("working");
    try{
        var subjectdata = await db.collection('cart').find().toArray();
        var formattedData = subjectdata.map(doc=>({
            productName: doc.productName,
            productImage: doc.productImage,
            userEmail: doc.userEmail,
            crrntemail :crrntemail
        }));
        console.log(crrntemail);

        +
        
        console.log(formattedData);
        res.json({data:formattedData});
    }
    catch(error)
    {
        console.log("Error during fetch",error);
        res.status(500).send("Error during fetch");
    }
});

