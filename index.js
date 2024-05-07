const express = require("express");
const app = express();
const port = 8081;
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("views" , path.join(__dirname , "views"));
app.set("view engine" , "ejs");
app.use(express.static(path.join(__dirname , "public")));
app.use(express.urlencoded({extended : true})); // To parse the data
app.use(methodOverride("_method"));

// ------------------------------------------------------------------------
const mongoose = require('mongoose');

main().then(() => {
    console.log("Connection Successful");
}).catch((err) => console.log(err));

async function main() 
{
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
// ------------------------------------------------------------------------

// let chat1 = new Chat({
//     from: "neha",
//     to: "priya",
//     msg: "Send me your exam sheets",
//     created_at: new Date()
// });

// chat1.save().then((res) => {
//     console.log(res);
// });

// -------------------- Routes -----------------------

app.get("/" , (req , res) => {
    res.send("Route created successfully");
});

app.get("/chats" , async(req , res) => {
    let chats = await Chat.find();
    // console.log(chats);
    res.render("index.ejs" , {chats});
});

app.get("/chats/new" , (req , res) => {
    res.render("new.ejs");
});

// To create a new chat
app.post("/chats" , (req , res) => {
    let {from , to , msg} = req.body;
    let newChat = new Chat({
        from: from,
        msg: msg,
        to: to,
        created_at: new Date()
    });

    newChat.save().then((res) => {
        console.log("Chat was saved");
    })
    .catch((err) => {
        console.log(err);
    });

    console.log(newChat);

    res.redirect("/chats");
});

// To edit a chat
app.get("/chats/:id/edit" , async (req , res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs" , {chat});
});

app.put("/chats/:id" , async (req , res) => {
    let {id} = req.params;
    let {msg : newMsg} = req.body;

    let updatedChat = await Chat.findByIdAndUpdate(id , {msg: newMsg} , 
        {runValidators: true , new: true}
    );
    console.log(updatedChat);
    res.redirect("/chats");
});


// -------------------- Port -----------------------

app.listen(port , () => {
    console.log(`Listening on port ${port}`);
});