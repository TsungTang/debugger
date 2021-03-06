import Link from "next/link"

import { Carousel } from "react-responsive-carousel"

export default function Home() {
  return (
    <>
      <style jsx>
        {`
          .text-shadow {
            text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
          }
        `}
      </style>
      <Carousel
        axis={"horizontal"}
        autoPlay={true}
        interval={3000}
        infiniteLoop={true}
        width="100%"
        dynamicHeight={false}
      >
        <div
          className="carousel-container flex w-full items-center justify-start"
          style={{
            backgroundImage: "url('/homeBackground/home_background1.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        >
          <div className="w-full xl:w-1/2 flex justify-center ">
            <div className=" w-[500px] flex flex-col items-start ">
              <h3 className="text-[50px] text-left font-bold text-shadow text-white">
                Welcome to <p className="text-[80px] text-white">de Bugger</p>
              </h3>
              <div className="mt-[50px]">
                <Link href="/discover">
                  <button className=" text-xl font-bold bg-white text-green-primary px-11 py-4 rounded-full">
                    Discover More Insects
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div
          className="carousel-container flex w-full items-center justify-start"
          style={{
            backgroundImage: "url('/homeBackground/home_background2.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        >
          <div className="w-full xl:w-1/2 flex justify-center ">
            <div className=" w-[500px] flex flex-col items-start ">
              <h3 className="text-[50px] text-left text-shadow  font-bold text-white">
                A place to see over 6,000 different insects??? future trends
              </h3>

              <div className="mt-[50px]">
                <Link href="/discover">
                  <button className=" text-xl font-bold bg-white text-green-primary px-11 py-4 rounded-full">
                    Discover More Insects
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div
          className="carousel-container flex w-full items-center justify-end"
          style={{
            backgroundImage: "url('/homeBackground/home_background3.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        >
          <div className="w-full xl:w-1/2 flex justify-center ">
            <div className=" w-[500px] flex flex-col items-end">
              <h3 className="text-[50px] font-bold text-shadow  text-right text-white">
                You can see visualized biodistribution, trail, and biodiversity
              </h3>
              <div className="mt-[50px]">
                <Link href="/discover">
                  <button className=" text-xl font-bold bg-white text-green-primary px-11 py-4 rounded-full">
                    Discover More Insects
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div
          className="carousel-container flex w-full items-center justify-start"
          style={{
            backgroundImage: "url('/homeBackground/home_background4.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        >
          <div className="w-full xl:w-1/2 flex justify-center ">
            <div className=" w-[500px] flex flex-col items-start">
              <h3 className="text-[50px] font-bold text-left text-shadow   text-white">
                We also provide{" "}
                <Link href="/about">
                  <a className=" text-green-primary underline">Bio-vectors</a>
                </Link>{" "}
                , which encodes the habitant distribution of species???
              </h3>
              <div className="mt-[50px]">
                <Link href="/discover">
                  <button className=" text-xl font-bold bg-white text-green-primary px-11 py-4 rounded-full">
                    Discover More Insects
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div
          className="carousel-container flex w-full items-center justify-end"
          style={{
            backgroundImage: "url('/homeBackground/home_background5.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        >
          <div className="w-full xl:w-1/2 flex justify-center ">
            <div className=" w-[500px] flex flex-col items-end">
              <h3 className="text-[50px] font-bold text-right text-shadow  text-white">
                ??? so you can leverage it for other applications
              </h3>
              <div className="mt-[50px]">
                <Link href="/discover">
                  <button className=" text-xl font-bold bg-white text-green-primary px-11 py-4 rounded-full">
                    Discover More Insects
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div
          className="carousel-container flex w-full items-center justify-end"
          style={{
            backgroundImage: "url('/homeBackground/home_background6.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        >
          <div className="w-full xl:w-1/2 flex justify-center ">
            <div className=" w-[500px] flex flex-col items-end">
              <h3 className="text-[50px] font-bold text-right text-shadow text-white">
                What???s more, based on the proposed CNN + Bio-vector framework ???
              </h3>
              <div className="mt-[50px]">
                <Link href="/discover">
                  <button className=" text-xl font-bold bg-white text-green-primary px-11 py-4 rounded-full">
                    Discover More Insects
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div
          className="carousel-container flex w-full items-center justify-start"
          style={{
            backgroundImage: "url('/homeBackground/home_background7.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        >
          <div className="w-full xl:w-1/2 flex justify-center ">
            <div className=" w-[500px] flex flex-col items-start">
              <h3 className="text-[50px] font-bold text-left text-shadow text-white">
                ??? we predict insect???s distribution from now to the future(until
                2022 Q3)!
              </h3>
              <div className="mt-[50px]">
                <Link href="/discover">
                  <button className=" text-xl font-bold bg-white text-green-primary px-11 py-4 rounded-full">
                    Discover More Insects
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div
          className="carousel-container flex w-full items-center justify-start"
          style={{
            backgroundImage: "url('/homeBackground/home_background8.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        >
          <div className="w-full xl:w-1/2 flex justify-center ">
            <div className=" w-[500px] flex flex-col items-start">
              <h3 className="text-[50px] font-bold text-left text-shadow text-white">
                So come discover Taiwan???s insects
              </h3>
              <div className="mt-[50px]">
                <Link href="/discover">
                  <button className=" text-xl font-bold bg-white text-green-primary px-11 py-4 rounded-full">
                    Discover More Insects
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Carousel>
      <style jsx>{`
        .carousel-container {
          height: calc(100vh - 80px);
        }
        .carousel > .thumbs-wrapper .axis-vertical {
          margin: 0 !important;
          height: 400px;
        }
      `}</style>
    </>
  )
}
