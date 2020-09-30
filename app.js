//book constructor
function Book(title,author,isbn){
   this.title = title;
   this.author = author;
   this.isbn = isbn;
}
//UI constructor
function UI(){}

UI.prototype.showMessage = function(className,message){
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


UI.prototype.addBooktoList = function(book){
   const booklist = document.getElementById('book-list');
   const row = document.createElement('tr');
   row.innerHTML = `<td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td><a href="#" class="delete">X</a></td>`;
   booklist.appendChild(row);                      
}

UI.prototype.clearAllFields = function(){
    document.getElementById('title').value='';
    document.getElementById('author').value='';
    document.getElementById('isbn').value='';  
}

UI.prototype.checkFields= function(){
   if(document.getElementById('title').value.trim()==='' ||  document.getElementById('author').value.trim()==='' || document.getElementById('isbn').value.trim()===''){
      return false;
   }
   return true;
}

UI.prototype.deleteBook = function(target){
   if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
      this.showMessage('success','Book Removed'); 
   }
}

// UI.prototype.showSuccess = function(){
//    const div = document.createElement('div');
//    div.className = 'success';
//    div.textContent = 'Book Added Successfully';
//    const container = document.querySelector('.container');
//    const form = document.getElementById('book-form');
//    container.insertBefore(div,form);
//    setTimeout(function(){
//       div.remove();
//    },3000);
// }

//Event Listeners
document.getElementById('book-form').addEventListener('submit',function(e){
   const title = document.getElementById('title').value;
   const author = document.getElementById('author').value;
   const isbn = document.getElementById('isbn').value;
   const book = new Book(title,author,isbn);
   const ui = new UI();
   if(ui.checkFields()){
      ui.addBooktoList(book);
      ui.clearAllFields();
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
});