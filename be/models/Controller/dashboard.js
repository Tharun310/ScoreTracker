// const db = require("../Entity");
// const upComingEvents = db.upcomingEvents;
// const publicHolidays = db.publicHoliday;
// const performance = db.performance;
// const project = db.project;
// const manager = db.manager;

// const getAllEvent = async (req, res) => {
//   try {
//     let upcomingEvent = await upComingEvents.findAll();
//     if (upcomingEvent) {
//       res.send({ statusCode: 200, upcomingEvent });
//     } else {
//       res.status(400).send({ statusCode: 400, message: "No data" });
//     }
//   } catch (error) {
//     res.status(500).send({ statusCode: 400, message: "Internal error" });
//   }
// };
// const getAllProject = async (req, res) => {
//   try {
//     let getProject = await project.findAll();
//     if (getProject) {
//       res.send({ statusCode: 200, getProject });
//     } else {
//       res.status(400).send({ statusCode: 400, message: "No data" });
//     }
//   } catch (error) {
//     res.status(500).send({ statusCode: 400, message: "Internal error" });
//   }
// };
// const getEventByDate = async (req, res) => {
//   const date = new Date().toISOString().split("T")[0];
//   try {
//     let myEvent = await upComingEvents.findAll({
//       where: {
//         date: date,
//       },
//     });
//     if (myEvent) {
//       res.send({ statusCode: 200, myEvent });
//     } else {
//       res.status(400).send({ statusCode: 400, message: "No event" });
//     }
//   } catch (error) {
//     res.status(500).send({ message: "Internal error" });
//   }
// };

// const createEvent = async (req, res) => {
//   try {
//     // const conflictingEvents = await YourModel.findAll({
//     //   where: {
//     //     [Op.or]: [
//     //       // An event starts during the new event
//     //       {
//     //         startTime: {
//     //           [Op.between]: [newEventStartTime, newEventEndTime]
//     //         }
//     //       },
//     //       // An event ends during the new event
//     //       {
//     //         endTime: {
//     //           [Op.between]: [newEventStartTime, newEventEndTime]
//     //         }
//     //       },
//     //       // An event spans the entire new event
//     //       {
//     //         startTime: {
//     //           [Op.lte]: newEventStartTime
//     //         },
//     //         endTime: {
//     //           [Op.gte]: newEventEndTime
//     //         }
//     //       }
//     //     ]
//     //   }
//     // });
//     // if (conflictingEvents.length === 0) {
//     // } else {
//     //   res
//     //     .status(400)
//     //     .send({ message: "Cannot create event due to time conflicts" });
//     // }
//     let createEvent = await upComingEvents.create(req.body);
//     res.status(200).send({ message: "event created successfully" });
//   } catch (error) {
//     res.status(500).send({ message: "Internal error" });
//   }
// };
// const updateEvent = async (req, res) => {
//   console.log(req.body);
//   let findEvent = await upComingEvents.findOne({
//     where: { id: req.body.id },
//   });
//   if (findEvent) {
//     let updateEvent = await db.upcomingEvents.update(req.body, {
//       where: {
//         id: req.body.id,
//       },
//     });
//     res.status(200).send({ message: "Event updated" });
//   } else {
//     res.status(400).send({ message: "Error updating" });
//   }
// };
// const createHoliday = async (req, res) => {
//   try {
//     let createHoliday = await publicHolidays.create(req.body);
//     res.send({
//       statusCode: 200,
//       message: "public holiday created successfully",
//     });
//   } catch (error) {
//     res.status(500).send({ statusCode: 400, message: "Internal error" });
//   }
// };
// const getAllHoliday = async (req, res) => {
//   try {
//     let getAllHoliday = await publicHolidays.findAll();
//     if (getAllHoliday) {
//       res.status(200).send({ getAllHoliday });
//     } else {
//       res.status(400).send({ message: "No data" });
//     }
//   } catch (error) {
//     res.status(500).send({ message: "Internal error" });
//   }
// };

