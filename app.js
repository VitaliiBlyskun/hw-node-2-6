const express = require("express");
// const moment = require("moment");
// const fs = require("fs/promises");
const cors = require("cors");

const app = express();

// const { contactsRouter } = require('./routes/api');
const contactsRouter = require("./routes/api/contacts");

app.use(cors());
app.use(express.json())

// app.use(async (request, response, next) => {
//   const { method, url } = request;
//   const date = moment().format("DD-MM-YYYY_hh:mm:ss");
//   await fs.appendFile("./public/server.log", `\n${method} ${url} ${date}`);
//   next();
// });

// app.use((request, response, next) => {
//   console.log("first middlware")
//   next()
// })

// app.use((request, response, next) => {
//   console.log("second middlware")
//   next()
// })

app.use("/api/contacts", contactsRouter);

app.get("/api/products", (request, response) => {
  response.json([]);
});

app.use((request, response) => {
  response.status(400).json({
    message: "Not found",
  });
});

app.use((error, request, response, next) => {
  const { status = 500, message = "Server error" } = error;
  response.status(status).json({
    message,
  });
});

module.exports = app;
