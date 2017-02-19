const bcrypt = require('bcryptjs');

var password = '123abc!';

/*bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  });
});*/

var hashPassword = '$2a$10$okaA32UgisOJrap7x.JlIe06i.Pdk9wXMHM/SOcCycprlkIrEK656';

bcrypt.compare(password, hashPassword, (err, res) => {
  console.log(res);
});
