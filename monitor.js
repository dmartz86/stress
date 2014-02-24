
var MongoClient = require('mongodb').MongoClient;

/**
 * The Monitor.
 * Just a simple counter for two collections.
 */
var Monitor = function() {
};

/**
 * Prints count of posts and users.
 */
Monitor.start = function() {
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

				posts.count(function(err, result) {
					if (err) {
						console.log("Post ERROR ");
						db.close();
					} else {
						console.log('Posts: '+JSON.stringify(result));
						//Selecting the post collection
						var users = db.collection("users");
						users.count(function(err, result) {
							if (err) {
								console.log("Post ERROR ");
								db.close();
							} else {
								console.log('Users: '+JSON.stringify(result));
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
 * Execute the monitor tool.
 */
Monitor.run = function() {
	setInterval(function() {
		Monitor.start();
	}, 1000);
};

//Exports the object
exports.Monitor = Monitor;

