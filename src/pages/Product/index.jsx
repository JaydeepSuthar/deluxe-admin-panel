import axios from 'axios';
import { useState, useEffect } from 'react';
import { Image, Card, Button } from 'react-bootstrap';
import toast from 'react-hot-toast';
import {
	BsBagPlusFill,
	BsLightningCharge,
	BsLightningChargeFill,
	BsPencilSquare,
	BsTrash,
} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { SWRConfig } from 'swr';

import products from '../../../misc/product';
import Table from '../../components/data-table/DataTable';
import SearchFilter from '../../components/filters/SearchFilter';
import AddStockModal from '../../components/model/AddStockModal';
import { useFetch } from '../../hooks';

const BASE_URL = `http://139.59.22.201/api/static/product/image`;

const toggle_trending = async (id, revalidate) => {
	const url = `product_toogle_trending?product_id=${id}`;

	try {
		const response = await axios.get(url);

		if (response.status == 200) {
			revalidate();
		} else {
			console.log({ response });
		}
	} catch (err) {
		console.log({ err });
	}
};

const delete_product = (id, revalidate) => {
	swal({
		title: 'Are you sure?',
		text: 'Once deleted, you cannot not revert it',
		icon: 'error',
		buttons: true,
		dangerMode: true,
	}).then(async (value) => {
		if (value) {
			// alert(`Product is Deleted`);

			const url = `delete_product?product_id=${id}`;

			try {
				const response = await axios.get(url);

				if (response.status == 200) {
					toast.success(`Prodduct Deleted Successfully`);
					revalidate();
					// window.location.reload();
				} else {
					console.log({ response });
				}
			} catch (err) {
				console.log({ err });
			}
		}
	});
};

const FilterComponent = ({ filterText, setFilterText }) => {
	const navigate = useNavigate();

	return (
		<>
			<Card className='mb-3 p-3 d-flex flex-row justify-content-end'>
				<div>
					<SearchFilter
						filterText={filterText}
						onFilter={(e) => setFilterText(e.target.value)}
						className='mx-3'
					/>

					<Button
						className='tw-bg-indigo-700 hover:tw-bg-indigo-600'
						size='sm'
						onClick={() => {
							navigate('/product/add');
							// <Navigate to='product/add' replace={true} />;
						}}
					>
						Add Product
					</Button>
				</div>
			</Card>
		</>
	);
};

