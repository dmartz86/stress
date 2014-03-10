var MongoClient = require('mongodb').MongoClient;

/**
 * The Authentication controller.
 */
var StressJS = function() {
};

/**
 * Create random string.
 * @param size, the lenght of the string
 */
StressJS.randomString = function(size) {
	var s = "";
	var keys = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+-*=!#$%&";
	for (var i = 0; i < size; i++) {
		s += keys.charAt(Math.floor(Math.random() * keys.length));
	}
	return s;
};

/**
 * Opens and close the db.
 * Save a post and save the user email
 */
StressJS.save = function() {
	MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
		if (err) {
			console.log("Mongo connecting: " + err);
			if (db) {
				db.close();
			}
		} else {
			if (db) {
				//Selecting the post collection
				var posts = db.collection("posts");

				var title = StressJS.randomString(20) + new Date().getTime() + '_' + Math.floor((Math.random() * 100));
				var permalink = title.replace(/\s/g,'-');
				var user = {
					fname : StressJS.randomString(8),
					lname : StressJS.randomString(8),
					domain : '@' + StressJS.randomString(10) + '.' + StressJS.randomString(5) + '.' + StressJS.randomString(5)
				};

				user.email = user.fname + "." + user.lname + user.domain;

				// Build a new post
				var post = {
					"title" : "MNA || " + title,
					"author" : user.email,
					"body" : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					"permalink" : permalink,
					"tags" : [StressJS.randomString(5), StressJS.randomString(2), StressJS.randomString(6)],
					"comments" : [StressJS.randomString(4) + '2' + StressJS.randomString(4)],
					"date" : new Date().getDate()
				};

				posts.insert(post, function(err, result) {
					if (err) {
						console.log("Post ERROR ");
						db.close();
					} else {
						console.log("Post OK ");
						//Selecting the post collection
						var users = db.collection("users");
						users.insert(user, function(err, result) {
							if (err) {
								console.log("Post ERROR ");
								db.close();
							} else {
								console.log("User OK ");
								db.close();
							}
						});
					}
				});
			} else {
				console.log("ERR: No db object found.");
			}
		}
	});
};

/**
 * Here we go!.
 */
StressJS.run = function() {
	setInterval(function() {
		StressJS.save();
	}, 100);
};

//Exports the object
exports.StressJS = StressJS;
