import cors from 'cors'
import express from 'express'
import UserRoutes from './routes/UserRoutes.js'

const app = express();
app.use(cors());
app.use(express.json());
app.use(UserRoutes);

app.listen('5000',()=> console.log('server up and running...'))