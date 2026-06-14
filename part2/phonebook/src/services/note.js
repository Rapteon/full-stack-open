import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const addPerson = (person) => {
    console.log(person);
    
  return axios.post(baseUrl, person).then((response) => response.data);
};

export default {
  addPerson,
};
