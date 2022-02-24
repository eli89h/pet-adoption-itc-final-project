const { v4: uuidv4 } = require("uuid");
const express = require("express");
const { validationMid } = require("../middlewares/validation.js");
const authenticate = require("../middlewares/authentication.js");

const router = express.Router();
const S = require("fluent-json-schema");
const {
  query,
  addPet,
  getAllPets,
  getUserById,
  getPetById,
  searchPets,
  changePetAdopt,
  returnPetAdopt,
  savePet,
  deletePet,
  getUsersPets,
  getUserSavedPets,
} = require("../data/mysqldb");

router.post("/", async (req, res, next) => {
  //Send list of all pets to the client
  if (Object.keys(req.body).length === 0) {
    try {
      const petsList = await getAllPets();
      res.send(petsList);
    } catch (error) {
      next(error);
    }
  }

  try {
    console.log(req.body);
    let columns = Object.keys(req.body); // create array of column names
    let values = Object.values(req.body); //create array of values
    columns = columns.join(", "); //join coulmns into string
    values = "'" + values.join("', '") + "'"; //join values to string
    const searchQuery = `SELECT * FROM pets  WHERE (${columns}) = (${values});`; //create query
    const searchPetsRes = await searchPets(searchQuery);
    res.send(searchPetsRes);
  } catch (error) {
    next(error);
  }
});

router.get("/list", async (req, res, next) => {
  //Send list of all pets to the client

  try {
    const petsList = await getAllPets();
    res.send(petsList);
    console.log(petsList);
  } catch (error) {
    next(error);
  }
});

router.post("/:id/adopt", authenticate(), async (req, res, next) => {
  try {
    const petAdopt = await changePetAdopt(
      req.decoded.appUserId,
      req.params.id,
      req.body.status
    );
    res.send({ text: "Pet status changed successfully" });
  } catch (error) {
    next(error);
  }
});

router.post("/:id/return", authenticate(), async (req, res, next) => {
  try {
    const petReturn = await returnPetAdopt(req.params.id);
    res.send({ text: "Pets returned to the agency" });
    console.log(petReturn);
  } catch (error) {
    next(error);
  }
});

router.post("/:id/save", authenticate(), async (req, res, next) => {
  try {
    const id = uuidv4();
    const savedPet = await savePet(id, req.params.id, req.decoded.appUserId);
    res.send({ text: "Pet saved successfully" });
    console.log(savedPet);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id/save", authenticate(), async (req, res, next) => {
  try {
    const deletedPet = await deletePet(req.decoded.appUserId, req.params.id);
    res.send({ text: "Pet Deleted successfully" });
    console.log(deletedPet);
  } catch (error) {
    next(error);
  }
});

router.post("/user/:id", async (req, res, next) => {
  try {
    const userSavedPets = await getUserSavedPets(req.params.id);
    res.send(userSavedPets);
    console.log(userSavedPets);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const petById = await getPetById(req.params.id);
    res.send(petById);
    console.log(petById);
  } catch (error) {
    next(error);
  }
});
const petSchema = S.object()
  .prop("name", S.string().required())
  .prop("type", S.string().required())
  .prop("adaptationStatus", S.string().required())
  .prop("pic", S.string().required())
  .prop("height", S.string().required())
  .prop("weight", S.string().required())
  .prop("color", S.string().required())
  .prop("bio", S.string().required())
  .prop("hypoallergenic", S.string().required())
  .prop("dietaryRestrictions", S.string().required())
  .prop("breed", S.string().required())
  .prop("saved", S.boolean().required());

router.post(
  "/",
  authenticate(),
  validationMid(petSchema.valueOf()),
  async (req, res, next) => {
    const user = await getUserById(req.decoded.appUserId);
    if (user.role !== "user") {
      res.status(403).send("you are not suposed to be here: Forbiden accses ");
      return;
    }

    //Add a new todo to our database
    console.log("we are here");
    try {
      //validation is needed

      const queryResult = await addPet(req.body.text);

      res.send(queryResult[0]);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
