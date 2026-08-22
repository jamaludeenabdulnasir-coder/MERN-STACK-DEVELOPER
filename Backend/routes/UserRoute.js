const express = require("express");
const UserModel = require("../models/UserModel");
const ContactModel = require("../models/ContactModel");
const authMiddleware = require("../middleware/AuthMiddleware");
const { sendWelcomeMail, isMailConfigured } = require("../utils/mailer");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    try {
        const { username, firstname, surname, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Username, email and password are required" });
        }

        const EmailExist = await UserModel.findOne({ email: email.toLowerCase() });
        const UsernameExist = await UserModel.findOne({ username: username.toLowerCase() });

        if (EmailExist || UsernameExist) {
            return res.status(400).json({
                message: EmailExist ? "Email already exists" : "Username already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const DataToSave = new UserModel({
            username,
            firstname,
            surname,
            email,
            password: hashedPassword
        });

        const saved = await DataToSave.save();

        if (isMailConfigured()) {
            sendWelcomeMail(saved.email, saved.username).catch((err) => {
                console.error("Welcome mail failed:", err.message);
            });
        }

        return res.status(201).json({
            message: "Registration successful",
            user: {
                id: saved._id,
                username: saved.username,
                firstname: saved.firstname,
                surname: saved.surname,
                email: saved.email,
                active: saved.active
            }
        });
    } catch (error) {
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            return res.status(400).json({ message: `${field} already exists` });
        }
        return res.status(500).json({ message: "Registration failed", error: error.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await UserModel.findOne({ email: email.toLowerCase() });

        if (!user || !user.active) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id, username: user.username, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
        );

        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ message: "Login failed", error: error.message });
    }
});

router.get("/profile", authMiddleware, async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ message: "Could not load profile", error: error.message });
    }
});

router.post("/contact", async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: "Name, email and message are required" });
        }

        const contact = new ContactModel({ name, email, subject, message });
        const saved = await contact.save();

        return res.status(201).json({ message: "Message received. We will get back to you soon.", id: saved._id });
    } catch (error) {
        return res.status(500).json({ message: "Could not save your message", error: error.message });
    }
});

router.post("/welcome-mailer", async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await UserModel.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(404).json({ message: "No account found with that email" });
        }

        if (!isMailConfigured()) {
            return res.status(503).json({ message: "Email service is not configured. Set EMAIL_HOST, EMAIL_USER and EMAIL_PASS in .env" });
        }

        await sendWelcomeMail(user.email, user.username);

        return res.status(200).json({ message: `Welcome mail sent to ${user.email}` });
    } catch (error) {
        return res.status(500).json({ message: "Could not send welcome mail", error: error.message });
    }
});

module.exports = router;
