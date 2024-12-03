import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { AppError } from "../utils/error";
import { StatusCodes } from "http-status-codes";

export const validateRequest = (schema: ZodSchema) => {
	return (req: Request, _res: Response, next: NextFunction) => {
		try {
			schema.parse(req.body);
			next();
		} catch (error) {
			next(new AppError(StatusCodes.UNPROCESSABLE_ENTITY, String(error)));
		}
	};
};
