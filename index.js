const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const Cat = require("./modal");
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

// app.get("/", (req, res) => {
//   res.send("welcome in my first job interview task server =D");
// });

app.get("/", (req, res) => {
  Cat.find({})
    .then((data) => {
      console.log("get all data", res.send(data));
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/create", (req, res) => {
  const { name, breed, description, img, age } = req.body;
  const cat = new Cat({
    name: name,
    breed: breed,
    description: description,
    img: img,
    age: age,
  });
  cat.save()
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/delete", (req, res) => {
  cat.findByIdAndRemove(req.body.id)
    .then((data) => {
      console.log("deleted", data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/update", (req, res) => {
  const { id, name, breed, description, img, age } = req.body;

  console.log("request", req.body);
  cat.findByIdAndUpdate(
    id,
    {
      name,
      breed,
      description,
      img,
      age,
    },
    { new: true }
  )
    .then((data) => {
      console.log("updated", data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }
mongoose.connect(MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log("mongodb is connected =P");
});
mongoose.connection.on("error", (err) => {
  console.log(`mongodb is nooooooot connected`, err);
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
