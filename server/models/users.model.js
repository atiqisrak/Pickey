const pool = require("../config/db.config");

// class User {
//   constructor(id, username, email, role_id) {
//     this.id = id;
//     this.username = username;
//     this.email = email;
//     this.role_id = role_id;
//   }
//   static async getAll() {
//     try {
//       const client = await pool.connect();
//       const result = await client.query("SELECT * FROM Users");
//       client.release();
//       return result.rows.map(
//         ({ id, username, email, role_id }) =>
//           new User(id, username, email, role_id)
//       );
//     } catch (error) {
//       throw new Error(error.message);
//     }
//   }

//   static async create(username, email, role_id) {
//     try {
//       const client = await pool.connect();
//       const result = await client.query(
//         "INSERT INTO Users (username, email, role_id) VALUES ($1, $2, $3) RETURNING *",
//         [username, email, role_id]
//       );
//       client.release();
//       const {
//         id,
//         username: createdUsername,
//         email: createdEmail,
//         role_id: createdRoleId,
//       } = result.rows[0];
//       return new User(id, createdUsername, createdEmail, createdRoleId);
//     } catch (error) {
//       throw new Error(error.message);
//     }
//   }

//   static async getById(id) {
//     try {
//       const client = await pool.connect();
//       const result = await client.query("SELECT * FROM Users WHERE id = $1", [
//         id,
//       ]);
//       client.release();
//       if (result.rows.length === 0) {
//         throw new Error("User not found");
//       }
//       const { username, email, role_id } = result.rows[0];
//       return new User(id, username, email, role_id);
//     } catch (error) {
//       throw new Error(error.message);
//     }
//   }

//   static async getByEmail(email) {
//     try {
//       const client = await pool.connect();
//       const result = await client.query(
//         "SELECT * FROM Users WHERE email = $1",
//         [email]
//       );
//       client.release();
//       if (result.rows.length === 0) {
//         throw new Error("User not found");
//       }
//       const { id, username, role_id } = result.rows[0];
//       return new User(id, username, email, role_id);
//     } catch (error) {
//       throw new Error(error.message);
//     }
//   }

//   // delete
//   async deleteUser() {
//     try {
//       const client = await pool.connect();
//       await client.query("DELETE FROM Users WHERE id = $1", [this.id]);
//       client.release();
//       return true;
//     } catch (error) {
//       throw new Error(error.message);
//     }
//   }
// }

class User {
  static async getAll() {
    try {
      const client = await pool.connect();
      const result = await client.query("SELECT * FROM Users");
      client.release();
      return result.rows;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getById(id) {
    try {
      const client = await pool.connect();
      const result = await client.query("SELECT * FROM Users WHERE id = $1", [
        id,
      ]);
      client.release();
      if (result.rows.length === 0) {
        throw new Error("User not found");
      }
      return result.rows[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async create(username, email, role_id) {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "INSERT INTO Users (username, email, role_id) VALUES ($1, $2, $3) RETURNING *",
        [username, email, role_id]
      );
      client.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async update(id, username, email, role_id) {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "UPDATE Users SET username = $1, email = $2, role_id = $3 WHERE id = $4 RETURNING *",
        [username, email, role_id, id]
      );
      client.release();
      if (result.rows.length === 0) {
        throw new Error("User not found");
      }
      return result.rows[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async delete(id) {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "DELETE FROM Users WHERE id = $1 RETURNING *",
        [id]
      );
      client.release();
      if (result.rows.length === 0) {
        throw new Error("User not found");
      }
      return result.rows[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = User;
