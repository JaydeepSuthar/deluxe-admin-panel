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

import AddProduct from './pages/Product/add'
import AddProduct2 from './pages/Product/add2'
import AddBaner from './pages/Banner/add';

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
