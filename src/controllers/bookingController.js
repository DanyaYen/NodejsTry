const BookingModel = require("../models/BookingModel");

const bookingController = {
  async create(req, res) {
    const { userId, roomId, checkIn, checkOut } = req.body;
    try {
      // Здесь можно добавить проверку доступности номера
      const booking = await BookingModel.create(
        userId,
        roomId,
        checkIn,
        checkOut
      );
      res.status(201).json(booking);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const booking = await BookingModel.findById(req.params.id);
      if (!booking) {
        return res.status(404).json({ message: "Бронирование не найдено" });
      }
      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getUserBookings(req, res) {
    try {
      const bookings = await BookingModel.getUserBookings(req.params.userId);
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    try {
      const booking = await BookingModel.updateStatus(id, status);
      if (!booking) {
        return res.status(404).json({ message: "Бронирование не найдено" });
      }
      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = bookingController;
