require("dotenv").config();
const express = require("express");
const { postgrator } = require("./data/mysqldb");
const fs = require("fs");
//const path = require("path");
//const { upload } = require("./lib/uploadFiles");
const cors = require("cors");
const app = express();
let port = process.env.PORT;
const host = "localhost";
app.use(express.json());
app.use(cors());

app.use("/pets", require("./routes/pets.js"));
app.use("/users", require("./routes/users.js"));
app.use("/admin", require("./routes/admin.js"));

if (port == null || port == "") {
  port = 8000;
}

app.listen(port);
