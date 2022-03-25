"use strict";

let selectTheElement = (selectElement) => {
    return document.querySelector(selectElement);
};

//Kolla upp varför vi har denna funktion
let clearResults = () => {
    selectTheElement("#student").innerHTML = "";
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
}

selectTheElement("#student").addEventListener("keyup", getTheResults);

// function renderStudent (student) {
//     for (let i = 0; i < array.lengtht; i++) {
//         let div = document.createElement("div");
//         div.classList.add("container");

//         div.innerHTML =`
//         <header id="nameStudents">${student[i].firstName} ${student[i].lastName}</header>
//         <h4>Courses:</h4>
//         <div id="grid">
//             <div id="box"></div>
//         </div>`
        
//         document.querySelector("#student-results").appendChild(div);
//     }
// }
