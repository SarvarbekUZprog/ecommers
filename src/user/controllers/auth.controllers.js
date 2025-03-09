const sendMail = require("../../utils/mail.utils");
const User = require("../models/user.model");
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require("../../utils/jwt.utils");

const generateConfirmationCode = () => Math.floor(100000 + Math.random() * 900000);

const registerController = async (req, res) => {
  try {
    const { email, firstName, lastName } = req.body;
    if (await User.findOne({ where: { email } })) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const confirmationCode = generateConfirmationCode();
    await User.create({ email, firstName, lastName, confirmationCode });
    await sendMail(email, "Email Verification", `Your confirmation code is ${confirmationCode}`, `<h1>Your confirmation code is: ${confirmationCode}</h1>`);
    res.status(201).json({ message: "User created successfully. Please check your email for confirmation." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while creating user" });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, confirmationCode } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !user.confirmationCode || user.confirmationCode !== confirmationCode) {
      return res.status(400).json({ error: "Invalid email or confirmation code" });
    }
    user.confirmationCode = 0;
    user.refreshToken = await generateRefreshToken(user.id);
    await user.save();
    res.status(200).json({ message: "Login successful", accessToken: await generateAccessToken(user.id), refreshToken: user.refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while logging in" });
  }
};

const refreshTokenController = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ error: "Refresh token is required" });
    const decoded = await verifyRefreshToken(refreshToken);
    const user = decoded ? await User.findOne({ where: { id: decoded.userId } }) : null;
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(400).json({ error: "Invalid or expired refresh token" });
    }
    res.status(200).json({ accessToken: await generateAccessToken(user.id) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while refreshing token" });
  }
};

const sendVerificationController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ error: "Email not found" });
    user.confirmationCode = generateConfirmationCode();
    await user.save();
    await sendMail(email, "Email Verification", `Your confirmation code is ${user.confirmationCode}`, `<h1>Your confirmation code is: ${user.confirmationCode}</h1>`);
    res.status(200).json({ message: "Verification email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while sending verification email" });
  }
};

module.exports = { registerController, loginController, refreshTokenController, sendVerificationController };
