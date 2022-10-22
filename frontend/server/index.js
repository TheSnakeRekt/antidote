const express = require('express');
const app = express();
const compression = require("compression");

app.use(express.static('public'));
app.use(compression());


app.listen(4200, () => {
  console.log('listening on *:4200');
});
