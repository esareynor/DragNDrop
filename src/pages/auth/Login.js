import { useState, useContext } from 'react';
import { Form, Button, Card, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import GlobalContext from '../../contexts/GlobalContext';

const Login = () => {
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const {
		// state
		loading,

		// function
		loginUser,
	} = useContext(GlobalContext);

	const navigate = useNavigate();
	const handleRegister = () => {
		navigate('/register');
	};
	const handleLogin = async () => {
		try {
			loginUser({ email, password });
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div style={style}>
			<div>
				<Card
					className="bg-white p-5"
					border="white"
					style={{
						borderRadius: '10px',
						margin: 'auto',
						width: '30%',
						minWidth: '50vh',
					}}
				>
					<Card.Body className="text-center">
						<span>Rakamin To Do Test</span>
						<h2>Login</h2>
					</Card.Body>
					<Card.Body>
						<Form onSubmit={handleLogin}>
							<Form.Group controlId="formBasicEmail" className="mb-2">
								<Form.Control
									type="email"
									placeholder="Enter email"
									onChange={(e) => setEmail(e.target.value)}
								/>
							</Form.Group>
							<Form.Group controlId="formBasicPassword" className="mb-2">
								<Form.Control
									type="password"
									placeholder="Password"
									onChange={(e) => setPassword(e.target.value)}
								/>
							</Form.Group>
							<Button variant="primary" type="submit" className="mt-3 w-100">
								{loading ? (
									<Spinner
										as="span"
										variant="warning"
										size="sm"
										role="status"
										aria-hidden="true"
										animation="grow"
									/>
								) : (
									'Login'
								)}
							</Button>
						</Form>
						<div className="text-center mt-3">
							<small>
								Dont have an account?
								<button
									style={{
										backgroundColor: '#fff',
										border: 'solid 0px',
										color: '#4834d4',
										textDecorationLine: 'underline',
									}}
									onClick={handleRegister}
								>
									Register
								</button>
							</small>
						</div>
					</Card.Body>
				</Card>
			</div>
		</div>
	);
};

const style = {
	display: 'flex',
	backgroundColor: '#f1f2f6',
	minHeight: '100vh',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
};

export default Login;
