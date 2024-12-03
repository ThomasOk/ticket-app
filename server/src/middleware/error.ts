import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/error";
import { StatusCodes } from "http-status-codes";

export const errorHandler = (
	err: Error,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	if (err instanceof AppError) {
		return res.status(err.statusCode).json({
			status: "error",
			message: err.message,
		});
	}

	console.error("Unhandled error:", err);
	return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
		status: "error",
		message: "Internal server error",
	});
};
