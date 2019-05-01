exports.seed = function(knex, Promise) {
  return knex("students").then(function() {
    // Inserts seed entries
    return knex("students").insert([
      { name: "Robert", cohort_id: 1 },
      { name: "Sam", cohort_id: 3 },
      { name: "Timothy", cohort_id: 2 }
    ]);
  });
};
