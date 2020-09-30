class Book{
  constructor(title,author,isbn){
      this.title  = title;
      this.author = author;
      this.isbn = isbn;
  }
}

class UI{
  addBooktoList(book){
    const booklist = document.getElementById('book-list');
    const row = document.createElement('tr');
    row.innerHTML = `<td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td><a href="#" class="delete">X</a></td>`;
    booklist.appendChild(row);  
  }
  checkFields(){
    if(document.getElementById('title').value.trim()==='' ||  document.getElementById('author').value.trim()==='' || document.getElementById('isbn').value.trim()===''){
        return false;
     }
     return true;
  }
  showMessage(className,message){
    const div = document.createElement('div');
    div.className = className;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.getElementById('book-form');
    container.insertBefore(div,form);
    setTimeout(function(){
       div.remove();
    },3000);
  }
  deleteBook(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
        this.showMessage('success','Book Removed'); 
     }
  }
  clearFields(){
    document.getElementById('title').value='';
    document.getElementById('author').value='';
    document.getElementById('isbn').value=''; 
  }
}

//Local storage class

class Store{
    static getBooks(){
      let books;
      if(localStorage.getItem('books')===null){
         books = []; 
      }
      else{
          books =JSON.parse(localStorage.getItem('books'));
      }
      return books;    
    }
    static displayBooks(){
       const books = Store.getBooks();
       books.forEach(function(book){
          const ui = new UI();
          ui.addBooktoList(book);  
       });
    }
    static addBook(book){
      const books = Store.getBooks();
      books.push(book);
      localStorage.setItem('books',JSON.stringify(books));
    }
    static removeBooks(isbn){
       console.log(isbn);
       const books = Store.getBooks();
       books.forEach(function(book,index){
         if(book.isbn === isbn){
            books.splice(index,1);  
         }
       });
       localStorage.setItem('books',JSON.stringify(books));
    }
}

//DOM load Event

document.addEventListener('DOMContentLoaded',Store.displayBooks());




//Event Listeners
document.getElementById('book-form').addEventListener('submit',function(e){
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    const book = new Book(title,author,isbn);
    const ui = new UI();
    if(ui.checkFields()){
       ui.addBooktoList(book);
       Store.addBook(book);
       ui.clearFields();
       ui.showMessage('success','Book Added Sucessfully');  
    }
    else{
       ui.showMessage('error','Enter valid details');
    }
    e.preventDefault();
 });
 
 
 //Event Listener Delete 
 
 document.getElementById('book-list').addEventListener('click',function(e){
      const ui = new UI();
      ui.deleteBook(e.target); 
      Store.removeBooks(e.target.parentElement.previousElementSibling.textContent); 
 });