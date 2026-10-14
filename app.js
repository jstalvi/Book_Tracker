// Book Tracker

// ---------- Page elements ----------
const bookForm = document.getElementById("book-form");
const titleInput = document.getElementById("title-input");
const authorInput = document.getElementById("author-input");
const statusSelect = document.getElementById("status-select");
const titleError = document.getElementById("title-error");
const authorError = document.getElementById("author-error");
const bookList = document.getElementById("book-list");

// The text shown on the page for each saved status value
const STATUS_LABELS = {
  "to-read": "To read",
  "reading": "Reading",
  "finished": "Finished",
};

// ---------- Data ----------
const STORAGE_KEY = "books";

let books = loadBooks();

// Reads the saved list. Returns [] if nothing is saved or the data is broken.
function loadBooks() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!Array.isArray(saved)) return []; // nothing saved yet (null) or not a list

    // Keep only entries that look like books, so one bad entry can't break the page
    return saved.filter(
      (book) =>
        book !== null &&
        typeof book === "object" &&
        typeof book.title === "string" &&
        typeof book.author === "string" &&
        book.status in STATUS_LABELS &&
        typeof book.createdAt === "number"
    );
  } catch (error) {
    return []; // the saved text isn't valid JSON, or localStorage is blocked
  }
}

// Writes the whole list. Call after every add, change or delete.
function saveBooks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  } catch (error) {
    // Storage is full or blocked (e.g. some private windows): the page still works, it just won't remember
    console.warn("Could not save books:", error);
  }
}

// A unique id such as "b1760438400000-k3f9"
function createId() {
  return "b" + Date.now() + "-" + Math.random().toString(36).slice(2, 6);
}

// ---------- Validation ----------

// Shows the message under the box if it is empty, clears it otherwise.
// Returns true when the box is filled in.
function checkRequired(input, errorElement, message) {
  const isFilled = input.value.trim() !== "";
  errorElement.textContent = isFilled ? "" : message;
  input.setAttribute("aria-invalid", isFilled ? "false" : "true");
  return isFilled;
}

function checkTitle() {
  return checkRequired(titleInput, titleError, "Please enter a title");
}

function checkAuthor() {
  return checkRequired(authorInput, authorError, "Please enter an author");
}

// ---------- Drawing the list ----------

// Redraws the whole list from the books array, newest first.
// Call this every time the books array changes.
function renderBooks() {
  bookList.innerHTML = "";

  if (books.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty-state";
    empty.textContent = "No books yet. Add your first one above.";
    bookList.appendChild(empty);
    return;
  }

  // slice() makes a copy so sorting doesn't change the books array itself
  const newestFirst = books.slice().sort((a, b) => b.createdAt - a.createdAt);

  for (const book of newestFirst) {
    const item = document.createElement("li");
    item.className = "book-item";

    const info = document.createElement("div");

    // textContent (not innerHTML) so typed text like <b>test</b> shows as plain text
    const title = document.createElement("h2");
    title.className = "book-title";
    title.textContent = book.title;

    const author = document.createElement("p");
    author.className = "book-author";
    author.textContent = book.author;

    info.append(title, author);

    const label = document.createElement("span");
    label.className = "status-label status-" + book.status;
    label.textContent = STATUS_LABELS[book.status];

    item.append(info, label);
    bookList.appendChild(item);
  }
}

// ---------- Events ----------

bookForm.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading

  // Check both boxes so both messages can show at once
  const titleOk = checkTitle();
  const authorOk = checkAuthor();

  if (!titleOk || !authorOk) {
    (titleOk ? authorInput : titleInput).focus();
    return;
  }

  books.push({
    id: createId(),
    title: titleInput.value.trim(),
    author: authorInput.value.trim(),
    status: statusSelect.value,
    createdAt: Date.now(),
  });

  saveBooks();
  renderBooks();

  bookForm.reset(); // empties the text boxes and sets status back to "To read"
  titleInput.focus();
});

// Clear an error as soon as its box is filled in, but don't show new errors while typing
titleInput.addEventListener("input", function () {
  if (titleError.textContent) checkTitle();
});

authorInput.addEventListener("input", function () {
  if (authorError.textContent) checkAuthor();
});

// ---------- Start ----------
renderBooks(); // draw the saved list (or the empty message) when the page opens
