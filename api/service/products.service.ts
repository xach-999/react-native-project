import axios from "../constants/MyAxios";

function getProducts() {
  return axios.get('/products')
};

function getProduct(id: any) {
  return axios.get(`/products/${id}`)
};

function getFilteredProducts(queryData: any) {
  return axios.get(`/products/${queryData}`)
};

const ProductsService = {
    getProducts,
    getProduct,
    getFilteredProducts
};

export default ProductsService;