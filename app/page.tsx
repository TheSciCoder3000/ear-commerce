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

export default function Home() {
  return (
    <div>
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
            <div key={prod.id} className="rounded-md drop-shadow-md">
              <div className="relative bg-gray-400 h-[18rem] overflow-hidden rounded-t-lg"></div>
              <div className="p-4 bg-white rounded-b-lg">
                <h2>{prod.name}</h2>
                <p className="text-sm text-gray-500">{prod.category}</p>
                <div className="flex justify-between items-end">
                  <h2 className="font-bold">${prod.price}</h2>
                  <button className="flex items-center justify-center p-1 rounded-full bg-blue-600 w-9 h-9">
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_1_83)">
                        <path
                          d="M6.86666 18.9333C7.3269 18.9333 7.69999 18.5602 7.69999 18.0999C7.69999 17.6397 7.3269 17.2666 6.86666 17.2666C6.40642 17.2666 6.03333 17.6397 6.03333 18.0999C6.03333 18.5602 6.40642 18.9333 6.86666 18.9333Z"
                          stroke="white"
                          strokeWidth="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M16.0333 18.9333C16.4936 18.9333 16.8667 18.5602 16.8667 18.0999C16.8667 17.6397 16.4936 17.2666 16.0333 17.2666C15.5731 17.2666 15.2 17.6397 15.2 18.0999C15.2 18.5602 15.5731 18.9333 16.0333 18.9333Z"
                          stroke="white"
                          strokeWidth="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M1.90833 2.30835H3.57499L5.79166 12.6583C5.87297 13.0374 6.08388 13.3762 6.38808 13.6166C6.69229 13.8569 7.07075 13.9836 7.45832 13.975H15.6083C15.9876 13.9744 16.3554 13.8444 16.6508 13.6065C16.9463 13.3687 17.1518 13.0371 17.2333 12.6667L18.6083 6.47502H4.46666"
                          stroke="white"
                          strokeWidth="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1_83">
                          <rect
                            width="20"
                            height="20"
                            fill="white"
                            transform="translate(0.199997 0.599976)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="block px-5 py-2 rounded-md bg-blue-600 text-white mx-auto">
          View All Products
        </button>
      </div>
    </div>
  );
}
