import { useRouter } from 'next/router'
import Link from 'next/link'

function Navbar() {
  const router = useRouter()


  return (
    <nav className="h-[80px] shadow-nav-shadow flex justify-between items-end  px-[3rem] ">
      <div className=" h-full flex justify-center" >
        <img src={"https://i.imgur.com/WytIDxZ.png"} alt="De-bugger" width="100" className="block mt-auto mb-auto" />
      </div>
      <div className="mb-4">
        <Link href="/">
          <button className={`font-bold mr-6 relative ${router.pathname === "/" ? "text-green-primary" : ""}`} >
            Home
            {router.pathname === "/" && <div className=" bg-green-primary rounded-md h-2 absolute w-full z-10"></div>
            }
          </button>
        </Link>
        <Link href="/discover">
          <button className={`font-bold mr-6 relative ${router.pathname === "/discover" ? "text-green-primary" : ""}`}>
            Discover
            {router.pathname === "/discover" && <div className=" bg-green-primary rounded-md h-2 absolute w-full z-10"></div>
            }
          </button>
        </Link>
        <button className={`font-bold  relative ${router.pathname === "/about-team" ? "text-green-primary" : ""}`}>
          About Team
          {router.pathname === "/about-team" && <div className=" bg-green-primary rounded-md h-2 absolute w-full z-10"></div>
          }
        </button>
      </div>
    </nav>
  )
}


export default Navbar
