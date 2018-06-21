const express = require('express');
const app = express();

var port = 3000;

app.get('/', (req, res) => {
    res.status(200).send('My phone book app.');
})

const server = app.listen(port, () => {
    console.log('Express server listening on port ' + port);
});
