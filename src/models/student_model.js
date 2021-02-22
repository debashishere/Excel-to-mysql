module.exports = (sequelize, Sequelize) => {

    const student = sequelize.define("student", {
        name: {
            type: Sequelize.STRING
        },
        roll_no: {
            type: Sequelize.STRING
        },
        class: {
            type: Sequelize.INTEGER
        }
    });

    return student;
};