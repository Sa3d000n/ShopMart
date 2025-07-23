import { useEffect, useState } from "react";
import styles from "./BrowseCategorySection.module.css";
import CategoryItem from "../CategoryItem/CategoryItem";

function BrowseCategorySection() {
  const [categories, setCategories] = useState([]);
  async function getCategories() {
    const res = await fetch(
      "https://task-ecommerce-api.vercel.app/api/categories"
    );
    const data = await res.json();
    setCategories(data.data);
  }
  useEffect(function () {
    getCategories();
  }, []);
  return (
    <div className="py-16 container ">
      <h2 className="mb-12 text-2xl font-medium ">Browse By Category</h2>
      <div className="grid grid-cols-2 lg:grid-cols-8 gap-x-4 gap-y-10">
        {categories.map((item) => (
          <CategoryItem item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}

export default BrowseCategorySection;
