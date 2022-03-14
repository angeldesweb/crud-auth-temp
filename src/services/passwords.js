import bcrypt from 'bcryptjs';
import { Authorization } from './errors';

export const savePassword = async (password) => {
    try {
        if(!password) return null;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password,salt);
        return hash;
    } catch (error) {
        throw error;
    }
};

export const checkPassword = async (password,hash) => {
    try {
        const valid = await bcrypt.compare(password,hash);
        return valid;
    } catch (error) {
        throw error;
    }
};

