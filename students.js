"use strict";

let selectTheElement = (selectElement) => {
    return document.querySelector(selectElement);
};

//Kolla upp varför vi har denna funktion
// let clearResults = () => {
//     selectTheElement("#student").innerHTML = "";
// }

function getCourseById () {
    for (let i = 0; i < DATABASE.courses.length; i++) {

        if (DATABASE.courses[i].courseId == DATABASE.students.courses.courseId) {
        return;
        }
    }
}

function getTheResults () {
    let search = selectTheElement("#student").value;

    // clearResults();

    if (search.length > 0) {
        for (let i = 0; i < DATABASE.students.length; i++) {
            if (DATABASE.students[i].lastName.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
                selectTheElement(".student-result").innerHTML += `
                    <header id="nameStudents">${DATABASE.students[i].firstName} ${DATABASE.students[i].lastName}</header>
                    <h4>Courses:</h4>
                    <div id="grid">
                    <div id="box"></div>
                    </div>
                `;
            }
        }
    }

    let foundCourses = getCourseById();
    
    for (let i = 0; i < foundCourses.length; i++) {
        document.getElementById("#box").innerText = foundCourses[i].title + " of " + foundCourses[i].totalCredits + " credits"
        
    }

}

// DATABASE.students.forEach((student) => {
//     student.courses.forEach(
//         (studentCourse) => {
//             let foundCourse = DATABASE.courses.find((dbCourse) => {
//                 return dbCourse.courseId == studentCourse.courseId;
//             });

//     })
// })

selectTheElement("#student").addEventListener("keyup", getTheResults);