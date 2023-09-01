//import { json } from "express";

const clientSocket = io();

//let formCreateProduct = document.getElementById('formCreateProduct');
//let formDeleteProduct = document.getElementById('formDeleteProduct');

let btnCreate = document.getElementById('btnCreate');

btnCreate.addEventListener('click', () => {
    const body = {
        title: document.getElementById("txtTitulo").value,
        description: document.getElementById("txtDescripcion").value,
        code: document.getElementById("txtCodigo").value,
        price: parseInt(document.getElementById("txtPrecio").value),
        stock: parseInt(document.getElementById("txtStock").value),
        category: document.getElementById("txtCategoria").value
    };

    fetch('/api/products', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then( result => result.json() )
    .then( result => {
        if(result.status === 'error') throw new Error(result.error);
    })
    .then( () => fetch('/api/products', {method: 'get'}) )
    .then( result => result.json())
    .then( result => {
        if(result.status === 'error') throw new Error(result.error);
        console.log("result: " + result.payload)
        clientSocket.emit('listProducts', result.payload);
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });
          
        Toast.fire({
            icon: 'success',
            title: 'Producto agregado con exito!'
        });

        document.getElementById("txtTitulo").value = "";
        document.getElementById("txtDescripcion").value = "";
        document.getElementById("txtCodigo").value = "";
        document.getElementById("txtPrecio").value = "";
        document.getElementById("txtStock").value = "";
        document.getElementById("txtCategoria").value = "";

    } )
    .catch( err => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });
          
        Toast.fire({
            icon: 'error',
            title: err
        });
    });
});

deleteProduct = (id) => {
    fetch(`/api/products/${id}`, {
        method: 'delete'
    })
    .then( result => result.json() )
    .then( result => {
        if(result.status === 'error') throw new Error(result.error);
        clientSocket.emit('listProducts', result.payload);
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });
          
        Toast.fire({
            icon: 'success',
            title: 'Producto eliminado con exito!'
        });
    } )
    .catch( err => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });
          
        Toast.fire({
            icon: 'error',
            title: err
        });
    });
}

clientSocket.on('updateProducts', (data)=>{
    console.log("data::::");
    console.log(data);
    let tablaProductos = document.getElementById('tablaProductos');
    let tablaHtml =`<tr class="fw-bold">
                        <td></td>
                        <td>Codigo</td>
                        <td>Nombre</td>
                        <td>Descripcion</td>
                        <td>Precio</td>
                        <td>Cantidad</td>
                        <td>Categoria</td>
                        <td>Imagenes</td>
                    </tr>`;
    
    data.forEach(item => {
        tablaHtml+=`<tr>
                        <td><button class="btn btn-primary" onclick="deleteProduct(${item.id})">Eliminar</button></td>
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

/*formCreateProduct.addEventListener('submit', (e) => {
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
});*/

/*
formDeleteProduct.addEventListener('submit', (e) => {
    /*e.preventDefault();
    const idProduct = parseInt(document.getElementById("txtIdProducto").value); 
    clientSocket.emit("deleteProduct", idProduct);
});*/


// Demo: Implemento sweetAlert2
/*
// ejemplo 1
Swal.fire({
    title: 'Alerta',
    input: 'text',
    text: 'Texto del cuerpo del alerta',
    allowOutsideClick: false,
    inputValidator: (value) => {
        return !value.trim() && 'Ingrese un valor correcto';
    }
}).then( result => {
    console.log("salio todo bien");
});

// ejemplo 2
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

Toast.fire({
  icon: 'success',
  title: 'Signed in successfully'
}

*/