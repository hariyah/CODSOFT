import express from 'express';
import { fbFitness } from '../models/fbFitnessModel.js';

const router = express.Router();

//Route for save a new fbFitness
router.post('/', async (request, response) => {
  try {
    if (   //validations to confirm all the required fields are filled
      !request.body.Name ||
      !request.body.Email ||
      !request.body.Feedback ||
      !request.body.Rating 
    ) {
      return response.status(400).send({
        message: 'Send all the required fields',
      });
    }
    const newfbFitness = {
      Name: request.body.Name,
      Email: request.body.Email,
      Feedback: request.body.Feedback,
      Rating: request.body.Rating,
      Reply: request.body.Reply
    };

    const fbfitness = await fbFitness.create(newfbFitness);

    return response.status(201).send(fbfitness);

  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for get all the fbFitnesss from database
router.get('/', async (request, response) => {
  try {
    const fbfitnesss = await fbFitness.find({});

    return response.status(200).json({
      count: fbfitnesss.length,
      data: fbfitnesss
    });

  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for get one fbFitness from database by itemid
router.get('/search/:UserID', async (request, response) => {
  try {
    const { UserID } = request.params;

    const fbfitness = await fbFitness.findOne({ UserID });

    return response.status(200).json(fbfitness);

  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for get one fbFitness from database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const fbfitness = await fbFitness.findById(id);

    return response.status(200).json(fbfitness);

  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for update a fbFitness
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.Name ||
      !request.body.Email ||
      !request.body.Feedback ||
      !request.body.Rating 
    ) {
      return response.status(400).send({
        message: 'Send all the required fields',
      });
    }

    const { id } = request.params;

    const result = await fbFitness.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'user not found' });
    }
    return response.status(200).send({ message: 'updated successfully' });

  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for deleting a fbFitness
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await fbFitness.findByIdAndDelete(id);

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