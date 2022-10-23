import { FaBoxOpen, FaUserAlt } from 'react-icons/fa';
import { BiTrendingUp } from 'react-icons/bi';

const cardsArr = [
	{
		icon: <FaBoxOpen size={'70%'} />,
		title: 'Active Orders',
		text: 100,
	},
	{
		icon: <FaUserAlt size={'70%'} />,
		title: 'Total Users',
		text: 500,
	},
	{
		icon: <BiTrendingUp size={'70%'} />,
		title: 'Total Sales',
		text: 500,
	},
];

const DashboardPage = () => {
	return (
		<>
			<h1>Dashboard Page</h1>

			<div className='tw-flex tw-flex-row tw-flex-wrap tw-gap-3'>
				{cardsArr.map((item) => (
					<>
						<div className='dashboard-cards card tw-w-72'>
							<div className='dashboard-card card-body tw-flex tw-flex-row tw-gap-4 tw-p-4'>
								<div className='icon tw-w-10 tw-flex tw-justify-center tw-items-center'>
									{/* <FaBoxOpen size={'100%'} /> */}
									{item.icon}
								</div>

								<div className='tw-flex tw-flex-col tw-gap-1 tw-grow'>
									<div className='title'>{item.title}</div>
									<div className='text'>{item.text}</div>
								</div>
							</div>
						</div>
					</>
				))}
			</div>
		</>
	);
};

export default DashboardPage;
