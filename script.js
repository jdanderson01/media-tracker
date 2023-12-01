const myLibrary = [];
const form = document.querySelector("form");

class MediaEntry {
  constructor(title, type, genre, dateConsumed, rating) {
    // constructor for the media entry object
    this.title = title;
    this.type = type;
    this.genre = genre;
    this.dateConsumed = dateConsumed;
    this.rating = rating;
  }

  displayInfo() {
    console.log(
      `${this.title} - ${this.type} consumed on ${this.dateConsumed}, Rating: ${this.rating}`
    );
  }
}

const modal = document.getElementById("mediaModal");
const modalBtn = document.getElementById("mediaBtn");
const span = document.getElementsByClassName("close")[0];

modalBtn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

function addMediaToLibrary() {
  // function to add the input from the form to the myLibrary object
  const title = document.getElementById("title").value;
  const type = document.getElementById("type").value;
  const genre = document.getElementById("genre").value;
  const dateConsumed = document.getElementById("dateConsumed").value;
  const rating = document.getElementById("rating").value;

  //new object from the captured form inputs
  const newEntry = new MediaEntry(title, type, genre, dateConsumed, rating);
  myLibrary.push(newEntry);

  newEntry.displayInfo();

  displayLibraryContents();

  clearForm();
}

//loop through the myLibrary array and display the contents
function displayLibraryContents() {
  // Find or create the container for library entries
  let mediaContainer = document.getElementById("mediaContainer");

  if (!mediaContainer) {
    mediaContainer = document.createElement("div");
    mediaContainer.id = "mediaContainer";
    document.body.appendChild(mediaContainer);
  }

  // Clear existing content in the media container so there are no duplicates
  mediaContainer.innerHTML = "";

  myLibrary.forEach((entry) => {
    const entryContainer = document.createElement("div");
    const entryTitle = document.createElement("h2");
    const entryType = document.createElement("p");
    const entryGenre = document.createElement("p");
    const entryDateConsumed = document.createElement("p");
    const entryRating = document.createElement("p");

    entryTitle.textContent = `Title: ${entry.title}`;
    entryType.textContent = `Type: ${entry.type}`;
    entryGenre.textContent = `Genre: ${entry.genre}`;
    entryDateConsumed.textContent = `Date Consumed: ${entry.dateConsumed}`;
    entryRating.textContent = `Rating: ${entry.rating}`;

    entryContainer.append(
      entryTitle,
      entryType,
      entryGenre,
      entryDateConsumed,
      entryRating
    );
    entryContainer.classList.add("entry-container");
    mediaContainer.appendChild(entryContainer);
  });
}

function clearForm() {
  // function to clear the form after submission
  document.getElementById("title").value = "";
  document.getElementById("type").value = "";
  document.getElementById("genre").value = "";
  document.getElementById("dateConsumed").value = "";
  document.getElementById("rating").value = "";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addMediaToLibrary();
});
