import CategoryItem from "@/components/CategoryItem";
import ProductItem from "@/components/ProductItem";
import { FetchCategories } from "@/lib/category/fetch";
import { FetchProducts, ParseProductTable } from "@/lib/products/fetch";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const products = (await FetchProducts()
    .then(([data, error]) => {
      if (error || !data) throw Error();
      return data;
    })
    .then(ParseProductTable)) as IProduct[];
  const [categories, categoriesError] = await FetchCategories();
  if (categoriesError || !categories) throw Error();
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
            <Link
              href={"/products"}
              className="px-8 cursor-pointer hover:bg-[#2563EB]/80 py-4 rounded-sm bg-[#2563EB]"
            >
              Shop Now
            </Link>
            <a
              href={"#featured-section"}
              className="px-8 py-4 rounded-sm bg-white text-[#2563EB]"
            >
              View Featured
            </a>
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
      <div id="featured-section" className="px-5 py-20">
        <h1 className="font-bold text-3xl text-center mb-5">
          Featured Products
        </h1>
        <p className="text-center text-gray-400">
          Our most popular headsets, loved by customers worldwide.
        </p>

        <div className="grid mt-15 gap-8 max-w-[20rem] mx-auto sm:grid-cols-2 sm:max-w-[40rem] lg:grid-cols-4 lg:max-w-[80rem] mb-20">
          {products.map((prod) => (
            <ProductItem key={prod.id} prod={prod} isCategory={false} />
          ))}
        </div>
        <Link
          href={"/products"}
          className="block px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-600/80 cursor-pointer w-fit text-white mx-auto"
        >
          View All Products
        </Link>
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
          {categories
            .filter((item, indx) => indx < 3)
            .map((prod) => (
              <CategoryItem key={prod.id} cat={prod} />
            ))}
        </div>
      </div>
    </div>
  );
}
