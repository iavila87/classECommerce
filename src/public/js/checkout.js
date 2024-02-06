payProducts = async () => {
    
    const res = await fetch('/api/pays/create-checkout-session', {
        method: 'post'
    })
    
    const data = await res.json();

    window.location.href = data.url;
    

}