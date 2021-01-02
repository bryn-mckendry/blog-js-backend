import { DataTypes } from 'sequelize';
import db from '../database';
import bcrypt from 'bcryptjs';
import { SALT_ROUNDS } from '../../config';

const Profile = db.define('profile', {
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Profile.prototype.checkPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

Profile.beforeSave(async (profile, options) => {
    if (profile.changed('password')) {
        profile.password = await bcrypt.hash(profile.password, SALT_ROUNDS);
    }
})

export default Profile;