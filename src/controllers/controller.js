const readXlsxFile = require("read-excel-file/node");
const db = require("../models");
const Students = db.student

const upload = async (req, res) => {
    try {
        if (req.file == undefined) {
            return res.status(400).send("Please upload an excel file!");
        }

        let path =
            __basedir + "/resources/uploads/" + req.file.filename;

        readXlsxFile(path).then((rows) => {
            // skip header
            rows.shift();

            let students = [];

            rows.forEach((row) => {
                let student = {
                    name: row[0],
                    roll_no: row[1],
                    class: row[2]
                };

                students.push(student);
            });

            Students.bulkCreate(students)
                .then(() => {
                    res.status(200).send({
                        message: "Uploaded the file successfully: " + req.file.originalname,
                    });
                })
                .catch((error) => {
                    res.status(500).send({
                        message: "Fail to import data into database!",
                        error: error.message,
                    });
                });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Could not upload the file: " + req.file.originalname,
        });
    }
};

const getStudents = (req, res) => {
    Students.findAll({ raw: true })
        .then((data) => {
            const resData = {
                data: data
            }

            res.status(200).send(resData);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials.",
            });
        });
};

module.exports = {
    upload,
    getStudents,
};