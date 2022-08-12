import { RequestHandler } from 'express';
import asyncHandler from '../utils/async-handler';

export const hiddenCollections: RequestHandler = asyncHandler(async (req, res, next) => {
	if (process.env.HIDDEN_COLLECTION_PREFIXES) {
		const prefixes = process.env.HIDDEN_COLLECTION_PREFIXES.split(',');
		res.locals.payload.data = res.locals.payload.data.map((collection: any) => {
			if (collection.collection.startsWith('directus_')) {
				return collection;
			}

			collection.meta.system = !!prefixes.some((prefix: string) => collection.collection.startsWith(prefix));
			return collection;
		});
	}

	return next();
});
