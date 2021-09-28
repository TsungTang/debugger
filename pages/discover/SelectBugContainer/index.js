import Image from "next/image"

import BugCard from "./BugCard"
import butterfly from "@/public/insects/butterfly.png"
import moth from "@/public/insects/moth.jpg"
import spider from "@/public/insects/spider.jpg"
import odonata from "@/public/insects/odonata.jpg"
import coleoptera from "@/public/insects/coleoptera.jpg"
import other from "@/public/insects/other.jpg"

import InsectContext from "@/context/InsectContext"
import { useContext } from "react"

function SelectBugContainer({ toMap }) {
  const { selectInsect, handleSetSelectInsect } = useContext(InsectContext)
  const localHandleSetSelectInsect = (insect) => {
    handleSetSelectInsect(insect)
    toMap()
  }
  return (
    <>
      <style jsx>{
        `
      .container{ 
      display: grid;
      grid-gap: 60px;
      grid-template-columns: repeat(auto-fill, 220px);
      }`
      }

      </style>
      <div className="h-full w-full">
        <div className="mx-auto w-4/5 flex flex-col h-full">
          <header className="pt-10 pb-5 text-3xl font-bold text-dark-navy">
            <h3 onClick={toMap}>Insect Library</h3>
          </header>
          <div className="container h-full ">
            <BugCard localHandleSetSelectInsect={localHandleSetSelectInsect} title={"butterfly"} BugImage={<Image src={butterfly} width="250" height="200" />} />
            <BugCard localHandleSetSelectInsect={localHandleSetSelectInsect} title={"moth"} BugImage={<Image src={moth} width="250" height="200" />} />
            <BugCard localHandleSetSelectInsect={localHandleSetSelectInsect} title={"spider"} BugImage={<Image src={spider} width="250" height="200" />} />
            <BugCard localHandleSetSelectInsect={localHandleSetSelectInsect} title={"odonata"} BugImage={<Image src={odonata} width="250" height="200" />} />
            <BugCard localHandleSetSelectInsect={localHandleSetSelectInsect} title={"coleoptera"} BugImage={<Image src={coleoptera} width="250" height="200" />} />
            <BugCard localHandleSetSelectInsect={localHandleSetSelectInsect} title={"other"} BugImage={<Image src={other} width="250" height="200" />} />

          </div>
        </div>
      </div>
    </>
  )
}

export default SelectBugContainer
