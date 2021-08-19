const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env'), silent: true});


app.use(cors({
    credentials:true,
	origin: 'http://localhost:3000'
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

const PORT = process.env.PORT || 4000;



// 'ROUTES'
const authRoute = require('./routes/auth');
const coursesRoute = require('./routes/courses');
const adminRoute = require('./routes/admin');
const enrollRoute = require('./routes/enroll');
const projectRoute = require('./routes/project');
const serviceRoute = require('./routes/service');
const categoryRoute = require('./routes/category');


app.use('/api/auth', authRoute);
app.use('/api/courses', coursesRoute);
app.use('/api/admin', adminRoute);
app.use('/api/enroll', enrollRoute);
app.use('/api/projects', projectRoute);
app.use('/api/services', serviceRoute);
app.use('/api/categories', categoryRoute);



const start = async () => {
	try {
		await mongoose.connect(process.env.DB_URL, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true ,
            useFindAndModify: false
        });
        app.listen(PORT, () => console.log(`SERVER HAS BEEN STARTED AT ${PORT}`));
	} catch(e) {
		console.log(e);
	}
}

start();