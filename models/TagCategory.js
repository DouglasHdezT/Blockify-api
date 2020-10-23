const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TagCategorySchema = new Schema({
    abbr: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: ""
    }
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("TagCategory", TagCategorySchema);