import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import useLoaderStore from '../../store/loader';

const BASE_URL = 'http://139.59.22.201/api/static/product';

const EditProductPage3 = () => {
	// const [files, setFiles] = useState([]);
	const navigate = useNavigate();
	const location = useLocation();

	const setLoading = useLoaderStore((state) => state.setLoading);

	const [files, setFiles] = useState([]);
	const [newFiles, setNewFiles] = useState([]);
	const [product_id, setProduct_id] = useState('');

	useEffect(() => {
		setProduct_id(location.state?.product_id);
		setFiles(location.state?.gallery);

		console.log(location.state?.gallery);
	}, []);

	const handleProductImage = (newFile) => {
		const filesArr = [...newFiles, ...newFile];

		// filesArr.forEach((item) => console.log(URL.createObjectURL(item)));
		setNewFiles(filesArr);
		// setFilesUrl(URL.createObjectURL(file));
		// setFiles(files);
	};

	const handleSubmit = async () => {
		setLoading(true);

		if (newFiles) {
			try {
				for (let i = 0; i < newFiles.length; i++) {
					let fd = new FormData();
					fd.append('product_id', product_id);

					let fileType = newFiles[i].type?.split('/')[0];

					fd.append('type', fileType);
					fd.append('priority', i);
					fd.append('gallery', newFiles[i]);

					const response = await axios.put(
						'/update_media/gallery',
						fd
					);

					if (response.status != 200) {
						toast.error(`Error Uploading Gallery`)
						console.log(response);
					} else {
						console.log(response);
						// toast.error(``)
					}
				}
			} catch (error) {
				console.log(error, null, 2);
			}
		}

		swal({
			title: 'Product successful Updated',
			text: 'Your product is successful updated',
			icon: 'success',
		});

		navigate('/product');

		setLoading(false);
	};

	const delete_gallery_media = async (media) => {
		const url = `/delete_media/${media?.media_type}?media_id=${media?.id}&product_id=${location.state.product_id}`;

		const response = await axios(url);

		if (response.status == 200) {
			const newFilesArr = files.filter(
				(file) => file.media != media.media
			);

			setFiles(newFilesArr);

			toast.success(`${media?.media_type} successfully removed`);
		} else {
			console.log(response);
		}
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
						// let itemToURL = URL.createObjectURL(item);

						if (item?.media_type == 'video') {
							return (
								<div className='tw-flex tw-flex-col'>
									<video
										width={'200px'}
										height={'200px'}
										autoPlay
										muted
										controls
									>
										<source
											src={`${BASE_URL}/video/${item.media}`}
										/>
									</video>

									<button
										className='tw-bg-red-500 tw-p-1 tw-rounded tw-border-none tw-text-white'
										onClick={(e) => {
											e.preventDefault();

											delete_gallery_media(item);
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
									src={`${BASE_URL}/image/${item.media}`}
									width={'200px'}
									height={'200px'}
								/>

								<button
									className='tw-bg-red-500 tw-p-1 tw-rounded tw-border-none tw-text-white'
									onClick={(e) => {
										e.preventDefault();

										delete_gallery_media(item);
									}}
								>
									Remove
								</button>
							</div>
						);
					})}

				{newFiles?.length > 0 &&
					newFiles.map((item, idx) => {
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

											const newFilesArr = newFiles.filter(
												(file) => file.name != item.name
											);
											setNewFiles(newFilesArr);
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

										const newFilesArr = newFiles.filter(
											(file) => file.name != item.name
										);
										setNewFiles(newFilesArr);
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

export default EditProductPage3;
