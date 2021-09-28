export default function BugCard({ title, BugImage, localHandleSetSelectInsect }) {

  return (
    <div onClick={() => localHandleSetSelectInsect(title)} className="w-[250px] h-[250px] transition duration-200 overflow-hidden cursor-pointer
    rounded-3xl bg-white shadow-nav-shadow hover:shadow-md hover:border hover:border-solid hover:border-green-primary">
      {BugImage}
      {/* <Image src={butterfly} width="250"></Image> */}
      <div className="text-dark-navy text-base font-bold mt-1">
        <p className=" text-center">{title}</p>
      </div>
    </div>
  )

}
