const mongoose = require('mongoose');
const Chat = require("./models/chat.js");

main().then(() => {
    console.log("Connection Successful");
}).catch((err) => console.log(err));

async function main() 
{
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats = [
    {
        from: "neha",
        to: "priya",
        msg: "Send me your exam sheets",
        created_at: new Date()
    },
    {
        from: "rohit",
        to: "mohit",
        msg: "Hello there!",
        created_at: new Date()
    },
    {
        from: "amit",
        to: "sumit",
        msg: "Please tell the answer",
        created_at: new Date()
    },
    {
        from: "roshan",
        to: "rushabh",
        msg: "Give me my assignment back",
        created_at: new Date()
    }
];

Chat.insertMany(allChats);