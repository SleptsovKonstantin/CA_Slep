const form = document.getElementById('currentForm');
const loaderWrapper = document.querySelector('.loader-wrapper');
const loader = document.querySelector('.loader');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  let nameUser = document.getElementById("name").value;
  let mailUser = document.getElementById("email").value;

  loaderWrapper.style.display = 'flex';

  const data = {
    name: nameUser,
    mail: mailUser
  };

  try {
    const response = await fetch('http://localhost:3000/api/sendData', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    });

    console.log('response', response);

    if (response.ok) {
      loaderWrapper.style.display = 'none';
      alert('Данные успешно отправлены на сервер');
      form.reset();
    } else {
      loaderWrapper.style.display = 'none';
      throw new Error('Ошибка отправки данных на сервер');
    }
  } catch (error) {
    loaderWrapper.style.display = 'none';
    alert("Ошибка catch: " + error.message);
  } finally {
    loaderWrapper.style.display = 'none';
    form.reset();
  }
});