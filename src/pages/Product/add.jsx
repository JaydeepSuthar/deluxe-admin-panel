import { Button, Image } from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import React, { useMemo } from 'react';
import { useState, useEffect } from 'react';
import * as Yup from 'yup';

import category from '../../../misc/category';

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
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

const AddProduct = () => {
	// const [files, setFiles] = useState([]);
	const [files, setFiles] = useState([]);
	const [filesUrl, setFilesUrl] = useState('');
	const [product_id, setProduct_id] = useState('');

	const navigate = useNavigate();

	// useEffect(() => {
	// 	let fd2 = new FormData();
	// 	fd2.append('product_id', '5a7ba345-b614-45cd-bb2a-aa5d82daf590');
	// 	fd2.append('type', 'image');
	// 	fd2.append('priority', 0);
	// 	fd2.append('banner', files);

	// 	const api = async () => {
	// 		const bannerApi = await axios.put('/update_media/banner', fd2);
	// 		if (bannerApi.status == 200) {
	// 			console.log(bannerApi);
	// 			alert(JSON.stringify(bannerApi, null, 2));
	// 			// navigate('/product/add2');
	// 		} else {
	// 			alert(JSON.stringify(bannerApi, null, 2));
	// 		}
	// 	};
	// 	api();
	// }, [files]);

	const {
		data: category,
		error: categoryError,
		isLoading,
	} = useFetch('/get_category_list');

	if (isLoading) return <h1>Loading...</h1>;
	if (categoryError) return <h1>Error</h1>;

	const categoryList = category.cat_list.map((item) => item.name);

	const handleProductImage = (newFile) => {
		const filesArr = [...files, ...newFile];

		// filesArr.forEach((item) => console.log(URL.createObjectURL(item)));
		setFiles(filesArr);
		setFilesUrl(URL.createObjectURL(file));
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
		try {
			// console.log('hello 111');
			const response = await axios.get('get_new_product_id');
			// console.log('hello', response);

			if (response.status == 200) {
				localStorage.setItem('product_id', response.data.id);
				console.log(response.data.id);
				setProduct_id(response.data.id);
				let fd = new FormData();
				// p_id="5a7ba345-b614-45cd-bb2a-aa5d82daf590"
				fd.append('product_id', response.data.id);
				fd.append('product_name', values.product_name);
				fd.append('category', values.category);
				fd.append('hsn', values.hsn);
				fd.append('gst', values.gst);
				fd.append('price', values.price);
				fd.append('product_id', response.data.id);
				fd.append('mrp', values.mrp);
				fd.append('cartoon', values.cartoon);
				fd.append('stock', values.stock);
				fd.append('dimensions', values.dimensions);
				fd.append('kilo', values.kilo);
				fd.append('gram', values.gram);
				fd.append('youtube', values.youtube);

				const product1 = await axios.post('init_product', fd);

				if (product1.status == 200) {
					console.log(product1);
					let fd2 = new FormData();

					fd2.append('product_id', response.data.id);
					fd2.append('type', 'image');

					for (let i = 0; i < files.length; i++) {
						fd2.append('priority', i);
						fd2.append('banner', files[i]);
						const bannerApi = await axios.put(
							'/update_media/banner',
							fd2
						);

						if (bannerApi.status == 200) {
							console.log(bannerApi);
							// alert(JSON.stringify(bannerApi, null, 2));
							navigate('/product/add2');
						} else {
							console.log(`banner api`);
							// alert(JSON.stringify(bannerApi, null, 2));
							console.error(bannerApi);
						}
					}
				} else {
					console.log(`product 1`);
					alert(JSON.stringify(product1, null, 2));
				}
			} else {
				console.log(`else`);
				alert(JSON.stringify(response, null, 2));
			}
		} catch (error) {
			console.log(`catch`);
			alert(JSON.stringify(error, null, 2));
		}
		// setSubmitting(false);
	};

	return (
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

							<div className='image-preview tw-h-full tw-w-full tw-mb-2 tw-flex tw-flex-row flex-wrap tw-gap-4 tw-p-3'>
								<DndContext
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
								</DndContext>
							</div>
						</div>
					</Form>
				)}
			</Formik>{' '}
			<Formik
				initialValues={{
					product_name: '',
					category: '',
					hsn: '',
					gst: '',
					price: '',
					mrp: '',
					cartoon: '',
					stock: '',
					dimensions: '',
					kilo: '',
					gram: '',
					youtube: '',
				}}
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
									<label
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
											(errors.category && touched.category
												? ' is-invalid'
												: '')
										}
									>
										<option value={null}>
											Select Category
										</option>
										{categoryList.map((item) => (
											<option value={item}>{item}</option>
										))}
									</Field>
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
											(errors.cartoon && touched.cartoon
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
										htmlFor='kilo'
										className='mt-3'
										style={{
											fontWeight: '600',
											color: 'hsl(0deg 0% 50%)',
										}}
									>
										Kilo
									</label>
									<Field
										name='kilo'
										className={
											'form-control' +
											(errors.kilo && touched.kilo
												? ' is-invalid'
												: '')
										}
										type='number'
									/>
								</div>
								<div className=''>
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
								</div>

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
	);
};

const SortableItem = React.memo((props) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: props.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<>
			<div ref={setNodeRef} style={style} {...attributes} {...listeners}>
				{props.id?.type?.split('/')[0] == 'video' ? (
					<video
						width={'100px'}
						height={'100px'}
						muted
						controls
						playsInline
					>
						<source src={props.src} type={props.id?.type} />
					</video>
				) : (
					<Image src={props.src} width='100px' height='100px' />
				)}
			</div>
		</>
	);
});

export default AddProduct;
