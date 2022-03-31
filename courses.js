"use strict";

// global varibles to easier reach our database
let allStudents = DATABASE.students;
let allTeachers = DATABASE.teachers;
let allCourses = DATABASE.courses;

// function to render a course from the database in an div-element with the information from other functions
function renderCourse (id) {
    let div = document.createElement("div");
    div.id = "course-div";
    div.innerHTML += `
        <h2>${courseTitle(id)} (total ${totalCourseCredits(id)} credits)</h2>
        <div id="resp-div">
        <h3>Course Responsible:</h3>
        <div id="resp-info">${courseResponsible(id)}</div>
        </div>
        <div id="teacher-div">
        <h3>Teachers:</h3>
        <div id="teacher-info">${allTeacherInfo(id)}</div>
        </div>
        <div>
        <h3>Students:</h3>
        <div id="student-div">${allStudentInfo(id)}</div>
        </div>
    `;

    return div;
}

// render all the courses that should show up when we search on their name
function renderCourses (courses) {
    let coursesElement = document.getElementById("courses-result");

    for (let course of courses) {
        let courseElement = renderCourse(course.courseId);
        coursesElement.appendChild(courseElement);    
    }
}

// function to get the course title(the id will be filled in when we call "renderCourse" in "inputResult") 
function courseTitle (id) {
    let course = DATABASE.courses[id];
    return course.title;
}

// function to get the course credits(the id will be filled in when we call "renderCourse" in "inputResult") 
function totalCourseCredits (id) {
    let course = allCourses[id];
    return course.totalCredits;
}

// function to get the course responsible(the id will be filled in when we call "renderCourse" in "inputResult") 
function courseResponsible (id) {
    let course = DATABASE.courses[id];
    let teachersName = allTeachers.map((teacher) => teacher.firstName + " " + teacher.lastName + " " + `(${teacher.post})`);
    let resp = course.courseResponsible;
    return teachersName[resp];
}

// function to get the teachers and their post and putting that information into a div(the id will be filled in when we call "renderCourse" in "inputResult") 
function allTeacherInfo (id) {
    let course = DATABASE.courses[id];
    let teachersNames = allTeachers.map((teacher) => teacher.firstName + " " + teacher.lastName + " " + `(${teacher.post})`);
    let teachers = [];

    for (let i = 0; i < teachersNames.length; i++) {
        if (course.teachers.some((value) => value == i)) {
            let div = document.createElement("div");
            let info = div.innerHTML = `<p>${teachersNames[i]}</p>`
            teachers.push(info);
        }
    }

    return teachers.toString().split(",").join(" ");
}

// function to get the passed credits each student that took to the course has 
function passedCredits (takenCourse, student){
    let passedCredit = student.courses.filter((course) => course.courseId == takenCourse.courseId).map((course) => course.passedCredits)
    return passedCredit
}

// function to get the year each student that took the course has
function courseStarted (takenCourse, student){
    let courseStart = student.courses.filter((course) => course.courseId == takenCourse.courseId).map((course) => `${course.started.semester} ${course.started.year}`)
    return courseStart
}

// function to get all the student that took that course and the suitable information and put it into a div-element
function allStudentInfo (id) {
    let courseId = DATABASE.courses[id].courseId
    let students = allStudents.filter((student) => student.courses.some((course) => course.courseId == courseId))
    let studentsDiv = []
        for (let student of students){
            let courseById = student.courses.filter((course) => course.courseId == courseId)
            for (let i = 0; i < courseById.length; i++){
                if (passedCredits(courseById[i], student)[i] == DATABASE.courses[id].totalCredits){
                    let div = document.createElement("div")
                    let info = div.innerHTML = `<div class="done">
                    <p>${student.firstName} ${student.lastName} <br>(${passedCredits(courseById[i], student)[i]} credits)</p>
                    <h5>${courseStarted(courseById[i], student)[i]}</h5>
                    </div>`
                    studentsDiv.push(info)
                } else{
                    let div = document.createElement("div")
                    let info = div.innerHTML = `<div class="not-done">
                    <p>${student.firstName} ${student.lastName} <br>(${passedCredits(courseById[i], student)[i]} credits)</p>
                    <h5>${courseStarted(courseById[i], student)[i]}</h5>
                    </div>`
                    studentsDiv.push(info)
                }
            }
        }
    return studentsDiv.toString().split(",").join(" ");
}

// function to compare the value in the input-element and the courses in out database so that we then get the correct result
function inputResult () {
    let resultArray = [];
    let input = document.getElementById("course-input");

    for (let i = 0; i < allCourses.length; i++) {
        document.querySelector("#courses-result").innerHTML = "";
        if ("" == input.value) { 
            document.querySelector("#courses-result").innerHTML = "";
        } else if (allCourses[i].title.toLowerCase().includes(input.value.toLowerCase())) {
            resultArray.push(allCourses[i]);
        }
    }

    renderCourses(resultArray);
}

// event listener so that results show up when a keyboard-key has been pressed and released
document.getElementById("course-input").addEventListener("keyup", inputResult);