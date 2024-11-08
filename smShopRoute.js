import express from 'express';
import smShop from '../models/smShopModel.js';

const router = express.Router();

//Route for save a new smShop
router.post('/', async (request, response) => {
    try {
        if (   //validations to confirm all the required fields are filled
            !request.body.ItemName ||
            !request.body.Company ||
            !request.body.Price ||
            !request.body.ItemWeight ||
            !request.body.Discount ||
            //!request.body.Image ||
            !request.body.Description
        ) {
            return response.status(400).send({
                message: 'Send all the required fields',
            });
        }
        const newsmShop = {
            ItemName: request.body.ItemName,
            Company: request.body.Company,
            Price: request.body.Price,
            ItemWeight: request.body.ItemWeight,
            Discount: request.body.Discount,
            Image: request.body.TotalPrice,
            Description: request.body.Description
        };

        const smshop = await smShop.create(newsmShop);

        return response.status(201).send(smshop);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


//Route for get all the smshops from database
router.get('/', async (request, response) => {
    try {
        const smshops = await smShop.find({});

        return response.status(200).json({
            count: smshops.length,
            data: smshops
        });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route for get one smShop from database by SmID
router.get('/search/:SmID', async (request, response) => {
    try {
        const { SmID } = request.params;

        const smshop = await smShop.findOne({ SmID });

        return response.status(200).json(smshop);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route for get one smShop from database by id
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const smshop = await smShop.findById(id);

        return response.status(200).json(smshop);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route for update a smShop
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.SmID ||
            !request.body.ItemName ||
            !request.body.Company ||
            !request.body.Price ||
            !request.body.ItemWeight ||
            !request.body.Discount ||
            //!request.body.Image ||
            !request.body.Description
        ) {
            return response.status(400).send({
                message: 'Send all the required fields',
            });
        }

        const { id } = request.params;

        const result = await smShop.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'Item not found' });
        }
        return response.status(200).send({ message: 'updated successfully' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route for deleting a smShop
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await smShop.findByIdAndDelete(id);

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