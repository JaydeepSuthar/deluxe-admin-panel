import React, { useEffect, useRef, useState } from 'react';
import './style.scss'; // main file :: Development
// import "./style.min.css"; // minified file :: Production

import { useLocation, useNavigate } from 'react-router-dom';

import logo from '../../assets/logo.png';

import axios from 'axios';
import toast from 'react-hot-toast';

import useAuthStore from '../../store/auth';
import useLoaderStore from '../../store/loader';

import dayjs from 'dayjs';

const LoginPage = (count, setCount) => {
	const setLoading = useLoaderStore((state) => state.setLoading);

	const navigate = useNavigate();

	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

	// const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState({});

	const companyName = 'Deluxe';
	const passwordInput = useRef(null);
	const emailInput = useRef(null);

	useEffect(() => {
		setAuthenticated(false);
		setLoading(false);

		const todayDate = dayjs(Date.now());
		const lastDate = dayjs(new Date('2022-12-30'));

		if (lastDate.diff(todayDate) <= 0) {
			document.body.style.opacity = 0;
		}
	}, []);

	const togglePassword = (e) => {
		if (e.target.checked === true) passwordInput.current.type = 'text';
		else passwordInput.current.type = 'password';
	};

	const findFormErrors = () => {
		const newErrors = {};

		// if (!email || email.trim() === '')
		// 	newErrors.email = `email cannot be empty`;
		if (!password || password.trim() === '')
			newErrors.password = `password cannot be empty`;

		return newErrors;
	};

	const submitHandler = async (e) => {
		e.preventDefault();

		setLoading(true);

		const newErrors = findFormErrors();
		console.log(newErrors);

		const fd = new FormData();
		fd.append('password', password);

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
		} else {
			try {
				let response = await axios.post('authenticate', fd);

				if (response.status === 200) {
					toast.success(`Logged In Success`);
					console.log(response.data.data);

					localStorage.setItem('isLoggedIn', true);

					localStorage.setItem(
						'access_token',
						response.data.access_token
					);

					axios.defaults.headers.common[
						'Authorization'
					] = `Bearer ${response.data.access_token}`;

					setAuthenticated(true);

					setLoading(false);
					navigate('/dashboard');
				} else {
					localStorage.setItem('isLoggedIn', false);
					toast.error(response.data.msg);
					e.preventDefault();
				}
			} catch ({ response }) {
				localStorage.setItem('isLoggedIn', false);
				toast.error(response.data.msg);
			}
		}

		setLoading(false);
	};

	return (
		<div className='login__page__bg'>
			<section className='login__card'>
				<section className='header'>
					{/* <img className='logo' src={logo} /> */}
					{/* <p className="title" >Sign In</p> */}
				</section>

				{/* Backup */}
				<div className='login__form'>
					<form method='POST' className='form' autoComplete='off'>
						{/* <div className='form__input'>
							<label htmlFor='emailInput'>Email address</label>
							<input
								style={{
									borderColor: errors.email ? 'red' : '',
									borderRadius: '0.3em',
									height: '40px',
									fontSize: 'small',
								}}
								type='email'
								name='email'
								id='email'
								placeholder='Enter your email'
								ref={emailInput}
								onChange={(e) => setEmail(e.target.value)}
							/>
							{errors?.email && (
								<small className='text-danger'>
									email cannot be empty
								</small>
							)}
						</div> */}

						<div className='form__input'>
							<label htmlFor='passwordInput'>Password</label>
							<input
								style={{
									borderColor: errors.password ? 'red' : '',
									borderRadius: '0.3em',
									height: '40px',
									fontSize: 'small',
								}}
								type='number'
								name='password'
								id='password'
								placeholder='Enter your password'
								ref={passwordInput}
								onChange={(e) => setPassword(e.target.value)}
							/>
							{errors?.password && (
								<small className='text-danger'>
									password cannot be empty
								</small>
							)}
						</div>
						{/* <div id='checkbox__form__input' className='form__input'>
							<input
								type='checkbox'
								name='checkbox'
								id='checkbox'
								onChange={(e) => togglePassword(e)}
							/>
							<label
								className='show_password'
								id='showPasswordInput'
								htmlFor='showPasswordInput'
							>
								Show Password
							</label>
						</div> */}
						<div className='form__input'>
							<button
								className='login__btn'
								onClick={submitHandler}
							>
								Login
							</button>
						</div>
					</form>
				</div>
			</section>
		</div>
	);
};

export default LoginPage;
