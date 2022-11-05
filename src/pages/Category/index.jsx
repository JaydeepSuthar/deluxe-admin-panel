import axios from 'axios';
import { useState, useEffect } from 'react';
import { Image, Card, Button } from 'react-bootstrap';
import {
	BsLightningCharge,
	BsLightningChargeFill,
	BsPencilSquare,
	BsTrash,
} from 'react-icons/bs';
import swal from 'sweetalert';

// import category from '../../../misc/category';
import Table from '../../components/data-table/DataTable';
import SearchFilter from '../../components/filters/SearchFilter';
import AddCategoryModal from '../../components/model/AddCategoryModal';

const delete_category = (name) => {
	const deleteURL = `delete_category?category_name=${name}`;

	swal({
		title: 'Are you sure?',
		text: 'Once deleted, you cannot not revert it',
		icon: 'error',
		buttons: true,
		dangerMode: true,
	}).then(async (value) => {
		if (value) {
			// alert(`Category is Deleted`);

			const response = await axios.get(deleteURL);

			if (response.status == 200) {
				alert(`Category is Deleted`);
				window.location.reload();
			} else {
				alert(JSON.stringify(response));
			}
		}
	});
};

const columns = [
	{
		name: 'IMAGE',
		// selector: (row) => row.image,
		cell: (row) => {
			let imageURL = `${row.image}`;

			return (
				<Image
					src={imageURL}
					width='80px'
					height={'80px'}
					style={{ borderRadius: '25%' }}
				/>
			);
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
					{/* <BsPencilSquare
						color='blue'
						size={17}
						onClick={() => alert(`Edit Category`)}
					/> */}

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

const FilterComponent = ({ filterText, setFilterText, setShow }) => {
	return (
		<>
			<Card className='mb-3 p-4 d-flex flex-row justify-content-end'>
				<div>
					<SearchFilter
						filterText={filterText}
						onFilter={(e) => setFilterText(e.target.value)}
						className='mx-3'
					/>

					<Button
						className='tw-bg-indigo-700 hover:tw-bg-indigo-600'
						size='sm'
						onClick={() => setShow(true)}
					>
						Add Category
					</Button>
				</div>
			</Card>
		</>
	);
};
const CategoryPage = () => {
	const [filterText, setFilterText] = useState('');
	const [data, setData] = useState([]);
	const [show, setShow] = useState(false);

	useEffect(() => {
		const apiCall = async () => {
			try {
				const response = await axios.get('/get_category_list');

				if (response.status == 200) {
					console.log(
						'Category api data==>',
						response?.data?.cat_list
					);
					setData(response?.data?.cat_list);
					// window.location.reload();
				} else {
					alert(JSON.stringify(response, null, 2));
					console.log({ response });
				}
			} catch (err) {
				console.log({ err });
			}
		};
		apiCall();
	}, []);

	const addCategory = async (values) => {
		console.log({ values });

		const fd = new FormData();

		fd.append('category_name', values.category_name);
		fd.append('catimg', values.catimg[0]);

		try {
			const response = await axios.post('/add_category', fd);
			console.log('category add=>', response);
			if (response.status == 200) {
				console.log('Category api data==>', response);
				window.location.reload();
			} else {
				alert(JSON.stringify(response, null, 2));
				console.log({ response });
			}
		} catch (error) {
			alert(JSON.stringify(error, null, 2));
		}
		setShow(false);
	};

	// const filteredData = category.cat_list.filter(
	const filteredData = data.filter(
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
				setShow={setShow}
			/>

			<Table columns={columns} data={filteredData} />

			{show && (
				<AddCategoryModal
					show={show}
					setShow={setShow}
					submitHandler={addCategory}
				/>
			)}
		</>
	);
};

export default CategoryPage;
