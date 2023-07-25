import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <>
    <div className="container-fluid header">
      <div className="row align-items-center py-3 px-xl-5">
        <div className="col-lg-3 d-none d-lg-block">
          <a href="" className="text-decoration-none">
              <span className="navbar-brand"><Image src="/inshopperlogo-light.png" width="200" height="60" alt="Inshopper Logo" /></span>
          </a>
        </div>
        <div className="col-lg-6 col-6 text-left">
          <form action="">
            <div className="input-group ml-4">
              <div className="input-group-append">
                <span className="input-group-text bg-transparent text-dark">
                  <i className="fa fa-search fa-lg ml-2"></i> <input type="text" className="form-control form-control-lg search rounded border-0" placeholder="Search for a product" />
                </span>
              </div>
             
              
            </div>
          </form>
        </div>
        <div className="col-lg-3 col-6 text-right">
          <a href="#" className="notification mr-2">
            <i className="fa fa-bell-o font-sm text-notif" ></i>
            <span className="badge">3</span>
          </a>
          <a href="" className="notification ml-2 mr-0">
            <i className="fa fa-shopping-cart font-sm text-notif"></i>
            <span className="badge">0</span>
          </a>
          <a href="" className="btn btn-md border-rounded ml-4 p-2">
            My Account   
          </a>
          <a href="" className="btn border ml-2">
            More
          </a>
        </div>
        
      </div>
    </div>
    </>
  );
};

export default Navbar;
