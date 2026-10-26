import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../../services/productService';
import ProductList from './ProductList';
import classes from './ShopPage.module.css';

const categories = [
  {
    title: 'APPLE',
    items: [{ label: 'All', value: 'all' }],
  },
  {
    title: 'IPHONE & MAC',
    items: [
      { label: 'iPhone', value: 'iphone' },
      { label: 'iPad', value: 'ipad' },
      { label: 'Macbook', value: 'macbook' },
    ],
  },
  {
    title: 'WIRELESS',
    items: [
      { label: 'Airpod', value: 'airpod' },
      { label: 'Watch', value: 'watch' },
    ],
  },
  {
    title: 'OTHER',
    items: [
      { label: 'Mouse', value: 'mouse' },
      { label: 'Keyboard', value: 'keyboard' },
      { label: 'Other', value: 'other' },
    ],
  },
];

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();const categoryFromUrl = searchParams.get('category') || 'all';
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);

  const [searchTerm, setSearchTerm] = useState('');

  const [sortBy, setSortBy] = useState('default');

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 6;

  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
    setCurrentPage(1);
  }, [categoryFromUrl]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError('Unable to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Tính toán danh sách sản phẩm sau khi lọc và sắp xếp.
  // Danh sách chỉ được tính lại khi một trong các dependency thay đổi.
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Lọc sản phẩm theo danh mục đã chọn
    // Nếu chọn 'all' thì giữ lại tất cả sản phẩm
    if (selectedCategory !== 'all') {
      result = result.filter((product) =>
        String(product.category).toLowerCase() === selectedCategory
      );
    }
    const keyword = searchTerm.trim().toLowerCase();

    if (keyword) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(keyword)
      );
    }

    // Sắp xếp sản phẩm theo lựa chọn của người dùng
    if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'price-asc') {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    }

    return result;
  }, [products, selectedCategory, searchTerm, sortBy]);

  // Tính tổng số trang dựa trên số sản phẩm sau khi lọc
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Lấy các sản phẩm thuộc trang hiện tại
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);

    if (category === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className={classes.shopPage}>
      <div className={classes.shopBanner}>
        <h1>SHOP</h1>
        <span>SHOP</span>
      </div>

      <div className={classes.shopContainer}>
        <aside className={classes.sidebar}>
          <h2 className={classes.sidebarTitle}>CATEGORIES</h2>

          {categories.map((group) => (
            <div className={classes.categoryGroup} key={group.title}>
              <h3 className={classes.categoryHeading}>{group.title}</h3>

              {group.items.map((item) => (
                <button
                  type="button"
                  key={item.value}
                  className={`${classes.categoryItem} ${
                    selectedCategory === item.value
                      ? classes.activeCategory
                      : ''
                  }`}
                  onClick={() => handleCategoryChange(item.value)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </aside>

        <main className={classes.shopMain}>
          <div className={classes.shopToolbar}>
            <input
              type="search"
              className={classes.searchInput}
              placeholder="Enter Search Here!"
              value={searchTerm}
              onChange={handleSearchChange}
              aria-label="Search products"
            />

            <select
              className={classes.sortSelect}
              value={sortBy}
              onChange={handleSortChange}
              aria-label="Sort products"
            >
              <option value="default">Default Sorting</option>
              <option value="name-asc">Name (A - Z)</option>
              <option value="name-desc">Name (Z - A)</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
            </select>
          </div>

          {loading ? (
            <p className={classes.statusMessage}>Loading products...</p>
          ) : error ? (
            <p className={classes.statusMessage}>{error}</p>
          ) : filteredProducts.length === 0 ? (
            <p className={classes.statusMessage}>No products found.</p>
          ) : (
            <>
              <ProductList products={displayedProducts} />

              {totalPages > 1 && (
                <nav className={classes.pagination} aria-label="Pagination">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((page) => page - 1)}
                  >
                    &laquo;
                  </button>

                  {Array.from({ length: totalPages },(_, index) => index + 1).map((page) => (
                    <button
                      type="button"
                      key={page}
                      className={
                        currentPage === page ? classes.activePage : ''
                      }
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((page) => page + 1)}
                  >
                    &raquo;
                  </button>
                </nav>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default ShopPage;