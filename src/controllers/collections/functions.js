const path = require('path');
const root = require('../../util/path');

const getCollections = (req, res) => {
    res.render(path.join(root, 'src/views', 'index.njk'));
};

module.exports.getCollections = getCollections;