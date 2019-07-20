/*=============
    PORT
  =============*/
process.env.PORT = process.env.PORT || 3000;

/*=============
    ENVIRONMENT
  =============*/
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/*=============
    DBs
  =============*/
process.env.MongoDB = process.env.MONGO_URI || 'mongodb://localhost:27017/cafe';

/*=============
    JWT
  =============*/
process.env.EXPIRATION_DATE = "30d";
process.env.SEED = process.env.SEED || 'seed-de-desarrollo';

/*=============
    Google client
  =============*/

  process.env.CLIENT_ID = process.env.CLIENT_ID || '844734583440-0s6nddlfesisse4qu378bi4alm4dq73r.apps.googleusercontent.com';

/*=============
    Log
  =============*/

  process.env.LOG_LEVEL = process.env.LOG_LEVEL || 'DEBUG';

  process.env.LOG_APPENDER = process.env.LOG_APPENDER || 'out';