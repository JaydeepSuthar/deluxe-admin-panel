import React from 'react'
import TextInvoice from '../textinvoice/TextInvoice'

const InvoiceBill = () => {
    return (
        <div className='container flex mx-auto py-5'>
            <div class="overflow-hidden    bg-white border sm:rounded-lg">


                <div class="bg-white border rounded py-5 ">
                    <div class=" max-w-7xl px-4 sm:px-6 lg:px-8">


                        <div class="mt-10 border rounded p-5">
                            <dl class=" md:grid md:grid-cols-2 md:gap-y-10 md:space-y-0">
                                <div class=" border-r-2 mx-5">
                                    {/* <h1 className='text-xl'>CHEAPER</h1> */}
                                    <dt>
                                        <p class=" text-lg font-medium leading-6 text-gray-900 font-bold">CHEAPERZON</p>
                                        <p class=" text-sm font-medium leading-6 text-gray-600  mt-2">Shed No.2 Sy.No. 310 F.P.No. Patel, Katargam, Surat,Gujarat,395004</p>
                                    </dt>

                                </div>
                                {/* ----------------------------------------------- */}
                                <div class="">
                                    <dt>
                                        <p class=" text-lg font-medium leading-6 text-gray-900  "><span className='border-b-2 border-gray-500'> BILL TO</span></p>
                                        <div className='mt-3'>
                                            <p class=" text-sm font-medium leading-6 text-gray-600 "><span className='text-md text-gray-900 mr-4'>NAME  :-</span> CASH SALE (cash-2)</p>
                                            <p class=" text-sm font-medium leading-6 text-gray-600"><span className='text-md text-gray-900 mr-4'>GSTIN :-</span></p>
                                            <p class=" text-sm font-medium leading-6 text-gray-600"><span className='text-md text-gray-900 mr-4'>SUPPLY TO :-</span></p>
                                            <p class=" text-sm font-medium leading-6 text-gray-600"><span className='text-md text-gray-900 mr-4'>BILL NO :- </span>Y/0622/02485</p>
                                            <p class=" text-sm font-medium leading-6 text-gray-600"><span className='text-md text-gray-900 mr-4'>BILL DATE :-</span>13,jun 2022 12:58 PM</p>
                                        </div>
                                    </dt>

                                </div>
                            </dl>
                        </div>
                        <TextInvoice />
                    </div>
                </div>

            </div>

        </div>
    )
}

export default InvoiceBill
