
/**
 * 
 * @param { {msg:string, closeEvent:undefined|Function } } param0 
 */
export default function DebuggerAlert({ msg, closeEvent }) {
  console.log(msg)
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">{msg}</strong>
      {closeEvent && <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
        <span class="icon-close"></span>
      </span>}

    </div>
  )
}
