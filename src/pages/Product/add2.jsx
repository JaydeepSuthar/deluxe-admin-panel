import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import useLoaderStore from '../../store/loader';

const AddProductPage2 = () => {
	const loaderLoading = useLoaderStore((state) => state.isLoading);
	const setLoading = useLoaderStore((state) => state.setLoading);

	const [value, setValue] = useState('');
	const [product_id, setProduct_id] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		let productId = localStorage.getItem('product_id');
		setProduct_id(productId);
	}, []);

	const handleSubmit = async (value) => {
		if (loaderLoading) return;

		setLoading(true);

		try {
			let fd = new FormData();
			fd.append('product_id', product_id);
			fd.append('description', value);

			const response = await axios.put('/description', fd);
			console.log('response==>', response);
			if (response.status == 200) {
				console.log(response.data);
				navigate('/product/add3');
			} else {
				alert(JSON.stringify(response, null, 2));
			}
		} catch (error) {
			alert(JSON.stringify(error, null, 2));
		}

		setLoading(false);
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
				disabled={loaderLoading}
			>
				Save
			</Button>
		</>
	);
};

export default AddProductPage2;
