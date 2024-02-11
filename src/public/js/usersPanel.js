
deleteInactiveUsers = () => {
    fetch(`/api/users`, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    /*
    .then(result => {
        console.log('result: '+JSON.stringify(result))
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
    });*/

}


modRoleUser = ( email, role) => {

    Swal.fire({
        title: 'Modificar',
        input: 'text',
        text: 'Ingrese nuevo rol (admin, user o premium)',
        inputValidator: value => {
            return !value.trim() && 'Ingrese un rol valido';
        },
        allowOutsideClick: false
    
    }).then(result => {
        let newRole = result.value;
        
        fetch(`/api/users/${email}/${newRole}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            }
        })

    
    })





} 