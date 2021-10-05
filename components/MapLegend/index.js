import InsectContext from "@/context/InsectContext"
import { capitalizeFirstLetter } from "@/utils"
import { useContext } from "react"

export default function MapLegend({ expand }) {
  const { selectInsect } = useContext(InsectContext)
  if (!selectInsect || !selectInsect[0]) return null
  return (
    <>
      <div className="absolute right-[5%] bg-legend-bg rounded-[10px] p-5" style={{ zIndex: 999, bottom: expand ? "260px" : "120px" }}>
        <div className="flex flex-col items-start">
          <h2 className="flex items-center mb-3 text-xs text-white"><div className="h-5 w-5 bg-green-primary rounded-full mr-[10px]"></div>Distribution of {capitalizeFirstLetter(selectInsect[0])}</h2>

          <h2 className="flex items-center mb-3 text-xs text-white"><svg width="22" height="21" viewBox="0 0 22 21" fill="none" className="mr-[10px]" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 21V7.66652C1 7.66652 6.63383 0.999943 11 1C15.3662 1.00006 21 7.66696 21 7.66696V21H1Z" fill="url(#paint0_linear)" />
            <path d="M1 7.66652C1 7.66652 6.63383 0.999943 11 1C15.3662 1.00006 21 7.66696 21 7.66696" stroke="#4AEAD3" stroke-width="2" stroke-linecap="round" />
            <defs>
              <linearGradient id="paint0_linear" x1="11" y1="-3.33338" x2="11" y2="21.0002" gradientUnits="userSpaceOnUse">
                <stop stop-color="#4AEAD3" />
                <stop offset="1" stop-color="#4AEAD3" stop-opacity="0" />
              </linearGradient>
            </defs>
          </svg>
            Amount of {capitalizeFirstLetter(selectInsect[0])}</h2>

          <h2 className="flex items-center text-xs text-white"><div className="h-2 w-5 bg-highlight-purple rounded-md mr-[10px]"></div>Whole trail of {capitalizeFirstLetter(selectInsect[0])}</h2>
        </div>

      </div>
    </>
  )
}
