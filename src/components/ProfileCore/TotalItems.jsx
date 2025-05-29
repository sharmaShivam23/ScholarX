import React from 'react'

const TotalItems = () => {
  return (
    <div className='flex justify-center items-center gap-2 flex-col b bg-[#161D29] w-[18vw] rounded-lg h-[170px]'>
       <div className="t text-[#AFB2BF] text-xl">Total:</div>
       <p className="pr text-2xl text-[#FFD60A] font-semibold">$500</p>
       <div className="btn">
        <button className='w-[15vw] p-2 rounded-xl font-semibold  bg-[#FFD60A] text-black'>
          Buy now
        </button>
       </div>
    </div>
  )
}

export default TotalItems
