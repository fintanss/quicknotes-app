
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");

const STORAGE_KEY = "quicknotes-notes";

// Load saved notes when the page opens.
let notes = [];

try {
  const savedNotes = localStorage.getItem(STORAGE_KEY);
  notes = savedNotes ? JSON.parse(savedNotes) : [];

  if (!Array.isArray(notes)) {
    notes = [];
  }
} catch (error) {
  notes = [];
}

// Save notes to localStorage.
function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

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

// Display notes, applying the current search.
function render() {
  notesList.textContent = "";

  const searchTerm = searchInput.value.trim().toLowerCase();

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchTerm)
  );

  if (filteredNotes.length === 0 && searchTerm !== "") {
    const message = document.createElement("li");
    message.textContent = "No notes match your search.";
    notesList.appendChild(message);
  } else {
    filteredNotes.forEach((note) => {
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

      deleteButton.addEventListener("click", () => {
        notes = notes.filter((item) => item.id !== note.id);
        saveNotes();
        render();
      });

      li.appendChild(category);
      li.appendChild(text);
      li.appendChild(date);
      li.appendChild(deleteButton);

      notesList.appendChild(li);
    });
  }

  // Count all saved notes, not just search results.
  updateNoteCount();
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
  saveNotes();

  errorMessage.textContent = "";
  noteInput.value = "";

  render();
});

// Search as the user types.
searchInput.addEventListener("input", render);

// Show saved notes when the page opens.
render();