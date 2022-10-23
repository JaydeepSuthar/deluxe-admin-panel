import React from 'react'

const Totle = () => {
  return (
    <div>
        <div class="bg-white py-5 ">
                    <div class=" max-w-7xl px-4 sm:px-6 lg:px-8">


                        <div class="mt-10  p-5">
                            <dl class=" md:grid md:grid-cols-2 md:gap-y-10 md:space-y-0">
                                <div class=" ">
                                    {/* <h1 className='text-xl'>CHEAPER</h1> */}
                                    <dt>
                                        <p class=" text-lg font-medium leading-6 text-gray-900 ">For,CheaperZone</p>
                                        <p class=" text-sm font-medium leading-6 text-gray-600  mt-5    ">Autho.sign</p>
                                    </dt>

                                </div>
                                {/* ----------------------------------------------- */}
                                <div class="">
                                    <dt>
                                        <div className='mt-3'>
                                            <p class=" text-sm text-right font-medium leading-6 text-gray-600 "><span className='text-md text-gray-900 mr-4'>TAXABLE VALUE  :-</span> Rs.565</p>
                                            <p class=" text-sm text-right font-medium leading-6 text-gray-600"><span className='text-md text-gray-900 mr-4'>SGST :-</span>Rs.27.90</p>
                                            <p class=" text-sm  text-right font-medium leading-6 text-gray-600"><span className='text-md text-gray-900 mr-4'>CGST :-</span>Rs.27.90</p>
                                            <hr className='ml-auto'  style={{width:"250px"}}/>
                                            <p class=" text-sm text-right font-medium leading-6 text-gray-600"><span className='text-md text-gray-900 mr-4'>Totle </span>Rs.620.80</p>
                                            <p class=" text-sm text-right font-medium leading-6 text-gray-600"><span className='text-md text-gray-900 mr-4'>DISCOUNT :-</span>Rs.55.80</p>
                                            <hr className='ml-auto'  style={{width:"250px"}}/>
                                            <p class=" text-sm text-right font-medium leading-6 text-gray-600"><span className='text-md text-gray-900 mr-4'>GRAND TOTAL :-</span>Rs.565</p>
                                        </div>
                                    </dt>

                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
    </div>
  )
}

export default Totle
