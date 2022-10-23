import { DndContext, closestCenter } from '@dnd-kit/core';
import { Button, Card, Carousel } from 'react-bootstrap';
import {
	arrayMove,
	SortableContext,
	verticalListSortingStrategy,
	useSortable,
} from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';

import { useState } from 'react';

import image1 from '../../assets/image-1.jpg';
import image2 from '../../assets/image-2.jpg';
import image3 from '../../assets/image-3.jpg';
import image4 from '../../assets/image-4.jpg';
import AddBannerModal from '../../components/model/AddBannerModal';
import { useNavigate } from 'react-router-dom';

const AddBanner = () => {
	const [imageArr, setImageArr] = useState([image1, image2, image3, image4]);
	const [file, setFile] = useState();
	const [show, setShow] = useState(false);
	const navigate = useNavigate();
	// console.log('file==>', JSON.stringify(file));
	// console.log('image1==>', JSON.stringify(image1));
	const handleDragEnd = (event) => {
		console.log(event);

		const { active, over } = event;

		if (active.id !== over.id) {
			setImageArr((items) => {
				const activeIndex = items.indexOf(active.id);
				const overIndex = items.indexOf(over.id);

				return arrayMove(items, activeIndex, overIndex);
			});
		}
	};
	const addBanner = async (values) => {
		console.log('FILe====>>>>', values.banners);
		setFile(values.banner);
		let a = imageArr;
		a.push(values.banner);
		console.log(a);
		// setImageArr(...imageArr, values.banner);

		// const fd = new FormData();

		// fd.append('catimg', values.banner);

		// const response = await axios.post('/add_banner', fd);
		// console.log({ response });
		setShow(false);

		// navigate('/banner/add');
	};

	return (
		<>
			<h1>Add Banner Page</h1>
			<Card>
				<Card.Body className='tw-flex tw-justify-end'>
					<Button
						onClick={() => {
							setShow(true);
						}}
						variant='success'
					>
						Add Banner
					</Button>
				</Card.Body>
			</Card>
			<DndContext
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
			>
				<SortableContext
					items={imageArr}
					strategy={verticalListSortingStrategy}
				>
					{imageArr.map((item) => (
						<SortableItem key={item} id={item} />
					))}
					{/* {file && <SortableItem key={file} id={file} />} */}
				</SortableContext>
			</DndContext>
			{show && (
				<AddBannerModal
					show={show}
					setShow={setShow}
					submitHandler={addBanner}
				/>
			)}
		</>
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
				<img src={props.id} width='100px' height='100px' />
			</div>
		</>
	);
};

export default AddBanner;
