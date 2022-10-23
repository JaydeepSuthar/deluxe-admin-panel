import { Link } from 'react-router-dom';

import './style.scss';

const NotFound = () => {
	return (
		<>
			<div className='not-found wrapper'>
				<img
					className='image'
					alt='404 Page Not Found'
					src='https://illustatus.herokuapp.com/?title=Oops,%20Page%20not%20found&fill=%234f86ed'
				/>
				<button
					style={{
						backgroundColor: '#0f172a',
						padding: '10px',
						borderRadius: '5px',
						border: 'none',
						marginTop: '20px',
					}}
					className='button'
				>
					<Link
						style={{ textDecoration: 'none', color: 'white' }}
						to='/'
					>
						Back to Home
					</Link>
				</button>
			</div>
		</>
	);
};

export default NotFound;
