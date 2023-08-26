const clientSocket = io();

let formCreateProduct = document.getElementById('formCreateProduct');
let formDeleteProduct = document.getElementById('formDeleteProduct');

clientSocket.on('message', (data)=>{
    console.log(data);
    let tablaProductos = document.getElementById('tablaProductos');
    let tablaHtml =`<tr class="fw-bold">
                        <td>ID</td>
                        <td>Codigo</td>
                        <td>Nombre</td>
                        <td>Descripcion</td>
                        <td>Precio</td>
                        <td>Cantidad</td>
                        <td>Categoria</td>
                        <td>url Imagenes</td>
                    </tr>`;
    
    data.forEach(item => {
        tablaHtml+=`<tr>
                        <td>${item.id}</td>
                        <td>${item.code}</td>
                        <td>${item.title}</td>
                        <td>${item.description}</td>
                        <td>${item.price}</td>
                        <td>${item.stock}</td>
                        <td>${item.category}</td>
                        <td>${item.thumbnails}</td>
                    </tr>`;
    });

    tablaProductos.innerHTML = tablaHtml;
});

formCreateProduct.addEventListener('submit', (e) => {
    e.preventDefault();
    const newProduct = {
        title: document.getElementById("txtTitulo").value,
        description: document.getElementById("txtDescripcion").value,
        code: document.getElementById("txtCodigo").value,
        price: parseInt(document.getElementById("txtPrecio").value),
        stock: parseInt(document.getElementById("txtStock").value),
        category: document.getElementById("txtCategoria").value
    };

    clientSocket.emit("postProduct", newProduct);
});


formDeleteProduct.addEventListener('submit', (e) => {
    e.preventDefault();
    const idProduct = parseInt(document.getElementById("txtIdProducto").value); 
    clientSocket.emit("deleteProduct", idProduct);
});