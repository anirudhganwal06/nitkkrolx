exports.getHomePage = (req, res, next) => {
        res.render('homePage', {
            pageTitle: 'NITKKR | oLx'
        });
};