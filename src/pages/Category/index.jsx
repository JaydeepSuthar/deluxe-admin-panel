import { useState } from 'react';
import { Image, Card } from 'react-bootstrap';
import {
	BsLightningCharge,
	BsLightningChargeFill,
	BsPencilSquare,
	BsTrash,
} from 'react-icons/bs';
import swal from 'sweetalert';

import category from '../../../misc/category';
import Table from '../../components/data-table/DataTable';
import SearchFilter from '../../components/filters/SearchFilter';

const delete_category = (name) => {
	const deleteURL = `http://139.59.22.201/dashboard/delete_category?category_name=${name}`;

	swal({
		title: 'Are you sure?',
		text: 'Once deleted, you cannot not revert it',
		icon: 'error',
		buttons: true,
		dangerMode: true,
	}).then(async (value) => {
		if (value) {
			alert(`Category is Deleted`);
		}
	});
};

const columns = [
	{
		name: 'IMAGE',
		// selector: (row) => row.image,
		cell: (row) => {
			let imageURL = `${row.image}`;

			return <Image src={imageURL} width='80px' height={'80px'} />;
		},
		// sortable: true,
		// width: "6em",
	},
	{
		name: 'CATEGORY NAME',
		selector: (row) => row.name,
		sortable: true,
		// wrap: true,
		// width: "6em",
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
						onClick={() => alert(`Edit Category`)}
					/>

					<BsTrash
						color='red'
						className='mx-3'
						size={17}
						onClick={() => delete_category(row.name)}
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
const CategoryPage = () => {
	const [filterText, setFilterText] = useState('');

	const filteredData = category.cat_list.filter(
		(item) =>
			item.name &&
			item.name.toLowerCase().includes(filterText.toLowerCase())
	);

	return (
		<>
			<h1>Category Page</h1>

			<FilterComponent
				filterText={filterText}
				setFilterText={setFilterText}
			/>

			<Table columns={columns} data={filteredData} />
		</>
	);
};

export default CategoryPage;
