import { Button, Image } from 'react-bootstrap';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useState } from 'react';
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
	const [files, setFiles] = useState([]);
	// const {
	// 	data: categoryList,
	// 	error: categoryError,
	// 	isLoading,
	// } = useFetch('/get_category_list');

	// if (isLoading) return <h1>Loading...</h1>;
	// if (categoryError) return <h1>Error</h1>;
	const categoryList = category.cat_list.map((item) => item.name);

	const handleProductImage = (files) => {
		const filesArr = [...files];

		// filesArr.forEach((item) => console.log(URL.createObjectURL(item)));
		setFiles(filesArr);
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

	return (
		<div>
			<Formik
				initialValues={{
					product_name: '',
					category: '',
					hsn: '',
					gst: '',
					price: 0,
					mrp: 0,
					cartoon: 0,
					stock: 0,
					dimensions: '',
					kilo: 0,
					gram: 0,
					youtube: '',
				}}
				validationSchema={ProductValidation}
				onSubmit={(values, { setSubmitting }) => {
					alert(JSON.stringify(values, null, 2));
					setSubmitting(false);
				}}
			>
				{({ errors, touched, isSubmitting }) => (
					<Form>
						<h1>Product level 1</h1>

						<div className='tw-flex lg:tw-flex-row tw-flex-col tw-gap-4'>
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

							<div className='product-form tw-flex-1'>
								<div style={{ width: '100%' }}>
									<div className=''>
										<label
											htmlFor='product_name'
											className='mt-3'
										>
											Product Name
										</label>
										<Field
											name='product_name'
											className='form-control'
											type='text'
										/>
										{errors.product_name &&
										touched.product_name ? (
											<div>{errors.product_name}</div>
										) : null}
										<label
											htmlFor='category'
											className='mt-3'
										>
											Category
										</label>
										<Field
											as='select'
											name='category'
											className='form-control'
										>
											<option value={null}>
												Select Category
											</option>
											{categoryList.map((item) => (
												<option value={item}>
													{item}
												</option>
											))}
										</Field>
									</div>
									<div className=''>
										<label htmlFor='hsn' className='mt-3'>
											HSN Number
										</label>
										<Field
											name='hsn'
											className='form-control'
											type='text'
										/>
									</div>

									<div className=''>
										<label htmlFor='gst' className='mt-3'>
											GST
										</label>
										<Field
											name='gst'
											className='form-control'
											type='text'
										/>
									</div>
									<div className=''>
										<label htmlFor='price' className='mt-3'>
											Price
										</label>
										<Field
											name='price'
											className='form-control'
											type='number'
										/>
									</div>
									<div className=''>
										<label htmlFor='mrp' className='mt-3'>
											MRP
										</label>
										<Field
											name='mrp'
											className='form-control'
											type='number'
										/>
									</div>
									<div className=''>
										<label
											htmlFor='cartoon'
											className='mt-3'
										>
											Cartoon
										</label>
										<Field
											name='cartoon'
											className='form-control'
											type='number'
										/>
									</div>
									<div className=''>
										<label htmlFor='stock' className='mt-3'>
											Stock
										</label>
										<Field
											name='stock'
											className='form-control'
											type='number'
										/>
									</div>
									<div className=''>
										<label
											htmlFor='dimensions'
											className='mt-3'
										>
											Dimensions
										</label>
										<Field
											name='dimensions'
											className='form-control'
											type='text'
										/>
									</div>

									<div className=''>
										<label htmlFor='kilo' className='mt-3'>
											Kilo
										</label>
										<Field
											name='kilo'
											className='form-control'
											type='number'
										/>
									</div>
									<div className=''>
										<label htmlFor='gram' className='mt-3'>
											Gram
										</label>
										<Field
											name='gram'
											className='form-control'
											type='number'
										/>
									</div>

									<div className=''>
										<label
											htmlFor='youtube'
											className='mt-3'
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
						</div>
					</Form>
				)}
			</Formik>{' '}
		</div>
	);
};

const SortableItem = (props) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: props.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<>
			<div ref={setNodeRef} style={style} {...attributes} {...listeners}>
				<Image src={props.src} width='100px' height='100px' />
			</div>
		</>
	);
};

export default AddProduct;
