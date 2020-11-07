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
        type: [
            {
                _id: false,
                userID: {
                    type: Schema.Types.ObjectId,
                    required: true,
                },
                rate: {
                    type: Number,
                    min: 0,
                    max: 5,
                    default: 0,
                },
            },
        ],
        default: [],
        get: function (starsArray) {
            const sum = starsArray.reduce(
                    (currentSum, star) => {return currentSum + star.rate}
                , 0);
            
            // To avoid 0/0 use || 0;
            const prom = sum / starsArray.length || 0;
            return {
                rate: prom,
                votes: starsArray.length
            };
        },
    },
}, {
    timestamps: true,
});

LessonSchema.methods = {
    isUserInStars: function (userID) { 
        if (!userID) return false;

        const stars = this.get("stars", null, { getters: false });

        return stars.some(star => {
            return star.userID.equals(userID);
        });
    }
}

module.exports = mongoose.model("Lesson", LessonSchema);