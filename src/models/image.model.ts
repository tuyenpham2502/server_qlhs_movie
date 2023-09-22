const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    image: String
})

const ImageModel = mongoose.model('Images', imageSchema);

export default ImageModel;