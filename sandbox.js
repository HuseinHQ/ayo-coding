const bcryptjs = require('bcryptjs');
const salt = bcryptjs.genSaltSync(8);
const hash = bcryptjs.hashSync('secure1234', salt)

console.log(hash);