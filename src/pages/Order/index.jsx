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
import swal from 'sweetalert';

import products from '../../../misc/product';
import Table from '../../components/data-table/DataTable';
import SearchFilter from '../../components/filters/SearchFilter';
import InvoiceBill from '../../components/invoice/invoicebill/InvoiceBill';
import { useFetch } from '../../hooks';

const BASE_URL = `http://139.59.22.201/api/static/product/image`;

const toggle_trending = async (id) => {
	const url = `product_toogle_trending?product_id=${id}`;

	alert('Product is now Trending');

	try {
		const response = await axios.get(url);

		if (response.status == 200) {
			alert(`Trending`);
			window.location.reload();
		} else {
			console.log({ response });
		}
	} catch (err) {
		console.log({ err });
	}
};

const delete_product = (id) => {
	swal({
		title: 'Are you sure?',
		text: 'Once deleted, you cannot not revert it',
		icon: 'error',
		buttons: true,
		dangerMode: true,
	}).then(async (value) => {
		if (value) {
			alert(`Product is Deleted`);
		}
	});
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

const OrderPage = () => {
	const [filterText, setFilterText] = useState('');
	const [invoiceShow, setInvoiceShow] = useState(false);

	const { data, error, isLoading } = useFetch('get_current_active_orders');

	const columns = [
		{
			name: 'PRINT',
			// selector: (row) => row.banner.media,
			cell: (row) => {
				// let imageURL = `${BASE_URL}/${row.banner.media}`;

				return (
					<BsPrinterFill
						size={22}
						onClick={() => {
							// alert(JSON.stringify(row, null, 2));
							// <InvoiceBill />;
							handlePrint();
						}}
					/>
				);
			},
			// sortable: true,
			width: '6em',
		},
		// {
		// 	name: 'IMAGE',
		// 	selector: (row) => row.banner.media,
		// 	cell: (row) => {
		// 		let imageURL = `${BASE_URL}/${row.banner.media}`;

		// 		return <Image src={imageURL} width='80px' height={'80px'} />;
		// 	},
		// 	// sortable: true,
		// 	// width: "6em",
		// },
		{
			name: 'ORDER ID',
			selector: (row) => row.order_id,
			sortable: true,
			// wrap: true,
			// width: "6em",
		},
		{
			name: 'CUSTOMER NAME',
			selector: (row) => row.customer_name,
			// sortable: true,
			wrap: true,
			width: '12em',
		},
		{
			name: 'MOBILE NUMBER',
			selector: (row) => row.customer_mobile_number,
			// sortable: true,
			width: "12em",
		},
		{
			name: 'STATUS',
			selector: (row) => row.order_status,
			// sortable: true,
			// width: "6em",
		},
		{
			name: 'AMOUNT',
			selector: (row) => row.amount,
			// sortable: true,
			// width: "6em",
		},
		{
			name: 'DATE',
			// selector: (row) => `${row.order_date}`,
			selector: (row) => dayjs(row.order_date).format("DD-MM-YYYY :: hh:mm"),
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
						<div className='tw-flex tw-flex-row tw-gap-1'>
							<Button size="sm" variant='primary'>View</Button>
							<Button size="sm" variant='danger'>Cancel</Button>
						</div>
					</>
				);
			},
			// sortable: true,
			width: '12em',
		},
	];

	if (isLoading) return <h1>Loading...</h1>;

	if (error) {
		if (error?.response?.status == 401)
			return <h1>Your Token is Expired Please Logout and Re-Login</h1>;

		return <h1>Error Occur</h1>;
	}

	console.log({ data });

	const filteredData = data?.active_orders?.filter(
		(item) =>
			(item.title &&
				item.title.toLowerCase().includes(filterText.toLowerCase())) ||
			(item.category &&
				item.category.toLowerCase().includes(filterText.toLowerCase()))
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
			{/* {invoiceShow && <InvoiceBill />} */}
		</>
	);
};

export default OrderPage;
