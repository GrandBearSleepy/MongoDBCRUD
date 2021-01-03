module.exports = function (app) {
    app.get('/', (req, res) => {
        res.render('index');
    });

    app.get('/add', (req, res) => {
        res.render('add');
    })
}
