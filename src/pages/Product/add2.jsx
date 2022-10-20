import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddProductPage2 = () => {
	const [value, setValue] = useState('');

	return (
		<>
			<div className='tw-w-full tw-h-[400px]'>
				<ReactQuill
					className='tw-h-full tw-w-full'
					theme='snow'
					value={value}
					onChange={(e) => {
						console.log(e)
						setValue(e);
					}}
				/>
			</div>

			<button onClick={() => console.log(value)}>Save</button>
		</>
	);
};

export default AddProductPage2;
