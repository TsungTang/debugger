import { _uuid } from "@/utils"
import { HiChevronDoubleUp, HiChevronDoubleDown } from "react-icons/hi"

function FeatureImportance({ featimp, showDetail, handleSetShowDetail, expand }) {
  return (
    <>
      <div className="absolute left-8" style={{ bottom: expand ? "260px" : "110px", zIndex: 999 }}>
        <div className="bg-light-green  px-7 py-4 rounded-2xl shadow-selector cursor-default">
          <div className="text-base font-bold flex items-center justify-between">
            <h3 >Feature Importance</h3><div onClick={handleSetShowDetail} className="cursor-pointer text-3xl font-bold ml-6" >{showDetail ? <HiChevronDoubleDown /> : <HiChevronDoubleUp />}</div>
          </div>
          {showDetail && (
            <div className="flex items-center mt-5">
              {
                featimp.map((el, i) => (
                  <div className={i !== featimp.length - 1 ? "mr-4" : ""} key={_uuid()}>
                    <h2 className="font-normal text-base">{el.name}</h2>
                    <div className="font-bold text-[22px] text-center rounded-2xl px-4 py-1 w-full shadow-selector">{el.value}</div>
                  </div>)
                )
              }
            </div>
          )
          }

        </div>
      </div>

    </>
  )

}
export default FeatureImportance
