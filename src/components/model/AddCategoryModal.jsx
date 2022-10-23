import { nanoid } from 'nanoid';
import axios from 'axios';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useState } from 'react';

const AddCategoryModal = ({ show, setShow, submitHandler }) => {
	const [name, setName] = useState('');
	const [file, setFile] = useState();

	const [fileError, setFileError] = useState();
	const [error, setError] = useState();

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!name || name.length <= 0) {
			setError(true);
			return;
		}
		if (!file || file.length <= 0) {
			setFileError(true);
			return;
		}

		submitHandler({
			category_name: name,
			catimg: file,
		});
	};

	return (
		<>
			<Modal show={show} onHide={() => setShow(false)} backdrop={false}>
				<Modal.Header closeButton>
					<Modal.Title>Add Category</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit}>
						<Form.Group className='mb-3'>
							<Form.Label>Category Name</Form.Label>
							<Form.Control
								value={name}
								onChange={(e) => {
									setName(e.target.value);
									setError(false);
								}}
								isInvalid={!!error}
							/>
							<Form.Control.Feedback type='invalid'>
								Please provide a valid category name.
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group controlId='file' className='mb-3'>
							<Form.Label>Category Image</Form.Label>
							<Form.Control
								type='file'
								accept='images/*'
								onBlur={(event) => {
									setFile(event.target.files[0]);

									setFileError(false);

									console.log(
										`file ==> `,
										event.target.files[0]
									);
								}}
								isInvalid={!!fileError}
								required
							/>
							<Form.Control.Feedback type='invalid'>
								Please provide a valid file.
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

export default AddCategoryModal;
