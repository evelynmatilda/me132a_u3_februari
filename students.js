"use strict";

let allStudents = DATABASE.students
let allCourses = DATABASE.courses

function renderStudent (student) {
    let div = document.createElement("div");
    div.id = "student-div";
    div.innerHTML += `
        <h2>${student.firstName} ${student.lastName} (total ${studentCredits(student)} credits)</h2>
        <h3>Courses:</h3>
        <div id="course-div">
        ${allStudentCourses(student)}
        </div>
    `;

    return div;
}

function renderStudents (students) {
    let studentsElement = document.getElementById("student-results");

    for (let student of students) {
        let studentElement = renderStudent(student);
        studentsElement.appendChild(studentElement);    
    }
}

function studentCredits (student) {
    let credits = [];

    for (let course of student.courses) {
        credits.push(course.passedCredits);
    }

    let creditSum = 0;
    for (let i = 0; i < credits.length; i++) {
        creditSum += credits[i];
        
    }

    return creditSum;
}

function allStudentCourses(student) {
    let theCourses = [];

    for (let i = 0; i < student.courses.length; i++) {
        let Id = student.courses[i].courseId;
        theCourses.push(allCourses[Id]);
    }

    let courseArray = [];

    for (let i = 0; i < theCourses.length; i++) {
        let div = document.createElement("div");

        if (student.courses[i].passedCredits == 
            allCourses[student.courses[i].courseId].totalCredits
        ) {
            let info = (div.innerHTML = `
            <div id="done">
            <h4 id="course-h">${allCourses[i].title}</h4>
            <p id="course-p">${student.courses[i].started.semester} ${student.courses[i].started.year} 
            ( ${student.courses[i].passedCredits} of 
            ${allCourses[student.courses[i].courseId].totalCredits} credits)
            </div>
            `)
            courseArray.push(info)
        } else {
            let info = (div.innerHTML = `
            <div id="not-done">
            <h4 id="course-h">${allCourses[i].title}</h4>
            <p id="course-p">${student.courses[i].started.semester} ${student.courses[i].started.year} 
            ( ${student.courses[i].passedCredits} of 
            ${allCourses[student.courses[i].courseId].totalCredits} credits)
            </div>
            `)
            courseArray.push(info)
        }
    }

    return courseArray.toString().split(",").join("");
}

function inputResult () {
    let resultArray = [];
    let input = document.getElementById("student-input");

    for (let i = 0; i < allStudents.length; i++) {
        document.querySelector("#student-results").innerHTML = "";
        if ("" == input.value) { 
            document.querySelector("#student-results").innerHTML = "";
        } else if (allStudents[i].lastName.toLowerCase().includes(input.value.toLowerCase())) {
            resultArray.push(allStudents[i]);
        }
    }

    renderStudents(resultArray);
}

document.getElementById("student-input").addEventListener("keyup", inputResult);