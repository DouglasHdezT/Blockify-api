const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TagSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        html: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: String,
        validAttrs: [{
            name: {
                type: String,
                require: true
            },
            description: {
                type: String,
                require: true
            },
            validOptions: [ String ]
            
        }],
    },
    { timestamps: true,  }
);

module.exports = mongoose.model("Tag", TagSchema);