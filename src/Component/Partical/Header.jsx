import { Link } from "react-router-dom";

let Header = () => {

  return (
    <>
      {/*PreLoader*/}

      {/*PreLoader Ends*/}
      {/* header */}
      <div className="top-header-area" id="sticker">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-sm-12 text-center">
              <div className="main-menu-wrap">
                {/* logo */}
                <div className="site-logo">
                  <a href="index.html">
                    <img src="shop.html" alt="" />
                  </a>
                </div>
                {/* logo */}
                {/* menu start */}

                <nav className="main-menu">
               
                  <ul>
                    
                    {/* <li className="current-list-item">
                  <a href="index.html">Trang Chủ</a>
                 
                </li> */}




                    {/* <li>
                  <a href="shop.html">Sản Phẩm</a>
                   <ul className="sub-menu">
                    <li>
                      <a href="shop.html">Shop</a>
                    </li>
                    
                    <li>
                      <a href="single-product.html">Single Product</a>
                    </li>
                    
                  </ul>
                  
                </li> */}
                
                    <li>
                      

                      <div className="header-icons">
                        {/* <Link to="/cart" className="shopping-cart">
                          <i className="fas fa-shopping-cart"></i>
                        </Link>
                        <a className="mobile-hide search-bar-icon" href="#">
                          <i className="fas fa-search" />
                        </a> */}
                      </div>
                    </li>
                  </ul>
                </nav>
                <a className="mobile-show search-bar-icon" href="#">
                  <i className="fas fa-search" />
                </a>
                <div className="mobile-menu" />
                {/* menu end */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end header */}
      {/* search area */}
      <div className="search-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <span className="close-btn">
                <i className="fas fa-window-close" />
              </span>
              <div className="search-bar">
                <div className="search-bar-tablecell">
                  <h3>Search For:</h3>
                  <input type="text" placeholder="Keywords" />
                  <button type="submit">
                    Search <i className="fas fa-search" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end search area */}

      {/* hero area */}
      <div className="hero-area hero-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 offset-lg-2 text-center">
              <div className="hero-text">

                <div className="hero-text-tablecell">
                    <h1>
                        Trang Quản Lý 
                    </h1>
                  <p className="subtitle">CHOCO BREW</p>
                  <h2></h2>
                  <div className="hero-btns">
                    <Link to="/" className="boxed-btn">Trang chủ</Link>



                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end hero area */}
    </>

  )
}
export default Header;
