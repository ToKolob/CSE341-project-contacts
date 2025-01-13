const express = require('express');
const app = express();


// Porta padrão
const PORT = process.env.PORT || 8080;

// Rota inicial (root)
app.get('/', require('./routes'));

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
