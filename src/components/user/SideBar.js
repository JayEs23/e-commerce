import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = ({userProfile}) => {
  const router = useRouter();
  
  const navLinks = [
    { href: '/account/dashboard', label: 'My Account', icon: 'ni ni-user' },
    { href: '/account/orders', label: 'Orders', icon: 'ni ni-cart' },
    { href: '/account/inbox', label: 'Inbox', icon: 'ni ni-chat-circle' },
    { href: '/account/saved-items', label: 'Saved Items', icon: 'ni ni-heart' },
    { href: '/account/recently-viewed', label: 'Recently Viewed', icon: 'ni ni-box-view' },
    { href: '/account/recently-searched', label: 'Recently Searched', icon: 'ni ni-card-view' },
    { href: '/account/ratings-reviews', label: 'Ratings and Reviews', icon: 'ni ni-star-full' },
  ];

  return (
      <><h5 className="m-4">Hi {userProfile?.first_name || ''}!</h5>
      <p className="mx-4">Welcome to your Inshopper account.</p>
      <hr />
      <div className="sidebar-head d-flex flex-wrap align-items-center justify-content-between">
        <h3 className="sidebar-head-title">Navigation</h3>
        <div className="sidebar-head-action d-flex align-items-center">
          <div className="sidebar-drop">
            <a className="icon-btn menu-toggler-user-open" href="#">
              <em className="ni ni-menu"></em>
            </a>
          </div>
        </div>
      </div>
      <div className="sidebar sidebar-user-mobile">
        <a href="#" className="icon-btn menu-toggler-user-close">
          <em className="ni ni-cross"></em>
        </a>
        <div className="sidebar-widget">
          <ul className="user-nav">
            {navLinks.map((link) => (
              <><li  key={link.href} className={router.pathname === link.href ? 'active' : ''}>
                  <a href={link.href}>
                    <em className={`ni ${link.icon} me-2`}></em>
                    {link.label}
                  </a>
              </li></>
            ))}
          </ul>
        </div>
      </div></>
  );
};

export default Sidebar;
