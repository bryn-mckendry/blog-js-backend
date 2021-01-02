import { DataTypes } from 'sequelize';
import db from '../database';


const Post = db.define('post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

export default Post;