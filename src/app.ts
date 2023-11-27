import express, { Application } from 'express';
import cors from 'cors';
import { UserRoutes } from './modules/user/user.route';

const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


//!Router is connection

app.use('/api/v1/user',UserRoutes);



export default app;