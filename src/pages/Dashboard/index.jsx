import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBoxOpen, FaUserAlt } from 'react-icons/fa';
import { BiTrendingUp } from 'react-icons/bi';

const statistics = ['get_current_active_orders', 'get_user'];

const DashboardPage = () => {
	const [response, setResponse] = useState([]);

	useEffect(() => {
		const controller = new AbortController();

		const getStatistics = () => {
			const responseArr = [];
			axios
				.all(
					statistics.map((url) =>
						axios
							.get(url, { signal: controller.signal })
							.then((response) => responseArr.push(response.data))
					)
				)
				.then(() => {
					// console.log(responseArr);
					let numbers = [];
					responseArr.forEach((item) => {
						console.log(Object.values(item)[0]?.length);
						numbers.push(Object.values(item)[0]?.length);
					});
					setResponse(numbers);
					// setResponse(responseArr);
				});
		};

		getStatistics();

		return () => {
			controller.abort();
		};
	}, []);

	return (
		<>
			<h1>Dashboard Page</h1>

			<div className='tw-flex tw-flex-row tw-flex-wrap tw-gap-3'>
				<div className='dashboard-cards card tw-w-72'>
					<div className='dashboard-card card-body tw-flex tw-flex-row tw-gap-4 tw-p-4'>
						<div className='icon tw-w-10 tw-flex tw-justify-center tw-items-center'>
							<FaBoxOpen size={'70%'} />
						</div>

						<div className='tw-flex tw-flex-col tw-gap-1 tw-grow'>
							<div className='title'>TOTAL ACTIVE ORDERS</div>
							<div className='text'>
								{response[0] ? response[0] : 0}
							</div>
						</div>
					</div>
				</div>
				<div className='dashboard-cards card tw-w-72'>
					<div className='dashboard-card card-body tw-flex tw-flex-row tw-gap-4 tw-p-4'>
						<div className='icon tw-w-10 tw-flex tw-justify-center tw-items-center'>
							<FaUserAlt size={'70%'} />
						</div>

						<div className='tw-flex tw-flex-col tw-gap-1 tw-grow'>
							<div className='title'>TOTAL USERS</div>
							<div className='text'>
								{response[1] ? response[1] : 0}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default DashboardPage;
