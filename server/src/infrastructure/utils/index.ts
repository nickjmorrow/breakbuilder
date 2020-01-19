import { Router } from "express";
import { IRoute } from "../types";

export const applyMiddleware = (
	middleware: Array<(router: Router) => void>,
	router: Router
) => {
	middleware.forEach(f => f(router));
};

export const applyRoutes = (routes: IRoute[], router: Router) => {
	routes.forEach(route => {
		const { method, path, authentication, handler } = route;

		if (authentication) {
			router[method](path, authentication, handler);
		} else {
			router[method](path, handler);
		}
	});
};
