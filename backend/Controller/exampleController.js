// Testing 123

import { Example } from "../Model/exampleModel.js"; 

// Create a new Example
export const createExample = async (req, res) => {
    try {
        // Create example with userId from cookie
        const newExample = await Example.create({
            userId: req.userId, // <- From cookie middleware
        });

        console.log(`Example created by user ${req.userId}:`, newExample._id);

        res.status(201).json({
            success: true,
            message: 'Example created successfully',
            example: newExample
        });

    } catch (error) {
        console.error('Error creating example:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create example',
            error: error.message
        });
    }
};