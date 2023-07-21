import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <>
    <div class="container-fluid header">
      <div class="row align-items-center py-3 px-xl-5">
        <div class="col-lg-3 d-none d-lg-block">
          <a href="" class="text-decoration-none">
              <span className="navbar-brand"><Image src="/inshopperlogo-light.png" width="200" height="60" /></span>
          </a>
        </div>
        <div class="col-lg-6 col-6 text-left">
          <form action="">
            <div class="input-group">
              <div class="input-group-append">
                <span class="input-group-text bg-transparent text-dark">
                  <i class="fa fa-search"></i>
                </span>
              </div>
              <input type="text" class="form-control form-control-lg rounded" placeholder="Search for a product" />
              
            </div>
          </form>
        </div>
        <div class="col-lg-3 col-6 text-right">
          <a href="" class="p-2 border-rounded">
            <i class="fas fa-bell text-warning border-dark"></i>
            <span class="badge text-white notif">0</span>
          </a>
          <a href="" class="btn border">
            <i class="fas fa-shopping-cart text-primary"></i>
            <span class="badge">0</span>
          </a>
          <a href="" class="btn border">
            My Account
          </a>
          <a href="" class="btn border">
            More
          </a>
        </div>
        
      </div>
    </div>
    </>
  );
};

export default Navbar;
