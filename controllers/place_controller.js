const Place = require('../models/place');

exports.getAllPlaces = async(req, res) => {
    try {
        const places = await Place.find();
        res.json(places);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.getPlaceDetailsById = async(req, res) => {
    res.status(404).json({ message: "Page under construction" })
}

exports.createPlace = async(req, res) => {
    const newPlace = new Place({
        name: req.body.name,
        city: req.body.city,
        description: req.body.description,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        street: req.body.street,
        costToVisit: req.body.costToVisit,
        timeToVisit: req.body.timeToVisit
    })
    try {
        const addedPlace = await newPlace.save();
        res.status(201).json(addedPlace);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.updatePlace = async(req, res) => {
    res.status(404).json({ message: "Page under construction" })
}