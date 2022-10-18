import { Button } from 'bootstrap';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

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
						<div style={{ width: '500px' }}>
							<div className=''>
								<label htmlFor='product_name' className='mt-3'>
									Product Name
								</label>
								<Field
									name='product_name'
									className='form-control'
									type='text'
								/>
								{errors.product_name && touched.product_name ? (
									<div>{errors.product_name}</div>
								) : null}
								{/* </div>
						<div className=''> */}
								<label htmlFor='category' className='mt-3'>
									Category
								</label>
								<Field
									name='category'
									className='form-control'
									type='text'
								/>
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
								<label htmlFor='cartoon' className='mt-3'>
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
								<label htmlFor='dimensions' className='mt-3'>
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
								<label htmlFor='youtube' className='mt-3'>
									Youtube
								</label>
								<Field
									name='youtube'
									className='form-control'
									type='text'
								/>
							</div>
							<div class='file-upload-wrapper'>
								<input
									type='file'
									id='input-file-max-fs'
									className='file-upload'
									data-max-file-size='2M'
								/>
							</div>
							<div className=''>
								<button
									type='submit'
									className='btn btn-primary'
									disabled={isSubmitting}
								>
									{isSubmitting ? 'Please wait...' : 'Submit'}
								</button>
							</div>
						</div>
					</Form>
				)}
			</Formik>{' '}
		</div>
	);
};

export default AddProduct;
