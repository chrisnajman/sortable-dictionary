---
permalink: /index.html
---

[Website (Git Pages)](https://chrisnajman.github.io/sortable-dictionary)

# Sortable Dictionary

## Description

Add a word or phrase (required) to the dropdown form. Add an optional definition (the definition can be edited/inserted later). Rows are deletable. On submission, the word or phrase is converted to lower case (otherwise entries with initital capitals would be sorted independently).

The word or phrase is sortable (a-z), via:

- a button in the 'word/phrase' table header. The button only becomes visible if there are two or more rows.
- on page reload (if there are two or more rows)
- on page launch (ditto)

Data is saved to local storage.

## HTML

- `template` used for dynamic (`table`) rows.
- The table container will start to scroll horizontally at around 540px width.

## Javascript

- Accessible accordion
- Sort functionality (lifted from [www.w3schools.com)](https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_sort_table_desc) then modified to only sort ascending (a-z))
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
