import { DndContext, closestCenter } from '@dnd-kit/core';

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

const AddBanner = () => {
	const [imageArr, setImageArr] = useState([image1, image2, image3, image4]);

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

	return (
		<>
			<h1>Add Banner Page</h1>

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
				</SortableContext>
			</DndContext>
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
