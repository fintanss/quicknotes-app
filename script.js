
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");

// Store notes in an array.
let notes = [];

// Update the note count.
function updateNoteCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

// Display notes on the page.
function render() {
  notesList.textContent = "";

  notes.forEach((note) => {
    const li = document.createElement("li");
    li.classList.add(`category-${note.category}`);

    const category = document.createElement("span");
    category.classList.add("note-category");
    category.textContent =
      note.category.charAt(0).toUpperCase() +
      note.category.slice(1);

    const text = document.createElement("p");
    text.textContent = note.text;

    const date = document.createElement("small");
    date.classList.add("note-date");
    date.textContent = note.createdAt;

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = "Delete";
    deleteButton.type = "button";

    // Delete this note.
    deleteButton.addEventListener("click", () => {
      notes = notes.filter((item) => item.id !== note.id);
      render();
    });

    li.appendChild(category);
    li.appendChild(text);
    li.appendChild(date);
    li.appendChild(deleteButton);

    notesList.appendChild(li);
  });

  updateNoteCount();
}

// Add a note when the form is submitted.
noteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = noteInput.value.trim();
  const category = noteCategory.value;

  // Validate empty notes.
  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  // Validate note length.
  if (text.length > 200) {
    errorMessage.textContent =
      "Notes must be 200 characters or fewer.";
    return;
  }

  // Create the new note.
  const note = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString()
  };

  notes.push(note);

  // Reset the form and display the updated list.
  errorMessage.textContent = "";
  noteInput.value = "";

  render();
});

// Show the initial count.
render();