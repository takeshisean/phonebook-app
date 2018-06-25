const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const PhoneType = require('../models/PhoneType');
const Contact = require('../models/Contact');

router.get('/', (req, res) => {
    res.status(200).send('user controller works.');
});

router.post('/addPhoneType', (req, res) => {
    PhoneType.create({
        _id: new mongoose.Types.ObjectId(),
        type: req.body.type
    },
        function (err, user) {
            if (err) return res.status(500).send('There was a problem adding the phone type.');

            res.status(200).send('Phone type added successfully.');
        });
});

router.post('/addContact', (req, res) => {
    PhoneType.findOne({ type: req.body.type }, (err, phonetype) => {
        if (err) return res.status(500).send('Error on the server.');
        if (!phonetype) return res.status(404).send('No phone type found.');

        // res.status(200).send(phonetype._id);

        Contact.create({
            lastName: req.body.lastName,
            firstName: req.body.firstName,
            number: req.body.number,
            phoneType: phonetype._id
        },
            function (err, user) {
                if (err) return res.status(500).send(err);

                res.status(200).send(user);
            });
    });
});

router.post('/createContact', (req, res) => {
    PhoneType.findById({ _id: req.body.phoneTypeId }, (err, phonetype) => {
        if (err) return res.status(500).send('Error on the server.');
        if (!phonetype) return res.status(404).send('No phone type found.');

        Contact.find({ lastName: req.body.lastName, firstName: req.body.firstName }, (err, contact) => {
            if (err) return res.status(500).send(contact);
            // console.log(contact);
            if (contact.length > 0) {
                let errorMessage = {
                    message: 'Add failed: Duplicated contact details.'
                }
                return res.status(210).send(errorMessage)
            } else {
                Contact.create({
                    lastName: req.body.lastName,
                    firstName: req.body.firstName,
                    number: req.body.number,
                    phoneType: phonetype._id
                },
                    function (err, user) {
                        if (err) return res.status(500).send(err);

                        // console.log(user.sortByProp('FirstName'));

                        res.status(200).send(user);
                    });
            }
        });

    });
});

router.get('/getAllPhoneType', (req, res) => {
    PhoneType.
        find({}).
        exec((err, phoneTypes) => {
            if (err) return res.status(500).send('Error on the server.');
            if (!phoneTypes) return res.status(404).send('No phone type found.');

            res.status(200).send(phoneTypes);
        });
});

router.get('/getAllContact', (req, res) => {
    Contact.
        find({}).
        populate('phoneType').
        exec((err, contacts) => {
            if (err) return res.status(500).send('Error on the server.');
            if (!contacts) return res.status(404).send('No contact found.');

            res.status(200).send(contacts);
        });
});

router.get('/getContactByLastName', (req, res) => {
    Contact.
        findOne({ lastName: req.query.lastName }).
        populate('phoneType').
        exec((err, contact) => {
            if (err) return handleError(err);
            // res.status(200).send(contact.phoneType.type);
            res.status(200).send(contact);
        });
});

router.get('/getContactByFirstName', (req, res) => {
    Contact.
        findOne({ firstName: req.query.firstName }).
        populate('phoneType').
        exec((err, contact) => {
            if (err) return handleError(err);
            res.status(200).send(contact);
        });
});

router.get('/getContactByNumber', (req, res) => {
    Contact.
        findOne({ number: req.query.number }).
        populate('phoneType').
        exec((err, contact) => {
            if (err) return handleError(err);
            res.status(200).send(contact);
        });
});

router.get('/getContactByNumberAsync', async (req, res) => {
    const contact = await Contact.findOne({ number: req.query.number }).populate('phoneType');

    res.send(contact);
});

module.exports = router;