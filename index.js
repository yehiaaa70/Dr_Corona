const express = require('express');
const compression = require('compression');

const app = express();
require('./db/mongoose')
const users = require('./routers/users');
const login = require('./routers/login');
const doctors = require('./routers/doctor');
const nurses = require('./routers/nurse');
const patients = require('./routers/patient');
const hospitals = require('./routers/hospital');
const pharmacies = require('./routers/Pharmacy');

const helmet = require('helmet');

app.use(express.json());
app.use(helmet());
app.use(compression())
app.use('images',express.static('images'))
app.use('/api/users' , users);
app.use('/api/login' ,login );
app.use('/api/doctors' , doctors);
app.use('/api/nurses' , nurses);
app.use('/api/patients' , patients);
app.use('/api/hospitals' , hospitals);
app.use('/api/pharmacies' , pharmacies);

const PORT = process.env.PORT || 3000
app.listen(port, ()=> console.log('App working on port '+PORT+'...')) 

