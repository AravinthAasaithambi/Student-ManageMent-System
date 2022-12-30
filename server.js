let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
//let dbConfig = require('./database/db');
// const dotenv = require('dotenv')
//     dotenv.config()

const application = express();

const PORT = process.env.PORT || 8080


const MONGODB_URI = 'mongodb+srv://student:student123@cluster0.aovuu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

require("dotenv").config({ path: "./config/.env" });
const studentRoute = require('../backend/routes/student.route')


// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
// mongoose.set('useUnifiedTopology', true);


mongoose.Promise = global.Promise;
mongoose.connect(MONGODB_URI)  .then(() => {
console.log('Database successfully connected!')
},
error => {
	console.log('Could not connect to database : ' + error)
}
)

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended: true
}));
app.use(cors());
app.use('/students', studentRoute)



const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
console.log('Connected to port ' + port)
})


app.use((req, res, next) => {
res.status(404).send('ak success')
});

app.use(function (err, req, res, next) {
console.error(err.message);
if (!err.statusCode) err.statusCode = 500;
res.status(err.statusCode).send(err.message);
});
