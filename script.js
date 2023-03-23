// # Условие задачи
// ​
// Необходимо написать функцию `filterProductsByCategoryAndPrice`, которая будет принимать на вход массив объектов `products`, а также два аргумента: `category` (строка) и `priceRange` (массив из двух чисел - минимальная и максимальная цена).
// ​
// Функция должна вернуть новый массив, содержащий объекты продуктов, которые относятся к указанной категории и имеют цену в указанном диапазоне (включительно).
// ​
// Для каждого объекта продукта в результирующем массиве функция должна также вычислять средний рейтинг на основе всех отзывов. Результат должен содержать поле `averageRating` в каждом объекте продукта.
// ​
// Пример вызова функции:
// ```javascript
// const filteredProducts = filterProductsByCategoryAndPrice(products, 'электроника', [10000, 40000]);
// console.log(filteredProducts);
// ```
// Ожидаемый результат:
// ​
// ```javascript
// [
//   {
//     name: "Ноутбук",
//     price: 50000,
//     category: "электроника",
//     available: true,
//     photo: "https://example.com/notebook.jpg",
//     reviews: [
//       { author: "Иван", text: "Отличный ноутбук!", rating: 5 },
//       { author: "Петр", text: "Не очень...", rating: 2 },
//       { author: "Мария", text: "Мне понравился", rating: 4 },
//       { author: "Алексей", text: "Очень хороший ноутбук", rating: 5 }
//     ],
//     averageRating: 4.0
//   },
//   {
//     name: "Телевизор",
//     price: 30000,
//     category: "электроника",
//     available: true,
//     photo: "https://example.com/tv.jpg",
//     reviews: [
//       { author: "Александра", text: "Отличный телевизор!", rating: 5 },
//       { author: "Денис", text: "Неплохой выбор", rating: 3 },
//       { author: "Сергей", text: "Хороший телевизор", rating: 4 },
//       { author: "Наталья", text: "Классный телек", rating: 5 }
//     ],
//     averageRating: 4.25
//   }
// ]
// ​

const products = [
  {
    name: "Холодильник",
    price: 20000,
    category: "бытовая техника",
    available: true,
    photo: "https://example.com/fridge.jpg",
    reviews: [
      { author: "Иван", text: "Хороший холодильник", rating: 4 },
      { author: "Петр", text: "Не очень...", rating: 2 },
      { author: "Мария", text: "Мне понравился", rating: 5 }
    ]
  },
  {
    name: "Ноутбук",
    price: 50000,
    category: "электроника",
    available: true,
    photo: "https://example.com/notebook.jpg",
    reviews: [
      { author: "Иван", text: "Отличный ноутбук!", rating: 5 },
      { author: "Петр", text: "Не очень...", rating: 2 },
      { author: "Мария", text: "Мне понравился", rating: 4 },
      { author: "Алексей", text: "Очень хороший ноутбук", rating: 5 }
    ]
  },
  {
    name: "Телевизор",
    price: 30000,
    category: "электроника",
    available: true,
    photo: "https://example.com/tv.jpg",
    reviews: [
      { author: "Александра", text: "Отличный телевизор!", rating: 5 },
      { author: "Денис", text: "Неплохой выбор", rating: 3 },
      { author: "Сергей", text: "Хороший телевизор", rating: 4 },
      { author: "Наталья", text: "Классный телек", rating: 5 }
    ]
  },
  {
    name: "Стиральная машина",
    price: 15000,
    category: "бытовая техника",
    available: false,
    photo: "https://example.com/washer.jpg",
    reviews: []
  },
  {
    name: "Диван",
    price: 35000,
    category: "мебель",
    available: true,
    photo: "https://example.com/sofa.jpg",
    reviews: [
      { author: "Ольга", text: "Очень удобный диван", rating: 5 },
      { author: "Андрей", text: "Не понравилось", rating: 2 },
      { author: "Светлана", text: "Красивый диван", rating: 4 }
    ]
  },
  {
    name: "Микроволновка",
    price: 7000,
    category: "бытовая техника",
    available: true,
    photo: "https://example.com/microwave.jpg",
    reviews: [
      { author: "Иван", text: "Хорошая микроволновка", rating: 4 },
      { author: "Мария", text: "Мне нравится", rating: 5 }
    ]
  },
  {
    name: "Шкаф",
    price: 45000,
    category: "мебель",
    available: false,
    photo: "https://example.com/closet.jpg",
    reviews: []
  },
  {
    name: "Кофеварка",
    price: 10000,
    category: "бытовая техника",
    available: true,
    photo: "https://example.com/coffee-maker.jpg",
    reviews: [
      { author: "Анна", text: "Отличная кофеварка", rating: 5 },
      { author: "Сергей", text: "Неплохо", rating: 3 }
    ]
  }
];

const filterProductsByCategoryAndPrice = (prod, categ, pr) => {
  const result = []

  prod.forEach((el) => {

    if (el["category"] === categ && el.price >= pr[0] && el.price <= pr[1]) {
      let revEnd = 0

      el.reviews.forEach(rev => {
        revEnd += rev.rating
      })

      el.averageRating = revEnd / el.reviews.length

      result.push(el)
    }
  })
  return result
}


const filteredProducts = filterProductsByCategoryAndPrice(products, 'электроника', [10000, 50000]);
console.log(filteredProducts);