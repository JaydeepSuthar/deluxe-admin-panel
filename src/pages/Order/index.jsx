import dayjs from 'dayjs';
import { useState } from 'react';
import { Image, Card, Button } from 'react-bootstrap';
import {
	BsLightningCharge,
	BsLightningChargeFill,
	BsPencilSquare,
	BsPrinterFill,
	BsTrash,
} from 'react-icons/bs';
import { AiOutlineEye, AiOutlineFilePdf } from 'react-icons/ai';
import swal from 'sweetalert';

import Table from '../../components/data-table/DataTable';
import SearchFilter from '../../components/filters/SearchFilter';
import InvoiceBill from '../../components/invoice/invoicebill/InvoiceBill';
import { useFetch } from '../../hooks';

import axios from 'axios';
import toast from 'react-hot-toast';
import OrderDetailModal from '../../components/model/OrderDetailModal';

const BASE_URL = `http://139.59.22.201/api/static/product/image`;

const cancelOrder = async (order_id) => {
	const url = `/mark_order?order_id=${order_id}&as=0`;

	try {
		const response = await axios(url);

		if (response.status == 200) {
			toast.success(`Order Cancelled`);
		} else {
			console.log({ response });
		}
	} catch (err) {
		console.error({ response });
	}
};

const completeOrder = async (order_id) => {
	const url = `/mark_order?order_id=${order_id}&as=1`;

	try {
		const response = await axios(url);

		if (response.status == 200) {
			toast.success(`Order Completed`);
		} else {
			console.log({ response });
		}
	} catch (err) {
		console.error({ response });
	}
};

const FilterComponent = ({ filterText, setFilterText }) => {
	return (
		<>
			<Card className='mb-3 p-3 d-flex flex-row justify-content-end'>
				<div>
					<SearchFilter
						filterText={filterText}
						onFilter={(e) => setFilterText(e.target.value)}
						className='mx-3'
					/>

					{/* <Button
						className='tw-bg-green-700 hover:tw-bg-green-600'
						size='sm'
					>
						Add Order
					</Button> */}
				</div>
			</Card>
		</>
	);
};

const demo_data = [
	{
		customer_name: 'Jaydeep',
		customer_mobile_number: '7894561230',
		order_id: '#4654789',
		amount: 700,
		order_date: new Date(),
	},
	{
		customer_name: 'Jaydeep',
		customer_mobile_number: '7894561230',
		order_id: '#452222',
		amount: 500,
		order_date: new Date(),
	},
	{
		customer_name: 'Jaydeep',
		customer_mobile_number: '7894561230',
		order_id: '#465777',
		amount: 7000,
		order_date: new Date(),
	},
];

let selectedOrder = {};

const handleOrderDetail = async (order, setShow) => {
	const url = `/get_order_products_micro?order_id=${order.order_id}&user_id=${order.customer_mobile_number}`;

	try {
		const response = await axios.get(url);

		if (response.status == 200) {
			// console.clear();
			// console.log(response);
			order['products'] = response.data.products;

			selectedOrder = order;
			setShow(true);
		}
	} catch (err) {
		toast.error(`Error fetching Order`);
		console.log({ err });
	}
};

const OrderPage = () => {
	const [filterText, setFilterText] = useState('');
	const [invoiceShow, setInvoiceShow] = useState(false);

	const [show, setShow] = useState(false);

	const { data, error, isLoading } = useFetch('get_current_active_orders');

	const columns = [
		{
			name: 'ORDER ID',
			selector: (row) => row.order_id,
			sortable: true,
			wrap: true,
			// width: '12em',
		},
		{
			name: 'NAME',
			selector: (row) => row.customer_name,
			// sortable: true,
			wrap: true,
			// width: '12em',
		},
		{
			name: 'MOBILE',
			selector: (row) => row.customer_mobile_number,
			// sortable: true,
			wrap: true,
			width: '10em',
		},
		{
			name: 'STATUS',
			selector: (row) => row.order_status,
			wrap: true,
			// sortable: true,
			// width: "6em",
		},
		{
			name: 'AMOUNT',
			selector: (row) => row.amount,
			wrap: true,
			// sortable: true,
			// width: "6em",
		},
		{
			name: 'NO. OF PRODUCT',
			selector: (row) => row.count_of_item_type,
			wrap: true,
			// sortable: true,
			// width: "6em",
		},
		{
			name: 'DATE',
			// selector: (row) => `${row.order_date}`,
			selector: (row) =>
				dayjs(row.order_date).format('DD-MM-YYYY :: hh:mm'),
			sortable: true,
			// width: "6em",
			wrap: true,
		},
		{
			name: 'ACTIONS',
			// selector: (row) => `${row.discount_percentage}%`,
			cell: (row) => {
				return (
					<>
						<div className='tw-flex tw-flex-row tw-gap-2'>
							<AiOutlineEye
								onClick={() => {
									handleOrderDetail(row, setShow);
									// selectedOrder = row;
									// setShow(true)
								}}
								className='tw-cursor-pointer'
								size={'20px'}
							/>
							<AiOutlineFilePdf
								className='tw-cursor-pointer'
								size={'20px'}
								onClick={handlePrint}
							/>
						</div>
					</>
				);
			},
			// sortable: true,
			width: '16em',
		},
	];

	if (isLoading) return <h1>Loading...</h1>;

	if (error) {
		if (error?.response?.status == 401)
			return <h1>Your Token is Expired Please Logout and Re-Login</h1>;

		return <h1>Error Occur</h1>;
	}

	const filteredData = data?.active_orders?.filter(
		(item) =>
			(item?.order_id &&
				item?.order_id
					.toLowerCase()
					.includes(filterText.toLowerCase())) ||
			(item?.customer_name &&
				item?.customer_name
					.toLowerCase()
					.includes(filterText.toLowerCase()))
	);

	// const filteredData = demo_data;

	const handlePrint = () => {
		let body = document.body.innerHTML;
		let print = document.getElementById('invoice').innerHTML;
		document.body.innerHTML = print;
		window.print();
		document.body.innerHTML = body;
		console.log(body);

		setInvoiceShow(true);
	};

	return (
		<>
			<h1>Order Page</h1>

			<FilterComponent
				filterText={filterText}
				setFilterText={setFilterText}
			/>

			<Card className='p-2'>
				<Table columns={columns} data={filteredData} />
			</Card>
			<div id='invoice' style={{ display: 'none' }}>
				<InvoiceBill />
			</div>

			{show && (
				<OrderDetailModal
					show={show}
					setShow={setShow}
					order={selectedOrder}
				/>
			)}
			{/* {invoiceShow && <InvoiceBill />} */}
		</>
	);
};

export default OrderPage;
