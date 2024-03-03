let elForm = document.querySelector(".form")
let elInput = document.querySelector(".form-input")
let elList = document.querySelector(".list")

let elModalWrapper = document.querySelector(".modal-wrapper")
let elModal = document.querySelector(".modal")

let allCount = document.querySelector(".all-count")
let completedCount = document.querySelector(".completed-count")
let uncompletedCount = document.querySelector(".uncompleted-count")

let todos = JSON.parse(window.localStorage.getItem("todos")) || []

elForm.addEventListener("submit", function(evt) {
    evt.preventDefault();
    let data = {
        id:todos.length ? todos[todos.length - 1].id + 1 : 1,
        value: elInput.value,
        isComplete: false
    }
    todos.push(data);
    renderTodo(todos, elList);
    evt.target.reset()

    window.localStorage.setItem("todos", JSON.stringify(todos));
})


function renderTodo(arr, list) {
    list.innerHTML = ""
    arr.map((item, index) => {
        let elItem = document.createElement("li")
        elItem.classList.add("todo-item")
        elItem.innerHTML = `
        <div class="value-wrapper ${item.isComplete ? "complete" : ""}">
            <span>${index + 1}.</span>
            <strong>${item.value}</strong>
        </div>

        <div class="btn-wrapper">
            <label>
            <input class="checkbox-todo visually-hidden" id="${item.id}" type="checkbox"/>
            <div class="check-wrapper">
                <span class="${item.isComplete ? "check-open" : "check-inner"}"></span>
            </div>
            </label>
            <button onclick="updateClick(${item.id})">Update</button>
            <button onclick="deleteBtnClick(${item.id})">Delete</button>
        </div>
        `
        list.appendChild(elItem)
    })

    allCount.textContent = todos.length
    completedCount.textContent = todos.filter(item => item.isComplete == true).length
    uncompletedCount.textContent = todos.filter(item => item.isComplete == false).length
}

renderTodo(todos, elList)

// allCount, compete buttons click start------------------------------------
allCount.parentElement.addEventListener("click", function(){
    renderTodo(todos, elList)
})

completedCount.parentElement.addEventListener("click", function() {
    const data = todos.filter(item => item.isComplete == true)
    renderTodo(data, elList)
})

uncompletedCount.parentElement.addEventListener("click", function() {
    const data = todos.filter(item => item.isComplete == false)
    renderTodo(data, elList)
})
// allCount, compete buttons click end------------------------------------


// Update part click start --------------------------------------------
function updateClick(id) {
    elModalWrapper.classList.add("open-modal")
    const data = todos.find(item => item.id === id)
    elModal.innerHTML = `
    <div class="update-wrapper">
        <strong>Update your todo</strong>
        <input value="${data.value}" class="update-input" placeholder="Enter"/>
        <button onclick="updateBtnClick(${id})">Submit</button>
    </div>
    `
}

function updateBtnClick(id) {
    let elUpdatedValue = document.querySelector(".update-input").value
    const data = todos.find(item => item.id === id)
    data.value = elUpdatedValue
    elModalWrapper.classList.remove("open-modal")
    renderTodo(todos, elList)
    window.localStorage.setItem("todos", JSON.stringify(todos))
}
// Update part click end --------------------------------------------

// Delete part start --------------------------------------------------
function deleteBtnClick(id) {
    elModalWrapper.classList.add("open-modal")
    elModal.innerHTML = `
    <div class="delete-wrapper">
        <h2>Are you sure?</h2>
        <div>
            <button onclick="cancelModal()">Cancel</button>
            <button onclick="deleteSureBtn(${id})">Delete</button>
        </div>
    </div>
    `
}

function cancelModal() {
    elModalWrapper.classList.remove("open-modal")
}

function deleteSureBtn(id) {
    const data = todos.findIndex(item => item.id === id)
    todos.splice(data, 1)
    elModalWrapper.classList.remove("open-modal")
    renderTodo(todos, elList)
    window.localStorage.setItem("todos", JSON.stringify(todos));
}
// Delete part end --------------------------------------------------

// Modal start ------------------------------------------------------
elModalWrapper.addEventListener("click", function(evt) {
    if(evt.target.id == "modal-wrapper") {
        elModalWrapper.classList.remove("open-modal")
    }
})
// Modal end ------------------------------------------------------

// Checkbox start -----------------------------------------------------
elList.addEventListener("click", function(evt) {
    if(evt.target.matches(".checkbox-todo")) {
        const data = todos.find(item => item.id == evt.target.id)
        data.isComplete = !data.isComplete
        renderTodo(todos, elList)
        window.localStorage.setItem("todos", JSON.stringify(todos));
    }
})
// Checkbox end -----------------------------------------------------