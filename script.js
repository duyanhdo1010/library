const dialog = document.querySelector("dialog");
const showButton = document.querySelector("#show-dialog");
const closeButton = document.querySelector("#close-dialog");
const bookShelf = document.querySelector(".books-shelf");


// open modal

showButton.addEventListener("click", () => {
    dialog.showModal();
  });

// close modal

closeButton.addEventListener("click", () => {
    dialog.close();
  });


// working with books

  const myLibrary = [];

//ham khoi tao

  function Book(title, author, page, isRead) {
    this.title = title;
    this.author = author;
    this.page = page;
    this.isRead = isRead;
  }

// xu ly hanh dong submit va them sach vao thu vien

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

    // document.getElementById('add-book-form').reset();

    // close modal
    dialog.close();
});



//ham hien thi sach trong thu vien
    
      function displayBooks() { 

        // xoa sach cu di truoc khi them sach moi vao

        while (bookShelf.firstChild) {
          bookShelf.removeChild(bookShelf.firstChild);
      }

      // them sach vao thu vien

        for (let i = 0; i < myLibrary.length; i++) {
        const bookTitle = myLibrary[i].title;
        const bookAuthor = myLibrary[i].author;
        const bookPage = myLibrary[i].page;
        const bookIsRead = myLibrary[i].isRead;
        const bookId = i;

        // tao the div chua thong tin sach

        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.setAttribute("data-book-id", bookId);

        const titleSpan = document.createElement("div");
        titleSpan.classList.add("title");
        titleSpan.textContent = bookTitle;
        titleSpan.style.cssText = "flex: 1; display: flex; justify-content: center; align-items: center; font-weight: bold; font-size: 1.25em;";
        const authorSpan = document.createElement("div");
        authorSpan.classList.add("author");
        authorSpan.textContent = bookAuthor;
        authorSpan.style.cssText = "flex: 1; display: flex; justify-content: center; align-items: center;";
        const pageSpan = document.createElement("div");
        pageSpan.classList.add("page");
        pageSpan.textContent = bookPage;
        pageSpan.style.cssText = "flex: 1; display: flex; justify-content: center; align-items: center;";

        const isReadSpan = document.createElement("button");
        isReadSpan.classList.add("isRead");

        isReadSpan.style.cssText = "flex: 1; display: flex; justify-content: center; align-items: center; padding: 0.5em; border-radius: 12px; border: 3px solid black; width: 100%; font-size: 0.75em; background-color: #f5f5f5;";

        if (bookIsRead === true) {
          isReadSpan.textContent = "Read";
          isReadSpan.style.backgroundColor = "rgb(114, 255, 114)";

        } else {
          isReadSpan.textContent = "Not Read";
          isReadSpan.style.backgroundColor = "red";

        }
        isReadSpan.addEventListener("click", () => {
          if (myLibrary[bookId].isRead === true) {
            myLibrary[bookId].isRead = false;
            isReadSpan.textContent = "Not Read";
            isReadSpan.style.backgroundColor = "red";
          } else {
            myLibrary[bookId].isRead = true;
            isReadSpan.textContent = "Read";
            isReadSpan.style.backgroundColor = "rgb(114, 255, 114)";
          }
        });

        // tao the button xoa sach

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.textContent = "Delete";
        deleteButton.style.cssText = "flex: 1; display: flex; justify-content: center; align-items: center; padding: 0.5em; border-radius: 12px; border: 3px solid black; width: 100%; font-size: 0.75em; background-color: #f5f5f5;";
        deleteButton.addEventListener("click", () => {
          myLibrary.splice(bookId, 1);
          bookCard.remove();
          displayBooks();
        });

        // stying cho the div chua thong tin sach

        bookCard.style.cssText = "display: flex; flex-direction: column; justify-content: center; width: 200px; height: 200px; border: 1px solid black; padding: 1em; margin: 1em; align-items: center; border-radius: 12px; bg-color: #f5f5f5; box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); border: 3px solid black; font-size: 1.25em; gap: 1em;";


        bookCard.appendChild(titleSpan);
        bookCard.appendChild(authorSpan);
        bookCard.appendChild(pageSpan);
        bookCard.appendChild(isReadSpan);
        bookCard.appendChild(deleteButton);

        bookShelf.appendChild(bookCard);

        };
      }