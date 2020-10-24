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
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TagCategory"
        },
        validAttrs: [{
            name: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            validOptions: [ String ]
        }],
    },
    { timestamps: true,  }
);

module.exports = mongoose.model("Tag", TagSchema);