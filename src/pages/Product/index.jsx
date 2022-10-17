import { useState } from 'react';
import { Image, Card } from 'react-bootstrap';
import {
	BsLightningCharge,
	BsLightningChargeFill,
	BsPencilSquare,
	BsTrash,
} from 'react-icons/bs';
import swal from 'sweetalert';

import products from '../../../misc/product';
import Table from '../../components/data-table/DataTable';
import SearchFilter from '../../components/filters/SearchFilter';

const BASE_URL = `http://139.59.22.201/api/static/product/image`;

const toggle_trending = async (id) => {
	const url = `http://139.59.22.201/dashboard/product_toogle_trending?product_id=${id}`;

	alert('Product is now Trending');

	// try {
	// 	const response = await axios.get(url);

	// 	if (response.status == 200) {
	// 		alert(`Trending`);
	// 		window.location.reload();
	// 	} else {
	// 		console.log({ response });
	// 	}
	// } catch (err) {
	// 	console.log({ err });
	// }
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

const columns = [
	{
		name: 'IMAGE',
		selector: (row) => row.banner.media,
		cell: (row) => {
			let imageURL = `${BASE_URL}/${row.banner.media}`;

			return <Image src={imageURL} width='80px' height={'80px'} />;
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
					onClick={() => toggle_trending(row.product_id)}
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
					<BsPencilSquare
						color='blue'
						size={17}
						onClick={() => alert(`Edit Product`)}
					/>

					<BsTrash
						color='red'
						className='mx-3'
						size={17}
						onClick={() => delete_product(row.product_id)}
					/>
				</>
			);
		},
		// sortable: true,
		width: '12em',
	},
];

const FilterComponent = ({ filterText, setFilterText }) => {
	return (
		<>
			<Card className='mb-3 p-4 d-flex flex-row justify-content-end'>
				<div>
					{/* <input type='search' name='' id='' /> */}
					<SearchFilter
						filterText={filterText}
						onFilter={(e) => setFilterText(e.target.value)}
					/>
				</div>
			</Card>
		</>
	);
};

const ProductPage = () => {
	const [filterText, setFilterText] = useState('');

	const filteredData = products.response.filter(
		(item) =>
			(item.title &&
				item.title.toLowerCase().includes(filterText.toLowerCase())) ||
			(item.category &&
				item.category.toLowerCase().includes(filterText.toLowerCase()))
	);

	return (
		<>
			<h1>Product Page</h1>

			<FilterComponent
				filterText={filterText}
				setFilterText={setFilterText}
			/>

			<Table columns={columns} data={filteredData} />
		</>
	);
};

export default ProductPage;
