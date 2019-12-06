const path = require('path');
const root = require('../../util/path');

const getCollections = (req, res) => {
    res.render(path.join(root, 'src/views/helpers', 'govukTemplate.html'));
};

module.exports.getCollections = getCollections;