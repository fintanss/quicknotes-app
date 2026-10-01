
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");

// Store notes in an array.
let notes = [];

// Display notes on the page.
function render() {
  notesList.textContent = "";

  notes.forEach((note) => {
    const li = document.createElement("li");
    li.classList.add(`category-${note.category}`);

    const text = document.createElement("p");
    text.textContent = note.text;

    const category = document.createElement("span");
    category.classList.add("note-category");
    category.textContent =
      note.category.charAt(0).toUpperCase() +
      note.category.slice(1);

    const date = document.createElement("small");
    date.classList.add("note-date");
    date.textContent = note.createdAt;

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = "Delete";
    deleteButton.type = "button";

    li.appendChild(category);
    li.appendChild(text);
    li.appendChild(date);
    li.appendChild(deleteButton);

    notesList.appendChild(li);
  });
}

// Add a note when the form is submitted.
noteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = noteInput.value.trim();
  const category = noteCategory.value;

  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent =
      "Notes must be 200 characters or fewer.";
    return;
  }

  const note = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString()
  };

  notes.push(note);

  errorMessage.textContent = "";
  noteInput.value = "";

  render();
});