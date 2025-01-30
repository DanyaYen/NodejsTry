const express = require("express");
const app = express();
const db = require("./config/db");
require("dotenv").config();

app.use(express.json());
app.use(express.static("public"));

const authRoutes = require("./routes/authRoutes");
const hotelRoutes = require("./routes/hotelRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/bookings", bookingRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Что-то пошло не так!" });
});

const PORT = process.env.PORT || 3000;
db.query("SELECT NOW()")
  .then(() => {
    console.log("Подключение к базе данных успешно");
    app.listen(PORT, () => {
      console.log(`Сервер запущен на порту ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Ошибка подключения к базе данных:", err);
    process.exit(1);
  });

module.exports = app;
