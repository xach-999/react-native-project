import axios from "../constants/MyAxios";

function getCategories() {
  return axios.get(`/categories`);
}

const CategoriesService = {
  getCategories,
};

export default CategoriesService;
