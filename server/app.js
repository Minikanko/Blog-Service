import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import mongoose from 'mongoose';
import morgan from 'morgan';
import config from './config';
import cors from 'cors';
import postRoutes from './routes/post';
import userRoutes from './routes/user';
import authRoutes from './routes/auth';

const { MONGO_URI }  = config;
const app = express();

//서버보안을 보완
app.use(hpp());
app.use(helmet());

app.use(cors({origin: true, credential: true}));
//로깅
app.use(morgan('dev'));

app.use(express.json());

mongoose.connect(
    'mongodb+srv://ksh:1q2w3e4r!@cluster0.a835k.mongodb.net/blogSchema?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
    })
    .then(() => console.log('mongoDB connected!!'))
    .catch((e) => console.log(e));

app.get('/');
app.use('/api/post',postRoutes);
app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);


export default app;