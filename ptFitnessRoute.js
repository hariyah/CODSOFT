import express from 'express';
import { ptFitness } from '../models/ptFitnessModel.js';

const router = express.Router();

//Route for save a new ptFitness
router.post('/', async (request, response) => {
  try {
    if (   //validations to confirm all the required fields are filled
      !request.body.Name ||
      !request.body.Age ||
      !request.body.Email ||
      !request.body.Weight ||
      !request.body.Height
    ) {
      return response.status(400).send({
        message: 'Send all the required fields',
      });
    }
    const newptFitness = {
      Name: request.body.Name,
      Age: request.body.Age,
      Email: request.body.Email,
      Weight: request.body.Weight,
      Height: request.body.Height
    };

    const ptfitness = await ptFitness.create(newptFitness);

    return response.status(201).send(ptfitness);

  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for get all the ptFitnesss from database
router.get('/', async (request, response) => {
  try {
    const ptfitnesss = await ptFitness.find({});

    return response.status(200).json({
      count: ptfitnesss.length,
      data: ptfitnesss
    });

  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for get one ptFitness from database by itemid
router.get('/search/:UserID', async (request, response) => {
  try {
    const { UserID } = request.params;

    const ptfitness = await ptFitness.findOne({ UserID });

    return response.status(200).json(ptfitness);

  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for get one ptFitness from database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const ptfitness = await ptFitness.findById(id);

    return response.status(200).json(ptfitness);

  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for update a ptFitness
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.UserID ||
      !request.body.Name ||
      !request.body.Age ||
      !request.body.Email ||
      !request.body.Weight ||
      !request.body.Height
    ) {
      return response.status(400).send({
        message: 'Send all the required fields',
      });
    }

    const { id } = request.params;

    const result = await ptFitness.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'user not found' });
    }
    return response.status(200).send({ message: 'updated successfully' });

  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for deleting a ptFitness
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await ptFitness.findByIdAndDelete(id);

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