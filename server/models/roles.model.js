const pool = require("../config/db.config");

// class Role {
//   constructor(id, name, description) {
//     this.id = id;
//     this.name = name;
//     this.description = description;
//   }
//   static async getAll() {
//     try {
//       const client = await pool.connect();
//       const result = await client.query("SELECT * FROM Roles");
//       client.release();
//       return result.rows.map(
//         ({ id, name, description, createdAt, updatedAt }) =>
//           new Role(id, name, description, createdAt, updatedAt)
//       );
//     } catch (error) {
//       throw new Error(error.message);
//     }
//   }

//   static async create(name, description) {
//     try {
//       const client = await pool.connect();
//       const result = await client.query(
//         "INSERT INTO Roles (name, description, createdAt, updatedAt) VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *",
//         [name, description]
//       );
//       client.release();
//       const {
//         id,
//         name: createdName,
//         description: createdDescription,
//         createdAt,
//         updatedAt,
//       } = result.rows[0];
//       return new Role(
//         id,
//         createdName,
//         createdDescription,
//         createdAt,
//         updatedAt
//       );
//     } catch (error) {
//       throw new Error(error.message);
//     }
//   }

//   static async getById(id) {
//     try {
//       const client = await pool.connect();
//       const result = await client.query("SELECT * FROM Roles WHERE id = $1", [
//         id,
//       ]);
//       client.release();
//       if (result.rows.length === 0) {
//         throw new Error("Role not found");
//       }
//       const { name, description, createdAt, updatedAt } = result.rows[0];
//       return new Role(id, name, description, createdAt, updatedAt);
//     } catch (error) {
//       throw new Error(error.message);
//     }
//   }

//   static async update(id, name, description) {
//     try {
//       const client = await pool.connect();
//       const result = await client.query(
//         "UPDATE Roles SET name = $1, description = $2, updatedAt = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *",
//         [name, description, id]
//       );
//       client.release();
//       if (result.rows.length === 0) {
//         throw new Error("Role not found");
//       }
//       const {
//         name: updatedName,
//         description: updatedDescription,
//         createdAt,
//         updatedAt,
//       } = result.rows[0];
//       return new Role(
//         id,
//         updatedName,
//         updatedDescription,
//         createdAt,
//         updatedAt
//       );
//     } catch (error) {
//       throw new Error(error.message);
//     }
//   }

//   static async delete(id) {
//     try {
//       const client = await pool.connect();
//       const result = await client.query(
//         "DELETE FROM Roles WHERE id = $1 RETURNING *",
//         [id]
//       );
//       client.release();
//       if (result.rows.length === 0) {
//         throw new Error("Role not found");
//       }
//       const { name, description, createdAt, updatedAt } = result.rows[0];
//       return new Role(id, name, description, createdAt, updatedAt);
//     } catch (error) {
//       throw new Error(error.message);
//     }
//   }
// }

class Role {
  static async getAll() {
    try {
      const client = await pool.connect();
      const result = await client.query("SELECT * FROM Roles");
      client.release();
      return result.rows;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async create(name, description) {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "INSERT INTO Roles (name, description) VALUES ($1, $2) RETURNING *",
        [name, description]
      );
      client.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getById(id) {
    try {
      const client = await pool.connect();
      const result = await client.query("SELECT * FROM Roles WHERE id = $1", [
        id,
      ]);
      client.release();
      if (result.rows.length === 0) {
        throw new Error("Role not found");
      }
      return result.rows[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async update(id, name, description) {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "UPDATE Roles SET name = $1, description = $2 WHERE id = $3 RETURNING *",
        [name, description, id]
      );
      client.release();
      if (result.rows.length === 0) {
        throw new Error("Role not found");
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
        "DELETE FROM Roles WHERE id = $1 RETURNING *",
        [id]
      );
      client.release();
      if (result.rows.length === 0) {
        throw new Error("Role not found");
      }
      return result.rows[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = Role;
