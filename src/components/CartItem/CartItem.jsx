import { useDispatch, useSelector } from "react-redux";
import {
  decreaseItemQuantity,
  getItemQuantity,
  increaseItemQuantity,
  removeItemFromCart,
} from "../../store/cartSlice";

function CartItem({ product }) {
  const dispatch = useDispatch();
  const itemQuantity = useSelector(getItemQuantity(product.id));

  return (
    <>
      {/* Table row for medium+ screens */}
      <tr className="hidden sm:table-row bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img
            src={product.image}
            className="w-16 md:w-32 max-w-full max-h-full"
            alt={product.nameEn}
          />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {product.nameEn}
          <div className="text-stone-400 text-xs">
            $ {product.price.toFixed(0)}
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => dispatch(decreaseItemQuantity(product.id))}
              className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 18 2">
                <path
                  d="M1 1h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="ms-3">{itemQuantity}</div>
            <button
              type="button"
              onClick={() => dispatch(increaseItemQuantity(product.id))}
              className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 18 18">
                <path
                  d="M9 1v16M1 9h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          ${product.totalPrice.toFixed(0)}
        </td>
        <td className="px-6 py-4">
          <button
            type="button"
            onClick={() => dispatch(removeItemFromCart(product.id))}
            className="text-red-600 dark:text-red-500 font-medium hover:underline"
          >
            Remove
          </button>
        </td>
      </tr>

      {/* Stacked layout for small screens */}
      <div className="sm:hidden p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <img
            src={product.image}
            alt={product.nameEn}
            className="w-20 h-20 object-contain"
          />
          <div className="flex-1">
            <div className="text-gray-900 dark:text-white font-semibold mb-1">
              {product.nameEn}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              ${product.totalPrice.toFixed(0)}dsa
            </div>
            <div className="flex items-center mt-2">
              <button
                onClick={() => dispatch(decreaseItemQuantity(product.id))}
                className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 18 2">
                  <path
                    d="M1 1h16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className="mx-2">{itemQuantity}</div>
              <button
                onClick={() => dispatch(increaseItemQuantity(product.id))}
                className="inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 18 18">
                  <path
                    d="M9 1v16M1 9h16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <button
              onClick={() => dispatch(removeItemFromCart(product.id))}
              className="mt-2 text-sm text-red-600 dark:text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartItem;
