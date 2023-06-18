const cardNumberInput = document.getElementById("cardNumber")
const cvvInput = document.getElementById('cvv');

let numbersCard = /[0-9]/
let regExp = /[0-9]{4}/
const cvvRegex = /^[0-9]{3}$/;

const cardRegex = /^[0-9]{16}$/;

const validateCardNumber = (card) => {
  return cardRegex.test(card.split(' ').join('').trim());
}


cardNumberInput.addEventListener("input", (ev) => {

  if (ev.inputType === "insertText" && !numbersCard.test(ev.data) || cardNumberInput.value.length > 19) {
    cardNumberInput.value = cardNumberInput.value.slice(0, cardNumberInput.value.length - 1)
    return
  }

  let value = cardNumberInput.value
  if (ev.inputType === "deleteContentBackward" && regExp.test(value.slice(-4))) {
    cardNumberInput.value = cardNumberInput.value.slice(0, input.value.length - 1)
    return
  }

  if (regExp.test(value.slice(-4)) && value.length < 19) {
    cardNumberInput.value += " "
  }

  if (validateCardNumber(cardNumberInput.value)) {
    cardNumberInput.setCustomValidity('');
  } else {
    cardNumberInput.setCustomValidity('Введите шестнадцатизначный номер карты');
  }
})

const validateCVV = (cvv) => {
  return cvvRegex.test(cvv);
}

cvvInput.addEventListener('input', () => {
  if (validateCVV(cvvInput.value)) {
    cvvInput.setCustomValidity('');
  } else {
    cvvInput.setCustomValidity('Введите трехзначный код CVV');
  }
});
