stress js
======

Stress test form mongo db with node.
Inserts documents on posts collection.
At the end you will have more than 4GB to test.


Dependences
======
user@host: node install mongodb


Usage
======
user@host: node app.js &
user@host: node app.js &
user@host: node app.js &
user@host: node app.js &
user@host: node app.js &
user@host: node app.js &
user@host: node app.js &
user@host: node app.js &
user@host: node app.js &

Run many times as your HDD capacity.


Index memory test
======
>use test
>db.post.ensureIndex("author")
