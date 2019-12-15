var loki = require('Loki.js');

var db = new Loki('database.json');

var accounts = db.addCollection('accounts');

accounts.insert({ name: "admin", password: "admin" });
accounts.insert({ name: "user1", password: "user1" });

console.log(accounts.data);
