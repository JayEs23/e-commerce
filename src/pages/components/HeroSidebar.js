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
      <div className="hero-sidebar border-0 mb-4">
        <ul className="list-group">
          {categories.map((category, index) => (
            <li className="list-group-item mx-2 p-2 py-3 px-2 border-0" key={index}>
              {category}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default HeroSidebar;
  