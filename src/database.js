import { Sequelize } from 'sequelize';
import { NODE_ENV, DB_URI } from '../config';

let db;

if (NODE_ENV === 'TEST') {
    db = new Sequelize('sqlite::memory:', { logging: false });
}
else if (NODE_ENV === 'DEVELOPMENT') {
    db = new Sequelize('sqlite:./../data.sqlite');  
}
else if (NODE_ENV === 'PRODUCTION') {
    db = new Sequelize(DB_URI);
}

export default db;
