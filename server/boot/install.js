'use strict';

var installed = true;

module.exports = function (app) {

  if (!installed) {
    var User = app.models.Account;
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;

    User.create([
      {username: 'mattietea', email: 'mattcthomas@me.com', password: 'he11o123', firstName: 'Matt', lastName: 'Thomas'},
    ], function (err, users) {
      if (err) throw err;
      console.log("Created User: ", users);
      Role.create({
        name: 'administrator'
      }, function (err, role) {
        if (err) throw err;
        role.principals.create({
          principalType: RoleMapping.USER,
          principalId: users[0].id
        }, function (err, principal) {
          console.log('Created principal:', principal);
        });
      });
    });
  }
};
