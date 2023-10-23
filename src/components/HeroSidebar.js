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
      <div className=" row hero-sidebar h-500">
        <ul className="list-group pt-4 px-4">
          {categories.map((category, index) => (
            <li className="list-group-item p-2 py-3 px-2 border-0" key={index}>
              {category}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default HeroSidebar;
  
