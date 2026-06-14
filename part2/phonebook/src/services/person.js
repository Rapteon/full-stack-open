import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const addPerson = (person) => {
  return axios.post(baseUrl, person).then((response) => response.data);
};

const getPersons = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default {
  addPerson,
  getPersons,
  deletePerson,
};
