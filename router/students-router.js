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

//Get request - by id of student
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const student = await studentDB("students")
      .where({ id })
      .first();
    student
      ? res.status(200).json(student)
      : res.status(404).json({
          message: "Could not get a student with this ID"
        });
  } catch (error) {
    res.status(500).json({
      message: "Could not get data for students"
    });
  }
});

//Get request - by id of student's cohort
router.get("/cohort/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const cohorts = await studentDB("students")
      .select(
        "students.id as id",
        "students.name as student_name",
        "cohorts.name as cohort_name"
      )
      .where({ "students.id": id })
      .join("cohorts", "students.cohort_id", "cohorts.id")
      .first();
    res.status(200).json(cohorts);
    console.log(cohorts);
  } catch (error) {
    res.status(500).json({
      message: "Could not get data for students"
    });
    console.log(error);
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

//Put request - edit students
router.put("/:id", async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  try {
    const student = await studentDB("students")
      .where({ id })
      .update(body);
    if (student > 0) {
      const studentEdit = await studentDB("students")
        .where({ id })
        .first();
      res.status(200).json(studentEdit);
    } else {
      res.status(404).json({
        message: "Could not get data for cohorts"
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Could not get data for cohorts"
    });
  }
});

//Delete request - delete student
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const student = await studentDB("students")
      .where({ id })
      .del();

    student > 0
      ? res.status(204).end()
      : res.status(404).json({
          message: "Could not find data for this cohorts"
        });
  } catch (error) {
    res.status(500).json({
      message: "Could not get data for cohorts"
    });
  }
});

module.exports = router;
