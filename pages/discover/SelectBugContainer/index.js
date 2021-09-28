function SelectBugContainer({ toMap }) {

  return (
    <div className="bg-light-green h-full w-full">
      <div className="block mx-auto w-4/5">
        <header className="py-10 text-3xl font-bold text-dark-navy">
          <h3>Insect Library</h3>
        </header>
        <div onClick={toMap}>
          tomap
        </div>
      </div>
    </div>
  )
}

export default SelectBugContainer
