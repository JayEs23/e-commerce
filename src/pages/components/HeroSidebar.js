// components/HeroSidebar.js

import { useEffect, useState } from "react";
import api from "@/utils/api";

const HeroSidebar = ({ categories }) => {
  // const [categories,setCategories] = useState([]);
  return (
    <div className=" row hero-sidebar h-500 bg-white">
      <ul className="list-group pt-4 px-4">
        {categories?.map((category, index) => (
          <li className="list-group-item p-2 py-3 px-2 border-0" key={index}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HeroSidebar;
