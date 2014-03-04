var MongoClient = require('mongodb').MongoClient;

/**
 * Get 1 random element,
 * using pagination,
 * show only the author email.
 *
 * Update randomly the author email
 */
function query_random() {
	MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
		if (err) {
			console.log("Mongo connecting: " + err);
			if (db) {
				db.close();
			}

		} else {
			if (db) {
				var projection = {
					author : 1,
					_id : 0
				};

				var authors = ["mark.gosselaar", "mario.lopez", "dustin.diamond", "tiffani.thiesen", "elizabeth.berkeley", "lark.voories", "dennis.haskins", "ed.alonzo", "leana.creel", "leah.remini", "ernie.sabella", "jhon.moschitta"];
				var domain = "@saved.by.the.bell";

				var posts = db.collection("posts");
				var startFind = new Date().getTime();
				console.log("Start find: " + startFind);
				var page = Math.floor(Math.random() * (1000000 - 1 + 1)) + 1;
				console.log("Page: " + page);
				posts.find({}, projection).skip(page).limit(1).toArray(function(err, result) {
					if (err) {
						console.log("Post ERROR ");
						db.close();
					} else {
						var endFind = new Date().getTime();
						console.log("End find: " + endFind);
						console.log("DIFF FIND: " + (endFind - startFind ));

						console.log('Post author: ' + JSON.stringify(result[0]));
						var cur_author = result[0];
						//update the author
						var promise = {author : authors[Math.floor(Math.random() * (11)) + 1] + domain};

						var startUpdate = new Date().getTime();
						console.log("Start update: " + startUpdate);
						posts.update(cur_author, {
							$set : promise
						}, {}, function(err, results) {
							if (err) {
								console.log("Post ERROR ");
								db.close();
							} else {
								var endUpdate = new Date().getTime();
								console.log("End find: " + endUpdate);
								console.log("DIFF UPDATE: " + (endUpdate - startUpdate ));
								console.log("Updated with auhor: " + JSON.stringify(promise));
								console.log("End update: " + new Date().getTime());
								console.log("\n");
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

setInterval(function() {
	query_random();
}, 2000);

