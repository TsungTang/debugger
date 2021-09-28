import Link from "next/link"

// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader // for custom css, clone style in @/style/carousel.css
import { Carousel } from 'react-responsive-carousel';

export default function Home() {
  return (
    <>
      <Carousel axis={"horizontal"} autoPlay={true} interval={3000} infiniteLoop={true} width="100%" dynamicHeight={false}>

        <div className="carousel-container flex w-full items-center justify-start" style={{ backgroundImage: "url('/home_background1.png')", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center center", }}>
          <div className="w-full xl:w-3/5 flex justify-center ">
            <div className="flex flex-col items-start">
              <h3 className="text-5xl font-bold text-white ">Welcome to</h3>
              <h1 className="text-[100px] font-bold text-white  mt-2 ">DeBugger</h1>

              <div className="mt-[50px]">
                <Link href="/discover">
                  <button className=" text-xl font-bold bg-white text-green-primary px-11 py-4 rounded-full">Discover More Insects</button>
                </Link>
              </div>
            </div>

          </div>
        </div>

        <div className="carousel-container flex w-full items-center justify-start" style={{ backgroundImage: "url('/home_background2.png')", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center center" }}>
          <div className="w-full xl:w-3/5 flex justify-center ">
            <div className="flex flex-col items-start ">
              <h3 className="text-[100px] font-bold text-white">Explore</h3>
              <h1 className="text-[100px] font-bold text-white">all the bugs...</h1>
              <div className="mt-[50px]">
                <Link href="/discover">
                  <button className=" text-xl font-bold bg-white text-green-primary px-11 py-4 rounded-full">Discover More Insects</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-container flex w-full items-center justify-start" style={{ backgroundImage: "url('/home_background2.png')", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center center" }}>
          <div className="w-full xl:w-3/5 flex justify-center ">
            <div className="flex flex-col items-start">
              <h3 className="text-[100px] font-bold text-white">Explore</h3>
              <h1 className="text-[100px] font-bold text-white">all the bugs...</h1>
              <div className="mt-[50px]">
                <Link href="/discover">
                  <button className=" text-xl font-bold bg-white text-green-primary px-11 py-4 rounded-full">Discover More Insects</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Carousel>
      <style jsx>{
        `
.carousel-container{
  height: calc(100vh - 80px);
}
.carousel > .thumbs-wrapper .axis-vertical {
  margin: 0 !important;
  height:400px;
}
      `}</style>
    </>
  )
}
