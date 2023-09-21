const db = require("../Entity");
const users = db.users;
const teams = db.teams;
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

// const updateProjectAllocation = async (req, res) => {
//   console.log(req.body);
//   let findData = projects.findOne({
//     where: {
//       id: req.body.id,
//     },
//   });
//   if (findData) {
//     await projects.update(
//       {
//         project_name: req.body.project_name,
//         employee_name: req.body.employee_name,
//         employee_email: req.body.employee_email,
//         project_manager: req.body.project_manager,
//         start_date: req.body.start_date,
//         end_date: req.body.end_date,
//         status: req.body.status,
//       },
//       { where: { id: req.body.id } }
//     );

//     res.send({ statusCode: 200, message: "Updated" });
//   } else {
//     res.status(400).send("Update failed!");
//   }
// };
module.exports = {
  validateAdmin,
  getTeams,
};
