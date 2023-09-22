const db = require("../Entity");
const users = db.users;
const teams = db.teams;
const scores = db.scores;
const { decodeToken } = require("../../config/jwtConfig");
// Methods
const validateAdmin = async (req, res) => {
  let token = await req.headers.authorization.split(" ")[1];
  let decodeMyToken = await decodeToken(token);
  const email = decodeMyToken.email;
  let getData = await users.findOne({
    where: {
      email: email,
    },
  });
  if (getData) {
    myData = {
      id: getData.id,
      role: getData.role,
    };
    res.status(200).send({ myData });
  } else {
    res.status(400).send({ message: "Invalid user" });
  }
};

const getTeams = async (req, res) => {
  try {
    let getData = await teams.findAll();
    if(getData){
    res.status(200).send({ getData });
  } else {
    res.status(400).send({ message: "no Teams" });
  }
  } catch (error) {
    res.status(500).send({ statusCode: 400, message: "Internal error" });
  }
};

const getLiveScore = async (req, res) => {
  console.log(req.params);
  try {
    let livescore = await scores.findOne({
      where: {
        innings: req.params.innings,
      },
    });
    console.log("team_id: ",livescore)
    if (livescore) {
      res.status(200).send({ livescore });
    } else {
      res
        .status(400)
        .send({ message: `live score not updated ${req.params.innings}` });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal error" });
  }
};


const createMatchRecord = async (req, res) => {
  try {
    let createMatchRecord = await scores.create(req.body);
    res.status(200).send({ message: "First innings started" });
  } catch (error) {
    res.status(500).send({ message: "Internal error" });
  }
};


const updateMatchDetails = async (req, res) => {
  console.log(req.body);
  let findData = scores.findOne({
    where: {
      innings: req.body.innings,
    },
  });
  if (findData) {
    await scores.update(
      {
        score: req.body.score,
        wickets: req.body.wickets,
        overs: req.body.overs,
      },
      { where: { innings: req.body.innings } }
    );

    res.send({ statusCode: 200, message: "Updated" });
  } else {
    res.status(400).send("Update failed!");
  }
};

module.exports = {
  validateAdmin,
  getTeams,
  createMatchRecord,
  updateMatchDetails,
  getLiveScore,
};
