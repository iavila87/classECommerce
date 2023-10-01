export const auth = (req, res, next) => {
    if(req.session.user?.role === 'admin') next();
    
    //res.send('No autorizado');
    res.redirect('/');
}