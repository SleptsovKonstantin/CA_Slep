const express = require('express');
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const resultData = [
  {
    id: 1,
    item: 'Купили квартиру на патриках',
    sum: -4000
  },
  {
    id: 2,
    item: 'Темка сработана',
    sum: 5640
  },
  {
    id: 3,
    item: 'Продал подкрадули',
    sum: -1230
  },
];

app.get('/api/getItem', (req, res) => {
  console.log('/api/getItem');
  res.send(resultData);
});

app.post('/api/addItem', (req, res) => {
  console.log('/api/addItem');
  resultData.push(req.body)
  res.send(resultData);
});

app.patch('/api/updateItem', (req, res) => {
  console.log('/api/updateItem', req.body);
  const {id, text } = req.body
  const index = resultData.findIndex(el => el.id === id);
  resultData[index].item = text
  res.send(resultData);
})

app.delete('/api/deleteItem', (req, res) => {
  console.log('/api/deleteItem');
  const id = req.query.id;
  const index = resultData.findIndex(el => el.id === id);
  resultData.splice(index, 1);
  res.send(resultData);
})

const port = 3000;
app.listen(port, () => console.log(`Сервер запущен на порту ${port}`));