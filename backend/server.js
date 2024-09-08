const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://Swayam:9832900366@cluster0.z7kyt.mongodb.net/aggregate', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
  name: String,
  score: Number,
  age: Number 
});

const User = mongoose.model('User', userSchema);

app.get('/', async (req, res) => {
  res.send("Hello World");
});


app.post('/users', async (req, res) => {
  console.log("hi")
  const { name, age, score } = req.body; 
  const newUser = new User({ name, age, score });
  await newUser.save();
  res.status(201).send(newUser);
});

app.get('/users/age-group', async (req, res) => {
  try {
    const ageGroups = await User.aggregate([
      {
        $group: {
          _id: "$age",
          count: { $sum: 1 } , 
          avgscore:{$avg:"$score"}
        }
      },
      {
        $sort: { _id: 1 } 
      }
    ]);

    res.status(200).send(ageGroups);
  } catch (error) {
    res.status(500).send(error);
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
