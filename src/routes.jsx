import {
	FaHome,
	FaUserAlt,
	FaShoppingBag,
	FaPhotoVideo,
	FaSitemap,
	FaBox,
} from 'react-icons/fa';

import { AiFillDashboard } from 'react-icons/ai';

const routes = [
	{
		name: 'Dashboard',
		icon: <AiFillDashboard />,
		path: '/',
	},
	{
		name: 'Product',
		icon: <FaBox />,
		path: '/product',
	},
	{
		name: 'Order',
		icon: <FaShoppingBag />,
		path: '/order',
	},
	{
		name: 'Category',
		icon: <FaSitemap />,
		path: '/category',
	},
	{
		name: 'User',
		icon: <FaUserAlt />,
		path: '/user',
	},
	{
		name: 'Banner',
		icon: <FaPhotoVideo />,
		path: '/banner',
	},
];

export default routes;
