const express = require('express');
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/getData', (req, res) => {
  const data = {
    message: 'Привет, мир!'
  };
  res.send(data);
});

app.post('/api/sendData', (req, res) => {
  console.log('req====>', req.body)
  const response = {
    status: 'success',
    message: `Данные успешно отправлены!`
  };
  res.send(response);
});

const port = 3000;
app.listen(port, () => console.log(`Сервер запущен на порту ${port}`));