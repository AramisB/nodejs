const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
    },
    { collection: "messages" }
);

module.exports = mongoose.model("Message", MessageSchema);
