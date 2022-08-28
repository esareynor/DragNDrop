import { useContext, useState } from 'react';
import GlobalContext from '../../contexts/GlobalContext';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import { FiLogOut, FiPlus } from 'react-icons/fi';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ListTodo } from './ListTodo';

const Dashboard = () => {
	const [show, setShow] = useState(false);
	const { logoutUser } = useContext(GlobalContext);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleLogout = async () => {
		if (window.confirm('Are you sure?')) {
			logoutUser();
		}
	};

	return (
		<div>
			<div
				className="p-3"
				style={{ borderBottom: '1px solid #dfe6e9', justifyContent: 'column' }}
			>
				<Row className="justify-content-md-center">
					<Col>
						<Row xs="auto">
							<Col>
								<h4>Product Roadmap</h4>
							</Col>
							<Col>
								<Button
									onClick={handleShow}
									size="sm"
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										backgroundColor: '#079992',
										borderColor: '#079992',
									}}
								>
									<FiPlus style={{ marginRight: '5px' }} />
									Add New Group
								</Button>
							</Col>
						</Row>
					</Col>
					<Col xs="auto">
						<Button
							onClick={handleLogout}
							size="sm"
							className="bg-danger border-danger"
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<FiLogOut style={{ marginRight: '5px' }} />
							Logout
						</Button>
					</Col>
				</Row>
			</div>
			<div>
				{/* DND START */}

				<DndProvider backend={HTML5Backend}>
					<ListTodo />
				</DndProvider>

				{/* DND END */}
			</div>
			<div>
				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Modal heading</Modal.Title>
					</Modal.Header>
					<Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
						<Button variant="primary" onClick={handleClose}>
							Save Changes
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		</div>
	);
};

export default Dashboard;
