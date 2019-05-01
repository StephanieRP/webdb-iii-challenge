exports.seed = function(knex, Promise) {
  return knex("cohorts")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("cohorts").insert([
        { name: "Full Stack Engineer" },
        { name: "Data Scientist" },
        { name: "UX Developer" }
      ]);
    });
};
