import { useContext, useEffect} from 'react';
import GlobalContext from '../contexts/GlobalContext';
import Loading from '../pages/auth/Loading';
import AuthRoutes from './AuthRoutes';
import HomeRoutes from './HomeRoutes';
import {
	BrowserRouter as Router,
	Routes as RouteSwitch,
	Route,
} from 'react-router-dom';

const Routes = () => {
	const {
		// state
		loading,
		tokenUser,

		// function
		getUser,
	} = useContext(GlobalContext);

	useEffect(() => {
		getUser();
	}, []);

	return (
		<Router>
			<div>
				{loading ? (
					<Loading />
				) : (
					<div>
						{tokenUser ? (
							<RouteSwitch>
								<Route path="*" element={<HomeRoutes />} />
							</RouteSwitch>
						) : (
							<RouteSwitch>
								<Route path="*" element={<AuthRoutes />} />
							</RouteSwitch>
						)}
					</div>
				)}
			</div>
		</Router>
	);
};

export default Routes;
