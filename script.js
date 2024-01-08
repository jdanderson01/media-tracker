"use strict";

class MediaEntry {
  constructor(id, title, type, genre, dateConsumed, rating) {
    // constructor for the media entry object
    this.id = id;
    this.title = title;
    this.type = type;
    this.genre = genre;
    this.dateConsumed = dateConsumed;
    this.rating = rating;
  }
}

const myLibrary = loadLibraryFromLocalStorage();
const form = document.querySelector("form");
const modal = {
  container: document.getElementById("mediaModal"),
  button: document.getElementById("mediaBtn"),
  closeBtn: document.getElementsByClassName("close")[0],
};

modal.button.onclick = function () {
  modal.container.style.display = "block";
};

modal.closeBtn.onclick = function () {
  modal.container.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal.container) {
    modal.container.style.display = "none";
  }
};

function addMediaToLibrary() {
  const title = getValue("title");
  const type = getValue("type");
  const genre = getValue("genre");
  const dateConsumed = getValue("dateConsumed");
  const rating = getValue("rating");

  const id = new Date().getTime();

  const newEntry = new MediaEntry(id, title, type, genre, dateConsumed, rating);
  myLibrary.push(newEntry);

  displayLibraryContents();
  saveLibraryToLocalStorage();

  clearForm();
}

function loadLibraryFromLocalStorage() {
  const storedLibrary = localStorage.getItem("myLibrary");
  return storedLibrary ? JSON.parse(storedLibrary) : [];
}

function saveLibraryToLocalStorage() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function getValue(id) {
  return document.getElementById(id).value;
}

function displayLibraryContents() {
  let mediaContainer = document.getElementById("mediaContainer");

  if (!mediaContainer) {
    mediaContainer = document.createElement("div");
    mediaContainer.id = "mediaContainer";
    document.body.appendChild(mediaContainer);
  }

  mediaContainer.innerHTML = "";

  myLibrary.forEach((entry) => {
    const entryContainer = createEntryItem(entry);
    mediaContainer.appendChild(entryContainer);
  });
}

function createEntryItem(entry) {
  const entryContainer = document.createElement("div");
  const entryTitle = createEntryElement("h2", `Title: ${entry.title}`);
  const entryType = createEntryElement("p", `Type: ${entry.type}`);
  const entryGenre = createEntryElement("p", `Genre: ${entry.genre}`);
  const entryDateConsumed = createEntryElement(
    "p",
    `Date Consumed: ${entry.dateConsumed}`
  );
  const entryRating = createEntryElement("p", `Rating: ${entry.rating}`);
  const deleteButton = createEntryElement("button", "Delete Entry");
  deleteButton.addEventListener("click", () => deleteEntry(entry.id));

  entryContainer.append(
    entryTitle,
    entryType,
    entryGenre,
    entryDateConsumed,
    entryRating,
    deleteButton
  );
  entryContainer.classList.add("entry-item");

  return entryContainer;
}

function deleteEntry(id) {
  const index = myLibrary.findIndex((entry) => entry.id === id);

  if (index !== -1) {
    myLibrary.splice(index, 1);
    displayLibraryContents();
  }
}

function createEntryElement(tag, text) {
  const element = document.createElement(tag);
  element.textContent = text;
  return element;
}

function clearForm() {
  ["title", "type", "genre", "dateConsumed", "rating"].forEach((id) => {
    document.getElementById(id).value = "";
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addMediaToLibrary();
});

function loadLibraryFromLocalStorage() {
  const storedLibrary = localStorage.getItem("myLibrary");
  return storedLibrary ? JSON.parse(storedLibrary) : [];
}

function saveLibraryToLocalStorage() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

// Display library contents when the page loads
window.onload = function () {
  displayLibraryContents();
};
