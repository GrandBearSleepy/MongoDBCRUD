const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/student'), { useNewUrlParser: true };


require('./routes/html-router.js')(app);
require('./routes/api-router')(app);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
})