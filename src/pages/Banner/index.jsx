import axios from 'axios';
import { useState } from 'react';
import { Button, Card, Carousel } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// import image1 from '../../assets/image-1.jpg';
// import image2 from '../../assets/image-2.jpg';
// import image3 from '../../assets/image-3.jpg';
// import image4 from '../../assets/image-4.jpg';
import AddBannerModal from '../../components/model/AddBannerModal';
import { useFetch } from '../../hooks';
import useLoaderStore from '../../store/loader';

const BANNER_URL = `http://139.59.22.201/api/static/app_banners`;

const BannerPage = () => {
	const navigate = useNavigate();

	const setLoading = useLoaderStore((state) => state.setLoading);

	const [show, setShow] = useState(false);
	const [index, setIndex] = useState(0);

	const { data, error, isLoading, revalidate } =
		useFetch('app_banners/slider');

	const handleSelect = (selectedIndex, e) => {
		setIndex(selectedIndex);
	};

	const addBanner = async (value) => {
		setLoading(true);
		console.log(value);

		const fd = new FormData();
		fd.append('priority', 0);
		fd.append('banner_image', value);
		fd.append('priority', 0);
		fd.append('slider_img', value);

		const response = await axios.post('/upload_app_banner/slider', fd);

		if (response.status == 200) {
			toast.success(`Banner Added`);
			revalidate();
			setLoading(false);
		} else console.log(response);

		setShow(false);

		setLoading(false);
	};

	if (isLoading) return <h1>Loading...</h1>;
	if (error) {
		if (error?.response?.status == 401)
			return <h1>Your Token is Expired Please Logout and Re-Login</h1>;

		return <h1>Error Occur</h1>;
	}
	return (
		<>
			<h1>Banner Page</h1>

			<Card>
				<Card.Body className='tw-flex tw-justify-end'>
					<Button
						onClick={() => {
							// navigate('/banner/add');
							setShow(true);
						}}
						variant='success'
					>
						Add Banner
					</Button>
				</Card.Body>
			</Card>

			<Card>
				<Card.Body>
					<CarouselComponent
						index={index}
						setIndex={setIndex}
						handleSelect={handleSelect}
						images={data?.banners}
					/>
				</Card.Body>
			</Card>

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

// const carouselArr = [
// 	{
// 		img: image1,
// 	},
// 	{
// 		img: image2,
// 	},
// 	{
// 		img: image3,
// 	},
// 	{
// 		img: image4,
// 	},
// ];

const CarouselComponent = ({ index, setIndex, handleSelect, images }) => {
	return (
		<Carousel
			// className='tw-w-full'
			activeIndex={index}
			onSelect={handleSelect}
			pause='hover'
		>
			{images.map((item, idx) => (
				<Carousel.Item>
					<img
						className='d-block w-100  tw-h-[600px] tw-object-fit'
						src={`${BANNER_URL}/${item.banner}`}
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
