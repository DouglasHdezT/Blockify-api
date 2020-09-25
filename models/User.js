const mongoose = require("mongoose");
const crypto = require("crypto");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
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
            uppercase: true,
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
            type: Number,
            min: 0,
            max: 5,
            default: 0,
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
    },
    {
        timestamps: true,
    }
);

UserSchema
    .virtual("password")
    .set(function (password) { 
        if (password === "") return;
        
        this.salt = this.makeSalt()
        this.hashedPassword = this.encryptPassword(password);
    })

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
};

module.exports = mongoose.model("User", UserSchema);
