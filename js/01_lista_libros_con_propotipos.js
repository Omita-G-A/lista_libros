// ====== CONSTRUCTORES OBJETOS ======
// función constructora objeto libro
function Book(title, author, dueDate) {
    this.title = title;
    this.author = author;
    this.dueDate = dueDate;
}

// constructor parte gráfica. No tendrá propiedades. Solo lo queremos para crear y aplicar
function Ui() {};



// =========== MÉTODOS UI ===========
// Método para añadir un objeto libro a la tabla. Le pasaremos como parámetro 
// una istancia de libro
Ui.prototype.addBookToList = function(book) {
    // referencia a la tabla con la lista de libros del html
    const list = document.querySelector('#book-list');
    // construimos un nuevo elemento tr
    const row = document.createElement('tr');
    // generamos el innerHTML del tr que hemos creado
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.dueDate}</td>
    <td><a href="#" class="delete">x</a></td>
    `;
    // añadimos a la lista el row (el elemento tr) que hemos creado.
    list.appendChild(row);
};

// Método para eliminar objeto libro de la lista
Ui.prototype.deleteBook = function(target) {
    target.parentElement.parentElement.remove();
};

// Método para limpiar campos del formulario una vez hemos añadido una instancia
// de libro
Ui.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('dueDate').value = '';
};

// Método alert para señalar si añadir el libro ha ido bien
Ui.prototype.showAlert = function (msg, className) {
    // creamos un div para los mensajes
    const divMsg = document.createElement('div');
    // añadimos clase al div según el tipo de mensaje que querramos mostrar
    divMsg.className = `alert ${className}`;
    // añadimos/creamos el texto del mensaje
    divMsg.appendChild(document.createTextNode(msg));
    // recoger referencia al contenedor
    const contenedor = document.querySelector('.container');
    // recoger el formulario
    const formulario = document.querySelector('#book-form');
    // insertar el mensaje de alerta antes del formulario
    contenedor.insertBefore(divMsg,formulario);

    // Esconder el div de alerta
    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 2000);
};



// ======== EVENTOS ================
// Evento eliminación fila
document.querySelector('#book-list').addEventListener('click', function(e) {
    if(e.target.classList.contains('delete')) {
        const ui = new Ui();
        ui.deleteBook(e.target);
        ui.showAlert('El libro se ha eliminado correctamente', 'success');    
    }

});

// Evento submit
document.getElementById('book-form').addEventListener('submit', function(e) {
    // recogemos las referencias al valor de los inputs
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const dueDate = document.getElementById('dueDate').value;

    // instanciamos una ui
    const ui = new Ui();

    if(title === '' || author === '' || dueDate === '') {
        // añadimos el mensaje de error si alguno de los campos está vacío
        ui.showAlert('Los campos no estan completos', 'error');
    } else {
        // instanciamos un libro
        const book = new Book(title, author, dueDate);

        // añadir el libro
        ui.addBookToList(book);

        // mostramos el alert de que ha ido bien
        ui.showAlert('El libro se ha añadido correctamente', 'success');

        // limpiar campos
        ui.clearFields();
    }

    e.preventDefault();

});