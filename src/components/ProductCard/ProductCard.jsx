import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToFavorite,
  isItemInFavorite,
  removeItemFromFavorite,
} from "../../store/favoriteSlice";
import StarsRating from "../../utils/StarsRating";
import {
  addItemToCart,
  decreaseItemQuantity,
  getItemQuantity,
  increaseItemQuantity,
  saveCartToLocalStorage,
} from "../../store/cartSlice";
import { useNavigate } from "react-router";
function ProductCard({ item }) {
  const {
    id,
    image,
    nameEn: name,
    price,
    originalPrice,
    inStock,
    rating,
    reviewCount,
    description,
  } = item;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isInFavorite = useSelector(isItemInFavorite(id));
  const itemQuantity = useSelector(getItemQuantity(id));

  const discount = ((1 - price / originalPrice) * 100).toFixed(0);

  return (
    <div className="group relative block overflow-hidden hover:shadow-2xl transition-all duration-300">
      {inStock &&
        (isInFavorite ? (
          <button
            onClick={() => {
              dispatch(removeItemFromFavorite(id));
            }}
            className="absolute cursor-pointer end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75"
          >
            <span className="sr-only">Wishlist</span>

            <MdFavorite className="text-red-500" />
          </button>
        ) : (
          <button
            onClick={() => dispatch(addItemToFavorite(item))}
            className="absolute cursor-pointer end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75"
          >
            <span className="sr-only">Wishlist</span>

            <MdFavoriteBorder />
          </button>
        ))}

      <img
        src={image}
        alt=""
        className={`${
          !inStock && "grayscale"
        } h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72`}
      />

      <div className="relative border border-gray-100 bg-white p-6">
        {inStock && (
          <p className="text-gray-700 ">
            ${price}
            <span className="text-gray-400 line-through mx-3">
              ${originalPrice}
            </span>
            <span className="text-green-500">{discount}%</span>
          </p>
        )}
        <h3 className="mt-1.5 text-lg font-medium text-gray-900">{name}</h3>
        <p className="mt-1.5 line-clamp-3 text-gray-700">{description}</p>
        <StarsRating
          size={24}
          maxRating={5}
          numberOfVotes={reviewCount}
          defaultRating={rating}
          className="my-3.5"
        />

        <div className="mt-4 flex gap-4">
          {inStock ? (
            <>
              {itemQuantity > 0 ? (
                <div className="flex gap-3 items-center">
                  <button
                    onClick={() => dispatch(increaseItemQuantity(id))}
                    className="px-2.5 py-1 sm:px-3.5 sm:py-2 text-sm flex justify-center items-center  font-bold bg-gray-100  shadow-2xl rounded-full cursor-pointer"
                  >
                    +
                  </button>
                  {itemQuantity}
                  <button
                    onClick={() => dispatch(decreaseItemQuantity(id))}
                    className="px-2.5 py-1 sm:px-3.5 sm:py-2 text-sm flex justify-center items-center  font-bold bg-gray-100  shadow-2xl rounded-full cursor-pointer"
                  >
                    -
                  </button>
                </div>
              ) : (
                <button
                  onClick={() =>
                    dispatch(
                      addItemToCart({ ...item, quantity: 1, totalPrice: price })
                    )
                  }
                  className="block w-full rounded-sm bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105"
                >
                  Add to Cart
                </button>
              )}

              <button
                type="button"
                onClick={() => navigate(`/product/${id}`)}
                className="block w-full rounded-sm bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:scale-105"
              >
                See Details
              </button>
            </>
          ) : (
            <p className="text-red-600">
              Sorry this Product isn't available right now{" "}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
