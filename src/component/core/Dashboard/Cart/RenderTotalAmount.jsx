import React from 'react'
import { useSelector } from 'react-redux'
import IconButton from '../../../common/IconButton'

function RenderTotalAmount() {

  function handleByCourse (){
    const courses = cart.map((course) => course._id);
    console.log("Buying courses: ", courses);
    // TODO : PAYMENT GATEWAY INTEGRATION HERE
  }

  const {total} = useSelector((state) => state.cart);

  return (
    <div className="min-w-[280px] rounded-md border-[1px] border-[#2C333F] bg-[#161D29] p-6">
        <p className="mb-1 text-sm font-medium text-[#838894] ">
          Total :
        </p> 
        <p className="mb-6 text-3xl font-medium text-yellow-100">
          Rs {total}
        </p>
        <IconButton 
          text="Buy Now"
          onClick={handleByCourse}
          customClasses={'w-full justify-center'}
        />

    </div>
  )
}

export default RenderTotalAmount