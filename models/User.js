const mongoose = require("mongoose");
const crypto = require("crypto");

const { ROLES } = require("@internal/constants");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        firstname: {
            type: String,
            default: "",
        },
        lastname: {
            type: String,
            default: "",
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        avatar: {
            type: String,
            default: "",
        },
        hashedPassword: {
            type: String,
            required: true,
        },
        salt: String,
        active: {
            type: Boolean,
            default: true,
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
        lessonsFav: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Lesson",
            },
        ],
        lessonsTaken: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Lesson",
            },
        ],
        validTokens: [String],
        roles: {
            type: [String],
            default: [ROLES.DEFAULT],
        },
        comments: [{
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }]
    },
    {
        timestamps: true,
    }
);

UserSchema.virtual("password").set(function (password) {
    if (password === "") return;

    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
});

UserSchema.methods = {
    comparePassword: function (input) {
        return this.encryptPassword(input) === this.hashedPassword;
    },
    encryptPassword: function (password) {
        if (!password) return "";

        try {
            const encyptedPassword = crypto
                .createHash("sha256", this.salt)
                .update(password)
                .digest("hex");

            return encyptedPassword;
        } catch {
            return "";
        }
    },
    makeSalt: function () {
        return Math.round(new Date().valueOf() * Math.random()) + "";
    },
    isUserInStars: function (userID) { 
        if (!userID) return false;

        const stars = this.get("stars", null, { getters: false });

        return stars.some(star => {
            return star.userID.equals(userID);
        });
    }
};

UserSchema.set("toJSON", { getters: true });

module.exports = mongoose.model("User", UserSchema);
