var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("Bismillah", salt);

console.log(bcrypt.compareSync("BismillaH", hash));