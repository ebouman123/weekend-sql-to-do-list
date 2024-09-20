console.log('JS is sourced!');

// Call GET function on page load
getTodo()


// GET the current todo items from the database
function getTodo() {
    axios({
        method: 'GET',
        url: '/todos'
    }).then(function (response) {
        // Call the render function to update the DOM
        renderList(response.data)
    }).catch(function (error) {
        console.log('error in GET', error);
    });
}

// POST the new todo item to the database
function newTodo(event) {
    event.preventDefault();
    // Create our request body
    let todoObject = {
        text: document.getElementById('todoText').value,
        isComplete: false,
    }
    axios.post('/todos', todoObject).then((response) => {
        getTodo()
    }).catch((error) => {
        console.log('Error', error);
        alert('Something went wrong');
    });
}


// UPDATE isComplete status to true, takes in the item's ID to target the specific row
function updateTodo(todoId) {
    axios.put(`/todos/${todoId}`).then(response => {
        getTodo();
    }).catch((error) => {
        console.log('Error', error);
        alert('oh crap');
    });
}


// DELETEs the specific todo item
function deleteTodo(todoId) {
    axios.delete(`/todos/${todoId}`).then((response) => {
        getTodo();
    }).catch((error) => {
        console.log('Error', error);
        alert('Oh no......');
    });
}


// Renders the To-Do list items to the DOM
function renderList(todoList) {
    let todoTableBody = document.getElementById('todoTable')
    todoTableBody.innerHTML = '';
    // Loop over each item and append data to the DOM
    for (let item of todoList) {
        todoTableBody.innerHTML += `
      <tr>
        <td>${item.text}</td>
        <td><button onClick="updateTodo(${item.id})">Completed</button></td>
        <td><button onClick="deleteTodo(${item.id})">Delete</button></td>
      </tr>
  `;
    }
}