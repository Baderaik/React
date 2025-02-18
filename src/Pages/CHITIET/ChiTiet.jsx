import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../apiconfig";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [editing, setEditing] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: "",
    image: "",
    price: 0,
    category: "",
    description: "",
  });

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setUpdatedProduct(res.data);
        return axios.get(`${API_BASE_URL}/products`);
      })
      .then((res) => {
        const allProducts = res.data.filter((p) => p._id !== id);
        const shuffled = allProducts.sort(() => 0.5 - Math.random());
        setRelatedProducts(shuffled.slice(0, 3));
      })
      .catch((err) => console.error("Lỗi khi lấy dữ liệu sản phẩm:", err));
  }, [id]);

  // Thêm sản phẩm vào giỏ hàng
  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((p) => p._id === product._id);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`Đã thêm ${quantity} "${product.name}" vào giỏ hàng!`);
  };

  // Xóa sản phẩm
  const deleteProduct = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
      try {
        await axios.delete(`${API_BASE_URL}/deleteProduct/${id}`);
        alert("Sản phẩm đã được xóa thành công!");
        navigate("/"); // Chuyển hướng về trang danh sách sản phẩm
      } catch (err) {
        console.error("Lỗi khi xóa sản phẩm:", err);
        alert("Xóa sản phẩm thất bại!");
      }
    }
  };

  // Cập nhật sản phẩm
  const updateProduct = async () => {
    try {
      console.log("Dữ liệu gửi lên API:", updatedProduct); // Debug
  
      const response = await axios.put(
        `${API_BASE_URL}/updateProduct/${id}`,
        updatedProduct,
        { headers: { "Content-Type": "application/json" } }
      );
  
      if (response.status === 200) {
        alert("Cập nhật thành công!");
        setProduct(updatedProduct);
      } else {
        alert("Cập nhật thất bại!");
      }
    } catch (err) {
      console.error("Lỗi khi cập nhật:", err.response?.data || err);
      alert("Có lỗi xảy ra khi cập nhật!");
    }
  };
  

  if (!product) {
    return <p>Đang tải...</p>;
  }

  return (
    <>
      <div className="single-product mt-150 mb-150">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <div className="single-product-img">
                <img src={product.image} alt={product.name} />
              </div>
            </div>
            <div className="col-md-7">
              <div className="single-product-content">
                {editing ? (
                  <div className="edit-product-form">
                    <input type="text" value={updatedProduct.name} onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})} />
                    <input type="text" value={updatedProduct.image} onChange={(e) => setUpdatedProduct({...updatedProduct, image: e.target.value})} />
                    <input type="number" value={updatedProduct.price} onChange={(e) => setUpdatedProduct({...updatedProduct, price: e.target.value})} />
                    <select value={updatedProduct.category} onChange={(e) => setUpdatedProduct({...updatedProduct, category: e.target.value})}>
                      <option value="chocolate">Sô Cô La</option>
                      <option value="cafe">Cà Phê</option>
                      <option value="milktea">Trà Sữa</option>
                    </select>
                    <textarea value={updatedProduct.description} onChange={(e) => setUpdatedProduct({...updatedProduct, description: e.target.value})} />
                    <button onClick={updateProduct} className="save-btn">Lưu</button>
                    <button onClick={() => setEditing(false)} className="cancel-btn">Hủy</button>
                  </div>
                ) : (
                  <>
                    <h3>{product.name}</h3>
                    <p className="single-product-pricing">
                      <span>{product.category || "Uncategorized"}</span>
                      <strong>{product.price.toLocaleString("vi-VN")} đ</strong>
                    </p>
                    <p>{product.description}</p>
                    <div className="single-product-form">
                      {/* <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} /> */}
                      {/* <Link to="#" className="cart-btn" onClick={() => addToCart(product)}>
                        <i className="fas fa-shopping-cart" /> Thêm Vào Giỏ Hàng
                      </Link> */}
                    </div>
                    <button onClick={() => setEditing(true)} className="edit-btn">Chỉnh Sửa Sản Phẩm</button>
                    <button onClick={deleteProduct} className="delete-btn">Xóa Sản Phẩm</button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
{/* 
      Sản phẩm liên quan */}
      {/* <div className="more-products mb-150">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="section-title">
                <h3><span className="orange-text">Sản phẩm khác có thể bạn thích</span></h3>
              </div>
            </div>
          </div>
          <div className="row">
            {relatedProducts.length > 0 ? (
              relatedProducts.map((item) => (
                <div key={item._id} className="col-lg-4 col-md-6 text-center">
                  <div className="single-product-item">
                    <div className="product-image">
                      <Link to={`/product/${item._id}`}>
                        <img src={item.image} alt={item.name} />
                      </Link>
                    </div>
                    <h3>{item.name}</h3>
                    <p className="product-price">{item.price.toLocaleString("vi-VN")} đ</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">Không có sản phẩm liên quan.</p>
            )}
          </div>
        </div>
      </div> */}
    </>
  );
};

export default ProductDetail;
