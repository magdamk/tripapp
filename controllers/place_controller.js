const Place = require('../models/place');

exports.getAllPlaces = async(req, res) => {
    try {
        const query = req.query;
        const criteria = {};
        if (query.name) { criteria.name = { $regex: query.name } }
        if (query.city) { criteria.city = { $regex: query.city } }
        if (query.description) { criteria.description = { $regex: query.description } }
        if (query.street) { criteria.street = { $regex: query.street } }
        const places = await Place.find(criteria);
        res.json(places);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.getPlaceDetailsById = async(req, res) => {
    res.json(req.body.place);
}

exports.getPlaceById = async(req, res, next) => {
    let place;
    try {
        place = await Place.findById(req.params.id);
        if (place == null) {
            return res.status(404).json({ message: "Place not found" })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
    req.body.place = place;
    next();
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
    const place = req.body.place;
    if (req.body.name)
        place.name = req.body.name;
    if (req.body.description)
        place.description = req.body.description;
    if (req.body.city)
        place.city = req.body.city;
    if (req.body.street)
        place.street = req.body.street;
    if (req.body.latitude)
        place.latitude = req.body.latitude;
    if (req.body.longitude)
        place.longitude = req.body.longitude;
    if (req.body.costToVisit)
        place.costToVisit = req.body.costToVisit;
    if (req.body.timeToVisit)
        place.timeToVisit = req.body.timeToVisit;
    try {
        const updatedPlace = await place.save();
        res.json(updatedPlace);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}