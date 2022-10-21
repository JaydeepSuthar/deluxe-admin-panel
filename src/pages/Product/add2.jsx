import { useState } from 'react';
import { Button } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

const AddProductPage2 = () => {
	const [value, setValue] = useState('');
	const navigate = useNavigate();

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
					console.log(value);
					navigate('/product/add3');
				}}
			>
				Save
			</Button>
		</>
	);
};

export default AddProductPage2;
