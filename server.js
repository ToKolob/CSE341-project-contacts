const express = require('express');

const mongodb = require('./data/database.js');
const app = express();


// Porta padrão
const PORT = process.env.PORT || 3000;

// Rota inicial (root)
app.use('/', require('./routes'));


mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  }
  else{
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  }
});
