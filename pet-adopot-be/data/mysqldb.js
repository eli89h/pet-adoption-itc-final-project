const mysql = require("mysql");
const SQL = require("@nearform/sql");

const Postgrator = require("postgrator");
const postgrator = new Postgrator({
  migrationDirectory: "./migrations",
  driver: "mysql",
  port: 3306,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  schemaTable: "migrations",
});
exports.postgrator = postgrator;

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  multipleStatements: true,
});
const query = (queryText) => {
  return new Promise((resolve, reject) => {
    pool.query(queryText, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
exports.query = query;
// const addPet = async (text) => {
//   try {
//     const queryResult = await query(
//       SQL`INSERT INTO pets (text) VALUES ('${text}'), SELECT LAST_INSERT_ID();`
//     );
//     console.log({ queryResult });
//     return queryResult;
//   } catch (error) {
//     console.log(error);
//   }
// };
// exports.addPet = addPet;

const getAllPets = async () => {
  try {
    const queryResult = await query(SQL`SELECT * FROM pets`);
    return queryResult;
  } catch (error) {
    console.log(error);
  }
};
exports.getAllPets = getAllPets;

const searchPets = async (petQuery) => {
  try {
    const queryResult = await query(petQuery);
    return queryResult;
  } catch (error) {
    console.log(error);
  }
};
exports.searchPets = searchPets;

const getAllUsers = async () => {
  try {
    const queryResult = await query(
      SQL`SELECT id, first_name,last_name,phone,email FROM users;`
    );
    return queryResult;
  } catch (error) {
    console.log(error);
  }
};
exports.getAllUsers = getAllUsers;

const addPet = async (
  id,
  type,
  name,
  status,
  height,
  weight,
  color,
  bio,
  hypoallergenic,
  restrictions,
  breed
) => {
  try {
    const queryResult = await query(
      SQL`INSERT INTO pets (id, type, name, status, height, weight, color, bio, hypoallergenic, restrictions, breed) VALUES (${id}, ${type}, ${name}, ${status}, ${height}, ${weight}, ${color}, ${bio}, ${hypoallergenic}, ${restrictions}, ${breed});`
    );
    return queryResult;
  } catch (error) {
    console.log(error);
  }
};
exports.addPet = addPet;

const addUser = async (id, email, password, first_name, last_name, phone) => {
  try {
    const queryResult = await query(
      SQL`INSERT INTO users (id, email, password, first_name, last_name, phone) VALUES (${id}, ${email}, ${password},${first_name},${last_name},${phone});`
    );
    return queryResult;
  } catch (error) {
    console.log(error);
  }
};
exports.addUser = addUser;

const addAdmin = async (id, email, password, name) => {
  try {
    const queryResult = await query(
      SQL`INSERT INTO admins (id, email, password, name) VALUES (${id}, ${email}, ${password},${name});`
    );
    return queryResult;
  } catch (error) {
    console.log(error);
  }
};
exports.addAdmin = addAdmin;

const updateUser = async (
  id,
  email,
  password,
  first_name,
  last_name,
  phone,
  bio
) => {
  try {
    const queryResult = await query(
      SQL`UPDATE users SET  email = ${email}, password = ${password}, first_name = ${first_name}, last_name = ${last_name}, phone = ${phone}, bio = ${bio} WHERE id = ${id};`
    );
    return queryResult;
  } catch (error) {
    console.log(error);
  }
};
exports.updateUser = updateUser;

const getUserByEmail = async (email) => {
  try {
    const queryResult = await query(
      SQL`SELECT * from users WHERE email = ${email};`
    );
    console.log({ queryResult });
    return queryResult[0];
  } catch (error) {
    console.log(error);
  }
};
exports.getUserByEmail = getUserByEmail;

const getPetByName = async (name) => {
  try {
    const queryResult = await query(
      SQL`SELECT * from pets WHERE name = ${name};`
    );
    console.log({ queryResult });
    return queryResult[0];
  } catch (error) {
    console.log(error);
  }
};
exports.getPetByName = getPetByName;

const getAdminByEmail = async (email) => {
  try {
    const queryResult = await query(
      SQL`SELECT * from admins WHERE email = ${email};`
    );
    console.log({ queryResult });
    return queryResult[0];
  } catch (error) {
    console.log(error);
  }
};
exports.getAdminByEmail = getAdminByEmail;

const getUserById = async (id) => {
  try {
    const queryResult = await query(
      SQL`SELECT first_name, last_name, email ,phone, bio FROM users WHERE id = ${id};`
    );
    return queryResult[0];
  } catch (error) {
    console.log(error);
  }
};
exports.getUserById = getUserById;

const updateUserPic = async (userId, path) => {
  try {
    const queryResult = await query(
      SQL`UPDATE users SET up_pic = ${path} WHERE id = ${userId}`
    );
    //console.log({ queryResult });
    return queryResult[0];
  } catch (error) {
    console.log(error);
  }
};
exports.updateUserPic = updateUserPic;

const addPetPic = async (petId, path) => {
  try {
    const queryResult = await query(
      SQL`UPDATE pets SET pp_pic = ${path} WHERE id = ${petId}`
    );
    //console.log({ queryResult });
    return queryResult[0];
  } catch (error) {
    console.log(error);
  }
};
exports.addPetPic = addPetPic;

const getPetById = async (id) => {
  try {
    const queryResult = await query(SQL`SELECT * FROM pets WHERE id = ${id};`);
    console.log({ queryResult });
    return queryResult[0];
  } catch (error) {
    console.log(error);
  }
};
exports.getPetById = getPetById;

// const getUsersPets = async (userId) => {
//   try {
//     const queryResult = await query(
//       SQL`SELECT * FROM pets WHERE user_id = ${userId};`
//       //SQL`SELECT * FROM saved_pets WHERE saved_u_id = ${userId};`
//     );
//     console.log({ queryResult });
//     return queryResult;
//   } catch (error) {
//     console.log(error);
//   }
// };
// exports.getUsersPets = getUsersPets;

const getUserSavedPets = async (userId) => {
  try {
    const queryResult = await query(
      SQL`SELECT * 
        FROM ( SELECT spt.saved_u_id, pt.* 
        FROM saved_pets AS spt JOIN pets 
        AS pt ON spt.pet_id = pt.id ) x 
        WHERE x.saved_u_id = ${userId};
        SELECT * FROM pets WHERE user_id = ${userId};`
    );
    console.log({ queryResult });
    return queryResult;
  } catch (error) {
    console.log(error);
  }
};
exports.getUserSavedPets = getUserSavedPets;

const changePetAdopt = async (userId, petId, status) => {
  try {
    const queryResult = await query(
      SQL`UPDATE pets SET status = ${status}, user_id=${userId} WHERE id = ${petId};`
    );
    console.log({ queryResult });
    return queryResult[0];
  } catch (error) {
    console.log(error);
  }
};
exports.changePetAdopt = changePetAdopt;

const returnPetAdopt = async (petId) => {
  try {
    const queryResult = await query(
      SQL`UPDATE pets SET status = "Available" , user_id = NULL WHERE id = ${petId};`
    );
    console.log({ queryResult });
    return queryResult[0];
  } catch (error) {
    console.log(error);
  }
};
exports.returnPetAdopt = returnPetAdopt;

const savePet = async (id, userId, petId) => {
  try {
    const queryResult = await query(
      SQL`INSERT INTO saved_pets (saved_pet_id, saved_u_id, pet_id) VALUES (${id}, ${petId}, ${userId});`
    );
    console.log({ queryResult });
    return queryResult[0];
  } catch (error) {
    console.log(error);
  }
};
exports.savePet = savePet;

const deletePet = async (userId, petId) => {
  try {
    const queryResult = await query(
      SQL`DELETE FROM saved_pets WHERE ( saved_u_id = ${userId} AND pet_id = ${petId});`
    );
    console.log({ queryResult });
    return queryResult[0];
  } catch (error) {
    console.log(error);
  }
};
exports.deletePet = deletePet;
