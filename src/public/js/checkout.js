payProducts = async (cid) => {
    const res = await fetch(`/api/pays/create-checkout-session/${cid}`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        
    })
    
    const data = await res.json();

    window.location.href = data.url;
    

}