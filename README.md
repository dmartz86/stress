stress js
======

Stress test for mongodb with nodejs.
Inserts documents on posts collection.
At the end you will have more than 4GB to test.

Console Usage
======
"user@host: node app.js

As library
======
StressJS.run();

Run many times as your HDD capacity.


Index memory test
======
>use test
>db.post.ensureIndex("author")

Store test results (lapse 1sec )
======
node /stress/qr.js > tabulation.csv

Store test results (lapse 200ms )
======
node /stress/qr-4gb.js > tabulation-4GB.csv
