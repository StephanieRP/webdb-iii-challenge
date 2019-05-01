exports.up = function(knex, Promise) {
  return knex.schema.createTable("students", student => {
    student.increments("id");

    student.string("name", 255).notNullable();

    student
      .integer("cohort_id")
      .unsigned()
      .references("id")
      .inTable("cohorts")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    student.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("students");
};
