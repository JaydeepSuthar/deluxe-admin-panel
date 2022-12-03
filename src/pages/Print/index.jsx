import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './style.css';

const Print = () => {
	const location = useLocation();

	const printData = location.state;

	console.log({ printData });

	const {
		amount: totalAmount,
		products,
		customer_name,
		order_id,
	} = printData;

	let totalDiscount = 0;

	return (
		<>
			<div className='offset-xl-2 col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12 padding'>
				<div className='card'>
					<div className='card-body'>
						<div className='row mb-4'>
							<div className='col-sm-6'>
								<h5 className='mb-3'>From:</h5>
								<h4 className='text-dark mb-1'>Deluxe</h4>
								<div>29, Singla Street</div>
								<div>Sikeston,New Delhi 110034</div>
								<div>Email: contact@bbbootstrap.com</div>
								<div>Phone: +91 9897 989 989</div>
							</div>
							<div className='col-sm-6 '>
								<h5 className='mb-1'>To:</h5>
								{/* <h4 className='text-dark mb-1'>Akshay Singh</h4>
								<div>478, Nai Sadak</div>
								<div>Chandni chowk, New delhi, 110006</div>
								<div>Email: info@tikon.com</div>
								<div>Phone: +91 9895 398 009</div> */}

								<table className='table table-clear table-borderless table-sm'>
									<tbody>
										<tr>
											<td className='left'>Name :-</td>
											<td className='right'>
												{customer_name || 'Cash'}
											</td>
										</tr>
										<tr>
											<td className='left'>GSTIN :-</td>
											<td className='right'>
												{/* GST IN */}
											</td>
										</tr>
										<tr>
											<td className='left'>
												SUPPLY TO :-
											</td>
											<td className='right'>
												{/* SUPPLY TO */}
											</td>
										</tr>
										<tr>
											<td className='left'>
												BILL NO. :-
											</td>
											<td className='right'>
												{/* BILL NO */}
											</td>
										</tr>
										<tr>
											<td className='left'>
												BILL DATE. :-
											</td>
											<td className='right'>
												{/* DATE */}
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div className='table-responsive-sm'>
							<table className='table table-striped'>
								<thead>
									<tr>
										<th className='center'>#</th>
										<th>Item</th>
										<th>Description</th>
										<th className='right'>Price</th>
										<th className='center'>Qty</th>
										<th className='right'>Discount</th>
										<th className='right'>Total</th>
									</tr>
								</thead>
								<tbody>
									{products.map((product, idx) => {
										let total =
											product?.ordering_price *
												product?.quantity -
											product?.discount;

											if (total < 0) total = 0;

										totalDiscount += product?.discount;

										return (
											<>
												<tr>
													<td className='center'>
														{idx + 1}
													</td>
													<td className='left strong'>
														{product?.title}
													</td>
													<td className='left'>
														{product?.description}
													</td>
													<td className='right'>
														{
															product?.ordering_price
														}
													</td>
													<td className='center'>
														{product?.quantity}
													</td>
													<td className='center'>
														{product?.discount}
													</td>
													<td className='right'>
														₹ {total}
													</td>
												</tr>
											</>
										);
									})}
								</tbody>
							</table>
						</div>
						<div
							className='row'
							style={{
								display: 'flex',
								justifyContent: 'flex-end',
							}}
						>
							<div className='col-lg-4 col-sm-5'></div>
							<div className='col-lg-4 col-sm-5 ml-auto'>
								<table className='table table-clear'>
									<tbody>
										<tr>
											<td className='left'>
												<strong className='text-dark'>
													Subtotal
												</strong>
											</td>
											<td className='right'>
												₹ {totalDiscount + totalAmount}
											</td>
										</tr>
										<tr>
											<td className='left'>
												<strong className='text-dark'>
													Discount
													{/* (20%) */}
												</strong>
											</td>
											<td className='right'>
												₹ {totalDiscount.toFixed(2)}
											</td>
										</tr>
										<tr>
											<td className='left'>
												<strong className='text-dark'>
													Total
												</strong>
											</td>
											<td className='right'>
												<strong className='text-dark'>
													₹ {totalAmount}
												</strong>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<div className='card-footer bg-white text-center'>
						<p className='mb-0'>
							this is a system generated no sign need.
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Print;
