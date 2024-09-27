const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));

require('dotenv').config()

const todos = require("./routes/todos.router.js");

let PORT = process.env.PORT || 5001;


app.use(express.static("./server/public"));
app.use(express.json());

app.use("/todos", todos);

app.listen(PORT, () => {
  console.log("server running on: ", PORT);
});
