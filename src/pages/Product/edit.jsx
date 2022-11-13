import { Button, Image, Modal } from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import React, { useMemo } from 'react';
import { useState, useEffect } from 'react';
import * as Yup from 'yup';

import { AiOutlineClose } from 'react-icons/ai';

import { useFetch } from '../../hooks';

import { DndContext, closestCenter } from '@dnd-kit/core';

import {
	arrayMove,
	SortableContext,
	verticalListSortingStrategy,
	horizontalListSortingStrategy,
	useSortable,
} from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const ProductValidation = Yup.object().shape({
	product_name: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Required'),
	category: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Required'),
	hsn: Yup.string(),
	gst: Yup.string(),
	price: Yup.number().required('Price must be require'),
	mrp: Yup.number().required('MRP must be require'),
	cartoon: Yup.number().required(),
	stock: Yup.number().required(),
	dimensions: Yup.string(),
	kilo: Yup.number(),
	gram: Yup.number(),
	youtube: Yup.string(),
});

const BASE_URL = 'http://139.59.22.201/api/static/product';

const EditProduct = () => {
	const navigate = useNavigate();
	const location = useLocation();
	// const [files, setFiles] = useState([]);
	const [files, setFiles] = useState(location.state?.banners || []);
	const [newFiles, setNewFiles] = useState([]);
	const [filesUrl, setFilesUrl] = useState('');
	const [product_id, setProduct_id] = useState('');

	const [show, setShow] = useState(false);

	// const productData = {
	// 	...location.state,
	// 	product_name: location.state?.title,
	// };

	const {
		data: category,
		error: categoryError,
		isLoading: categoryLoading,
	} = useFetch('/get_category_list');

	const { data, error, isLoading, revalidate } = useFetch(
		`/product/desc/${location.state.product_id}`,
		{
			revalidateOnFocus: true,
			revalidateOnMount: true,
			revalidateOnReconnect: true,
			revalidateIfStale: true,
		}
	);

	const handleProductImage = (newFile) => {
		const filesArr = [...newFiles, ...newFile];

		// filesArr.forEach((item) => console.log(URL.createObjectURL(item)));
		setNewFiles(filesArr);
		setFilesUrl(URL.createObjectURL(newFiles));

		// setFiles(files);
	};

	const handleDragEnd = (event) => {
		console.log(event);

		const { active, over } = event;

		if (active.id !== over.id) {
			setFiles((items) => {
				const activeIndex = items.indexOf(active.id);
				const overIndex = items.indexOf(over.id);

				return arrayMove(items, activeIndex, overIndex);
			});
		}
	};

	const handleSubmit = async (values) => {
		let fd = new FormData();
		// p_id="5a7ba345-b614-45cd-bb2a-aa5d82daf590"
		fd.append('id', location.state.product_id);
		fd.append('name', values.product_name);
		fd.append('category', values.category);
		fd.append('hsn', values.hsn);
		fd.append('gst', values.gst);
		fd.append('price', values.price);
		fd.append('mrp', values.mrp);
		fd.append('cartoon', values.cartoon);
		fd.append('stock', values.stock);
		fd.append('dimensions', values.dimensions);
		fd.append('weight', values.weight);
		// fd.append('gram', values.gram);
		fd.append('youtube', values.youtube);

		try {
			for (let i = 0; i < newFiles.length; i++) {
				let nfd = new FormData();
				nfd.append('product_id', location.state.product_id);
				let fileType = newFiles[i].type?.split('/')[0];
				nfd.append('type', fileType);
				nfd.append('priority', i);
				nfd.append('banner', newFiles[i]);

				const bannerResponse = await axios.put(
					'/update_media/banner',
					nfd
				);

				if (bannerResponse.status != 200) {
					console.error(bannerResponse);
				}
			}

			const response = await axios.post('/product/update', fd);

			if (response.status == 200) {
				toast.success(`Product Updated Successfully`);
				navigate('/product/edit2', {
					state: data?.response,
				});
			} else console.error(response);
		} catch (err) {
			console.log(`Err`);
			console.error(err);
		}

		// setSubmitting(false);
	};

	const delete_gallery_media = async (media) => {
		const url = `/delete_media/${media?.media_type}?media_id=${media?.id}&product_id=${location.state.product_id}`;

		const response = await axios(url);
		// console.log({ files });
		if (response.status == 200) {
			revalidate();

			toast.success(`${media?.media_type} successfully removed`);
		} else {
			console.log(response);
		}
	};

	if (categoryLoading) return <h1>Loading Category</h1>;
	if (categoryError) return <h1>Error in Category</h1>;

	if (isLoading) return <h1>Loading Product Details</h1>;
	if (error) return <h1>Error while Fetching Product Data</h1>;

	const splitedWeight = data?.response?.weight.toString().split('.');

	const productData = {
		...data?.response,
		product_name: data?.response?.title,
		youtube: data?.response?.youtube_link,
	};

	const categoryList = category.cat_list.map((item) => item.name);

	console.log({ productData });
	console.log(location.state?.banner);

	return (
		<>
			<div>
				<h1>Product level 1</h1>
				<Formik>
					{({ errors, touched, isSubmitting, resetForm }) => (
						<Form>
							<div className='tw-flex tw-flex-col tw-gap-4'>
								<div className='upload-area tw-w-full lg:tw-h-72 tw-h-48 tw-mt-7 tw-rounded-md tw-border-gray-300 tw-text-gray-300 tw-font-bold tw-cursor-pointer tw-border-dashed tw-flex tw-justify-center tw-items-center tw-relative'>
									Add Product Image
									<input
										type='file'
										className='tw-opacity-0 tw-absolute tw-top-0 tw-left-0 tw-bottom-0 tw-right-0 tw-w-full tw-h-full tw-cursor-pointer'
										accept='image/*,video/*'
										multiple
										onChange={(e) => {
											handleProductImage(e.target.files);
										}}
									/>
								</div>

								<div className='image-preview tw-h-full tw-w-full tw-mb-2 tw-flex tw-flex-row flex-wrap tw-gap-4 tw-p-3 tw-bg-gray-100'>
									<DndContext
										collisionDetection={closestCenter}
										onDragEnd={handleDragEnd}
									>
										<SortableContext
											items={files}
											strategy={
												horizontalListSortingStrategy
											}
										>
											{productData?.banners?.map(
												(item) => {
													return (
														<div className='tw-flex tw-flex-col'>
															<SortableItem
																key={item.media}
																id={item}
																src={item.media}
																isUpdate={true}
															/>

															<button
																className='tw-bg-red-500 tw-p-1 tw-rounded tw-border-none tw-text-white'
																onClick={(
																	e
																) => {
																	e.preventDefault();

																	delete_gallery_media(
																		item
																	);
																}}
															>
																Remove
															</button>
														</div>
													);
												}
											)}

											{newFiles.map((item, idx) => {
												let itemToURL =
													URL.createObjectURL(item);
												return (
													<div className='tw-flex tw-flex-col'>
														<SortableItem
															key={itemToURL}
															id={item}
															src={itemToURL}
														/>

														<button
															className='tw-bg-red-500 tw-p-1 tw-rounded tw-border-none tw-text-white'
															onClick={(e) => {
																e.preventDefault();

																const newFilesArr =
																	newFiles.filter(
																		(
																			file
																		) =>
																			file.name !=
																			item.name
																	);
																setNewFiles(
																	newFilesArr
																);
															}}
														>
															Remove
														</button>
													</div>
												);
											})}
										</SortableContext>
									</DndContext>
								</div>
							</div>
						</Form>
					)}
				</Formik>{' '}
				<Formik
					initialValues={productData}
					enableReinitialize={true}
					validationSchema={ProductValidation}
					onSubmit={(values, { setSubmitting }) => {
						// alert(JSON.stringify(values, null, 2));
						handleSubmit(values);
						setSubmitting(false);
					}}
				>
					{({ errors, touched, isSubmitting, resetForm }) => (
						<Form>
							<div className='tw-flex lg:tw-flex-row tw-flex-col tw-gap-4'>
								{/* <div className='upload-area tw-w-full lg:tw-w-96 lg:tw-h-72 tw-h-48 tw-mt-7 tw-rounded-md tw-border-gray-300 tw-text-gray-300 tw-font-bold tw-cursor-pointer tw-border-dashed tw-flex tw-justify-center tw-items-center tw-relative'>
								Add Product Image
								<input
									type='file'
									className='tw-opacity-0 tw-absolute tw-top-0 tw-left-0 tw-bottom-0 tw-right-0 tw-w-full tw-h-full tw-cursor-pointer'
									multiple
									onChange={(e) => {
										handleProductImage(e.target.files[0]);
									}}
								/>
							</div>
 */}
								<div className='image-preview tw-h-full tw-w-full tw-mb-2 tw-flex tw-flex-row flex-wrap tw-gap-4 tw-p-3'>
									{/* <DndContext
									collisionDetection={closestCenter}
									onDragEnd={handleDragEnd}
								>
									<SortableContext
										items={files}
										strategy={horizontalListSortingStrategy}
									>
										{files.map((item, idx) => {
											let itemToURL =
												URL.createObjectURL(item);
											return (
												<SortableItem
													key={itemToURL}
													id={item}
													src={itemToURL}
												/>
											);
										})}
									</SortableContext>
								</DndContext> */}
									{/* <SorttableImageMemo /> */}
								</div>
							</div>
							<div className='product-form tw-flex-1'>
								<div style={{ width: '100%' }}>
									<div className=''>
										<label
											htmlFor='product_name'
											className='mt-3'
											style={{
												fontWeight: '600',
												color: 'hsl(0deg 0% 50%)',
											}}
										>
											Product Name
										</label>
										<Field
											name='product_name'
											className={
												'form-control' +
												(errors.product_name &&
												touched.product_name
													? ' is-invalid'
													: '')
											}
											type='text'
										/>
										{/* {errors.product_name &&
									touched.product_name ? (
										<div>{errors.product_name}</div>
									) : null} */}
										{/* <label
											htmlFor='category'
											className='mt-3'
											style={{
												fontWeight: '600',
												color: 'hsl(0deg 0% 50%)',
											}}
										>
											Category
										</label>
										<Field
											as='select'
											name='category'
											className={
												'form-control' +
												(errors.category &&
												touched.category
													? ' is-invalid'
													: '')
											}
										>
											<option value={null}>
												Select Category
											</option>
											{categoryList.map((item) => (
												<option value={item}>
													{item}
												</option>
											))}
										</Field> */}
									</div>
									<div className=''>
										<label
											htmlFor='hsn'
											className='mt-3'
											style={{
												fontWeight: '600',
												color: 'hsl(0deg 0% 50%)',
											}}
										>
											HSN Number
										</label>
										<Field
											name='hsn'
											className={
												'form-control' +
												(errors.hsn && touched.hsn
													? ' is-invalid'
													: '')
											}
											type='text'
										/>
									</div>

									<div className=''>
										<label
											htmlFor='gst'
											className='mt-3'
											style={{
												fontWeight: '600',
												color: 'hsl(0deg 0% 50%)',
											}}
										>
											GST
										</label>
										<Field
											name='gst'
											className={
												'form-control' +
												(errors.gst && touched.gst
													? ' is-invalid'
													: '')
											}
											type='text'
										/>
									</div>
									<div className=''>
										<label
											htmlFor='price'
											className='mt-3'
											style={{
												fontWeight: '600',
												color: 'hsl(0deg 0% 50%)',
											}}
										>
											Price
										</label>
										<Field
											name='price'
											className={
												'form-control' +
												(errors.price && touched.price
													? ' is-invalid'
													: '')
											}
											type='number'
										/>
									</div>
									<div className=''>
										<label
											htmlFor='mrp'
											className='mt-3'
											style={{
												fontWeight: '600',
												color: 'hsl(0deg 0% 50%)',
											}}
										>
											MRP
										</label>
										<Field
											name='mrp'
											className={
												'form-control' +
												(errors.mrp && touched.mrp
													? ' is-invalid'
													: '')
											}
											type='number'
										/>
									</div>
									<div className=''>
										<label
											htmlFor='cartoon'
											className='mt-3'
											style={{
												fontWeight: '600',
												color: 'hsl(0deg 0% 50%)',
											}}
										>
											Cartoon
										</label>
										<Field
											name='cartoon'
											className={
												'form-control' +
												(errors.cartoon &&
												touched.cartoon
													? ' is-invalid'
													: '')
											}
											type='number'
										/>
									</div>
									<div className=''>
										<label
											htmlFor='stock'
											className='mt-3'
											style={{
												fontWeight: '600',
												color: 'hsl(0deg 0% 50%)',
											}}
										>
											Stock
										</label>
										<Field
											name='stock'
											className={
												'form-control' +
												(errors.stock && touched.stock
													? ' is-invalid'
													: '')
											}
											type='number'
										/>
									</div>
									<div className=''>
										<label
											htmlFor='dimensions'
											className='mt-3'
											style={{
												fontWeight: '600',
												color: 'hsl(0deg 0% 50%)',
											}}
										>
											Dimensions
										</label>
										<Field
											name='dimensions'
											className={
												'form-control' +
												(errors.dimensions &&
												touched.dimensions
													? ' is-invalid'
													: '')
											}
											type='text'
										/>
									</div>

									<div className=''>
										<label
											htmlFor='weight'
											className='mt-3'
											style={{
												fontWeight: '600',
												color: 'hsl(0deg 0% 50%)',
											}}
										>
											Weight
										</label>
										<Field
											name='weight'
											className={
												'form-control' +
												(errors.weight && touched.weight
													? ' is-invalid'
													: '')
											}
											type='number'
										/>
									</div>
									{/* <div className=''>
										<label
											htmlFor='gram'
											className='mt-3'
											style={{
												fontWeight: '600',
												color: 'hsl(0deg 0% 50%)',
											}}
										>
											Gram
										</label>
										<Field
											name='gram'
											className={
												'form-control' +
												(errors.gram && touched.gram
													? ' is-invalid'
													: '')
											}
											type='number'
										/>
									</div> */}

									<div className=''>
										<label
											htmlFor='youtube'
											className='mt-3'
											style={{
												fontWeight: '600',
												color: 'hsl(0deg 0% 50%)',
											}}
										>
											Youtube
										</label>
										<Field
											name='youtube'
											className='form-control'
											type='text'
										/>
									</div>
									{/* <div class='file-upload-wrapper'>
										<input
											type='file'
											id='input-file-max-fs'
											className='file-upload'
											data-max-file-size='2M'
										/>
									</div> */}
									<div className=''>
										<button
											type='submit'
											className='btn btn-primary mt-2'
											disabled={isSubmitting}
										>
											{isSubmitting
												? 'Please wait...'
												: 'Submit'}
										</button>
									</div>
								</div>
							</div>
						</Form>
					)}
				</Formik>{' '}
			</div>

			{/* <ProductImageModal
				files={files}
				handleDragEnd={handleDragEnd}
				closestCenter={closestCenter}
				handleProductImage={handleProductImage}
			/> */}
		</>
	);
};

