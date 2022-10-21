import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const AddProductPage3 = () => {
	const [files, setFiles] = useState([]);
	const navigate = useNavigate();

	const handleProductImage = (files) => {
		console.log(files);
		const filesArr = [...files];

		setFiles(filesArr);
	};

	const handleSubmit = () => {
		swal({
			title: 'Product successful added',
			text: 'Your product is successful inserted',
			icon: 'success',
			buttons: true,
			dangerMode: true,
		}).then(async (value) => {
			if (value) {
				navigate('/product');
			}
		});
	};

	return (
		<>
			<div className='upload-area tw-w-full lg:tw-w-96 lg:tw-h-72 tw-h-48 tw-mt-7 tw-rounded-md tw-border-gray-300 tw-text-gray-300 tw-font-bold tw-cursor-pointer tw-border-dashed tw-flex tw-justify-center tw-items-center tw-relative'>
				Add Product Image
				<input
					type='file'
					className='tw-opacity-0 tw-absolute tw-top-0 tw-left-0 tw-bottom-0 tw-right-0 tw-w-full tw-h-full tw-cursor-pointer'
					multiple
					onChange={(e) => {
						handleProductImage(e.target.files);
					}}
				/>
			</div>

			<div className='image-preview tw-h-full tw-w-full tw-mb-2 tw-flex tw-flex-row tw-gap-4 tw-p-3'>
				{files.map((item, idx) => {
					let itemToURL = URL.createObjectURL(item);
					return (
						<img
							src={itemToURL}
							width={'100px'}
							height={'100px'}
							alt=''
						/>
					);
				})}
			</div>
			<div>
				<Button
					className='mt-5'
					onClick={() => {
						handleSubmit();
					}}
				>
					Save
				</Button>
			</div>
		</>
	);
};

export default AddProductPage3;
