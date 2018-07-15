/*=============
    PORT
  =============*/
  process.env.PORT = process.env.PORT || 3000;

/*=============
    PORT
  =============*/
  process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/*=============
    DBs
  =============*/ 
  process.env.MongoDB = process.env.NODE_ENV==='dev'?
      'mongodb://localhost:27017/cafe':
      'mongodb://usr:cafe2018@ds237641.mlab.com:37641/cafe';

