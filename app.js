// Book Tracker

// ---------- Page elements ----------
const bookForm = document.getElementById("book-form");
const titleInput = document.getElementById("title-input");
const authorInput = document.getElementById("author-input");
const statusSelect = document.getElementById("status-select");
const titleError = document.getElementById("title-error");
const authorError = document.getElementById("author-error");
const bookList = document.getElementById("book-list");
const searchInput = document.getElementById("search-input");
const bookSummary = document.getElementById("book-summary");

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
        typeof book.id === "string" &&
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

function showMessage(text) {
  const message = document.createElement("li");
  message.className = "empty-state";
  message.textContent = text;
  bookList.appendChild(message);
}

// True when the title or author contains the search text, ignoring capital letters
function matchesSearch(book, query) {
  return (
    book.title.toLowerCase().includes(query) ||
    book.author.toLowerCase().includes(query)
  );
}

// Order and wording for the summary line
const SUMMARY_ORDER = [
  ["finished", "finished"],
  ["reading", "reading"],
  ["to-read", "to read"],
];

// Writes e.g. "3 finished, 1 reading, 2 to read", counted from ALL books (not the search
// results). Statuses with zero books are left out; with no books it shows nothing.
function renderSummary() {
  const parts = [];
  for (const [status, text] of SUMMARY_ORDER) {
    const count = books.filter((book) => book.status === status).length;
    if (count > 0) parts.push(count + " " + text);
  }
  bookSummary.textContent = parts.join(", ");
}

// Redraws the whole list from the books array, newest first, showing only books
// that match the search box. Call this every time the books array or the search changes.
function renderBooks() {
  renderSummary();
  bookList.innerHTML = "";

  if (books.length === 0) {
    showMessage("No books yet. Add your first one above.");
    return;
  }

  // An empty search matches every book. filter() and slice() both make new arrays,
  // so the books array itself is never changed by searching or sorting.
  const query = searchInput.value.trim().toLowerCase();
  const visible = books.filter((book) => matchesSearch(book, query));

  if (visible.length === 0) {
    showMessage("No books match your search.");
    return;
  }

  const newestFirst = visible.slice().sort((a, b) => b.createdAt - a.createdAt);

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

    // Status dropdown. data-id links it to the book, so a change finds the right
    // book even when a search hides some books and the positions shift.
    const select = document.createElement("select");
    select.className = "book-status-select";
    select.dataset.id = book.id;
    select.setAttribute("aria-label", "Status for " + book.title);
    for (const [value, text] of Object.entries(STATUS_LABELS)) {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = text;
      select.appendChild(option);
    }
    select.value = book.status;

    const controls = document.createElement("div");
    controls.className = "book-controls";
    // Delete button, linked to the book by id in the same way as the dropdown
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "book-delete-button";
    deleteButton.dataset.id = book.id;
    deleteButton.setAttribute("aria-label", "Delete " + book.title);
    deleteButton.textContent = "Delete";

    controls.append(label, select, deleteButton);

    item.append(info, controls);
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

// One listener on the list handles every book's status dropdown, including ones drawn later
bookList.addEventListener("change", function (event) {
  const select = event.target;
  if (!select.classList.contains("book-status-select")) return;

  const id = select.dataset.id;
  const book = books.find((b) => b.id === id);
  if (!book || !(select.value in STATUS_LABELS)) return;

  book.status = select.value;
  saveBooks();
  renderBooks();

  // Redrawing replaces the dropdown, so put keyboard focus back on the new one
  const newSelect = bookList.querySelector('select[data-id="' + CSS.escape(id) + '"]');
  if (newSelect) newSelect.focus();
});

// One listener on the list handles every book's Delete button
bookList.addEventListener("click", function (event) {
  const button = event.target;
  if (!button.classList.contains("book-delete-button")) return;

  if (!confirm("Delete this book?")) return;

  const id = button.dataset.id;
  books = books.filter((b) => b.id !== id);
  saveBooks();
  renderBooks();
});

// Redraw on every keystroke (and when the search box's clear button is used)
searchInput.addEventListener("input", renderBooks);

// ---------- Start ----------
renderBooks(); // draw the saved list (or the empty message) when the page opens
