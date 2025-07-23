import styles from "./InfoSection.module.css";
import airpods from "../../assets/InfoSection/Apple  AirPods Max.jpg";
import appleVision from "../../assets/InfoSection/AppleVision.png";
import toy from "../../assets/InfoSection/toy.png";
import dress from "../../assets/InfoSection/dress.png";
import { useNavigate } from "react-router";
import { LuShoppingCart } from "react-icons/lu";
function InfoSection() {
  const navigate = useNavigate();
  return (
    <div className="py-16 grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-4">
      <div className="col-span-1 row-span-1 lg:col-span-2 lg:row-span-2 py-10 flex flex-col items-center container gap-10 text-center">
        <img src={airpods} alt="Iphone 13" className="max-w-48" />

        <div>
          <h2 className="text-3xl lg:text-5xl font-light mb-2 lg:mb-4">
            Apple AirPods <span className="font-medium">Max</span>{" "}
          </h2>
          <p className="text-neutral-400">
            Computational audio. Listen, it's powerful
          </p>
        </div>
      </div>
      <div className="bg-gray-200 lg:row-span-2 lg:col-start-1 lg:row-start-3  py-10 flex flex-col items-center container gap-10 text-center">
        <img src={toy} alt="Kids Ride-On Toy" className="max-w-48" />
        <div>
          <h2 className="text-3xl lg:text-5xl font-light mb-2 ">
            Adventure <span className="font-medium">Rider</span>{" "}
          </h2>
          <p className="text-neutral-400">
            An exciting way to explore and have fun
          </p>
        </div>
      </div>
      <div className="lg:row-span-2 lg:col-start-2 lg:row-start-3 bg-neutral-700 py-10 flex flex-col items-center container gap-10 text-center">
        <img src={appleVision} alt="Iphone 13" className="max-w-48 mb-7" />

        <div>
          <h2 className="text-3xl lg:text-5xl font-light mb-2 text-white">
            Apple Vision <span className="font-medium">Pro</span>{" "}
          </h2>
          <p className="text-neutral-400">
            An immersive way to experience entertainment
          </p>
        </div>
      </div>

      <div className="lg:justify-around lg:col-span-2 lg:row-span-4 lg:col-start-3 lg:row-start-1 bg-gray-200 py-10 flex flex-col items-center container gap-10 text-center">
        <img src={dress} alt="Elegant Summer Dress" className="max-w-48" />
        <div>
          <h2 className="text-3xl lg:text-5xl font-light mb-2 lg:mb-4 ">
            Elegant <span className="font-medium">Grace</span>{" "}
          </h2>
          <p className="text-neutral-400">
            A timeless way to express your style, where elegance meets enduring
            grace, creating moments that transcend the fleeting trends of time.
          </p>
        </div>
        <button
          onClick={() => navigate("/products")}
          className="cursor-pointer group relative inline-flex items-center  overflow-hidden rounded-full bg-transparent border border-black px-6 md:px-8 py-3 md:py-4  focus:ring-3 focus:outline-hidden transition-colors duration-300 hover:bg-sky-600 w-full sm:w-auto"
        >
          <span className="absolute -end-full transition-all group-hover:end-3 md:group-hover:end-4">
            <LuShoppingCart className="text-2xl md:text-3xl font-bold" />
          </span>
          <span className="text-2xl md:text-3xl font-bold transition-all group-hover:me-3 md:group-hover:me-4">
            Shop Now
          </span>
        </button>
      </div>
    </div>
  );
}

export default InfoSection;
