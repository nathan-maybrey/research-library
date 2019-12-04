const path = require('path');
const root = require('../../util/path');

const getCollections = (req, res) => {
    res.sendFile(path.join(root, 'src/views', 'collections.html'));
};

module.exports.getCollections = getCollections;