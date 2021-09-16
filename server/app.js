import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';
import config from './config';

const { MONGO_URI } = config;
const app = express();

//서버보안을 보완
app.use(hpp());
app.use(helmet());

app.use(cors({origin: true, credential: true}));
//로깅
app.use(morgan('dev'));

app.use(express.json());

mongoose.connect(
    MONGO_URI,
    {
        useNewUrlParser: true,
    })
    .then(() => console.log('mongoDB connected!!'))
    .catch((e) => console.log(e));

app.get('/');


export default app;