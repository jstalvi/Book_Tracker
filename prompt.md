# Prompts

The prompts used to build this Book Tracker step by step with an AI coding assistant, in the order they were given. Each step builds on the previous one, so they can be replayed to recreate the project from an empty folder.

---

## 1. Plan before coding

```
I want to build a Book Tracker web page using plain HTML, CSS and JavaScript (no frameworks, no libraries). Features: add a book with title, author and status (To read, Reading, Finished), show the list newest first, search by title or author, change a book's status, and keep the data after a refresh using localStorage.

Before writing any code:
1. List the files you will create and what each one does.
2. Show the shape of one book object (for example: id, title, author, status, createdAt).
3. Explain how the data will be saved to and loaded from localStorage.
4. Explain how "newest first" will be decided.
Keep the explanation short and simple.
```

## 2. Page structure and theme

```
Create index.html, style.css and app.js, and link the CSS and JS files from index.html.
In index.html add:
- A heading "Book Tracker"
- A form with a Title text box, an Author text box, a Status dropdown (To read, Reading, Finished) and an Add button
- An empty space under each text box for an error message
- An empty list area where books will appear
Don't add any JavaScript behaviour yet. Use clear id names and explain each one in a comment.

Use hex 301728 as the main color theme and match the rest according to this.
```

## 3. Adding a book

```
In app.js, when I click Add:
- Read the title, author and status. Remove extra spaces from the start and end.
- Title and Author are required. If one is empty, show "Please enter a title" or "Please enter an author" under that box, and do not add the book.
- Clear the error message once the box is filled in correctly.
- If both are filled, create a book object with an id, title, author, status and createdAt time, and add it to an array called books.
- Show the new book at the top of the list with its status as a label.
- Clear the form after adding.
- Stop the page from reloading when the form is submitted.
```

## 4. One render function

```
Write one function called renderBooks() that draws the whole list from the books array, newest first.
Each book should show its title, author and a status label.
If there are no books, show "No books yet. Add your first one above."
Call renderBooks() every time the books array changes instead of adding items to the page by hand.
Make sure book titles are added as text, not HTML, so typing something like <b>test</b> shows as plain text.
```

## 5. Saving with localStorage

```
Save the book list in localStorage under the key "books" so it is still there after I refresh the page.
- Save whenever a book is added, changed or deleted.
- Load the saved list when the page opens and show it.
- If nothing is saved yet, or the saved data is broken, start with an empty list instead of crashing.
```

## 6. Search

```
Add a search box above the list. As I type, show only books whose title or author contains the text, ignoring capital letters.
- Searching should not delete or change any saved books; it only hides the ones that don't match.
- If the search box is empty, show all books.
- If nothing matches, show "No books match your search."
- New books added while a search is active should still follow the search.
```

## 7. Changing status

```
Give each book in the list a small Status dropdown (To read, Reading, Finished) set to its current status.
When I change it:
- Update that book in the books array using its id, not its position in the list.
- Update the label to the new status.
- Save the change to localStorage.
It should still work correctly while a search is active.
```

## 8. Deleting a book

```
Add a Delete button to each book.
When I click it, ask "Delete this book?" and only remove it if I confirm.
Remove it from the books array by id, save to localStorage, and redraw the list.
```

## 9. Status summary

```
Above the list, show a summary like "3 finished, 1 reading, 2 to read".
Count from the full books array, not just the books visible in search results.
Update the counts whenever a book is added, changed or deleted.
Skip any status with zero books, and show nothing if the list is empty.
```

## 10. Mobile layout

```
Update style.css so the page works well on a phone (about 375px wide):
- The form fields stack vertically and fill the width on small screens.
- Buttons and dropdowns are big enough to tap easily (at least 44px tall).
- No sideways scrolling.
- On wider screens, keep the content centred with a maximum width of about 700px.
Make sure the viewport meta tag is in index.html.
```

## 11. Review against a checklist

```
Review my full code against this checklist and tell me which items pass or fail, and why:
1. Add "Aadujeevitham" by Benyamin with status To read → it appears at the top with a "To read" label.
2. Click Add with the title empty → "Please enter a title" appears under the title box.
3. Type "ben" in the search box → only books with "ben" in the title or author stay visible.
4. Change the status to Finished → the label changes to "Finished".
5. Refresh the page → the book is still there.
Don't rewrite everything. Only suggest small fixes for items that fail.
```




