import { Response, Request } from 'express';
import prisma from '../utils/prisma';

export const GetMetadata = async (req: Request, res: Response) => {
try {
        const metadata = await prisma.metadata.findFirst({
            include: {
                clients: true, // Include the related AppClients
            },
        });

        if (!metadata) {
            return res.status(404).json({ message: "Metadata not found." });
        }

        res.status(200).json(metadata);
    } catch (error) {
        console.error("Error fetching metadata:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

export const AddClient = async (req: Request, res: Response) => {
    const metadata = await prisma.metadata.findFirst();
    const { name, browser } = req.body;

    // Check if metadata is null
    if (!metadata) {
        return res.status(404).json({ message: "Metadata not found." });
    }

    // Proceed with creating the client since metadata is not null
    const clientInfo = await prisma.appClients.create({
        data: {
            name: name,
            browser: browser,
            metadataId: metadata.id // Now metadata is guaranteed to be non-null
        }
    });

    res.status(200).json(clientInfo);
};