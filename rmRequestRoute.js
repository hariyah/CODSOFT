import express from 'express';
import rmRequest from '../models/rmRequestModel.js';

const router = express.Router();

//Route for save a new rmrequest
router.post('/', async (request, response) => {
  try {
    if (   //validations to confirm all the required fields are filled
    !request.body.ItemName ||
    !request.body.ItemType ||
    !request.body.Company ||
    !request.body.Condition ||
    !request.body.Price ||
    !request.body.ItemWeight ||
    !request.body.Description
    ) {
      return response.status(400).send({
        message: 'Send all the required fields',
      });
    }
    const newrmRequest = {
      ItemName: request.body.ItemName,
      ItemType: request.body.ItemType,
      Company: request.body.Company,
      Condition: request.body.Condition,
      Price: request.body.Price,
      ItemWeight: request.body.ItemWeight,
      Description: request.body.Description
    };

    const rmrequest = await rmRequest.create(newrmRequest);

    return response.status(201).send(rmrequest);

  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for get all the rmrequests from database
router.get('/', async (request, response) => {
  try {
    const rmrequests = await rmRequest.find({});

    return response.status(200).json({
      count: rmrequests.length,
      data: rmrequests
    });

  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for get one rmrequest from database by itemid
router.get('/search/:ItemID', async (request, response) => {
  try {
    const { ItemID } = request.params;

    const rmrequest = await rmRequest.findOne({ ItemID });

    return response.status(200).json(rmrequest);

  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for get one rmrequest from database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const rmrequest = await rmRequest.findById(id);

    return response.status(200).json(rmrequest);

  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for update a rmrequest
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.ItemID ||
      !request.body.ItemName ||
      !request.body.ItemType ||
      !request.body.Company ||
      !request.body.Condition ||
      !request.body.Price ||
      !request.body.ItemWeight ||
      !request.body.Description
    ) {
      return response.status(400).send({
        message: 'Send all the required fields',
      });
    }

    const { id } = request.params;

    const result = await rmRequest.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Item not found' });
    }
    return response.status(200).send({ message: 'updated successfully' });

  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for deleting a rmRequest
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await rmRequest.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Item not found' });
    }
    return response.status(200).send({ message: 'deleted successfully' });

  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message })
  }
});

export default router;