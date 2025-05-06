import express, {Request} from 'express';
import bcrypt from 'bcryptjs';
import AuthRequest from '../interfaces/authInterface';
import RedisService from './redisService';
import {generateToken} from '../util/jwt';
import { v4 as uuidv4 } from 'uuid';
import {isNull} from '../util/isNull'
let redisService = new RedisService();
export default class AuthService {
    public register = async (req: AuthRequest) => {
        const {tenantDb, body={}} = req;
        const {email, password} = body;
        const checkUser = await tenantDb.query('SELECT * FROM users WHERE email = $1 and is_deleted=false', [email]);
        let message = 'User created successfully';
        if(isNull(checkUser)) {
            message = 'User already exists';
            return {message, status: 400, data:{}};
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const creatUser = await tenantDb.query(`INSERT INTO users 
                                            (email, password, created_at) 
                                            VALUES 
                                            ($1, $2, now()) RETURNING *`, 
                                            [email, hashedPassword]);
        console.log('creatUser', creatUser);
        if(!isNull(creatUser)) {
            return {message, status: 200, data:creatUser[0]};
        }
        return {message: 'User creation failed', status: 400, data:{}};
    }

    public login = async (req: AuthRequest) => {
        const {tenantDb, body={}} = req;
        const {email, password} = body;
        const checkUser = await tenantDb.query('SELECT * FROM users WHERE email = $1', [email]);
        const[{password: hashedPassword}] = checkUser;
        const isMatch = await bcrypt.compare(password, hashedPassword);
        if (!isMatch) return {message: 'Invalid Credentials', status: 400, data:{}};
        const [{id, email: userEmail}] = checkUser;
        const token = generateToken({id, email: userEmail});
        await redisService.set(`${token}`, {id, email: userEmail}, 86400);
        return {message: 'Login successful', status: 200, data:{token}};
    }

    public session = async (req: AuthRequest) => {
        const {tenantDb, body={}}=req;
        const {user} = req;
        const {ip, userAgent} = body;
        let uuid = uuidv4();
        while(true) {
            const checkSession = await tenantDb.query(`
                SELECT 
                session_id FROM user_session 
                WHERE session_id = $1`,
                 [uuid]);
            if(checkSession.length === 0) break;
            uuid = uuidv4();
        }
        await tenantDb.query(`INSERT INTO sessions
                                            (session_id, user_id, ip, user_agent, created_at, is_expired) 
                                            VALUES 
                                            ($1, $2, $3, $4, now(), false) returning *`,
                                            [ uuid, user.id, ip, userAgent]);
        return {message: 'Session created successfully', status: 200, data:{sessionId: uuid}};
    }
}