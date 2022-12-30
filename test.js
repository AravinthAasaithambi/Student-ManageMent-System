let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
const { MongoClient } = require("mongodb");
const { connect } = require('formik');
const req = require('express/lib/request');
const res = require('express/lib/response');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended: true
}));
app.use(cors());
var router = express.Router();
app.use(router)
const application = express();

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
console.log('Connected to port ' + port)
})


const MONGODB_URI = 'mongodb+srv://student:student123@cluster0.aovuu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';




const connectionString = MONGODB_URI;
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var dbConnection;
client.connect(function (err, db) {
  if (err || !db) {
    console.log(err);
  }
  dbConnection = db.db("myFirstDatabase");
  console.log("Successfully connected to MongoDB."); 
});


router.post('/fetchstudent', function (req, res, next) {
  console.log(req.body)
  dbConnection.collection("students").find({name:req.body.name}).toArray(function (err, result) {
    if (err) {
      console.log(err)
   } else {
    res.send(result);
    }
  });
})

router.post('/fetchstudents', function (req, res, next) {
  console.log(req.body)
  dbConnection.collection("students").find({studentid:req.body.studentid}).toArray(function (err, result) {
    if (err) {
      console.log(err)
   } else {
    
    res.send(result);
    }
  });
})
router.post('/auth', function (req, res, next) {
  console.log(req.body)
  dbConnection.collection("users").find({username:req.body.username}).toArray(function (err, result) {
    if (err) {
      console.log(err)
   } else {
    console.log(result)
    if(req.body.password==result[0].password)
        res.send({status:200,type:result[0].type,username:result[0].username});
    else{
      res.send({status:200,error:"User credentials mismatch"});
    }
  }
  });
})

router.post('/fetchteacher', function (req, res, next) {
  console.log(req.body)
  dbConnection.collection("teachers").find({name:req.body.name}).toArray(function (err, result) {
    if (err) {
      console.log(err)
   } else {
    console.log(result)
    res.send(result);
    }
  });
})


router.post('/fetchteacherbycourse', function (req, res, next) {
  console.log(req.body)

  dbConnection.collection("teachers").find({course:req.body.course}).toArray(function (err, result) {
    if (err) {
      console.log(err)
   } else {
    console.log(result)
    res.send(result);
    }
  });
})
router.post('/fetchcoursefeebycourse', function (req, res, next) {
  console.log(req.body)
  dbConnection.collection("fees").find({coursename:req.body.coursename}).toArray(function (err, result) {
    if (err) {
      console.log(err)
   } else {
    console.log(result)
    res.send(result);
    }
  });
})


router.post('/fetchstudentbyname',function(req,res,next){
  console.log(req.body)
  dbConnection.collection("students").find({name:req.body.name}).toArray(function(err,result){
    if(err){
      console.log(err)
    } else{
      console.log(result)
      res.send(result);
    }
  });
})

router.post('/fetchteacherbyname',function(req,res,next){
  console.log(req.body)
  dbConnection.collection("teachers").find({name:req.body.name}).toArray(function(err,result){
    if(err){
      console.log(err)
    } else{
      console.log(result)
      res.send(result);
    }
  });
})


router.post('/fetchcourse', function (req, res, next) {
  console.log(req.body)
  dbConnection.collection("courses").find({coursename:req.body.coursename}).toArray(function (err, result) {
    if (err) {
      console.log(err)
   } else {
    console.log(result)
    res.send(result);
    }
  });
})


router.post('/fetchfees', function (req, res, next) {
  console.log(req.body)
  dbConnection.collection("fees").find({coursename:req.body.coursename}).toArray(function (err, result) {
    if (err) {
      console.log(err)
   } else {
    console.log(result)
    res.send(result);
    }
  });
})

router.get('/fetchuser', function (req, res, next) {
  console.log(req.body)
  dbConnection.collection("users").find({type:req.query.type}).toArray(function (err, result) {
    if (err) {
      console.log(err)
   } else {
    console.log(result)
    res.send(result);
    }
  });
})



router.post('/saveuser', function (req, res, next) {
  console.log(req.body)
  var data = {
    "username": req.body.username,
    "password": req.body.password,
    "type": req.body.type
   }
   console.log(data)
  dbConnection.collection("users").insertOne(data, function(err, result) {
    if (err) throw err;
    console.log("Document inserted")
    res.send("Document inserted")
});

})

router.post('/savestudent', function (req, res, next) {
  console.log(req.body)
  var data = {
    "studentid": req.body.studentid,
    "name": req.body.name,
    "course": req.body.course
   }
   console.log(data)
  dbConnection.collection("students").insertOne(data, function(err, result) {
    if (err) throw err;
    console.log("Document inserted")
    res.send("Document inserted")
});

})


router.post('/saveteacher', function (req, res, next) {
  console.log(req.body)
  var data = {
    "teacherid": req.body.teacherid,
    "name": req.body.name,
    "course": req.body.course
   }
   console.log(data)
  dbConnection.collection("teachers").insertOne(data, function(err, result) {
    if (err) throw err;
    console.log("Document inserted")
    res.send("Document inserted")
});

})



router.post('/savecourse', function (req, res, next) {
  console.log(req.body)
  var data = {
    "courseduration": req.body.courseduration,
    "courseid": req.body.courseid,
    "coursename": req.body.coursename
   }
   console.log(data)
  dbConnection.collection("courses").insertOne(data, function(err, result) {
    if (err) throw err;
    console.log("Document inserted")
    res.send("Document inserted")
});

})



router.post('/savefees', function (req, res, next) {
  console.log(req.body)
  var data = {
    "courseid": req.body.courseid,
    "coursefee": req.body.coursefee,
    "coursename": req.body.coursename
   }
   console.log(data)
  dbConnection.collection("fees").insertOne(data, function(err, result) {
    if (err) throw err;
    console.log("Document inserted")
    res.send("Document inserted")
});

})



router.post('/updatestudent', function (req, res, next) {
  console.log(req.body)
  
   var query = { studentid : req.body.studentid };
   var data = { name : req.body.name, course: req.body.course };
   dbConnection.collection("students").updateOne(query ,{$set:data}, (err , result) => {
		if(err) throw err;
		console.log("Record updated successfully");
		console.log(result);
    res.send(result)
  });

})


router.post('/fetchallcourses', function (req, res, next) {
  console.log(req.body)
  dbConnection.collection("courses").find( ).toArray(function (err, result) {
    if (err) {
      console.log(err)
   } else {
    console.log(result)
    res.send(result);
    }
  });
})


router.post('/fetchallcoursesfee', function (req, res, next) {
  console.log(req.body)
  dbConnection.collection("fees").find( ).toArray(function (err, result) {
    if (err) {
      console.log(err)
   } else {
    console.log(result)
    res.send(result);
    }
  });
})


router.post('/fetchallstudents', function (req, res, next) {
  console.log(req.body)
  dbConnection.collection("students").find( ).toArray(function (err, result) {
    if (err) {
      console.log(err)
   } else {
    console.log(result)
    res.send(result);
    }
  });
})



router.post('/fetchallteachers', function (req, res, next) {
  console.log(req.body)
  dbConnection.collection("teachers").find( ).toArray(function (err, result) {
    if (err) {
      console.log(err)
   } else {
    console.log(result)
    res.send(result);
    }
  });
})

router.post('/fetchallusers', function (req, res, next) {
  console.log(req.body)
  dbConnection.collection("users").find().toArray(function (err, result) {
    if (err) {
      console.log(err)
   } else {
    console.log(result)
    res.send(result);
    }
  });
})
