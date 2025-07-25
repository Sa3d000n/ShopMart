import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import ProductCard from "../../components/ProductCard/ProductCard";
function ProductsPage() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [activeSort, setActiveSort] = useState("default");
  const [activeCategory, setActiveCategory] = useState({
    name: "الكل",
    nameEn: "All Categories",
    id: -1,
  });
  function handleSearch(e) {
    e.preventDefault();
    setFilteredItems(() => {
      if (activeCategory.nameEn == "All Categories") {
        return items.filter(
          (item) =>
            item.nameEn.toLowerCase().includes(e.target.value.toLowerCase()) ||
            item.description
              .toLowerCase()
              .includes(e.target.value.toLowerCase()) ||
            item.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
      } else {
        return items.filter(
          (item) =>
            item.category.name == activeCategory.name &&
            (item.nameEn.toLowerCase().includes(e.target.value.toLowerCase()) ||
              item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
              item.description
                .toLowerCase()
                .includes(e.target.value.toLowerCase()))
        );
      }
    });
  }
  function handleCategorySelection(e, category) {
    e.preventDefault();
    setFilteredItems(() => {
      if (category.nameEn == "All Categories") {
        return null;
      }
      return items.filter((item) => item.category.name == category.name);
    });
  }
  function sortItems(itemsToSort) {
    if (activeSort === "default") {
      return itemsToSort; // Return items in original order
    }

    const sorted = [...itemsToSort];
    switch (activeSort) {
      case "name":
        return sorted.sort((a, b) => a.nameEn.localeCompare(b.nameEn));
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price);
      case "rating":
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      default:
        return sorted;
    }
  }
  function filterByPrice(itemsToFilter) {
    if (!priceRange.min && !priceRange.max) {
      return itemsToFilter; // No filter applied
    }

    return itemsToFilter.filter((item) => {
      const price = item.price;
      const min = priceRange.min ? parseFloat(priceRange.min) : 0;
      const max = priceRange.max ? parseFloat(priceRange.max) : Infinity;

      return price >= min && price <= max;
    });
  }
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  async function getItems() {
    const res = await fetch(
      "https://task-ecommerce-api.vercel.app/api/products"
    );
    const data = await res.json();

    setItems(data.data.products);
  }
  async function getCategories() {
    const res = await fetch(
      "https://task-ecommerce-api.vercel.app/api/categories"
    );
    const data = await res.json();

    setCategories(data.data);
  }

  let displayItems = filteredItems
    ? sortItems(filteredItems)
    : sortItems(items);
  displayItems = filterByPrice(displayItems);
  useEffect(function () {
    getItems();
    getCategories();
  }, []);

  return (
    <div className="container py-16">
      <h2 className="text-primary-color text-4xl font-bold text-center mb-11">
        Products
      </h2>
      <div className="flex flex-col lg:flex-row items-center gap-3 justify-end">
        <form className="max-w-lg grow mb-9 ">
          <div className="flex relative">
            <label
              htmlFor="search-dropdown"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Your Email
            </label>

            <button
              type="button"
              onClick={toggleDropdown}
              className="cursor-pointer shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-white bg-primary-color transition-all duration-300 border border-blue-700 rounded-s-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              {activeCategory.nameEn}
              <svg
                className="w-2.5 h-2.5 ms-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute top-12 left-0 border border-blue-200">
                <ul
                  className="py-2 text-sm text-gray-700"
                  aria-labelledby="dropdown-button"
                >
                  {[
                    { name: "الكل", nameEn: "All Categories", id: -1 },
                    ...(categories || []),
                  ].map((item) => {
                    if (item !== activeCategory)
                      return (
                        <li key={item.id}>
                          <button
                            type="button"
                            onClick={(e) => {
                              toggleDropdown();
                              handleCategorySelection(e, item);
                              setActiveCategory(item);
                            }}
                            className="inline-flex w-full px-4 py-2 hover:bg-blue-100 text-stone-700 hover:text-blue-900"
                          >
                            {item.nameEn}
                          </button>
                        </li>
                      );
                  })}
                </ul>
              </div>
            )}

            <div className="relative w-full">
              <input
                type="search"
                id="search-dropdown"
                onChange={(e) => {
                  handleSearch(e);
                }}
                className="block p-2.5 w-full z-10 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-0 border border-blue-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search Desserts..."
                required
              />
              <button
                type="button"
                className="cursor-pointer absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-primary-color rounded-e-lg border border-blue-700 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                <IoSearch />
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>
        </form>
        <div className="lg:ml-44">
          <div className="flex justify-between items-center mb-6 max-w-lg  ">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">
                Sort by:
              </label>
              <select
                value={activeSort}
                onChange={(e) => setActiveSort(e.target.value)}
                className="px-3 py-2 border  rounded-lg text-sm border-blue-300 focus:ring-blue-500 focus:border-blue-700"
              >
                <option value="default">Default</option>
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          <details className="group relative z-50 mb-12">
            <summary className="flex items-center gap-2 border-b border-gray-300 pb-1 text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900 dark:border-gray-600 dark:text-gray-200 dark:hover:border-gray-700 dark:hover:text-white [&::-webkit-details-marker]:hidden">
              <span className="text-sm font-medium"> Price </span>

              <span className="transition-transform group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </summary>

            <div className="z-auto w-64 divide-y divide-gray-300 rounded border border-gray-300 bg-white shadow-sm group-open:absolute group-open:start-0 group-open:top-8 dark:divide-gray-600 dark:border-gray-600 dark:bg-gray-900">
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm text-gray-700 dark:text-gray-200">
                  {" "}
                </span>

                <button
                  type="button"
                  onClick={() => setPriceRange({ min: "", max: "" })}
                  className="text-sm text-gray-700 underline transition-colors hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
                >
                  Reset
                </button>
              </div>

              <div className="flex items-center gap-3 p-3">
                <label htmlFor="MinPrice">
                  <span className="text-sm text-gray-700 dark:text-gray-200">
                    {" "}
                    Min{" "}
                  </span>

                  <input
                    type="number"
                    id="MinPrice"
                    onChange={(e) =>
                      setPriceRange((prev) => ({
                        ...prev,
                        min: e.target.value,
                      }))
                    }
                    value={priceRange.min || 0}
                    className="mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                  />
                </label>

                <label htmlFor="MaxPrice">
                  <span className="text-sm text-gray-700 dark:text-gray-200">
                    {" "}
                    Max{" "}
                  </span>

                  <input
                    type="number"
                    id="MaxPrice"
                    onChange={(e) =>
                      setPriceRange((prev) => ({
                        ...prev,
                        max: e.target.value,
                      }))
                    }
                    value={priceRange.max || 600000}
                    className="mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                  />
                </label>
              </div>
            </div>
          </details>
        </div>
      </div>
      <div className=" grid grid-cols-1 lg:grid-cols-4 gap-x-6 gap-y-5 mb-9">
        {displayItems?.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
