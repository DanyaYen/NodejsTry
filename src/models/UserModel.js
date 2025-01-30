const db = require("../config/db");
const bcrypt = require("bcryptjs");

class UserModel {
  static async create(email, name, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
      `
      INSERT INTO users (email, name, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id, email, name
    `,
      [email, name, hashedPassword]
    );
    return result.rows[0];
  }

  static async findByEmail(email) {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  }

  static async findById(id) {
    const result = await db.query(
      "SELECT id, email, name FROM users WHERE id = $1",
      [id]
    );
    return result.rows[0];
  }

  static async verifyPassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }
}

module.exports = UserModel;
