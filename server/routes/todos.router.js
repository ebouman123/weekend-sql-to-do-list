const router = require("express").Router();
const pool = require("../modules/pool");

// GET route to SELECT the data from the database to be sent to the client
router.get("/", (req, res) => {
  // SELECT all the todos rows and order them by isComplete
  let queryText = 'SELECT * FROM todos ORDER BY "isComplete" ASC;';
  pool
    .query(queryText)
    .then((result) => {
      // Sends back the results in an array of objects
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("error getting todos", error);
      res.sendStatus(500);
    });
});

// POST the new todo item to the database
router.post("/", (req, res) => {
  const newTodo = req.body;

  // INSERT items into the todos table using two placeholders
  const queryText = `
        INSERT INTO todos("text", "isComplete") 
        VALUES
            ($1, $2);
    `;
  // Params for the $1 and $2
  let params = [newTodo.text, newTodo.isComplete];

  pool
    .query(queryText, params)
    .then((result) => {
      console.log(params);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("Error making POST query for new todo", err);
      res.sendStatus(500);
    });
});

// UPDATE the isComplete column in database to true
// Takes the items id as the param
router.put("/:id", (req, res) => {
  let id = req.params.id;
  let sqlText = `UPDATE todos
        SET "isComplete" = true
        WHERE "id" = $1;`;
  let params = [id];
  pool
    .query(sqlText, params)
    .then((result) => {
      res.sendStatus(204);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

// Tell database to DELETE the item associated with the id
router.delete("/:id", (req, res) => {
  let id = req.params.id;
  let sqlText = `DELETE FROM todos WHERE "id" = $1`;
  let params = [id];

  pool
    .query(sqlText, params)
    .then((result) => {
      res.sendStatus(204);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

module.exports = router;
