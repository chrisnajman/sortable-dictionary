---
permalink: /index.html
---

[Website (Git Pages)](https://chrisnajman.github.io/sortable-dictionary)

# Sortable Dictionary

## Description

Add a word or phrase (required) to the dropdown form. Add an optional definition (the definition can be edited/inserted later). Rows are deletable.
The word or phrase is sortable, via:

- a button in the 'word/phrase' table header. The button only becomes visible if there are two or more rows.
- on page reload (if there are two or more rows)
- on page launch (ditto)

Data is saved to local storage.

## HTML

- `template` used for dynamic (`table`) rows.

The table container:

- has a `max-height`. When this is reached, vertical scrollbars appear.
- The results table container will start to scroll horizontally at around 540px width.

The 'results' table has a 'sticky' thead, so the table headers (`th`s) will always be on top when scrolling.

## Javascript

- Accessible accordion
- Sort functionality (lifted from [www.w3schools.com)](https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_sort_table_desc) then modified)
- ES6 (no transpilation to ES5)
- Data is saved to local storage

## CSS

- `flexbox` used for page layout and page elements.
- Responsive (as far as a data table can be responsive).

## Testing

- Tested on:
  - Windows 10
    - Chrome
    - Firefox
    - Microsoft Edge
