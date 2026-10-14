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
let books = [];

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

function createBookItem(book) {
  const item = document.createElement("li");
  item.className = "book-item";

  const info = document.createElement("div");

  // textContent (not innerHTML) so typed text is never treated as HTML
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
  return item;
}

// Redraws the whole list, newest first
function renderBooks() {
  const newestFirst = books.slice().sort((a, b) => b.createdAt - a.createdAt);

  bookList.innerHTML = "";
  for (const book of newestFirst) {
    bookList.appendChild(createBookItem(book));
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
