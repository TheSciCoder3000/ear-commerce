import Navbar from "@/components/Navbar";
import ProductItem from "@/components/ProductItem";
import Image from "next/image";

const dummyData = [
  {
    id: 0,
    name: "soundwave progaming headset",
    category: "Gaming",
    price: 149.99,
  },
  {
    id: 1,
    name: "soundwave progaming headset",
    category: "Gaming",
    price: 149.99,
  },
  {
    id: 2,
    name: "soundwave progaming headset",
    category: "Gaming",
    price: 149.99,
  },
  {
    id: 3,
    name: "soundwave progaming headset",
    category: "Gaming",
    price: 149.99,
  },
];

const dummyCategories = [
  {
    id: 0,
    name: "Gaming",
    description:
      "Designed for immersive gameplay with crystal-clear communication",
    link: "",
  },
  {
    id: 1,
    name: "Wireless",
    description: "DFreedom to move with premium sound quality",
    link: "",
  },
  {
    id: 2,
    name: "Professional",
    description: "Studio-quality sound for professionals and audiophiles",
    link: "",
  },
];

export default function Home() {
  return (
    <div className="mt-17">
      {/* Hero Section */}
      <div className="flex flex-col h-[100vh] md:flex-row md:h-[80vh]">
        <div className="px-6 py-10 h-fit bg-[#111827] text-white md:h-full">
          <h1 className="text-4xl font-bold mb-7 leading-[1.25] sm:text-center md:text-left">
            Experience sound{" "}
            <span className="text-[#3B82F6]">
              <br />
              like never before
            </span>
          </h1>
          <p className="font-extralight mb-15 sm:text-center sm:mx-auto sm:w-[30rem] md:text-left">
            Immerse yourself in crystal-clear audio with our premium headsets.
            Whether you&apos;re gaming, working, or just enjoying music, we have
            the perfect headset for you.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:mx-auto sm:w-fit md:mx-0">
            <button className="px-8 py-4 rounded-sm bg-[#2563EB]">
              Shop Now
            </button>
            <button className="px-8 py-4 rounded-sm bg-white text-[#2563EB]">
              View Featured
            </button>
          </div>
        </div>
        <div className="flex-1 relative">
          <Image
            className="absolute top-0 left-0 w-full h-full object-cover"
            src="/hero.png"
            width={0}
            height={0}
            sizes="100vw"
            alt="hero-img"
          />
        </div>
      </div>

      {/* Featured Products */}
      <div className="px-5 py-20">
        <h1 className="font-bold text-3xl text-center mb-5">
          Featured Products
        </h1>
        <p className="text-center text-gray-400">
          Our most popular headsets, loved by customers worldwide.
        </p>

        <div className="grid mt-15 gap-8 max-w-[20rem] mx-auto sm:grid-cols-2 sm:max-w-[40rem] lg:grid-cols-4 lg:max-w-[80rem] mb-20">
          {dummyData.map((prod) => (
            <ProductItem key={prod.id} prod={prod} isCategory={false} />
          ))}
        </div>
        <button className="block px-5 py-2 rounded-md bg-blue-600 text-white mx-auto">
          View All Products
        </button>
      </div>

      {/* Browse by Category */}
      <div className="px-5 py-20 bg-[#F9FAFB]">
        <h1 className="font-bold text-3xl text-center mb-5">
          Featured Products
        </h1>
        <p className="text-center text-gray-400">
          Our most popular headsets, loved by customers worldwide.
        </p>
        <div className="grid mt-15 gap-8 max-w-[20rem] mx-auto sm:grid-cols-3 sm:max-w-[60rem]">
          {dummyCategories.map((prod) => (
            <ProductItem key={prod.id} prod={prod} isCategory={true} />
          ))}
        </div>
      </div>
    </div>
  );
}
