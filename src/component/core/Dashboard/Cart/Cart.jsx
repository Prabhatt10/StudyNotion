import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartCourses from './RenderCartCourses'
import RenderTotalAmount from './RenderTotalAmount'

function Cart() {
    const {total,totalItems} = useSelector((state) => state.cart)

  return (
    <div>
        <h1 className='mb-14 text-3xl font-medium text-[#F1F2FF]'>Your Cart</h1>
        <p className='border-b border-b-[#6E727F] pb-2 font-semibold text-[#6E727F] ' >{totalItems} Courses in Cart</p>
        {
            total > 0 ? 
            (
                <div className='mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg-flex-row'>
                    <RenderCartCourses />
                    <RenderTotalAmount />
                </div>
            ) : 
            (
                <p className='mt-14 text-center text-3xl text-[#AFB2BF]'>
                    Your Cart is Empty
                </p>
            )
        }
    </div>
  )
}

export default Cart