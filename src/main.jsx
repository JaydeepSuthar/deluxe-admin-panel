import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthProvider';

import './index.scss';

import 'bootstrap/dist/css/bootstrap.min.css';

axios.defaults.baseURL = import.meta.env.PUBLIC_API_URL || ``;

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
