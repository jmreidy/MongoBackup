var env = {
  node_env: process.env.NODE_ENV || 'development',
  fileFormat: '[backup]_MM_DD_YYYY_HH:mm',
  awsKey:  process.env.AWS_KEY,
  awsSecret:   process.env.AWS_PASS,
  awsBucket:  process.env.AWS_BUCKET,
  mongoServer: process.env.MONGO_SERVER,
  mongoPort: process.env.MONGO_PORT,
  mongoDb: process.env.MONGO_DB,
  mongoUser: process.env.MONGO_USER,
  mongoPassword: process.env.MONGO_PASSWORD
};

env.development = env.node_env === 'development';
env.test = env.node_env === 'test';
env.production = env.node_env === 'production';

//env specific overrides
if (env.development) {
}

if (env.test) {

}

if (env.production) {
}

module.exports = env;
