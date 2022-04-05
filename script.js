
// This factory function creates new grocery items.
function createItem(itemName, store, section) {
    return {
        itemName: itemName,
        store: store,
        section: section,
    }
}

// Below are event listeners that cause the form to appear, where the user
// enters information for new groceries.

const sortList = document.getElementById("sortList")
sortList.addEventListener("click", reset)
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

// This is the starting list of groceries.

let groceries = [];

function reset() {
    groceries = [
        createItem("White Rice", "Everett's", "Dry"),
        createItem("Bread", "Oxendale", "Dry"),
        createItem("All-purpose Flour", "Everett's", "Dry"),
        createItem("Pasta", "Costco", "Dry"),
        createItem("Black Beans", "Costco", "Dry"),
        createItem("White Beans", "Cub Foods", "Dry"),
        createItem("Garbanzo Beans", "Costco", "Dry"),
        createItem("Diced Tomatoes", "Costco", "Dry"),
        createItem("Olive Oil", "Costco", "Dry"),
        createItem("Garlic", "Everett's", "Produce"),
        createItem("Onions", "Everett's", "Produce"),
        createItem("Carrot's", "Everett's", "Produce"),
        createItem("Bell Peppers", "Everett's", "Produce"),
        createItem("Broccoli", "Everett's", "Produce"),
        createItem("Soy Sauce", "United Noodle", "Dry"),
        createItem("Dijon Mustard", "Everett's", "Dry"),
        createItem("Greek Yogurt", "Oxendale", "Refrigerated"),
        createItem("Cheese", "Oxendale", "Refrigerated"),
        createItem("Bananas", "Everett's", "Produce"),
        createItem("Brussel Sprouts", "Everett's", "Produce"),
        createItem("Lemons", "Everett's", "Produce"),
    ];
    populate();
};
reset();




// This function takes information entered by the user on the form and stores
// it in a new object within the groceries array.
function addItem() {
    const itemName = document.querySelector("#itemName")
    const store = document.querySelector("#store")
    const section = document.querySelector("#section")
    const item = createItem(itemName.value, store.value, section.value)
    groceries.unshift(item)
    populate()
}

// The populate() function populates the grid div with the grocery items
// from the groceries array, complete with a list of all its information
// It also adds further functionality, allowing users to rank each item 
// according to priority, delete an item, and checkmark an item.


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