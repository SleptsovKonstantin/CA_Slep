const express = require('express');
const cors = require("cors");
const app = express();
const path = require('path');
const fs = require('fs');

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
    sum: 1230
  },
];

const imagesData = [
  {
    id: 1,
    url: "https://via.placeholder.com/600/92c952",
    text: "Шедевр нереальный",
  },
  {
    id: 2,
    url: "https://via.placeholder.com/600/771796",
    text: "Восхищение. Овации",
  },
  {
    id: 3,
    url: "https://via.placeholder.com/600/24f355",
    text: "Малевич отдыхает",
  },
]

app.get('/api/getItem', (req, res) => {
  console.log('/api/getItem');
  setTimeout(() => res.send(resultData), 3000)
});

app.get('/api/getImages', (req, res) => {
  console.log('/api/getItem');
  res.send(imagesData)
});

// app.get('/api/getImages', (req, res) => {
//   console.log('/api/getItem');
//   const imgPath = path.join(__dirname, './img/');
//   console.log('imgPath', imgPath);
//   // res.setHeader('Content-Type', 'image/png');
//   // res.sendFile('*.png', { root: imgPath }, (err) => {
//   //   if (err) {
//   //     console.error(err);
//   //     res.status(err.status).end();
//   //   }
//   // });

//   // способ 
//   const fileNames = fs.readdirSync(imgPath).filter(name => name.endsWith('.png'));
//   res.setHeader('Content-Type', 'image/png');
//   fileNames.forEach(fileName => {
//     const filePath = path.join(imgPath, fileName);
//     const stream = fs.createReadStream(filePath);
//     stream.pipe(res, { end: false });

//     res.on('finish', () => {
//       console.log('All images have been sent');
//       res.end();
//     });

//     // способ 
//     // const files = fs.readdirSync(imgPath);
//     // console.log('files****', files);
//     // const pngFiles = files.filter(file => path.extname(file) === '.png');
//     // res.sendFile(pngFiles);
//   });
// });


app.post('/api/addItem', (req, res) => {
  console.log('/api/addItem');
  resultData.push(req.body)
  setTimeout(() => res.send(resultData), 3000)
});

app.patch('/api/updateItem', (req, res) => {
  console.log('/api/updateItem', req.body);
  const { id, text } = req.body
  const index = resultData.findIndex(el => el.id === id);
  resultData[index].item = text
  setTimeout(() => res.send(resultData), 3000)
})

app.delete('/api/deleteItem', (req, res) => {
  console.log('/api/deleteItem');
  const id = req.query.id;
  const index = resultData.findIndex(el => el.id === id);
  resultData.splice(index, 1);
  setTimeout(() => res.send(resultData), 3000)
})

const port = 4000;
const server = app.listen(port, () => console.log(`Сервер запущен на порту ${port}`));

server.timeout = 30000