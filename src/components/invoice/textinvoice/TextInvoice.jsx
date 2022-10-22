import React from 'react';
import product from '../../../assets/product.jpg';
import Totle from '../totle/Totle';

const TextInvoice = () => {
	return (
		<div className='mt-8 border rounded '>
			<p className='text-lg font-bold text-center p-2'>TAX INVOICE</p>
			<hr />
			<div class='flex flex-col'>
				<div class='overflow-x-auto sm:-mx-6 lg:-mx-8'>
					<div class='py-2 inline-block min-w-full sm:px-6 lg:px-8'>
						<div class='overflow-hidden'>
							<table class='min-w-full'>
								<thead class='border-b'>
									<tr>
										<th
											scope='col'
											class='text-sm font-medium text-gray-900 px-6 py-4 text-left'
										>
											OESCRIPTION
										</th>
										<th
											scope='col'
											class='text-sm font-medium text-gray-900 px-6 py-4 text-left'
										>
											HSN
										</th>
										<th
											scope='col'
											class='text-sm font-medium text-gray-900 px-6 py-4 text-left'
										>
											QTY
										</th>
										<th
											scope='col'
											class='text-sm font-medium text-gray-900 px-6 py-4 text-left'
										>
											RATE
										</th>
										<th
											scope='col'
											class='text-sm font-medium text-gray-900 px-6 py-4 text-left'
										>
											GST(%)
										</th>
										<th
											scope='col'
											class='text-sm font-medium text-gray-900 px-6 py-4 text-left'
										>
											GST
										</th>
										<th
											scope='col'
											class='text-sm font-medium text-gray-900 px-6 py-4 text-left'
										>
											TOTLE
										</th>
									</tr>
								</thead>
								<tbody>
									<tr class='border-b'>
										<div className='flex'>
											<img
												src={product}
												alt=''
												srcset=''
												style={{ width: '10%' }}
											/>
											<div className='flex-col'>
												<p className='mt-4 px-6'>
													Washing Machine Cleaner
													Tablet
												</p>
												<p className='px-6'>1-19</p>
											</div>
										</div>
										<td class='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
											3402
										</td>
										<td class='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
											50
										</td>
										<td class='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
											Rs.2
										</td>
										<td class='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
											18%
										</td>
										<td class='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
											Rs.18
										</td>
										<td class='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
											Rs. 118
										</td>
									</tr>

									<tr class='border-b'>
										<div className='flex'>
											<img
												src={product}
												alt=''
												srcset=''
												style={{ width: '10%' }}
											/>
											<div className='flex-col'>
												<p className='mt-4 px-6'>
													Washing Machine Cleaner
													Tablet
												</p>
												<p className='px-6'>1-19</p>
											</div>
										</div>
										<td class='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
											3402
										</td>
										<td class='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
											50
										</td>
										<td class='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
											Rs.2
										</td>
										<td class='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
											18%
										</td>
										<td class='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
											Rs.18
										</td>
										<td class='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
											Rs. 118
										</td>
									</tr>

									<tr class='border-b'>
										<div className='flex'>
											<img
												src={product}
												alt=''
												srcset=''
												style={{ width: '10%' }}
											/>
											<div className='flex-col'>
												<p className='mt-4 px-6'>
													Washing Machine Cleaner
													Tablet
												</p>
												<p className='px-6'>1-19</p>
											</div>
										</div>
										<td class='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
											3402
										</td>
										<td class='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
											50
										</td>
										<td class='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
											Rs.2
										</td>
										<td class='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
											18%
										</td>
										<td class='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
											Rs.18
										</td>
										<td class='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
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
