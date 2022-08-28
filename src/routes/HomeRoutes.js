import Dashboard from '../pages/home/Dashboard';
import {
	Routes as RouteSwitch,
	Route,
    Navigate,
} from 'react-router-dom';

const HomeRoutes = () => {
	return (
		<RouteSwitch>
			<Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
		</RouteSwitch>
	);
};

export default HomeRoutes;
