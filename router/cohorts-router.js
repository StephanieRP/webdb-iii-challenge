const express = require("express");
const router = express.Router();
const knex = require("knex");

const knexConfig = require("../knexfile.js");
const cohortsDB = knex(knexConfig.development);

//Get request - all data
router.get("/", async (req, res) => {
  try {
    const cohort = await cohortsDB("cohorts");
    res.status(200).json(cohort);
  } catch (error) {
    res.status(500).json({
      message: "Could not get data for cohorts"
    });
  }
});

//Get request - by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const cohort = await cohortsDB("cohorts")
      .where({ id: id })
      .first();
    cohort
      ? res.status(200).json(cohort)
      : res.status(404).json({
          message: "Could not find a cohort with that ID"
        });
  } catch (error) {
    res.status(500).json({
      message: "Could not get data for cohorts"
    });
  }
});

//Post request - add new cohort
router.post("/", async (req, res) => {
  const newCohort = req.body;
  try {
    const [id] = await cohortsDB("cohorts").insert(newCohort);
    const cohort = await cohortsDB("cohorts")
      .where({ id })
      .first();
    res.status(201).json(cohort);
  } catch (error) {
    res.status(500).json({
      message: "Could not get data for cohorts"
    });
  }
});

//Put request - edit cohort
router.put("/:id", async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  try {
    const cohort = await cohortsDB("cohorts")
      .where({ id })
      .update(body);
    if (cohort > 0) {
      const editCohort = await cohortsDB("cohorts")
        .where({ id })
        .first();
      res.status(200).json(editCohort);
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

//Delete request - delete cohort
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const cohort = await cohortsDB("cohorts")
      .where({ id })
      .del();

    cohort > 0
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
