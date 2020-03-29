async function requireAuth(req, res, next) {
    console.log(req.session.user, 'logout')
    if (!req.session || !req.session.user) {
        res.status(401).end('Unauthorized!');
        return;
    }
    next();
}

module.exports = {
    requireAuth
}