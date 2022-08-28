import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import {
	Routes as RouteSwitch,
	Route,
	Navigate,
} from 'react-router-dom';

const AuthRoutes = () => {
	return (
		<RouteSwitch>
			<Route path="/register" element={<Register />} />
			<Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
		</RouteSwitch>
	);
};

export default AuthRoutes;
