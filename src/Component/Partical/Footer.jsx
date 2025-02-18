const Footer = () => {
    return (
      <>
        {/* Khu vực Footer */}
        <div className="footer-area">
          <div className="container">
            <div className="row">
              {/* Giới thiệu */}
              <div className="col-lg-3 col-md-6 footer-box about-widget">
                <h2 className="widget-title">Về Chúng Tôi</h2>
                <p>
                  Chúng tôi mang đến sản phẩm chất lượng, dịch vụ tận tâm và trải nghiệm tuyệt vời cho khách hàng.
                </p>
              </div>
              
              {/* Thông tin liên hệ */}
              <div className="col-lg-3 col-md-6 footer-box get-in-touch">
                <h2 className="widget-title">Thông Tin Liên Hệ</h2>
                <ul>
                  <li>📍 Bình Tân, Hồ Chí Minh</li>
                  <li>📞 Hỗ trợ: 0355 422 493</li>
                  <li>📧 Email: nguyentannguyen146@gmail.com</li>
                </ul>
              </div>
              
              {/* Trang chính */}
              <div className="col-lg-3 col-md-6 footer-box pages">
                <h2 className="widget-title">Trang Chính</h2>
                <ul>
                  <li><a href="/">🏠 Trang Chủ</a></li>
                  <li><a href="sanpham">🛒 Cửa Hàng</a></li>
                 
                </ul>
              </div>
              
              {/* Đăng ký nhận tin */}
              <div className="col-lg-3 col-md-6 footer-box subscribe">
                <h2 className="widget-title">Đăng Ký Nhận Tin</h2>
                <p>Nhận thông tin mới nhất về khuyến mãi và sản phẩm.</p>
                <form action="index.html">
                  <input type="email" placeholder="Nhập email của bạn" />
                  <button type="submit">
                    <i className="fas fa-paper-plane" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bản quyền & Mạng xã hội */}
        <div className="copyright">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-12">
                <p>
                  © 2025 Cửa Hàng của Nguyễn Tấn Nguyên.
                </p>
              </div>
              <div className="col-lg-6 text-right col-md-12">
                <div className="social-icons">
                  <ul>
                    <li><a href="https://web.facebook.com/Nguyenndeptraiii" target="_blank"><i className="fab fa-facebook-f" /></a></li>
                    <li><a href="https://github.com/itTanNguyen" target="_blank"><i className="fab fa-twitter" /></a></li>
                    <li><a href="https://www.instagram.com/tannguyeen_/" target="_blank"><i className="fab fa-instagram" /></a></li>
                    <li><a href="https://huynhngocam2107@gmail.com" target="_blank"><i className="fab fa-linkedin" /></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default Footer;
  