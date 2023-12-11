const dialog = document.querySelector("dialog");
const showButton = document.querySelector("#show-dialog");
const closeButton = document.querySelector("#close-dialog");
const bookShelf = document.querySelector(".books-shelf");

const myLibrary = [];

class Book {
    constructor(title, author, page, isRead) {
        this.title = title;
        this.author = author;
        this.page = page;
        this.isRead = isRead;
    }
}

function displayBooks() { 
    // xoa sach cu di truoc khi them sach moi vao
    while (bookShelf.firstChild) {
        bookShelf.removeChild(bookShelf.firstChild);
    }

    // them sach vao thu vien
    for (let i = 0; i < myLibrary.length; i++) {    
        const book = myLibrary[i];
        const bookCard = createBookCard(book, i);
        bookShelf.appendChild(bookCard);
    }
}

function createBookCard(book, bookId) {
    // tao the div chua thong tin sach
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.setAttribute("data-book-id", bookId);

    const titleSpan = document.createElement("div");
    titleSpan.classList.add("title");
    titleSpan.textContent = book.title;

    const authorSpan = document.createElement("div");
    authorSpan.classList.add("author");
    authorSpan.textContent = book.author;

    const pageSpan = document.createElement("div");
    pageSpan.classList.add("page");
    pageSpan.textContent = book.page;

    const isReadSpan = document.createElement("button");
    isReadSpan.classList.add("isRead");
    isReadSpan.textContent = book.isRead ? "Read" : "Not Read";
    isReadSpan.addEventListener("click", () => {
        book.isRead = !book.isRead;
        isReadSpan.textContent = book.isRead ? "Read" : "Not Read";
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
        myLibrary.splice(bookId, 1);
        displayBooks();
    });

    bookCard.appendChild(titleSpan);
    bookCard.appendChild(authorSpan);
    bookCard.appendChild(pageSpan);
    bookCard.appendChild(isReadSpan);
    bookCard.appendChild(deleteButton);

    return bookCard;
}

document.querySelector('#add-book-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const isRead = document.getElementById('isRead').checked;

    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
    displayBooks();

    // reset form
    document.getElementById('add-book-form').reset();

    // close modal
    dialog.close();
});

// open modal
showButton.addEventListener("click", () => {
    dialog.showModal();
});

// close modal
closeButton.addEventListener("click", () => {
    dialog.close();
});