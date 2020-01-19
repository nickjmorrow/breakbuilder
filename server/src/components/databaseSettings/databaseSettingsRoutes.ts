import { Request, Response } from "express";
import { databaseSettingsProvider } from "./databaseSettingsProvider";
import { IRoute } from "../../infrastructure/types";

export const databaseSettingsRoutes: IRoute[] = [
	{
		path: "/databasesettings",
		method: "get",
		handler: async (req: Request, res: Response) => {
			const databaseSettings = await databaseSettingsProvider.getDatabaseSettings();
			res.json(databaseSettings);
		}
	}
];
