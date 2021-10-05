import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import mainImage from "@/public/main.png"

function Navbar() {
  const router = useRouter()
  return (
    <nav className="h-[80px] shadow-nav-shadow flex justify-between items-end px-4 md:px-10 xl:px-[60px] ">
      <div className="" >
        <Link href="/">
          <Image className="cursor-pointer" width="100" height="60" src={mainImage} alt="Picture of the author" />
        </Link>
      </div>
      <div className="mb-4  text-dark-navy">
        <Link href="/">
          <button className={`mr-4 lg:mr-12 relative ${router.pathname === "/" ? "text-green-primary" : ""}   font-bold text-[22px]`} >
            Home
            {router.pathname === "/" && <div className=" bg-green-primary rounded-md h-2 absolute -bottom-4 -left-1 -right-1 z-10"></div>
            }
          </button>
        </Link>
        <Link href="/discover">
          <button className={`mr-4 lg:mr-12 relative ${router.pathname === "/discover" ? "text-green-primary" : ""}  font-bold text-[22px]`}>
            Discover
            {router.pathname === "/discover" && <div className=" bg-green-primary rounded-md h-2 absolute -bottom-4 -left-1 -right-1 z-10"></div>
            }
          </button>
        </Link>
        <Link href="/about">
          <button className={`relative ${router.pathname === "/about" ? "text-green-primary" : ""} font-bold text-[22px]`}>
            About
            {router.pathname === "/about" && <div className=" bg-green-primary rounded-md h-2 absolute -bottom-4 -left-1 -right-1 z-10"></div>
            }
          </button>
        </Link>

      </div>
    </nav>
  )
}


export default Navbar
