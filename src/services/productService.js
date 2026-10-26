const API_URL =
  'https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74';

export const getProducts = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Không thể tải danh sách sản phẩm');
  }

  return response.json();
};
