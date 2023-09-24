const db = require("../Entity");
const users = db.users;
const score = db.scores
const bcrypt = require("bcryptjs");
const { createToken, decodeToken } = require("../../config/jwtConfig");
// const user = require("../Entity/user");
const create = async (req, res) => {
  console.log(req.body);
  try {
    if (req.body.password && req.body.email) {
      let { fullName, password, email } = req.body;
      email = email.toLowerCase();
      if (email.endsWith("@jmangroup.com")) {
        await users.create({
          fullName,
          email,
          password,
        });

        res.send({ status: 200, message: "Signup successful" });
      } else {
        res.status(400).send("invalid email");
      }
    } else {
      res.status(400).send({ message: "Not added to the database!" });
    }
  } catch (error) {
    res.status(400).send({ status: 400, message: "Already Registered" });
  }
};

const login = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    let myData;
    let user;

    user = await users.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      let isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        let token = await createToken(user);

        res.send({
          statusCode: 200,
          message: "Login successful",
          token,
          role: user.role,
          email: user.email,
        });
      } else {
        res.status(400).send({ message: "Wrong password" });
      }
    } else {
      res.status(400).send({ message: "Not registered!" });
    }
  } catch (error) {
    res.send({ status: 400, message: "Error logging " });
  }
};

const validateUser = async (req, res) => {
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

const liveUpdates = async (req, res) => {
  try{
  let getData = await score.findAll();
  console.log("updatedlive",getData)
  if (getData) {
    res.status(200).send({ getData });
    
  } else {
    res.status(400).send({ message: "Invalid user" });
  }
} catch (error) {
      res.status(500).send({ statusCode: 400, message: "Internal error" });
    }
};

// const managerList = async (req, res) => {
//   try {
//     let managerList = await manager.findAll();
//     console.log(managerList);
//     if (managerList) {
//       res.send({ statusCode: 200, managerList });
//     } else {
//       res.status(400).send({ statusCode: 400, message: "No data" });
//     }
//   } catch (error) {
//     res.status(500).send({ statusCode: 400, message: "Internal error" });
//   }
// };
// const employeeList = async (req, res) => {
//   try {
//     let employeeList = await users.findAll();
//     if (employeeList) {
//       console.log(employeeList);
//       let allEmployeeList = [];
//       employeeList.filter((e) => {
//         allEmployeeList.push({
//           fullName: e.fullName,
//           email: e.email,
//           role: e.role,
//         });
//       });
//       if (employeeList) {
//         res.send({ statusCode: 200, allEmployeeList });
//       } else {
//         res.status(400).send({ statusCode: 400, message: "No data" });
//       }
//     }
//   } catch (error) {
//     res.status(500).send({ statusCode: 400, message: "Internal error" });
//   }
// };

module.exports = {
  create,
  login,
  validateUser,
  liveUpdates,
};
