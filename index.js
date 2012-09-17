var knox = require('knox');
var moment = require('moment');
var spawn = require('child_process').spawn;

var env = require('./env');

var client = knox.createClient({
  key: env.awsKey,
  secret: env.awsSecret,
  bucket: env.awsBucket
});


var args = [
    '--host', env.mongoServer,
    '--port', env.mongoPort,
    '--db', env.mongoDb,
    '--out', 'tmp/dump'
];
if (env.mongoUser && env.mongoPassword) {
  args.push('--username', env.mongoUser);
  args.push('--password', env.mongoPassword);
}

var mongodump = spawn('mongodump', args);
var now = moment();
var dumpFile = now.format(env.fileFormat)+'.tar';
mongodump.on('exit', function(code) {
  var tar = spawn('tar', ['cf', 'tmp/'+dumpFile, 'tmp/dump/'+env.mongoDb]);
  tar.on('exit', function(code) {
    var headers = { 'x-amz-acl': 'private' };
    client.putFile('tmp/'+dumpFile, dumpFile, headers, function(err, res) {
      if (err) throw err;
      console.log('Finished uploading ' + dumpFile + ' to S3');
    });
  });
});



