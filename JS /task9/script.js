const axios = require('axios');
const parseXml = require('xml2js').parseStringPromise;

// Функция для отправки GET запросов
const get = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
}

// Функция для отправки POST запросов
const post = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
}

// Функция для обработки ответов в формате JSON
const parseJson = (data) => {
  try {
    return JSON.parse(data);
  } catch (error) {
    handleParseError(error);
  }
}

// Функция для обработки ответов в формате XML
const parseXmlResponse = async (data) => {
  try {
    const result = await parseXml(data);
    return result;
  } catch (error) {
    handleParseError(error);
  }
}

// Функция для обработки ошибок при выполнении запроса
const handleRequestError = (error) => {
  console.error(`Ошибка запроса: ${error.message}`);
  throw error;
}

// Функция для обработки ошибок при парсинге ответа
const handleParseError = (error) => {
  console.error(`Ошибка парсинга ответа: ${error.message}`);
  throw error;
}

module.exports = {
  get,
  post,
  parseJson,
  parseXmlResponse
};