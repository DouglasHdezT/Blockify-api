const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LessonSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    private: {
        type: Boolean,
        default: false,
    },
    stars: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Lesson", LessonSchema);