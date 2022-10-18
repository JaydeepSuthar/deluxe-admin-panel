import { FaAngleUp } from 'react-icons/fa';

const DashboardPage = () => {
	return (
		<>
			<h1>Dashboard Page</h1>

			<div>
				<div className='dashboard-cards card tw-w-72'>
					<div className='dashboard-card card-body tw-flex tw-flex-row tw-gap-2 tw-p-8'>
						<div className='icon tw-w-5' style={{border: `1px solid black`}}>
							<FaAngleUp />
						</div>

						<div className='title'>Income</div>
						<div className='text'>100</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default DashboardPage;
