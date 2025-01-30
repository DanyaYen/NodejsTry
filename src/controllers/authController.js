const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const authController = {
  async register(req, res) {
    try {
      const { email, name, password } = req.body;
      console.log("Регистрация пользователя:", { email, name });
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "Email уже используется" });
      }

      const user = await UserModel.create(email, name, password);
      console.log("Пользователь создан:", user);
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      res.status(201).json({ user, token });
    } catch (error) {
      console.error("Ошибка при регистрации:", error); // добавляем лог ошибки
      res.status(500).json({ error: error.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Неверный email или пароль" });
      }
      const isValidPassword = await UserModel.verifyPassword(
        password,
        user.password_hash
      );
      if (!isValidPassword) {
        return res.status(401).json({ message: "Неверный email или пароль" });
      }
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      res.json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        token,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = authController;
