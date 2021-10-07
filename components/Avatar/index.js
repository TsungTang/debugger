function Avatar({ name, imgComp, link }) {


  const AvatarComp = (
    <div className="text-dark-navy w-[180px] flex flex-col items-center">
      <div className="rounded-full bg-white w-[150px] h-[150px]  overflow-hidden flex justify-center items-center">
        {imgComp}

      </div>
      <p className="mt-5 text-base font-bold text-center">{name}</p>
    </div>
  )

  if (link) {
    const linkComp = <a href={link} target="_blank" >{AvatarComp}</a>
    return linkComp
  }

  return AvatarComp

}
export default Avatar