// const updateHoliday = async (req, res) => {
//   console.log(req.body);
//   try {
//     let findHoliday = await publicHolidays.findOne({
//       where: { id: req.body.holiday.id },
//     });
//     if (findHoliday) {
//       let update = await publicHolidays.update(req.body.holiday, {
//         where: { id: req.body.holiday.id },
//       });
//       res.status(200).send({ message: "Updated" });
//     } else res.status(400).send({ message: "Error updating" });
//   } catch (error) {
//     res.status(500).send({ message: "Internal error" });
//   }
// };
// const deleteEvent = async (req, res) => {
//   try {
//     let findEvent = await upComingEvents.findOne({
//       where: { id: req.params.eventId },
//     });
//     console.log(findEvent);
//     if (findEvent) {
//       let deleteValue = {
//         isDelete: true,
//       };
//       let deleteEvent = await db.upcomingEvents.update(deleteValue, {
//         where: {
//           id: req.params.eventId,
//         },
//       });
//       res.status(200).send({ message: "Event Deleted" });
//     } else {
//       res.status(400).send({ message: "Event not found" });
//     }
//   } catch (error) {
//     res.status(500).send({ message: "Internal error" });
//   }
// };
// const deleteHoliday = async (req, res) => {
//   try {
//     let findHoliday = await publicHolidays.findOne({
//       where: { id: req.params.holidayId },
//     });
//     console.log(findHoliday);
//     if (findHoliday) {
//       let deleteValue = {
//         isDelete: true,
//       };
//       let deleteHoliday = await publicHolidays.update(deleteValue, {
//         where: {
//           id: req.params.holidayId,
//         },
//       });
//       res.status(200).send({ message: "Holiday Event Deleted" });
//     } else {
//       res.status(400).send({ message: "Holiday event not found" });
//     }
//   } catch (error) {
//     res.status(500).send({ message: "Internal error" });
//   }
// };
// const performanceGenerator = async (req, res) => {
//   try {
//     const { email } = req.body;
//     let mydata = {
//       email: email,
//       // jan: "",
//       // feb: "",
//       // mar: "",
//       // apr: "",
//       // may: "",
//       // jun: "",
//       // july: "",
//       // aug: "",
//       // sep: "",
//       // oct: "",
//       // nov: "",
//       // dec: "",
//     };
//     let createNewPerformance = await performance.create(mydata);
//     res.status(200).send({ message: "Performance created" });
//   } catch (error) {
//     res.status(400).send({ message: "Internal error" });
//   }
// };
// const createPerformance = async (req, res) => {
//   try {
//     console.log(req.body);
//     let userPerformance = await performance.findOne({
//       where: {
//         email: req.body.email,
//       },
//     });
//     const { email, month, rating } = req.body;
//     let myData = {
//       [month]: rating,
//     };
//     // const { jan, feb, mar, apr, may, jun, july, aug, sep, oct, nov, dec } =
//     //   req.body;
//     // let mydata = {
//     //   jan: jan,
//     //   feb: feb,
//     //   mar: mar,
//     //   apr: apr,
//     //   may: may,
//     //   jun: jun,
//     //   july: july,
//     //   aug: aug,
//     //   sep: sep,
//     //   oct: oct,
//     //   nov: nov,
//     //   dec: dec,
//     // };
//     if (userPerformance) {
//       let updatePerformance = performance.update(myData, {
//         where: {
//           email: email,
//         },
//       });
//       res.status(200).send({ message: "Performance updated" });
//     } else {
//       let data = await performance.create(req.body);
//       console.log(data);
//       res.status(200).send({ message: "Performance updated" });
//     }
//   } catch (error) {
//     res.status(500).send({ message: "Internal error" });
//   }
// };
// const getPerformanceByEmail = async (req, res) => {
//   console.log(req.params);
//   try {
//     let getPerformanceByEmail = await performance.findOne({
//       where: {
//         email: req.params.email,
//       },
//     });
//     if (getPerformanceByEmail) {
//       res.status(200).send({ getPerformanceByEmail });
//     } else {
//       res
//         .status(400)
//         .send({ message: `Performance not created for ${req.params.email}` });
//     }
//   } catch (error) {
//     res.status(500).send({ message: "Internal error" });
//   }
// };
// const createProject = async (req, res) => {
//   try {
//     let createProject = await project.create(req.body);
//     res.status(200).send({ message: "project allocated successfully" });
//   } catch (error) {
//     res.status(500).send({ message: "Internal error" });
//   }
// };
// const getProjectByEmail = async (req, res) => {
//   try {
//     let getProject = await project.findAll({
//       where: {
//         employee_email: req.params.email,
//       },
//     });
//     res.status(200).send({ message: "project retrieved", getProject });
//   } catch (error) {
//     res.status(500).send({ message: "Internal error" });
//   }
// };
// module.exports = {
//   getAllEvent,
//   getAllProject,
//   updateHoliday,
//   createEvent,
//   getProjectByEmail,
//   getEventByDate,
//   createHoliday,
//   getAllHoliday,
//   createPerformance,
//   getPerformanceByEmail,
//   deleteHoliday,
//   updateEvent,
//   createProject,
//   performanceGenerator,
//   deleteEvent,
// };
