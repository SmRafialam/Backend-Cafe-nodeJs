const userService = require("../services/userService");

exports.signup = async (req, res) => {
    try {
        const user = req.body;
        const result = await userService.signup(user);
        return res.status(result.status).json({ message: result.message });
    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.login = async (req, res) => {
    try {
        const user = req.body;
        const result = await userService.login(user);
        if (result.success) {
            return res.status(200).json({ token: result.token });
        } else {
            return res.status(result.status).json({ message: result.message });
        }
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
