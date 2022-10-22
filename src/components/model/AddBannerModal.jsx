import { nanoid } from 'nanoid';
import axios from 'axios';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useState } from 'react';

const AddBannerModal = ({ show, setShow, submitHandler }) => {
	const [file, setFile] = useState();

	const [fileError, setFileError] = useState();
	const [error, setError] = useState();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!file || file.length <= 0) {
			setFileError(true);
			return;
		}

		submitHandler({
			banner: URL.createObjectURL(file),
		});
	};

	return (
		<>
			<Modal show={show} onHide={() => setShow(false)} backdrop={false}>
				<Modal.Header closeButton>
					<Modal.Title>Add Banner</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit}>
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

export default AddBannerModal;
