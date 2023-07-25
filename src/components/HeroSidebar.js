// components/HeroSidebar.js

const categories = [
    'All Products',
    'Electronics',
    'Clothing',
    'Home & Garden',
    'Beauty & Health',
    'Toys & Games',
    'Sports & Outdoors',
  ];
  
  const HeroSidebar = () => {
    return (
      <div className="hero-sidebar border-0 h-400">
        <ul className="list-group">
          {categories.map((category, index) => (
            <li className="list-group-item ml-4 pl-4 border-0" key={index}>
              {category}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default HeroSidebar;
  