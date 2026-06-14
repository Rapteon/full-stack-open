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

const updatePerson = (updatedPerson) => {
  return axios
    .put(`${baseUrl}/${updatedPerson.id}`, updatedPerson)
    .then((response) => response.data);
};

export default {
  addPerson,
  getPersons,
  deletePerson,
  updatePerson,
};
