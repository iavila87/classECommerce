addProductToCart = (pid) => {
    fetch('/api/carts', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(result => result.json())
    .then(result => {
        //console.log("llego el cart "+ JSON.stringify(result));
        if(result.status === 'error') throw new Error(result.error);

        //console.log('result.payload._id: ' + result.payload._id)
        return result.payload._id;
    })
    .then(cid => {
        return fetch(`/api/carts/${cid}/product/${pid}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    })
    .then(result => result.json())
    .then(result => {
        
        if(result.status === 'error') throw new Error(result.error);

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
    })
    .catch(error =>{
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
            title: 'No se pudo agregar el producto al carrito de compras!'
        });
    });

}