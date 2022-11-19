import axios from 'axios';
import { useEffect, useRef } from 'react';
import { Button, Image, Modal } from 'react-bootstrap';

const IMG_URL = `http://139.59.22.201/api/static/product/image`;

const OrderDetailModal = ({ order, show, setShow }) => {
	const printRef = useRef(null);

	const handlePrint = () => {
		let printWindow = window.open();
		printWindow.focus();
		printWindow.document.body.innerHTML = printRef.current.innerHTML;
		// printWindow.document.body.style.margin = '0px';
		printWindow.print();
		printWindow.close();
	};

	return (
		<>
			<Modal size='lg' show={show} onHide={() => setShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Order Details</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div
						ref={printRef}
						id='print'
						// className='tw-flex tw-flex-col'
						style={{
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<div
							// className='customer-details tw-w-full tw-mb-5'
							style={{ marginBottom: '10px' }}
						>
							<h4>Details</h4>
							<table
								style={{
									width: '100%',
								}}
							>
								<tbody>
									<tr>
										<td>
											<b>Order ID</b>
										</td>
										<td>{order.order_id}</td>
									</tr>
									<tr>
										<td>
											<b>Order Date</b>
										</td>
										<td>{order.order_date}</td>
									</tr>
									<tr>
										<td>
											<b>Customer Name</b>
										</td>
										<td>{order.customer_name}</td>
									</tr>
									<tr>
										<td>
											<b>Mobile Number</b>
										</td>
										<td>{order.customer_mobile_number}</td>
									</tr>
									<tr>
										<td>
											<b>Total Amount</b>
										</td>
										<td>₹ {order.amount}</td>
									</tr>
								</tbody>
							</table>
						</div>

						<hr />

						<div className='product-list'>
							<h4>Products</h4>
							<table
								style={{
									width: '100%',
								}}
							>
								<thead>
									{/* <tr> */}
									<th>Image</th>
									<th>Name</th>
									<th>Category</th>
									<th>Qty</th>
									<th>Price</th>
									<th>Total</th>
									{/* </tr> */}
								</thead>
								<tbody>
									{order.products.map((product) => {
										return (
											<>
												<tr>
													<td>
														<Image
															thumbnail={true}
															src={`${IMG_URL}/${product.banner.media}`}
															height={`60px`}
															width={`60px`}
														/>
													</td>
													<td>{product.title}</td>
													<td>{product.category}</td>
													<td>{product.quantity}</td>
													<td>
														{product.ordering_price}
													</td>
													<td>
														{product.quantity *
															product.ordering_price}
													</td>
												</tr>
											</>
										);
									})}
								</tbody>
							</table>
						</div>

						<hr />

						<div
							// className='total tw-mt-5 tw-flex tw-justify-end'
							style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'flex-end',
								marginTop: '15px',
							}}
						>
							<table>
								<tbody>
									<tr>
										<td>
											<b>GRAND TOTAL</b>
										</td>
										<td>Rs. {order.amount}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<div className='tw-flex tw-gap-1'>
						<Button variant='success'>Print</Button>
						<Button onClick={() => setShow(false)}>Close</Button>
					</div>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default OrderDetailModal;
