import express from 'express';
import { atFitness } from '../models/atFitnessModel.js';

const router = express.Router();

//Route for save a new atFitness
router.post('/', async (request, response) => {
    try {
        if (   //validations to confirm all the required fields are filled
            !request.body.UserID ||
            !request.body.Name 
    
    ) {
            return response.status(400).send({
                message: 'Send all the required fields',
            });
        }
        const newatFitness = {
            UserID: request.body.UserID,
            Name: request.body.Name

        };

        const atfitness = await atFitness.create(newatFitness);

        return response.status(201).send(atfitness);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route for get all the atFitnesss from database
router.get('/', async (request, response) => {
    try {
        const atfitnesss = await atFitness.find({});

        return response.status(200).json({
            count: atfitnesss.length,
            data: atfitnesss
        });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route for get one atFitness from database by itemid
router.get('/search/:UserID', async (request, response) => {
    try {
        const { UserID } = request.params;

        const atfitness = await atFitness.findOne({ UserID });

        return response.status(200).json(atfitness);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route for get one atFitness from database by id
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const atfitness = await atFitness.findById(id);

        return response.status(200).json(atfitness);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route for update a atFitness
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.AttnaceID ||
            !request.body.UserID ||
            !request.body.Name

        ) {
            return response.status(400).send({
                message: 'Send all the required fields',
            });
        }

        const { id } = request.params;

        const result = await atFitness.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'user not found' });
        }
        return response.status(200).send({ message: 'updated successfully' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route for deleting a atFitness
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await atFitness.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'User not found' });
        }
        return response.status(200).send({ message: 'deleted successfully' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
});

export default router;