import {
	FaHome,
	FaUserAlt,
	FaShoppingBag,
	FaPhotoVideo,
	FaSitemap,
	FaBox,
} from 'react-icons/fa';

import { AiFillDashboard } from 'react-icons/ai';
import { TbLogout } from 'react-icons/tb';

const routes = [
	{
		name: 'Dashboard',
		icon: <AiFillDashboard />,
		path: '/dashboard',
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
	{
		name: 'Logout',
		icon: <TbLogout />,
		path: '/',
	},
];

export default routes;
