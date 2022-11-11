import React from 'react';
import product from '../../../assets/product.jpg';
import Totle from '../totle/Totle';

const TextInvoice = () => {
	return (
		<div className='tw-mt-8 tw-border tw-rounded '>
			<p className='tw-text-lg tw-font-bold tw-text-center tw-p-2'>
				TAX INVOICE
			</p>
			<hr />
			<div class='tw-flex tw-flex-col'>
				<div class='tw-overflow-x-auto sm:tw--mx-6 lg:tw--mx-8'>
					<div class='tw-py-2 tw-inline-block tw-min-w-full sm:tw-px-6 lg:tw-px-8'>
						<div class='tw-overflow-hidden'>
							<table class='tw-min-w-full'>
								<thead class='tw-border-b'>
									<tr>
										<th
											scope='col'
											class='tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-4 tw-text-left'
										>
											DESCRIPTION
										</th>
										<th
											scope='col'
											class='tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-4 tw-text-left'
										>
											HSN
										</th>
										<th
											scope='col'
											class='tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-4 tw-text-left'
										>
											QTY
										</th>
										<th
											scope='col'
											class='tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-4 tw-text-left'
										>
											RATE
										</th>
										{/* <th
											scope='col'
											class='text-sm font-medium text-gray-900 px-6 py-4 text-left'
										>
											GST(%)
										</th> */}
										{/* <th
											scope='col'
											class='text-sm font-medium text-gray-900 px-6 py-4 text-left'
										>
											GST
										</th> */}
										<th
											scope='col'
											class='tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-4 tw-text-left'
										>
											TOTAL
										</th>
									</tr>
								</thead>
								<tbody>
									<tr class='tw-border-b'>
										<div className='tw-flex'>
											{/* <img
												src={product}
												alt=''
												srcset=''
												style={{ width: '10%' }}
											/> */}
											<div className='tw-flex-col'>
												<p className='tw-mt-4 tw-px-6'>
													Washing Machine Cleaner
													Tablet
												</p>
												<p className='tw-px-6'>1-19</p>
											</div>
										</div>
										<td class='tw-px-6 tw-py-4 tw-whitespace-nowrap tw-text-sm tw-font-medium tw-text-gray-900'>
											3402
										</td>
										<td class='tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-4 tw-whitespace-nowrap'>
											50
										</td>
										<td class='tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-4 tw-whitespace-nowrap'>
											Rs.2
										</td>
										<td class='tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-4 tw-whitespace-nowrap'>
											18%
										</td>
										<td class='tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-4 tw-whitespace-nowrap'>
											Rs.18
										</td>
										<td class='tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-4 tw-whitespace-nowrap'>
											Rs. 118
										</td>
									</tr>

									<tr class='tw-border-b'>
										<div className='tw-flex'>
											{/* <img
												src={product}
												alt=''
												srcset=''
												style={{ width: '10%' }}
											/> */}
											<div className='tw-flex-col'>
												<p className='tw-mt-4 tw-px-6'>
													Washing Machine Cleaner
													Tablet
												</p>
												<p className='tw-px-6'>1-19</p>
											</div>
										</div>
										<td class='tw-px-6 tw-py-4 tw-whitespace-nowrap tw-text-sm tw-font-medium tw-text-gray-900'>
											3402
										</td>
										<td class='tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-4 tw-whitespace-nowrap'>
											50
										</td>
										<td class='tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-4 tw-whitespace-nowrap'>
											Rs.2
										</td>
										<td class='tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-4 tw-whitespace-nowrap'>
											18%
										</td>
										<td class='tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-4 tw-whitespace-nowrap'>
											Rs.18
										</td>
										<td class='tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-4 tw-whitespace-nowrap'>
											Rs. 118
										</td>
									</tr>

									<tr class='tw-border-b'>
										<div className='tw-flex'>
											{/* <img
												src={product}
												alt=''
												srcset=''
												style={{ width: '10%' }}
											/> */}
											<div className='tw-flex-col'>
												<p className='tw-mt-4 tw-px-6'>
													Washing Machine Cleaner
													Tablet
												</p>
												<p className='tw-px-6'>1-19</p>
											</div>
										</div>
										<td class='tw-px-6 tw-py-4 tw-whitespace-nowrap tw-text-sm tw-font-medium tw-text-gray-900'>
											3402
										</td>
										<td class='tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-4 tw-whitespace-nowrap'>
											50
										</td>
										<td class='tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-4 tw-whitespace-nowrap'>
											Rs.2
										</td>
										<td class='tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-4 tw-whitespace-nowrap'>
											18%
										</td>
										<td class='tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-4 tw-whitespace-nowrap'>
											Rs.18
										</td>
										<td class='tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-4 tw-whitespace-nowrap'>
											Rs. 118
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<Totle />
		</div>
	);
};

export default TextInvoice;
