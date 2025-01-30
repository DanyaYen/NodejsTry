const db = require("../config/db");

class HotelModel {
  static async findAll() {
    const result = await db.query("SELECT * FROM hotels");
    return result.rows;
  }

  static async findById(id) {
    const result = await db.query("SELECT * FROM hotels WHERE id = $1", [id]);
    return result.rows[0];
  }

  static async findRooms(hotelId) {
    const result = await db.query("SELECT * FROM rooms WHERE hotel_id = $1", [
      hotelId,
    ]);
    return result.rows;
  }

  static async findAvailableRooms(hotelId, checkIn, checkOut) {
    const result = await db.query(
      `
      SELECT r.* 
      FROM rooms r
      WHERE r.hotel_id = $1
      AND r.id NOT IN (
        SELECT room_id 
        FROM bookings 
        WHERE status != 'cancelled'
        AND check_in_date <= $3 
        AND check_out_date >= $2
      )`,
      [hotelId, checkIn, checkOut]
    );
    return result.rows;
  }
}

module.exports = HotelModel;
