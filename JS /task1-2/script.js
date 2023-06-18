const itemsArr = [];

const addToList = () => {
  const input = document.getElementById("newItem");
  let value = input.value.trim();

  if (value.length == 0) {
    alert("Введите значение");
    return;
  }

  itemsArr.push(value)

  input.value = "";
  renderList(itemsArr);
}

(function () {
  document.querySelector('input').addEventListener('keydown', function (e) {
    if (e.key === "Enter") {
      addToList()
    }
  });
})();

const filterList = () => {
  let input = document.getElementById("filterInput");
  let filter = input.value.toUpperCase();
  let list = document.getElementById("list");
  let items = list.getElementsByTagName("li");

  for (let i = 0; i < items.length; i++) {
    let text = items[i].textContent || items[i].innerText;
    if (text.toUpperCase().indexOf(filter) > -1) {
      items[i].style.display = "";
    } else {
      items[i].style.display = "none";
    }
  }
}

const filterClean = () => {
  let input = document.getElementById("filterInput");
  let list = document.getElementById("list");
  let items = list.getElementsByTagName("li");

  for (let i = 0; i < items.length; i++) {
    items[i].style.display = "";
  }
  input.value = '';
}

const sortList = (list) => {
  const sortedList = [...list];

  sortedList.sort((a, b) => {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      return 0;
    }
  });

  return sortedList;
}

const renderList = (itemList) => {
  const list = document.getElementById("list");
  list.innerHTML = '';

  const sortListArray = sortList(itemList)

  sortListArray.forEach((string) => {
    const listItem = document.createElement('li');
    listItem.textContent = string;
    list.appendChild(listItem);
  });
}
