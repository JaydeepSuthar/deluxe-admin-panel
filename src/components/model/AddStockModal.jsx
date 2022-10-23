import { nanoid } from 'nanoid';
import axios from 'axios';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useState } from 'react';

const AddStockModal = ({ show, setShow, submitHandler }) => {
	const [stock, setStock] = useState(0);

	const [error, setError] = useState();

	const handleSubmit = (e) => {
		e.preventDefault();

		if (stock == 0 || !stock) {
			setError(true);
			return;
		}

		submitHandler({
			stock: stock,
		});
		setShow(false);
	};

	return (
		<>
			<Modal show={show} onHide={() => setShow(false)} backdrop={false}>
				<Modal.Header closeButton>
					<Modal.Title>Add Stock</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit}>
						<Form.Group className='mb-3'>
							<Form.Label>Add Stock</Form.Label>
							<Form.Control
								value={stock}
								onChange={(e) => {
									setStock(e.target.value);
									setError(false);
								}}
								isInvalid={!!error}
							/>
							<Form.Control.Feedback type='invalid'>
								Please provide a valid Stock.
							</Form.Control.Feedback>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={handleSubmit}>Save</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default AddStockModal;
