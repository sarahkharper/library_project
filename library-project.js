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
    bookObj = new Book(title, author, pageLength, finished);
    libraryArray.push(bookObj); /*add new book obj to library array*/
}

/*Add some book objs for testing*/
addBookToLibrary(myLibrary, "hitchhiker", "The Hitchhiker's Guide to the Galaxy", "Douglas Adams",
"159", "already read");

addBookToLibrary(myLibrary, "pb", "The Princess Bride", "William Goldman", "416",
 "already read");

addBookToLibrary(myLibrary, "gomens", "Good Omens", "Terry Prachett & Neil Gaiman",
 "400", "already read");

addBookToLibrary(myLibrary, "sandman", "The Sandman", "Neil Gaiman", "2,168", "in progress");

//FUNCTION to check if object is iterable (used in appendBookToPage function)
function isIterable(obj) {
    return typeof obj[Symbol.iterator] === 'function';
  }

//FUNCTION to add a new book entry to a page
function makeBookEntry(item, list){
    const newEntry = document.createElement("div"); //create a new entry div and store in variables
    newEntry.classList.add("bookEntry"); /*add bookEntry class to entry div*/
    
    //iterate through all keys in current book object
    for (const key in item){
        //create a new text span and store as a variable
        const newElem = document.createElement("span");
        
        newElem.classList.add(`${key}`); //add current key as class to span
        newEntry.appendChild(newElem); //append new element to new entry div
        
        //set text content of new entry to the value associated with the key
        newElem.textContent = item[key];

        //append the new entry as a child of the book list
        list.appendChild(newEntry);
    };
}


//FUNCTION to loop through library array and display each book on page
function appendBookToPage(library){
    //create variable holding reference to book list container div
    const blist = document.querySelector(".bookList");
    
    //check if library is iterable; if so, iterate, if not, just run newEntry function
    if(isIterable(library)){ 
        //iterate through all book objects in library array  
        for(const item of library){
            newEntry = makeBookEntry(item, blist);
        }
    } else {
        newEntry = makeBookEntry(library, blist);
    }  
}