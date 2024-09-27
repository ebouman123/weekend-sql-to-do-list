console.log("JS is sourced!");

// Call GET function on page load
getTodo();

// GET the current todo items from the database
function getTodo() {
  axios({
    method: "GET",
    url: "/todos",
  })
    .then(function (response) {
      // Call the render function to update the DOM
      renderList(response.data);
    })
    .catch(function (error) {
      console.log("error in GET", error);
    });
}

// POST the new todo item to the database
function newTodo(event) {
  event.preventDefault();
  // Create our request body
  let todoObject = {
    text: document.getElementById("todoText").value,
    isComplete: false,
  };
  axios
    .post("/todos", todoObject)
    .then((response) => {
      getTodo();
    })
    .catch((error) => {
      console.log("Error", error);
      alert("Something went wrong");
    });
}

// UPDATE isComplete status to true, takes in the item's ID to target the specific row
function updateTodo(todoId, event) {
  event.preventDefault();
  // Add completed class to any rows that have the completed button clicked
  let updatedItem = event.target.parentElement.parentElement;
  console.log(updatedItem);
  updatedItem.classList.add("completed");
  axios
    .put(`/todos/${todoId}`)
    .then((response) => {
      getTodo();
    })
    .catch((error) => {
      console.log("Error", error);
      alert("oh crap");
    });
}

// DELETEs the specific todo item
// Confirmed that tests pass when sweetalert is disabled
function deleteTodo(todoId) {
  // Creates confirmation screen when Delete button is clicked
  Swal.fire({
    title: "Are you sure you want to delete this item?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Yes",
    denyButtonText: "No",
    customClass: {
      actions: "my-actions",
      cancelButton: "order-3 right-gap",
      confirmButton: "order-1",
      denyButton: "order-2",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Deleted!", "", "success");
      axios
        .delete(`/todos/${todoId}`)
        .then((response) => {
          getTodo();
        })
        .catch((error) => {
          console.log("Error", error);
          alert("Oh no......");
        });
    } else if (result.isDenied) {
    }
  });
}

// Renders the To-Do list items to the DOM
function renderList(todoList) {
  let todoTableBody = document.getElementById("todoTable");
  todoTableBody.innerHTML = "";
  // Loop over each item and append data to the DOM
  // Also use a conditional so that when the DOM renders again it will keep the completed class if isComplete = true
  // Disables Completed button if isComplete = true
  for (let item of todoList) {
    if (item.isComplete === true) {
      todoTableBody.innerHTML += `
            <tr class="completed table-success">
                <td class="fs-5 fw-light">${item.text}</td>
                <td><button class="btn btn-outline-success" disabled onClick="updateTodo(${item.id}, event)">Completed</button></td>
                <td><button class="btn btn-outline-danger" onClick="deleteTodo(${item.id})">Delete</button></td>
            </tr>
            `;
    } else {
      todoTableBody.innerHTML += `
            <tr>
                <td class="fs-5 fw-light">${item.text}</td>
                <td><button class="btn btn-outline-success" onClick="updateTodo(${item.id}, event)">Completed</button></td>
                <td><button class="btn btn-outline-danger" onClick="deleteTodo(${item.id})">Delete</button></td>
            </tr>
            `;
    }
  }
}