const ProductPage = () => {
	const [filterText, setFilterText] = useState('');
	// const [data, setData] = useState([]);
	const [stockModal, setStockModal] = useState({});
	const [show, setShow] = useState(false);

	const { data, error, isLoading, revalidate } = useFetch(
		'/product/showcase?page=1'
	);

	// TODO: API calling demo
	// useEffect(() => {
	// 	const apiCall = async () => {
	// 		try {
	// 			const response = await axios.get(
	// 				'http://139.59.22.201/test_api/product/showcase?page=1'
	// 			);
	// 			console.log(response);
	// 			if (response.status == 200) {
	// 				console.log('response==>', response.data.response);
	// 				if (Array.isArray(response.data.response)) {
	// 					setData(response.data.response);
	// 				}
	// 				// alert(`Trending`);
	// 				// window.location.reload();
	// 			} else {
	// 				console.log('ERROR =>', { response });
	// 			}
	// 		} catch (err) {
	// 			console.log({ err });
	// 		}
	// 	};
	// 	apiCall();
	// }, []);

	const columns = [
		{
			name: 'IMAGE',
			// selector: (row) => row.banner.media ,
			cell: (row) => {
				// let imageURL;
				if (row.banner?.media) {
					let imageURL = `${BASE_URL}/${row.banner.media}`;
					return (
						<Image src={imageURL} width='80px' height={'80px'} />
					);
				} else {
					return <p>No FIle</p>;
					// imageURL = '';
				}
			},
			// sortable: true,
			// width: "6em",
		},
		{
			name: 'TITLE',
			selector: (row) => row.title,
			sortable: true,
			// wrap: true,
			// width: "6em",
		},
		{
			name: 'CATEGORY',
			selector: (row) => row.category,
			// sortable: true,
			wrap: true,
			width: '12em',
		},
		{
			name: 'STOCK',
			selector: (row) => row.stock,
			// sortable: true,
			// width: "6em",
		},
		{
			name: 'CARTOON',
			selector: (row) => row.cartoon,
			// sortable: true,
			// width: "6em",
		},
		{
			name: 'TRENDING',
			// selector: (row) => `${row.isTrending}`,
			cell: (row) => {
				return (
					<div
						className='trending'
						onClick={() =>
							toggle_trending(row.product_id, revalidate)
						}
					>
						{row.isTrending ? (
							<BsLightningChargeFill color='orange' size='16px' />
						) : (
							<BsLightningCharge size='16px' />
						)}
					</div>
				);
			},
			// sortable: true,
			// width: "6em",
		},
		{
			name: 'PRICE',
			selector: (row) => row.price,
			sortable: true,
			// width: "6em",
			wrap: true,
		},
		{
			name: 'MRP',
			selector: (row) => row.mrp,
			sortable: true,
			// width: "6em",
			wrap: true,
		},
		{
			name: 'DISCOUNT',
			selector: (row) => `${row.discount_percentage}%`,
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
						<i
							type='button'
							className='
								px-6
								py-2.5
								bg-blue-600
								text-white
								font-medium
								text-xs
								leading-tight
								uppercase
								rounded
								shadow-md
								hover:bg-blue-700 hover:shadow-lg
								focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
								active:bg-blue-800 active:shadow-lg
								transition
								duration-150
								ease-in-out'
							data-bs-toggle='tooltip'
							data-bs-placement='bottom'
							title='Add stock'
						>
							<BsBagPlusFill
								color='green'
								className='mx-3'
								size={17}
								onClick={() => handleStock(row)}
							/>
						</i>
						{/* <i
							type='button'
							className='
								px-6
								py-2.5
								bg-blue-600
								text-white
								font-medium
								text-xs
								leading-tight
								uppercase
								rounded
								shadow-md
								hover:bg-blue-700 hover:shadow-lg
								focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
								active:bg-blue-800 active:shadow-lg
								transition
								duration-150
								ease-in-out'
							data-bs-toggle='tooltip'
							data-bs-placement='bottom'
							title='Edit'
						>
							<BsPencilSquare
								color='blue'
								size={17}
								onClick={() => alert(`Edit Product`)}
							/>
						</i> */}
						<i
							type='button'
							className='
								px-6
								py-2.5
								bg-blue-600
								text-white
								font-medium
								text-xs
								leading-tight
								uppercase
								rounded
								shadow-md
								hover:bg-blue-700 hover:shadow-lg
								focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
								active:bg-blue-800 active:shadow-lg
								transition
								duration-150
								ease-in-out'
							data-bs-toggle='tooltip'
							data-bs-placement='bottom'
							title='Delete'
						>
							<BsTrash
								color='red'
								className='mx-3'
								size={17}
								onClick={() =>
									delete_product(row.product_id, revalidate)
								}
							/>
						</i>
					</>
				);
			},
			// sortable: true,
			width: '12em',
		},
	];
	// const filteredData = products.response.filter(

	if (isLoading) return <h1>Loading...</h1>;

	if (error) {
		if (error?.response?.status == 401)
			return <h1>Your Token is Expired Please Logout and Re-Login</h1>;

		return <h1>Error Occur</h1>;
	}

	console.log({ data });

	let filteredData = [];

	filteredData = data?.response?.filter(
		(item) =>
			(item.title &&
				item.title.toLowerCase().includes(filterText.toLowerCase())) ||
			(item.category &&
				item.category.toLowerCase().includes(filterText.toLowerCase()))
	);

	const handleStock = (row) => {
		console.log('hello', row);
		setStockModal(row);
		setShow(true);
	};

	const submitHandler = async (values) => {
		console.log('values ==>', values);
	};

	return (
		<>
			<h1>Product Page</h1>

			<FilterComponent
				filterText={filterText}
				setFilterText={setFilterText}
			/>

			<Card className='p-2'>
				<Table columns={columns} data={filteredData} />
			</Card>
			{show && (
				<AddStockModal
					show={show}
					setShow={setShow}
					submitHandler={submitHandler}
				/>
			)}
		</>
	);
};

export default ProductPage;
