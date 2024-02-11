
addProductToCart = (pid, cid) => {
    fetch(`/api/carts/${cid}/product/${pid}`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(result => {
        return result.json()})
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