import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../apiconfig";

const SanPham = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "chocolate",
    image: "",
    price: "",
    stock: 10,
  });
  const [message, setMessage] = useState(null);
  const productsPerPage = 9;

  useEffect(() => {
    fetchProducts();
  }, []);

  // Lấy danh sách sản phẩm từ API
  const fetchProducts = () => {
    axios
      .get(`${API_BASE_URL}/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Lỗi khi lấy sản phẩm:", err));
  };

  // Thêm sản phẩm vào giỏ hàng
  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setMessage({ type: "success", text: `Đã thêm "${product.name}" vào giỏ hàng!` });
    setTimeout(() => setMessage(null), 3000);
  };

  // Gửi sản phẩm mới lên API
  const handleAddProduct = (e) => {
    e.preventDefault();
    
    axios
      .post(`${API_BASE_URL}/addProduct`, newProduct, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        setMessage({ type: "success", text: res.data.message });
        fetchProducts(); // Load lại danh sách sản phẩm
        setNewProduct({ name: "", category: "chocolate", image: "", price: "", stock: 10 });

        setTimeout(() => setMessage(null), 3000);
      })
      .catch(() => {
        setMessage({ type: "error", text: "Thêm sản phẩm thành công!" });
        setTimeout(() => setMessage(null), 3000);
      });
  };

  // Lọc sản phẩm theo danh mục
  const filteredProducts = category === "all" ? products : products.filter((product) => product.category === category);

  // Phân trang
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <>
      <div className="container">
        {/* Thông báo */}
        {message && (
          <div className={`notification ${message.type}`}>
            {message.text}
          </div>
        )}

        {/* Form thêm sản phẩm */}
        

        {/* Bộ lọc danh mục */}
        <div className="row">
          <div className="col-md-12">
            <div className="product-filters">
              <ul>
                {["all", "chocolate", "cafe", "milktea"].map((cat) => (
                  <li key={cat} className={category === cat ? "active" : ""} onClick={() => { setCategory(cat); setCurrentPage(1); }}>
                    {cat === "all" ? "Tất Cả" : cat === "chocolate" ? "Sô Cô La" : cat === "cafe" ? "Cà Phê" : "Trà Sữa"}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Danh sách sản phẩm */}
        <div className="row product-lists">
          {currentProducts.map((product) => (
            <div key={product._id} className="col-lg-4 col-md-6 text-center">
              <div className="single-product-item">
                <div className="product-image">
                  <Link to={`/product/${product._id}`}>
                    <img src={product.image} alt={product.name} />
                  </Link>
                </div>
                <h3>{product.name}</h3>
                <p className="product-price">
                  Giá: <strong>{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", minimumFractionDigits: 0 }).format(product.price)}</strong>
                </p>
                <Link to="#" className="cart-btn" onClick={() => addToCart(product)}>
                  <i className="fas fa-shopping-cart" /> Thêm Vào Giỏ Hàng
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Phân trang */}
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="pagination-wrap">
              <ul>
                <li>
                  <button className="prev" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Trước</button>
                </li>
                {[...Array(totalPages).keys()].map((number) => (
                  <li key={number + 1}>
                    <button className={`page-number ${currentPage === number + 1 ? "active" : ""}`} onClick={() => setCurrentPage(number + 1)}>
                      {number + 1}
                    </button>
                  </li>
                ))}
                <li>
                  <button className="next" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Tiếp</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
         <form onSubmit={handleAddProduct} className="add-product-form">
          <input type="text" placeholder="Tên sản phẩm" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} required />
          <input type="text" placeholder="URL Ảnh" value={newProduct.image} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} required />
          <input type="number" placeholder="Giá" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} required />
          <select value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}>
            <option value="chocolate">Sô Cô La</option>
            <option value="cafe">Cà Phê</option>
            <option value="milktea">Trà Sữa</option>
          </select>
          <button type="submit">Thêm Sản Phẩm</button>
        </form>
    </>
  );
};

export default SanPham;
