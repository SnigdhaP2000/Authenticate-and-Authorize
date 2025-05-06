import express from 'express';
import authRoutes from './src/routes/authRoutes';
import RedisService from './src/services/redisService'
const app = express();
const port = 3003;
const redisService = new RedisService();
app.use(express.json());
redisService.initializeRedis();
app.use("/", authRoutes);

app.listen(port, ()=>{
    console.log(`task tracker server running on port ${port}`)
})

