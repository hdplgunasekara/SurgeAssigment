import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouteMain = (  ) => {
	const isAuthenticated = localStorage.getItem("accesstoken") !== null;
	const Status =  localStorage.getItem("status") !== 'true';


	if (isAuthenticated && Status) {
		return <Outlet />;
	} else {
		return <Navigate to="/login" />;
	}

	// If authorized, return an outlet that will render child elements
	// If not, return element that will navigate to login page
};

export default PrivateRouteMain;
