import { Toaster } from 'react-hot-toast';
import {
	Navigate,
	Outlet,
	Route,
	Routes,
	useLocation,
	useNavigate,
} from 'react-router-dom';
import './App.scss';
import Loader from './components/loader/Loader';
import Sidebar from './components/sidebar/Sidebar';
import useLoaderStore from './store/loader';

import routes from './routes';

// * Pages
import LoginPage from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import DashboardPage from './pages/Dashboard';
import ProductPage from './pages/Product';
import OrderPage from './pages/Order';
import UserPage from './pages/User';
import BannerPage from './pages/Banner';
import CategoryPage from './pages/Category';

import AddProduct from './pages/Product/add';
import AddProduct2 from './pages/Product/add2';
import AddProduct3 from './pages/Product/add3';
import AddBaner from './pages/Banner/add';
import axios from 'axios';
import InvoiceBill from './components/invoice/invoicebill/InvoiceBill';

import useAuthStore from './store/auth';
import { useEffect } from 'react';
import Invoice from './components/invoice2/invoice';
import EditProduct from './pages/Product/edit';
import EditProductPage2 from './pages/Product/edit2';
import EditProductPage3 from './pages/Product/edit3';

import Print from './pages/Print'

const ProtectedRoute = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const access_token = localStorage.getItem('access_token');

	useEffect(() => {
		// if (access_token) {
		// 	axios.defaults.headers.common[
		// 		'Authorization'
		// 	] = `Bearer ${access_token}`;
		// }

		if (!isAuthenticated || !access_token) {
			navigate('/');
		}
	}, []);

	return <Outlet />;
};

const App = () => {
	const isLoading = useLoaderStore((state) => state.isLoading);

	const access_token = localStorage.getItem('access_token');

	if (access_token) {
		axios.defaults.headers.common[
			'Authorization'
		] = `Bearer ${access_token}`;
	}

	return (
		<>
			<Toaster />
			<Loader visible={isLoading} />

			<Routes>
				<Route path='/' element={<LoginPage />} />
				{/* <Route path='/invoice' element={<InvoiceBill />} /> */}
				<Route path='/print' element={<Print />} />

				<Route element={<SidebarLayout routes={routes} />}>
					<Route element={<ProtectedRoute />}>
						<Route path='/dashboard' element={<DashboardPage />} />
						<Route path='/product'>
							<Route index element={<ProductPage />} />
							<Route path='add' element={<AddProduct />} />
							<Route path='add2' element={<AddProduct2 />} />
							<Route path='add3' element={<AddProduct3 />} />
							<Route path='edit' element={<EditProduct />} />
							<Route
								path='edit2'
								element={<EditProductPage2 />}
							/>
							<Route
								path='edit3'
								element={<EditProductPage3 />}
							/>
						</Route>
						<Route path='/order'>
							<Route index element={<OrderPage />} />
						</Route>
						<Route path='/user'>
							<Route index element={<UserPage />} />
						</Route>
						<Route path='/banner'>
							<Route index element={<BannerPage />} />
							<Route path='add' element={<AddBaner />} />
						</Route>
						<Route path='/category'>
							<Route index element={<CategoryPage />} />
						</Route>
					</Route>
				</Route>
				<Route path='logout' element={<Logout />} />
				<Route path='unauthorized' element={<LoginPage />} />
				<Route path='*' element={<NotFound />} />
				<Route path='demo' element={<InvoiceBill />} />
			</Routes>
		</>
	);
};

const SidebarLayout = ({ routes }) => {
	return (
		<>
			<div className='main'>
				<aside className='sidebar'>
					<Sidebar routes={routes} />
				</aside>

				<main className='content '>
					<div className='container mt-3 tw-flex tw-flex-col tw-gap-4'>
						<Outlet />
					</div>
				</main>
			</div>
		</>
	);
};

const Logout = () => {
	localStorage.removeItem('access_token');

	return <Navigate to='/' />;
};

export default App;
