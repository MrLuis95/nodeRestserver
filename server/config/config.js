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
  process.env.MongoDB = process.env.MONGO_URI||'mongodb://localhost:27017/cafe';

/*=============
    JWT
  =============*/ 
  process.env.EXPIRATION_DATE = 60*60*24*30;
  process.env.SEED =  process.env.SEED || 'seed-de-desarrollo'; 