import { useState } from 'react';
import { Button, Card, Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import image1 from '../../assets/image-1.jpg';
import image2 from '../../assets/image-2.jpg';
import image3 from '../../assets/image-3.jpg';
import image4 from '../../assets/image-4.jpg';

const BannerPage = () => {
	const navigate = useNavigate();
	const [index, setIndex] = useState(0);

	const handleSelect = (selectedIndex, e) => {
		setIndex(selectedIndex);
	};

	return (
		<>
			<h1>Banner Page</h1>

			<Card>
				<Card.Body className='tw-flex tw-justify-end'>
					<Button onClick={() => navigate('/banner/add')} variant='success'>Add Banner</Button>
				</Card.Body>
			</Card>

			<Card>
				<Card.Body>
					<CarouselComponent
						index={index}
						setIndex={setIndex}
						handleSelect={handleSelect}
					/>
				</Card.Body>
			</Card>
		</>
	);
};

const carouselArr = [
	{
		img: image1,
	},
	{
		img: image2,
	},
	{
		img: image3,
	},
	{
		img: image4,
	},
];

const CarouselComponent = ({ index, setIndex, handleSelect }) => {
	return (
		<Carousel
			// className='tw-w-full'
			activeIndex={index}
			onSelect={handleSelect}
			pause='hover'
		>
			{carouselArr.map((item, idx) => (
				<Carousel.Item>
					<img
						className='d-block w-100  tw-h-[600px] tw-object-cover'
						src={item.img}
						alt='First slide'
					/>
					<Carousel.Caption>
						<h3>{item.title ? item.title : idx}</h3>
					</Carousel.Caption>
				</Carousel.Item>
			))}
		</Carousel>
	);
};

export default BannerPage;
