import axios from "../axios/MyAxios";

function getCategories() {
  return axios.get(`/categories`);
}

const CategoriesService = {
  getCategories,
};

export default CategoriesService;