// const SortableItem = React.memo((props) => {
// 	const { files, setFiles, id: item } = props;

// 	const { attributes, listeners, setNodeRef, transform, transition } =
// 		useSortable({ id: props.id });

// 	const style = {
// 		transform: CSS.Transform.toString(transform),
// 		transition,
// 	};

// 	return (
// 		<>
// 			<div ref={setNodeRef} style={style} {...attributes} {...listeners}>
// 				{props.id?.type?.split('/')[0] == 'video' ? (
// 					<video
// 						width={'200px'}
// 						height={'200px'}
// 						autoPlay
// 						muted
// 						controls
// 					>
// 						<source src={props.src} type={props.id?.type} />
// 					</video>
// 				) : (
// 					<Image src={props.src} width='200px' height='200px' />
// 				)}
// 			</div>
// 		</>
// 	);
// });

const SortableItem = React.memo((props) => {
	const { files, setFiles, id: item } = props;

	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: props.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<>
			<div ref={setNodeRef} style={style} {...attributes} {...listeners}>
				{props.isUpdate ? (
					<OldItem {...props} />
				) : (
					<NewItem {...props} />
				)}
			</div>
		</>
	);
});

const NewItem = (props) => {
	return props.id?.type?.split('/')[0] == 'video' ? (
		<video width={'200px'} height={'200px'} autoPlay muted controls>
			<source src={props.src} type={props.id?.type} />
		</video>
	) : (
		<Image src={props.src} width='200px' height='200px' />
	);
};

const OldItem = (props) => {
	return props.id?.media_type == 'video' ? (
		<video width={'200px'} height={'200px'} autoPlay muted controls>
			<source src={`${BASE_URL}/video/${props.src}`} />
		</video>
	) : (
		<Image
			src={`${BASE_URL}/image/${props.src}`}
			width='200px'
			height='200px'
		/>
	);
};

const OldSortableItem = React.memo((props) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: props.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<>
			<div ref={setNodeRef} style={style} {...attributes} {...listeners}>
				{props.id?.media_type == 'video' ? (
					<video
						width={'200px'}
						height={'200px'}
						autoPlay
						muted
						controls
					>
						<source src={`${BASE_URL}/video/${props.src}`} />
					</video>
				) : (
					<Image
						src={`${BASE_URL}/image/${props.src}`}
						width='200px'
						height='200px'
					/>
				)}
			</div>
		</>
	);
});

export default EditProduct;
