import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "User name is required!"]
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Please enter a valid email address!"
        ]
    },
    password: {
        type: String,
        required: true,
        match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character."
        ]
    },
    confirmed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// Hash password before saving to database
userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare hashed password
userSchema.methods.comparePassword = function (plainPassword) {
    return bcrypt.compare(plainPassword, this.password);
};

// Method to skip validation during save
userSchema.methods.skipValidationOnSave = function () {
    this.$locals.skipValidation = true;
};

const userModel = mongoose.model("User", userSchema);
export default userModel;
