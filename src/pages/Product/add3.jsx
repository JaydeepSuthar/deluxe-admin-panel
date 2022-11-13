import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import useLoaderStore from '../../store/loader';

const AddProductPage3 = () => {
	// const [files, setFiles] = useState([]);
	const navigate = useNavigate();

	const setLoading = useLoaderStore((state) => state.setLoading);

	const [files, setFiles] = useState([]);
	const [filesUrl, setFilesUrl] = useState();
	const [product_id, setProduct_id] = useState('');

	useEffect(() => {
		let productId = localStorage.getItem('product_id');
		setProduct_id(productId);
	}, []);

	const handleProductImage = (newFile) => {
		const filesArr = [...files, ...newFile];

		// filesArr.forEach((item) => console.log(URL.createObjectURL(item)));
		setFiles(filesArr);
		// setFilesUrl(URL.createObjectURL(file));
		// setFiles(files);
	};

	const handleSubmit = async () => {
		setLoading(true);

		if (files) {
			try {
				for (let i = 0; i < files.length; i++) {
					let fd = new FormData();
					fd.append('product_id', product_id);

					let fileType = files[i].type?.split('/')[0];
					fd.append('type', fileType);
					fd.append('priority', i);
					fd.append('gallery', files[i]);

					const response = await axios.put(
						'/update_media/gallery',
						fd
					);

					if (response.status != 200) {
						console.log(response);

						toast.error(`Error while Uploading Gallery`);
					} else {
						console.log(response);
						// toast.error(``)
					}
				}

				swal({
					title: 'Product successful added',
					text: 'Your product is successful inserted',
					icon: 'success',
				}).then(async () => {
					const publicProduct = await axios.put(
						`/publish/${product_id}`
					);
					setLoading(false);
					navigate('/product');
				});
			} catch (error) {
				console.error(error);
			}
		}

		setLoading(false);
	};

	return (
		<>
			<div className='upload-area tw-w-full lg:tw-h-72 tw-h-48 tw-mt-7 tw-rounded-md tw-border-gray-300 tw-text-gray-300 tw-font-bold tw-cursor-pointer tw-border-dashed tw-flex tw-justify-center tw-items-center tw-relative'>
				Add Gallary Image
				<input
					type='file'
					className='tw-opacity-0 tw-absolute tw-top-0 tw-left-0 tw-bottom-0 tw-right-0 tw-w-full tw-h-full tw-cursor-pointer'
					multiple
					accept='image/*,video/*'
					onChange={(e) => {
						// handleProductImage(e.target.files);
						handleProductImage(e.target.files);
					}}
				/>
			</div>

			<div className='image-preview tw-h-full tw-w-full tw-mb-2 tw-flex tw-flex-row tw-flex-wrap tw-gap-4 tw-p-3'>
				{/* {files.map((item, idx) => {
					let itemToURL = URL.createObjectURL(item);
					return (
						<img
							src={itemToURL}
							width={'100px'}
							height={'100px'}
							alt=''
						/>
					);
				})} */}

				{files?.length > 0 &&
					files.map((item, idx) => {
						let itemToURL = URL.createObjectURL(item);

						if (item?.type?.split('/')[0] == 'video') {
							return (
								<div className='tw-flex tw-flex-col'>
									<video
										width={'200px'}
										height={'200px'}
										muted
										controls
										playsInline
									>
										<source
											src={itemToURL}
											type={item?.type}
										/>
									</video>

									<button
										className='tw-bg-red-500 tw-p-1 tw-rounded tw-border-none tw-text-white'
										onClick={(e) => {
											e.preventDefault();
											let newFilesArr = files.filter(
												(file) => file.name != item.name
											);
											setFiles(newFilesArr);
										}}
									>
										Remove
									</button>
								</div>
							);
						}

						return (
							<div className='tw-flex tw-flex-col'>
								<img
									src={itemToURL}
									width={'200px'}
									height={'200px'}
								/>
								
								<button
									className='tw-bg-red-500 tw-p-1 tw-rounded tw-border-none tw-text-white'
									onClick={(e) => {
										e.preventDefault();
										let newFilesArr = files.filter(
											(file) => file.name != item.name
										);
										setFiles(newFilesArr);
									}}
								>
									Remove
								</button>
							</div>
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
