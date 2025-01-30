const db = require("../config/db");

class BookingModel {
  static async create(userId, roomId, checkIn, checkOut) {
    const result = await db.query(
      `
      INSERT INTO bookings (user_id, room_id, check_in_date, check_out_date, status)
      VALUES ($1, $2, $3, $4, 'pending')
      RETURNING *
    `,
      [userId, roomId, checkIn, checkOut]
    );
    return result.rows[0];
  }

  static async findById(id) {
    const result = await db.query(
      `
      SELECT b.*, u.name as guest_name, h.name as hotel_name, r.room_number
      FROM bookings b
      JOIN users u ON b.user_id = u.id
      JOIN rooms r ON b.room_id = r.id
      JOIN hotels h ON r.hotel_id = h.id
      WHERE b.id = $1
    `,
      [id]
    );
    return result.rows[0];
  }

  static async getUserBookings(userId) {
    const result = await db.query(
      `
      SELECT b.*, h.name as hotel_name, r.room_number, r.type as room_type
      FROM bookings b
      JOIN rooms r ON b.room_id = r.id
      JOIN hotels h ON r.hotel_id = h.id
      WHERE b.user_id = $1
      ORDER BY b.check_in_date DESC
    `,
      [userId]
    );
    return result.rows;
  }

  static async updateStatus(id, status) {
    const result = await db.query(
      `
      UPDATE bookings
      SET status = $2
      WHERE id = $1
      RETURNING *
    `,
      [id, status]
    );
    return result.rows[0];
  }
}

module.exports = BookingModel;
