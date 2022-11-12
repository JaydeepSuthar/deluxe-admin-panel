import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from 'react-router-dom';

const EditProductPage2 = () => {
	const navigate = useNavigate();
	const location = useLocation();

	console.log({ location });

	const [value, setValue] = useState(location.state.description || '');
	const [product_id, setProduct_id] = useState('');

	const handleSubmit = async (value) => {
		let fd = new FormData();

		fd.append('id', product_id);
		fd.append('description', value);

		try {
			const response = await axios.post('/product/update', fd);

			if (response.status == 200) {
				toast.success(`Product Description Updated Successfully`);
				navigate('/product/edit3', {
					state: location.state,
				});
			} else console.error(response);
		} catch (err) {
			console.log(`Err`);
			console.error(err);
		}
	};
	return (
		<>
			<div className='tw-w-full tw-h-[400px]'>
				<ReactQuill
					className='tw-h-full tw-w-full'
					theme='snow'
					value={value}
					onChange={(e) => {
						console.log(e);
						setValue(e);
					}}
				/>
			</div>

			<Button
				className='mt-5'
				onClick={() => {
					handleSubmit(value);
				}}
			>
				Save
			</Button>
		</>
	);
};

export default EditProductPage2;