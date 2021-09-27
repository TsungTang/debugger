import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import mainImage from "@/public/main.png"

function Navbar() {
  const router = useRouter()
  return (
    <nav className="h-[80px] shadow-nav-shadow flex justify-between items-end px-4 md:px-10 xl:px-[60px] ">
      <div className="" >
        <Image width="100" height="60" src={mainImage} alt="Picture of the author" />
      </div>
      <div className="mb-4 font-bold text-xl">
        <Link href="/">
          <button className={`mr-4 lg:mr-12 relative ${router.pathname === "/" ? "text-green-primary" : ""}`} >
            Home
            {router.pathname === "/" && <div className=" bg-green-primary rounded-md h-2 absolute w-full z-10"></div>
            }
          </button>
        </Link>
        <Link href="/discover">
          <button className={`mr-4 lg:mr-12 relative ${router.pathname === "/discover" ? "text-green-primary" : ""}`}>
            Discover
            {router.pathname === "/discover" && <div className=" bg-green-primary rounded-md h-2 absolute w-full z-10"></div>
            }
          </button>
        </Link>
        <button className={`relative ${router.pathname === "/about-team" ? "text-green-primary" : ""}`}>
          About Team
          {router.pathname === "/about-team" && <div className=" bg-green-primary rounded-md h-2 absolute w-full z-10"></div>
          }
        </button>
      </div>
    </nav>
  )
}


export default Navbar
