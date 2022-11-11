import React from 'react';
import TextInvoice from '../textinvoice/TextInvoice';

const InvoiceBill = () => {
	return (
		<div className='tw-container tw-flex tw-mx-auto tw-py-5'>
			<div class='tw-overflow-hidden    tw-bg-white tw-border tw-sm:rounded-lg'>
				<div class='tw-bg-white tw-border tw-rounded tw-py-5 '>
					<div class=' tw-max-w-7xl tw-px-4 tw-sm:px-6 tw-lg:px-8'>
						<div class='tw-mt-10 tw-border tw-rounded tw-p-5'>
							<dl class=' tw-md:grid tw-md:grid-cols-2 tw-md:gap-y-10 tw-md:space-y-0'>
								<div class=' tw-border-r-2 tw-mx-5'>
									{/* <h1 className='text-xl'>CHEAPER</h1> */}
									<dt>
										<p class=' tw-text-lg tw-leading-6 tw-text-gray-900 tw-font-bold'>
											Deluxe
										</p>
										<p class=' tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-600  tw-mt-2'>
											Shed No.2 Sy.No. 310 F.P.No. Patel,
											Katargam, Surat,Gujarat,395004
										</p>
									</dt>
								</div>
								{/* ----------------------------------------------- */}
								<div class=''>
									<dt>
										<p class=' tw-text-lg tw-font-medium tw-leading-6 tw-text-gray-900  '>
											<span className='tw-border-b-2 tw-border-gray-500'>
												{' '}
												BILL TO
											</span>
										</p>
										<div className='tw-mt-3'>
											<p class=' tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-600 '>
												<span className='tw-text-md tw-text-gray-900 tw-mr-4'>
													NAME :-
												</span>{' '}
												CASH SALE (cash-2)
											</p>
											{/* <p class=" text-sm font-medium leading-6 text-gray-600"><span className='text-md text-gray-900 mr-4'>GSTIN :-</span></p> */}
											<p class=' tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-600'>
												<span className='tw-text-md tw-text-gray-900 tw-mr-4'>
													SUPPLY TO :-
												</span>
											</p>
											<p class=' tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-600'>
												<span className='tw-text-md tw-text-gray-900 tw-mr-4'>
													BILL NO :-{' '}
												</span>
												Y/0622/02485
											</p>
											<p class=' tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-600'>
												<span className='tw-text-md tw-text-gray-900 tw-mr-4'>
													BILL DATE :-
												</span>
												13,jun 2022 12:58 PM
											</p>
										</div>
									</dt>
								</div>
							</dl>
						</div>
						<TextInvoice />
					</div>
					<p className='tw-text-center tw-mt-2 tw-font-bold'>
						This is system generated no signature required
					</p>
				</div>
			</div>
		</div>
	);
};

export default InvoiceBill;
