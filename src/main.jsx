import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthProvider';

import './index.scss';

import 'bootstrap/dist/css/bootstrap.min.css';

import './tailwind.css';

axios.defaults.baseURL =
	import.meta.env.PUBLIC_API_URL || `http://139.59.22.201/test_api`;

// axios.defaults.headers.common[
// 	'Authorization'
// ] = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNjY3NjMzMTA2LCJqdGkiOiJkNmNhNzAxNS02OWE2LTQzYzYtOThkMC03MmZhMTA2MjBkZWYiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiMmRiNjVjNmYtZmI5ZC00ZGE5LTlmMjQtYjNkMDFlOGQ3MzljIiwibmJmIjoxNjY3NjMzMTA2LCJleHAiOjE2ODMxODUxMDYsInVzZXJfdHlwZSI6MH0.T2y8arXtD0VxuQJbNU1c8iz3v5hr1xKmFlUVZJn-5hI`;

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path='/*' element={<App />} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	</React.StrictMode>
);
