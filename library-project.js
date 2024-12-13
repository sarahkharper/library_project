/*JS script for library project*/

const myLibrary = [];

function Book(title, author, pageLength, finished){
    if (!new.target) {
        throw Error('Must use the new operator to call the function');
    }
    this.title = title;
    this.author = author;
    this.pageLength = pageLength;
    this.finished = finished;

    //function for printing information about object
    /*this.info = function(){
        return(`${this.title} by ${this.author}, ${this.pageLength} pages, ${this.finished}`);
    };*/
}

/*function for creating book objs and adding them to library array*/
function addBookToLibrary(libraryArray, bookObj, title, author, pageLength, finished) {
    if (arguments.length == 2){
        if (typeof bookObj != 'object'){
            throw Error("Book must be a preexisting object or information to create object must be included");
        } else{
            libraryArray.push(bookObj); /*add new book obj to library array*/
        }
    } else if (arguments.length < 2){
        throw Error("Insufficient information to add book to library");
    } else {
        bookObj = new Book(title, author, pageLength, finished);
        libraryArray.push(bookObj); /*add new book obj to library array*/
    }
}

/*Add some book objs for testing*/
addBookToLibrary(myLibrary, "hitchhiker", "The Hitchhiker's Guide to the Galaxy", "Douglas Adams",
"159", "Already Read");

addBookToLibrary(myLibrary, "pb", "The Princess Bride", "William Goldman", "416",
 "Already Read");

addBookToLibrary(myLibrary, "gomens", "Good Omens", "Terry Prachett & Neil Gaiman",
 "400", "Already Read");

addBookToLibrary(myLibrary, "sandman", "The Sandman", "Neil Gaiman", "2,168", "In Progress");

//FUNCTION to check if object is iterable (used in appendBookToPage function)
function isIterable(obj) {
    return typeof obj[Symbol.iterator] === 'function';
  }

//FUNCTION to add a new book entry to a page
function makeBookEntry(item, list, itemCount){
    const newEntry = document.createElement("div"); //create a new entry div and store in variables
    newEntry.classList.add("bookEntry"); /*add bookEntry class to entry div*/
    newEntry.classList.add(`${itemCount}`); //add array position to div
    
    //iterate through all keys in current book object
    for (const key in item){
        //create a new text span and store as a variable
        const newElem = document.createElement("span");
        
        newElem.classList.add(`${key}`); //add current key as class to span
        newEntry.appendChild(newElem); //append new element to new entry div
        
        //set text content of new entry to the value associated with the key
        newElem.textContent = item[key];
    };

    //add remove button to book entry
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("removeBtn");
    newEntry.appendChild(removeButton);
    /*removeButton.addEventListener("click", removeBook);*/
    removeButton.addEventListener("click", () => {
        myLibrary.splice(itemCount,1);
        appendBookToPage(myLibrary);
    });
   /* addEventListener("click", {
        itemCount: itemCount,
        invoke: rem,
    });*/

    //append the new entry as a child of the book list
    list.appendChild(newEntry);
}

/*function rem() {
    let itemToRemove = this.itemCount;
}*/

//FUNCTION to remove all elements in a certain class
function removeElementsByClass(className){
    let elements = document.querySelectorAll(`.${className}`);
    for(const el of elements){
        el.parentNode.removeChild(el);
    }
}

//FUNCTION to loop through library array and display each book on page
function appendBookToPage(library){
    //create variable holding reference to book list container div
    const blist = document.querySelector(".bookList");
    let itemCount = 0;

    //remove all book entries from DOM
    removeElementsByClass("bookEntry");
    
    //check if library is iterable; if so, iterate, if not, just run newEntry function
    if(isIterable(library)){ 
        //iterate through all book objects in library array  
        for(const item of library){
            makeBookEntry(item, blist, itemCount);
            itemCount++;
        }
    } else {
        itemCount = blist.childElementCount;
        makeBookEntry(library, blist, itemCount);
    }  
}

appendBookToPage(myLibrary);

//FUNCTION to open add new book to library modal dialog
const modal = document.querySelector("dialog");
const newBookButton = document.querySelector(".header > button");
const addBookButton = document.querySelector('dialog input[type="submit"]');

//open dialog modally using New Book button
newBookButton.addEventListener("click", () => {
    modal.showModal();
    modal.classList.toggle('modal-active');
});

//FUNCTION to save new book form input as book
function saveFormInputAsBook() {
    const form = document.querySelector('form');
    const formData = new FormData(form);
    const formObject = {};

    for(let[key, value] of formData.entries()) {
        formObject[key] = value;
    }
    
    return formObject;
}

//close dialog and add book using Add Book button
addBookButton.addEventListener("click", appendBookFromClick, false);

function appendBookFromClick(event){
    //prevent trying to submit info to server (since there is no server)
    event.preventDefault();

    //create book object from form input
    newBook = new Book(document.querySelector('[name="title"]').value,
    document.querySelector('[name="author"]').value, 
    document.querySelector('[name="pageLength"]').value,
    document.querySelector('[name="finished"]').value);

    modal.close();
    modal.classList.toggle('modal-active');

    //add new book to page and to library
    addBookToLibrary(myLibrary, newBook);
    appendBookToPage(myLibrary);
}

//FUNCTION to remove book from library
/*function removeBookFromLibrary(library, indx){
    library.splice(indx, 1);
}*/

//FUNCTION to check if class can be converted to numeric
/*function checkForNumeric(strng){
    if(!isNaN(strng*1)){
        return true;
    }else{
        return false;
    }
}*/

//EVENT remove book from library when remove button is pressed
/*let removeBtns = document.querySelectorAll('.removeBtn');
removeBtns.forEach(btn => {
    btn.addEventListener('click', () =>{*/
    function removeBook(event){
        const parentCL = btn.parentNode.classList;
        //remove book entry from library
        myLibrary.splice(parentCL[1],1);
            /*for(cls in parentCL){
                if(checkForNumeric(parentCL[cls])){
                    myLibrary.splice(parentCL[cls],1);
                }
            }*/
            //remove book entry from DOM and update index classes
        appendBookToPage(myLibrary);
        removeBtns = document.querySelectorAll('.removeBtn');
    }