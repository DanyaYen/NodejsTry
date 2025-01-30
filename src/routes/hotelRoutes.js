const db = require("../config/db");

const hotelController = {
  async getAll(req, res) {
    try {
      const result = await db.query("SELECT * FROM hotels");
      res.json(result.rows);
    } catch (error) {
      console.error("Error getting hotels:", error);
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const result = await db.query("SELECT * FROM hotels WHERE id = $1", [id]);

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Отель не найден" });
      }

      res.json(result.rows[0]);
    } catch (error) {
      console.error("Error getting hotel:", error);
      res.status(500).json({ error: error.message });
    }
  },

  async getRooms(req, res) {
    try {
      const { id } = req.params;
      const result = await db.query("SELECT * FROM rooms WHERE hotel_id = $1", [
        id,
      ]);

      res.json(result.rows);
    } catch (error) {
      console.error("Error getting rooms:", error);
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = hotelController;
