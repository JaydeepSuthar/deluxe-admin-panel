import { useState } from 'react';
import { Image, Card, Button } from 'react-bootstrap';
import {
	BsLightningCharge,
	BsLightningChargeFill,
	BsPencilSquare,
	BsTrash,
} from 'react-icons/bs';
import swal from 'sweetalert';

import Table from '../../components/data-table/DataTable';
import SearchFilter from '../../components/filters/SearchFilter';

import { useFetch } from '../../hooks';

const columns = [
	{
		name: 'MOBILE NUMBER',
		selector: (row) => row?.mob_num,
		sortable: true,
		// wrap: true,
		// width: "6em",
	},
];

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
				</div>
			</Card>
		</>
	);
};

const UserPage = () => {
	const [filterText, setFilterText] = useState('');

	const { data, error, isLoading } = useFetch('get_user');

	if (isLoading) return <h1>Loading...</h1>;
	if (error) return <h1>Error...</h1>;

	const filteredData = data?.users?.filter(
		(item) =>
			item?.mob_num &&
			item?.mob_num?.toLowerCase().includes(filterText.toLowerCase())
	);

	return (
		<>
			<h1>User Page</h1>

			<FilterComponent
				filterText={filterText}
				setFilterText={setFilterText}
			/>

			<Card className='p-2'>
				<Table columns={columns} data={filteredData} />
			</Card>
		</>
	);
};

export default UserPage;
