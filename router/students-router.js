const express = require("express");
const router = express.Router();
const knex = require("knex");
const knexConfig = require("../knexfile.js");
const studentDB = knex(knexConfig.development);

//Get request - all data
router.get("/", async (req, res) => {
  try {
    const student = await studentDB("students");
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({
      message: "Could not get data for students"
    });
  }
});

//Get request - by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const cohortName = await cohortDB("cohorts").join(
      "students",
      "cohorts.cohort_id",
      "=",
      "students.id"
    );
    const student = await studentsDB("student")
      .where({ id: id })
      .first();
    student
      ? res.status(200).json(student)
      : res.status(404).json({
          message: "Could not find a student with that ID"
        });
  } catch (error) {
    res.status(500).json({
      message: "Could not get data for students"
    });
  }
});

//Post request - add new student
router.post("/", async (req, res) => {
  const newStudent = req.body;
  try {
    const [id] = await studentDB("students").insert(newStudent);
    const student = await studentDB("students")
      .where({ id })
      .first();
    res.status(201).json(student);
    console.log(student);
  } catch (error) {
    res.status(500).json({
      message: "Could not get data for students"
    });
  }
});

module.exports = router;
