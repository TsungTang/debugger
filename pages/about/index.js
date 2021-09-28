import Image from "next/image"
import Avatar from "@/components/Avatar"

// import bonzo from "@/public/avatars/bonzo.png"
// import Liyen from "@/public/avatars/Liyen.png"
// import HaoChun from "@/public/avatars/HaoChun.png"
// import Tang from "@/public/avatars/Tang.png"
// import Yinchi from "@/public/avatars/Yinchi.png"
// import ChiaLin from "@/public/avatars/ChiaLin.png"

function About() {

  return (
    <div className="w-full text-dark-navy bg-light-green" style={{ minHeight: "calc(100vh - 80px)" }}>
      <div className="mx-auto pt-[40px] w-11/12 lg:w-5/6 ">
        <header><h2 className="text-3xl font-bold">About</h2></header>

        <div>
          <h3 className="text-[22px] font-bold mt-4 px-6 lg:px-10 py-5">What is de Bugger?</h3>
          <p className="font-normal text-base py-[30px] px-[60px] bg-white shadow-nav-shadow leading-5 rounded-2xl">DeBugger is a geographic bioinfo emulator empowered by a CNN engine to integrate the rich information including precipitation, vegetation, temperature, etc. provided by NASA Earthdata Search. Based on our novel bio-vectors and environmental conditions, DeBugger can predict the future distribution of different types of insects.
            <br />
            <br />

            Furthermore, we believe that the prediction of different species can rely on different environmental information. To address this problem, an attention module is integrated into the CNN which selects important features automatically during training.

            <br />
            <br />

            In this way, the attention module masks out all unrelated information and leaves the import feature for further usage.</p>
        </div>

        <div className="mt-5">
          <h3 className="text-[22px] font-bold px-6 lg:px-10 py-5">How to use it?</h3>
          <p className=" font-normal text-base py-[30px] px-[60px] bg-white shadow-nav-shadow leading-5 rounded-2xl">The proposed model, insect2vec, calculates an embedding for each insect by considering the co-occurrence between insects in a real-world environment. The insect2vec (bio-vector) can be applied in many analytical tasks.
            <br />
            <br />

            For example, one can easily estimate the habitat distribution of an insect by using the bio-vector integrated with geo-spatial data. Based on this model, one can also predict which insect species could be harsh to the environment in a place and accordingly take actions to avoid predictable ecological disasters.</p>
        </div>

        <div className="mt-5">
          <h3 className="text-[22px]  font-bold px-6 lg:px-10 py-5">DeBugger Squad</h3>
          <div className="flex pb-5 justify-around items-center">
            <Avatar imgComp={<Image src={"/avatars/bonzo.jpg"} width={120} height={140} />} name={"Yu Chun / PM & Backend & Data Scientist"} />
            <Avatar imgComp={<Image src={"/avatars/Liyen.jpg"} width={120} height={140} />} name={"Liyen / Consultant & Data Scientist"} />
            <Avatar imgComp={<Image src={"/avatars/HaoChun.jpg"} width={120} height={140} />} name={"Hao Chun / Backend & Data Scientist"} />
            <Avatar imgComp={<Image src={"/avatars/Tang.jpg"} width={120} height={140} />} name={"Tsung Tang / Frontend"} />
            <Avatar imgComp={<Image src={"/avatars/Yinchi.jpg"} width={120} height={140} />} name={"Yinchi / UIUX"} />
            <Avatar imgComp={<Image src={"/avatars/ChiaLin.jpg"} width={120} height={140} />} name={"Chia Lin / Marketing"} />
          </div>
        </div>
      </div>

    </div>
  )
}

export default About
