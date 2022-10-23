import React, { useEffect, useRef, useState } from 'react';
import './style.scss'; // main file :: Development
// import "./style.min.css"; // minified file :: Production

import { useNavigate } from 'react-router-dom';

import logo from '../../assets/logo.png';

import axios from 'axios';
import toast from 'react-hot-toast';

import useAuthStore from '../../store/auth';
import useLoaderStore from '../../store/loader';

const LoginPage = (count, setCount) => {
	const setLoading = useLoaderStore((state) => state.setLoading);

	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState({});

	const navigate = useNavigate();

	const companyName = 'Aatmiya';
	const passwordInput = useRef(null);
	const emailInput = useRef(null);

	useEffect(() => {
		setAuthenticated(false);
		setLoading(false);
	}, []);

	const togglePassword = (e) => {
		if (e.target.checked === true) passwordInput.current.type = 'text';
		else passwordInput.current.type = 'password';
	};

	const findFormErrors = () => {
		const newErrors = {};

		if (!email || email.trim() === '')
			newErrors.email = `email cannot be empty`;
		if (!password || password.trim() === '')
			newErrors.password = `password cannot be empty`;

		return newErrors;
	};

	const submitHandler = async (e) => {
		e.preventDefault();

		const newErrors = findFormErrors();
		console.log(newErrors);

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
		} else {
			try {
				let response = await axios.post(
					'/company/login',
					{
						admin_username: email,
						password: password,
					},
					{ withCredentials: true }
				);

				if (response.status === 200) {
					toast.success(`Logged In Success`);
					console.log(response.data.data);

					// localStorage.setItem("isLoggedIn", true);
					localStorage.setItem('company_id', response.data.data.id);
					localStorage.setItem(
						'is_super_admin',
						response.data.data.is_super_admin
					);
					localStorage.setItem('logo', response.data.data.logo_url);

					setAuthenticated(true);

					navigate('/');
				} else {
					localStorage.setItem('isLoggedIn', false);
					toast.error(response.data.msg);
					e.preventDefault();
					dispatch(logOut());
				}
			} catch ({ response }) {
				localStorage.setItem('isLoggedIn', false);
				toast.error(response.data.msg);
			}
		}
	};

	return (
		<div className='login__page__bg'>
			<section className='login__card'>
				<section className='header'>
					<img className='logo' src={logo} />
					{/* <p className="title" >Sign In</p> */}
				</section>

				{/* Backup */}
				<div className='login__form'>
					<form method='POST' className='form' autoComplete='off'>
						<div className='form__input'>
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
						</div>
						<div className='form__input'>
							<label htmlFor='passwordInput'>Password</label>
							<input
								style={{
									borderColor: errors.password ? 'red' : '',
									borderRadius: '0.3em',
									height: '40px',
									fontSize: 'small',
								}}
								type='password'
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
						<div id='checkbox__form__input' className='form__input'>
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
						</div>
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
