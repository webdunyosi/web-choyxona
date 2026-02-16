import menuData from './menuData.json';

export const menuCategories = menuData;

export const getProductById = (productId) => {
  for (const category of menuCategories) {
    const product = category.products.find(p => p.id === productId);
    if (product) {
      return product;
    }
  }
  return null;
};
