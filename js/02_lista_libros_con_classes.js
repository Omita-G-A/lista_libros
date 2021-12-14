// contructor clase Book
class Book {
    constructor(title, author, dueDate) {
        this.title = title;
        this.author = author;
        this.dueDate = dueDate;
    }
}

class Ui {

    addBookToList(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.title}</td>
        <td><a href="#" class="delete">x</a></td>
        `;
        list.appendChild(row);
    }

    deleteBook(target) {
        target.parentElement.parentElement.remove();
    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('dueDate').value = '';
    }

    showAlert(msg, className) {
        const divMsg = document.createElement('div');
        divMsg.className = `alert ${className}`;
        divMsg.appendChild(document.createTextNode(msg));
        const contenedor = document.querySelector('.container');
        const formulario = document.querySelector('#book-form');
        contenedor.insertBefore(divMsg,formulario);
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 2000);
    }

}

class LocalStorage {

    // creamos métodos estáticos y no necesitaremos instanciar ningún objeto
    static getBooks () {
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addToLocalStorage(book) {

        // nos traemos el array de books que hemos creado en el método anterior 
        const books = LocalStorage.getBooks();
        // añadimos el libro al array de libros
        books.push(book);
        // pasamos el array con el nuevo libro al localStorage convertido a json
        localStorage.setItem('books', JSON.stringify(books));
    }

    static displayBooks() {
        const books = LocalStorage.getBooks();
        const ui = new Ui();
        books.forEach(book => {
            ui.addBookToList(book);
        });
        console.log(books);
    }
    static removeFromLocalStorage(dueDate) {
        const books = LocalStorage.getBooks();
        books.forEach(function(book, indice) {
            if(book.dueDate === dueDate) {
                books.splice(indice, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}


document.getElementById('book-list').addEventListener('click', function(e) {
    if(e.target.classList.contains('delete')) {
        const ui = new Ui();
        ui.deleteBook(e.target);
        // eliminar el libro del localStorage.
        // le decimos que elimine en base al hermano previo del padre del e.target, que en este 
        // caso concreto sería el td que alberga dueDate.
        LocalStorage.removeFromLocalStorage(e.target.parentElement.previousElementSibling.textContent);
        ui.showAlert('El libro se ha eliminado correctamente', 'success');
    }
})

document.getElementById('book-form').addEventListener('submit', function(e) {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const dueDate = document.getElementById('dueDate').value;
    const ui = new Ui();

    if(title === '' || author === '' || dueDate === '') {
        ui.showAlert('Todos los campos son obligatorios', 'error');
    } else {
        const book = new Book(title, author, dueDate);
        ui.addBookToList(book);
        LocalStorage.addToLocalStorage(book);
        ui.showAlert('El libro se ha añadido correctamente', 'success');
        ui.clearFields();
    }

    e.preventDefault();
});

// evento para crear la lista de libros del LocalStore al cargar la página
document.addEventListener('DOMContentLoaded', LocalStorage.displayBooks);


