import express from 'express';
import { csFitness } from '../models/csFitnessModel.js';

const router = express.Router();

//Route for save a new csFitness
router.post('/', async (request, response) => {
  try {
    if (   //validations to confirm all the required fields are filled
      !request.body.Name ||
      !request.body.Email ||
      !request.body.Category ||
      !request.body.Time ||
      !request.body.NeedTrainer
    ) {
      return response.status(400).send({
        message: 'Send all the required fields',
      });
    }
    const newcsFitness = {
      Name: request.body.Name,
      Email: request.body.Email,
      Category: request.body.Category,
      Time: request.body.Time,
      NeedTrainer: request.body.NeedTrainer,
    };

    const csfitness = await csFitness.create(newcsFitness);

    return response.status(201).send(csfitness);

  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for get all the csFitnesss from database
router.get('/', async (request, response) => {
  try {
    const csfitnesss = await csFitness.find({});

    return response.status(200).json({
      count: csfitnesss.length,
      data: csfitnesss
    });

  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for get one csFitness from database by ScheduleID
router.get('/search/:ScheduleID', async (request, response) => {
  try {
    const { ScheduleID } = request.params;

    const csfitness = await csFitness.findOne({ ScheduleID });

    return response.status(200).json(csfitness);

  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for get one csFitness from database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const csfitness = await csFitness.findById(id);

    return response.status(200).json(csfitness);

  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for update a csFitness
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.ScheduleID ||
      !request.body.Name ||
      !request.body.Email ||
      !request.body.Category ||
      !request.body.Time ||
      !request.body.NeedTrainer
    ) {
      return response.status(400).send({
        message: 'Send all the required fields',
      });
    }

    const { id } = request.params;

    const result = await csFitness.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Schedule not found' });
    }
    return response.status(200).send({ message: 'updated successfully' });

  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for deleting a csFitness
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await csFitness.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Schedule not found' });
    }
    return response.status(200).send({ message: 'deleted successfully' });

  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message })
  }
});

export default router;