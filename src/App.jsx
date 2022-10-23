import { Toaster } from 'react-hot-toast';
import { Outlet, Route, Routes } from 'react-router-dom';
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
const token =
	'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNjY2MDYwNTQxLCJqdGkiOiI0MGM2MDE2Yi00MTlkLTRjNGYtOGRlMC1hZTYzM2RjODNiMTMiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiZDQzYjZiYWQtNTc2NC00MzA4LWE1YzktNzU3ZDFiYTA5MDM2IiwibmJmIjoxNjY2MDYwNTQxLCJleHAiOjE2ODE2MTI1NDEsInVzZXJfdHlwZSI6MH0.0WATyMdoNQb93FPGjPyfII-cIBeXh7xG-YQn0-_wd5c';
// axios.defaults.baseURL = 'http://139.59.22.201/dashboard';
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

const App = () => {
	const isLoading = useLoaderStore((state) => state.isLoading);

	return (
		<>
			<Toaster />
			<Loader visible={isLoading} />

			<Routes>
				<Route path='login' element={<LoginPage />} />

				<Route element={<SidebarLayout routes={routes} />}>
					<Route path='/' element={<DashboardPage />} />
					<Route path='/product'>
						<Route index element={<ProductPage />} />
						<Route path='add' element={<AddProduct />} />
						<Route path='add2' element={<AddProduct2 />} />
						<Route path='add3' element={<AddProduct3 />} />
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

export default App;
