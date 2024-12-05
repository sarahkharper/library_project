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

    /*function for printing information about object*/
    this.info = function(){
        return(`${this.title} by ${this.author}, ${this.pageLength} pages, ${this.finished}`);
    };
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

/*FUNCTION to loop through library array and display each book on page*/
//create variable holding reference to bookList

function appendBookToPage(library){
    const blist = document.querySelector(".bookList");
    for(const item of library){
        const newEntry = document.createElement("div");
        newEntry.setAttribute('class', 'bookEntry'); /*add bookEntry class to entry div*/
        
        //create ps for book entry info
        const titleP = document.createElement("p");
        const authorP = document.createElement("p");
        const pagesP = document.createElement("p");
        const statusP = document.createElement("p");

        //append as children to entry div
        

    }
}