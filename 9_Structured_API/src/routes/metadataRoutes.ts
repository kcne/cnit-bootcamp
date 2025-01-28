import { Router } from 'express';
import { validateRequest } from '../middlewares/validateRequest';
import asyncHandler from '../middlewares/asyncHandler';
import { AddClient, GetMetadata } from '../controllers/MetadataController';
import { createClientSchema } from '../models/validators/metadataValidator';

const router = Router();

// GET metadata
router.get('/', asyncHandler(GetMetadata));

// POST client
router.post('/',  validateRequest(createClientSchema), asyncHandler(AddClient));


export default router;
