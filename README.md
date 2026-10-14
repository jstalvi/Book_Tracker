# Book Tracker

A small, dependency-free web app for keeping track of the books you want to read, are reading, and have finished. Built with plain HTML, CSS and JavaScript — no frameworks, no libraries, no build step. Your list is saved in the browser with `localStorage`, so it is still there after a refresh.

## Features

- **Add books** with a title, author and status (To read, Reading, Finished).
- **Validation** — title and author are required; a clear message appears under each empty box and disappears as soon as it is filled in.
- **Newest first** — the most recently added book is always at the top.
- **Search** by title or author as you type (case-insensitive). Searching only hides books; it never changes saved data.
- **Change status** from a dropdown on each book.
- **Delete** a book, with a confirmation prompt.
- **Summary line** such as "3 finished, 1 reading, 2 to read", counted from all books regardless of the search.
- **Saved automatically** after every add, change and delete.
- **Mobile friendly** — stacked layout on phones, 44px tap targets, no sideways scrolling; centred at up to 700px wide on larger screens.
- **Safe text handling** — titles and authors are inserted as text, so input like `<b>test</b>` is shown literally rather than as HTML.

## Getting started

No installation is needed.

1. Clone the repository:
   ```bash
   git clone https://github.com/jstalvi/Mini-Project.git
   cd Mini-Project
   ```
2. Open `index.html` in a browser.

Or, to serve it locally (useful for testing on a phone on the same network):

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Usage

| Action | How |
|---|---|
| Add a book | Fill in Title and Author, pick a Status, click **Add**. |
| Search | Type in the Search box. Clear it to see every book again. |
| Change status | Use the dropdown on the book. |
| Delete | Click **Delete** on the book and confirm. |

## Project structure

```
.
├── index.html   # Page layout: form, search box, summary line, book list
├── style.css    # Theme (based on #301728), layout and responsive rules
└── app.js       # All behaviour: validation, rendering, search, status, delete, storage
```

## How it works

### Data model

Every book is a plain object:

```js
{
  id: "b1760438400000-k3f9", // unique; used to find the book for status changes and deletes
  title: "Aadujeevitham",
  author: "Benyamin",
  status: "to-read",         // "to-read" | "reading" | "finished"
  createdAt: 1760438400000   // Date.now() when added; used for "newest first"
}
```

All books live in one array, `books`.

### Rendering

`renderBooks()` is the only function that draws the list. Every change follows the same pattern:

```
update the books array  →  saveBooks()  →  renderBooks()
```

`renderBooks()` updates the summary, filters by the search text, sorts a copy by `createdAt` (newest first), and builds each book card. It shows "No books yet. Add your first one above." when there are no books, and "No books match your search." when a search hides them all.

Status dropdowns and Delete buttons are handled by single listeners on the list (event delegation). Each control carries its book's `id` in a `data-id` attribute, so the right book is updated even while a search is active.

### Storage

- Key: `books` in `localStorage`, stored as a JSON array.
- **Save:** `saveBooks()` runs after every add, status change and delete. If the browser blocks storage (for example in some private windows) the app keeps working and logs a warning.
- **Load:** `loadBooks()` runs when the page opens. If nothing is saved, the data is not valid JSON, or storage is unavailable, it starts with an empty list. Individual entries that don't look like books are skipped, so one bad entry can't break the page.

To reset the app, run this in the browser console:

```js
localStorage.removeItem("books");
```

## Accessibility

- Every input has a visible `<label>`; per-book controls have descriptive `aria-label`s (for example "Status for Dune", "Delete Dune").
- Error messages and the summary line use `aria-live="polite"` so screen readers announce changes.
- Invalid fields are marked with `aria-invalid`, and focus moves to the first empty field.
- Focus returns to a book's dropdown after its status changes.
- Visible focus rings on all interactive elements.

## Browser support

Works in current versions of Chrome, Edge, Firefox and Safari, on desktop and mobile. Uses only standard web APIs (`localStorage`, `CSS.escape`, CSS Grid and Flexbox).

## Manual test checklist

1. Add "Aadujeevitham" by Benyamin with status To read → it appears at the top with a "To read" label.
2. Click Add with the title empty → "Please enter a title" appears under the title box.
3. Type "ben" in the search box → only books with "ben" in the title or author stay visible.
4. Change the status to Finished → the label changes to "Finished".
5. Refresh the page → the book is still there.
6. Delete the book and confirm → it disappears, and stays gone after a refresh.

## Limitations

- Data is stored per browser and per device; it does not sync between them.
- Clearing site data in the browser deletes the list.
- Books cannot be edited (title or author) after they are added — delete and re-add instead.

## Author

[jstalvi](https://github.com/jstalvi)
