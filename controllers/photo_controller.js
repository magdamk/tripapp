const Place = require('../models/place');
const Photo = require('../models/photo');

exports.getPhotosForPlace = async(req, res) => {
    let place = req.body.place;
    if (place) {
        try {
            let photosForPlace = await Photo.find({ place: place._id });
            res.json(photosForPlace);
        } catch (err) { res.status(404).json({ message: "No photos found for place " + place._id }) }
    } else return res.status(404).json({ message: "Unknown place" })

}

exports.addPhotoForPlace = async(req, res) => {
    const place = req.body.place;
    console.log(place);
    const newPhoto = new Photo({
        url: req.body.url,
        place: place._id
    })
    try {
        const addedPhoto = await newPhoto.save();
        res.status(201).json(addedPhoto);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.removePhotoById = async(req, res) => {

    let photo;
    try {
        photo = await Photo.findById(req.params.id);
        if (photo == null) {
            return res.status(404).json({ message: "Photo not found" })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
    try {
        const deletedPhoto = await Photo.deleteOne({ _id: photo })
        res.status(201).json(deletedPhoto);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}