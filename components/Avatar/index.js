function Avatar({ name, imgComp }) {
  return (
    <div className="text-dark-navy w-[180px] flex flex-col items-center">
      <div className="rounded-full bg-white w-[150px] h-[150px]  overflow-hidden flex justify-center items-center">
        {imgComp}

      </div>
      <p className="mt-5 text-base font-bold text-center">{name}</p>
    </div>
  )
}
export default Avatar
