"strict"

/* form */
const form = document.getElementById("entries-form")
const cancelButton = document.querySelector("[data-cancel-button]")
const inputWarning = document.querySelector("[data-input-warning]")
const inputTerm = document.querySelector("[data-input-term]")
const inputDef = document.querySelector("[data-input-def]")

/* table */
const table = document.getElementById("sort-table")
const tableHead = document.getElementById("table-head")
const btnSortTerm = document.querySelector("[data-sort-term]")
const template = document.getElementById("table-row")

/* accordion */
const accordionButton = document.querySelector("[data-accordion-button]")
const accordionContent = document.querySelector("[data-accordion-content]")
const accordionHeading = document.querySelector("[data-accordion-heading]")

/* local storage */
const LOCAL_STORAGE_PREFIX = "TERMS-GH"
const TERMS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-entries`

let numRows = 0

hideAccordionContent()

/** Form */
form.addEventListener("submit", (e) => {
  e.preventDefault()

  const termValue = inputTerm.value.toLowerCase()
  const defValue = inputDef.value

  if (termValue === "") {
    inputWarning.textContent = "You must enter a word/phrase (or cancel)"
    return
  } else {
    inputWarning.textContent = ""
  }

  const newEntry = {
    term: termValue,
    definition: defValue,
    id: new Date().valueOf().toString(),
    edited: false,
  }

  numRows++
  if (numRows > 1) {
    enableSortButton()
  }

  entries.push(newEntry)
  renderEntry(newEntry)
  saveentries()

  clearForm()
  hideAccordionContent()
})

// Form cancel button
cancelButton.addEventListener("click", () => {
  clearForm()
  hideAccordionContent()
})

function renderEntry(entry) {
  const templateClone = template.content.cloneNode(true)

  const tableRow = templateClone.querySelector(".table-row")
  tableRow.dataset.entryId = entry.id

  const term = templateClone.querySelector("[data-term]")
  const def = templateClone.querySelector("[data-def]")

  term.textContent = entry.term
  def.textContent = entry.definition

  tableHead.after(templateClone)
}

let entries = loadentries()
entries.forEach((entry) => {
  renderEntry(entry)
})

// If page is reloaded or shut down and reopened,
// sort buttons will still be visible
if (entries.length > 1) {
  enableSortButton()
  sortTable(0)
}

function enableSortButton() {
  btnSortTerm.removeAttribute("disabled")
}

/** Local Storage */
function saveentries() {
  localStorage.setItem(TERMS_STORAGE_KEY, JSON.stringify(entries))
}
function loadentries() {
  const entriesString = localStorage.getItem(TERMS_STORAGE_KEY)
  return JSON.parse(entriesString) || []
}

// Table / Delete button
addGlobalEventListener("click", "[data-delete-row]", (e) => {
  // Remove from the screen
  const parent = e.target.closest(".table-row")
  parent.remove()

  // Remove from local storage
  const entryId = parent.dataset.entryId
  entries = entries.filter((entry) => {
    return entry.id !== entryId
  })

  saveentries()
  window.location.reload()
})

// Table / Edit button
addGlobalEventListener("click", "[data-edit-row]", (e) => {
  e.target.textContent = e.target.textContent === "Edit" ? "Save edit" : "Edit"
  const parent = e.target.closest(".table-row")
  const text = parent.querySelector("[data-def]")

  text.toggleAttribute("contenteditable")

  const entryId = parent.dataset.entryId
  const entry = entries.find((ent) => {
    return ent.id === entryId
  })

  entry.edited = !text.hasAttribute("contenteditable")

  if (entry.edited) entry.definition = text.textContent

  saveentries()
})

/** Sort row */
btnSortTerm.addEventListener("click", () => {
  sortTable(0)
})

// Script modified to only sort dir="asc"
function sortTable(n) {
  let i, x, y
  let rows = table.rows
  let switching = true
  let shouldSwitch = true
  let switchcount = 0
  let dir = "asc"
  while (switching) {
    switching = false
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false
      x = rows[i].querySelectorAll("td")[n]
      y = rows[i + 1].querySelectorAll("td")[n]
      if (dir == "asc") {
        if (x.textContent.toLowerCase() > y.textContent.toLowerCase()) {
          shouldSwitch = true
          break
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i])
      switching = true
      switchcount++
    }
  }
}

/** Accordion */
// Button
accordionButton.setAttribute("aria-expanded", false)

accordionButton.addEventListener("click", () => {
  accordionButton.classList.toggle("expanded")
  accordionContent.classList.toggle("open")

  if (accordionButton.classList.contains("expanded")) {
    accordionButton.setAttribute("aria-expanded", true)
    accordionContent.setAttribute("aria-hidden", false)
    accordionHeading.setAttribute("tabindex", "0") // sets focus on first child: h2 with tabindex
  } else {
    accordionButton.setAttribute("aria-expanded", false)
    accordionContent.setAttribute("aria-hidden", true)
    accordionHeading.removeAttribute("tabindex") // removes focus from first child: h2
    clearForm()
  }
})

/** Helper functions */
function addGlobalEventListener(type, selector, callback, option = false) {
  document.addEventListener(
    type,
    (e) => {
      if (e.target.matches(selector)) callback(e)
    },
    option
  )
}

function hideAccordionContent() {
  accordionButton.setAttribute("aria-expanded", false)
  accordionButton.classList.remove("expanded")
  accordionContent.setAttribute("aria-hidden", true)
  accordionContent.classList.remove("open")
}

function clearForm() {
  inputWarning.textContent = ""
  inputTerm.value = ""
  inputDef.value = ""
}
