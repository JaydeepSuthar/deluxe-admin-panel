import { useState } from 'react';
import { Image, Card, Button } from 'react-bootstrap';
import {
	BsLightningCharge,
	BsLightningChargeFill,
	BsPencilSquare,
	BsTrash,
} from 'react-icons/bs';
import swal from 'sweetalert';
import { FaUserAlt } from 'react-icons/fa';

import Table from '../../components/data-table/DataTable';
import SearchFilter from '../../components/filters/SearchFilter';

import { useFetch } from '../../hooks';

const columns = [
	{
		name: 'PROFILE',
		// selector: (row) => row?.name,
		cell: (row) => {
			return (
				<>
					{row.profile_pic ? (
						<Image
							thumbnail={true}
							src={`http://139.59.22.201/api/user/${row.profile_pic}`}
							height={`60px`}
							width={`60px`}
						/>
					) : (
						<FaUserAlt size={`50%`} />
					)}
				</>
			);
		},
		// sortable: true,
		// wrap: true,
		// width: "6em",
	},
	{
		name: 'NAME',
		selector: (row) => row?.name,
		// sortable: true,
		// wrap: true,
		// width: "6em",
	},
	{
		name: 'MOBILE NUMBER',
		selector: (row) => row?.user_id,
		// sortable: true,
		// wrap: true,
		// width: "6em",
	},
	{
		name: 'COMPANY NAME',
		selector: (row) => row?.company_name,
	},
	{
		name: 'EMAIL',
		selector: (row) => row?.email,
	},
	{
		name: 'ADDRESS',
		selector: (row) => row?.address,
	},
];

//    {
//         "address": "Surat",
//         "company_name": "vvr",
//         "email": "viralvegad2001@gmail.com",
//         "landmark": "",
//         "name": "viral",
//         "pincode": null,
//         "profile_pic": "zocrobb83d517-7bcd-4dd7-b118-847b60d7f335.jpg",
//         "resident": "Surat",
//         "user_id": "9157893772"
//     },

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
			item?.name &&
			item?.name?.toLowerCase().includes(filterText.toLowerCase())
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
