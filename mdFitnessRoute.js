import express from 'express';
import { mdFitness } from '../models/mdFitnessModel.js';

const router = express.Router();

//Route for save a new mdFitness
router.post('/', async (request, response) => {
    try {
        if (   //validations to confirm all the required fields are filled
            !request.body.Name ||
            !request.body.Tests ||
            !request.body.Medications ||
            !request.body.Conditions ||
            !request.body.Age ||
            !request.body.Weight ||
            !request.body.Height
        ) {
            return response.status(400).send({
                message: 'Send all the required fields',
            });
        }
        const newmdFitness = {
            Name: request.body.Name,
            Tests: request.body.Tests,
            Medications: request.body.Medications,
            Conditions: request.body.Conditions,
            Age: request.body.Age,
            Weight: request.body.Weight,
            Height: request.body.Height
        };

        const mdfitness = await mdFitness.create(newmdFitness);

        return response.status(201).send(mdfitness);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route for get all the mdFitnesss from database
router.get('/', async (request, response) => {
    try {
        const mdfitnesss = await mdFitness.find({});

        return response.status(200).json({
            count: mdfitnesss.length,
            data: mdfitnesss
        });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route for get one mdFitness from database by itemid
router.get('/search/:UserID', async (request, response) => {
    try {
        const { UserID } = request.params;

        const mdfitness = await mdFitness.findOne({ UserID });

        return response.status(200).json(mdfitness);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route for get one mdFitness from database by id
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const mdfitness = await mdFitness.findById(id);

        return response.status(200).json(mdfitness);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route for update a mdFitness
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.UserID ||
            !request.body.Name ||
            !request.body.Tests ||
            !request.body.Medications ||
            !request.body.Conditions ||
            !request.body.Age ||
            !request.body.Weight ||
            !request.body.Height
        ) {
            return response.status(400).send({
                message: 'Send all the required fields',
            });
        }

        const { id } = request.params;

        const result = await mdFitness.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'user not found' });
        }
        return response.status(200).send({ message: 'updated successfully' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route for deleting a mdFitness
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await mdFitness.findByIdAndDelete(id);

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