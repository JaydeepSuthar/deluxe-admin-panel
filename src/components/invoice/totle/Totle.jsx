import React from 'react';

const Totle = () => {
	return (
		<div>
			<div class='tw-bg-white py-5 '>
				<div class=' tw-max-w-7xl tw-px-4 tw-sm:px-6 tw-lg:px-8'>
					<div class='tw-mt-10  tw-p-5'>
						<dl class=' tw-md:grid tw-md:grid-cols-2 tw-md:gap-y-10 tw-md:space-y-0'>
							<div class=' '>
								{/* <h1 className='text-xl'>CHEAPER</h1> */}
								<dt>
									<p class=' tw-text-lg tw-font-medium tw-leading-6 tw-text-gray-900 '>
										For,Deluxe
									</p>
									{/* <p class=' text-sm font-medium leading-6 text-gray-600  mt-5    '>
										Autho.sign
									</p> */}
								</dt>
							</div>
							{/* ----------------------------------------------- */}
							<div class=''>
								<dt>
									<div className='tw-mt-3'>
										<p class=' tw-text-sm tw-text-right tw-font-medium tw-leading-6 tw-text-gray-600 '>
											<span className='tw-text-md tw-text-gray-900 tw-mr-4'>
												TAXABLE VALUE :-
											</span>{' '}
											Rs.565
										</p>
										<p class=' tw-text-sm tw-text-right tw-font-medium tw-leading-6 tw-text-gray-600'>
											<span className='tw-text-md tw-text-gray-900 tw-mr-4'>
												SGST :-
											</span>
											Rs.27.90
										</p>
										<p class=' tw-text-sm  tw-text-right tw-font-medium tw-leading-6 tw-text-gray-600'>
											<span className='tw-text-md tw-text-gray-900 mr-4'>
												CGST :-
											</span>
											Rs.27.90
										</p>
										<hr
											className='tw-ml-auto'
											style={{ width: '250px' }}
										/>
										<p class=' tw-text-sm  tw-text-right tw-font-medium tw-leading-6 tw-text-gray-600'>
											<span className='tw-text-md tw-text-gray-900 mr-4'>
												Total{' '}
											</span>
											Rs.620.80
										</p>
										<p class=' tw-text-sm  tw-text-right tw-font-medium tw-leading-6 tw-text-gray-600'>
											<span className='tw-text-md tw-text-gray-900 mr-4'>
												DISCOUNT :-
											</span>
											Rs.55.80
										</p>
										<hr
											className='tw-ml-auto'
											style={{ width: '250px' }}
										/>
										<p class=' tw-text-sm  tw-text-right tw-font-medium tw-leading-6 tw-text-gray-600'>
											<span className='tw-text-md tw-text-gray-900 mr-4'>
												GRAND TOTAL :-
											</span>
											Rs.565
										</p>
									</div>
								</dt>
							</div>
						</dl>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Totle;
