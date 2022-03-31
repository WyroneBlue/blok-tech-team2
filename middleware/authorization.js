let session;

const loggedIn = (req, res, next) => {
    
    session = req.session;
    if(session.authUser){
        next()
    } else {
        res.redirect('/login');
    }
};

const guest = (req, res, next) => {

    session = req.session;
    if(!session.authUser){
        next()
    } else {
        res.redirect('/');
    }
};

module.exports = {
    loggedIn: loggedIn,
    guest: guest
}