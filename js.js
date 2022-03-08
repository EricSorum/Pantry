// Next I need to create some pre-made grocery items
// Also, clean up the DOM manipulation stuff -
// put DOM stuff in separate functions

// Here is the constructor, used to create new grocery items.
function Item(itemName, store, section) {
    this.itemName = itemName
    this.store = store
    this.section = section
    this.checked = false
}

// The groceries array is provided with a default set of items.
let groceries = [
    new Item("White Rice", "Everett's", "Dry"),
    new Item("Bread", "Oxendale", "Dry"),
    new Item("All-purpose Flour", "Everett's", "Dry"),
    new Item("Pasta", "Costco", "Dry"),
    new Item("Black Beans", "Costco", "Dry"),
    new Item("White Beans", "Cub Foods", "Dry"),
    new Item("Garbanzo Beans", "Costco", "Dry"),
    new Item("Diced Tomatoes", "Costco", "Dry"),
    new Item("Olive Oil", "Costco", "Dry"),
    new Item("Garlic", "Everett's", "Produce"),
    new Item("Onions", "Everett's", "Produce"),
    new Item("Carrot's", "Everett's", "Produce"),
    new Item("Bell Peppers", "Everett's", "Produce"),
    new Item("Broccoli", "Everett's", "Produce"),
    new Item("Soy Sauce", "United Noodle", "Dry"),
    new Item("Dijon Mustard", "Everett's", "Dry"),
    new Item("Greek Yogurt", "Oxendale", "Refrigerated"),
    new Item("Cheese", "Oxendale", "Refrigerated"),
    new Item("Bananas", "Everett's", "Produce"),
    new Item("Brussel Sprouts", "Everett's", "Produce"),
    new Item("Lemons", "Everett's", "Produce"),
]

// Below are event listeners that cause the form to appear, where the user
// enters information for new groceries.
const sortList = document.getElementById("sortList")
sortList.addEventListener("click", populate)
const grid = document.querySelector("#grid")
const formAppears = document.getElementById("formAppears")
const toggleForm = function () {
    const formId = document.querySelector("#form")
    formId.classList.toggle("hidden")
    formId.classList.toggle("itemDiv")
}
formAppears.addEventListener("click", toggleForm)
const submit = document.getElementById("submit")
submit.addEventListener("click", addItem)

// This function takes information entered by the user on the form and stores
// it in a new object within the groceries array.
function addItem() {
    const itemName = document.querySelector("#itemName")
    const store = document.querySelector("#store")
    const section = document.querySelector("#section")
    const item = new Item(itemName.value, store.value, section.value)
    groceries.unshift(item)
    populate()
}

// The populate() function populates the grid div with the grocery items
// from the groceries array, complete with a list of all its information
// It also adds further functionality, allowing users to rank each item 
// according to priority, delete an item, and checkmark an item.

populate()

function populate() {
    document.querySelector("#grid").innerHTML=""
    for (let i = 0; i < groceries.length; i++) {
        const itemDiv = document.createElement("div")
        itemDiv.className = "itemDiv"
        itemDiv.dataset.index = i
        grid.appendChild(itemDiv)
        const checkbox = document.createElement("input")
        checkbox.className = "checkbox"
        checkbox.value = "checkbox"
        checkbox.type = "checkbox"
        checkbox.id = "checkbox"
        if (groceries[i].checked == true) {
            checkbox.checked = true
        }
        checkbox.addEventListener("click", checkFunction.bind(i, i))
        document.getElementsByClassName
        itemDiv.appendChild(checkbox)
        const p = document.createElement("p")
        itemDiv.appendChild(p)
        p.innerText = `${groceries[i].itemName} | Store: ${groceries[i].store} | Section: ${groceries[i].section} | Priority: `
        const priority = document.createElement("select")
        itemDiv.appendChild(priority)
        const low = document.createElement("option")
        low.value = "Low"
        low.className = "low"
        low.text = "Low"
        priority.appendChild(low)
        const medium = document.createElement("option")
        medium.value = "Medium"
        medium.text = "Medium"
        medium.className = "medium"
        priority.appendChild(medium)
        const high = document.createElement("option")
        high.value = "High"
        high.text = "High"
        high.className = "high"
        priority.appendChild(high)
        const deleteButton = document.createElement("button")
        itemDiv.appendChild(deleteButton)
        deleteButton.innerText = "Delete"
        deleteButton.className = "delete"
        deleteButton.addEventListener("click", deleteItem.bind(i, i))
    }
}

// Below are two functions that manipulate grocery items.

// By checking a box next to an item, it sends the item to the front of 
// the list.
function checkFunction(i) {
    groceries[i].checked = true
    groceries.splice(0, 0, groceries[i])
    groceries.splice(i+1, 1)
    populate()
}

// This deletes an item and repopulates the array.
function deleteItem(i) {
    groceries.splice(i, 1)
    populate()
}