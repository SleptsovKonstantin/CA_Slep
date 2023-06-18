const characterList = document.querySelector('ul');

const openImage = (element) => {
  let imageUrl = element.image;
  let win = window.open("", "_blank");
  win.document.write("<html><body style='margin: 0;'><img src='" + imageUrl + "' style='max-width: 100%; max-height: 100%;'></body></html>");
  win.document.close();
}

 const loadCharacters = async() =>  {
  try {
    
    const response = await fetch('https://rickandmortyapi.com/api/character');
    const data = await response.json();
    
    const characters = data.results.map(character => {
      const li = document.createElement('li');
      const name = document.createElement('h2');
      const image = document.createElement('img');
      image.onclick = () => {
        console.log('character', character);
        openImage(character)
      }
      name.textContent = character.name;
      image.src = character.image;
      li.appendChild(name);
      li.appendChild(image);
      return li;
    });
    
    characters.forEach(character => characterList.appendChild(character));
  } catch (error) {
    console.error(error);
  }
}


window.addEventListener('load', loadCharacters);

