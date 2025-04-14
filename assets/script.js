const addBtn = document.querySelector(".addbtn")
const addBookForm = document.querySelector("form")
const bookShelf = document.querySelector("main")

const Books = []

document.addEventListener("DOMContentLoaded", () => {
  // Toggle form
  addBtn.addEventListener("click", () => {
    addBookForm.classList.toggle("hidden")
  })

  // Handle submit
  addBookForm.addEventListener("submit", (e) => {
    e.preventDefault()
    addBookToArray(Books)
    renderBooks(Books)
    addBookForm.reset()
    addBookForm.classList.add("hidden")
  })
})

class Book {
  constructor(title, author, year, pages) {
    this.title = title
    this.author = author
    this.year = year
    this.pages = pages
  }
}

function addBookToArray(arr) {
  const title = document.querySelector("#title").value.trim()
  const author = document.querySelector("#author").value.trim()
  const year = document.querySelector("#year").value.trim()
  const pages = document.querySelector("#pages").value.trim()

  if (!title || !author || !year || !pages) {
    alert("All fields are required!")
    return
  }

  arr.push(new Book(title, author, year, pages))
}

function renderBooks(arr) {
  // Remove all book cards except the form and add button
  const existingBooks = document.querySelectorAll(".book")
  existingBooks.forEach((book) => book.remove())

  arr.forEach((book, index) => {
    const bookCard = document.createElement("div")
    bookCard.className = "book"
    bookCard.innerHTML = `
      <div class="bookInfo">
      <div class ="bookWrap">
      <div>
        <i class="fa-solid fa-book fa-2xl"></i>
      </div>
      <div 
        <p><strong>Title:</strong> ${book.title}</p>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Year:</strong> ${book.year}</p>
        <p><strong>Pages:</strong> ${book.pages}</p>
      </div>
      </div>
        <div class="book-setting">
          <button class="read-btn">Read</button>
          <button class="fav-btn"><i class="fa-solid fa-heart"></i></button>
          <button class="delete-btn" data-index="${index}"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>
    `
    bookShelf.insertBefore(bookCard, addBtn) // Insert before the add button
  })

  // Set up delete functionality
  const deleteButtons = document.querySelectorAll(".delete-btn")
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.currentTarget.getAttribute("data-index")
      Books.splice(index, 1)
      renderBooks(Books)
    })
  })
}
