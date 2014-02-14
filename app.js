var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {

	function randomString(size) {
		var s = "";
		var keys = "abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ+-*=!#$%&";
		for (var i = 0; i < size; i++){
			s += keys.charAt(Math.floor(Math.random() * keys.length));
		}
		return s;
	}

	function save(id) {
		var title = randomString(20) + new Date() + '_' + Math.floor((Math.random() * 100));

		var posts = db.collection("posts");
		// fix up the permalink to not include whitespace
		var permalink = title.replace(/\s/g, '_');
		permalink = permalink.replace(/\W/g, '');

		// Build a new post
		var post = {
			"title" : title,
			"author" : randomString(8)+"."+randomString(8) + '@mailsample.com',
			"body" : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			"permalink" : permalink,
			"tags" : [randomString(5), randomString(2), randomString(6)],
			"comments" : [randomString(4) + '2' + randomString(4)],
			"date" : new Date().getDate()
		}
		posts.insert(post, function(err, result) {"use strict";

			if (err) {
				console.log("ERR " + id);
			} else {
				console.log("OK " + id);
			}
		});
	}

	var max = 2000000;
	for (var i = 0; i < max; i++) {
		save(i);
	};
});
