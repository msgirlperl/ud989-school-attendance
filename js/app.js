/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
(function() {
    if (!localStorage.attendance) {
        console.log('Creating attendance records...');
        function getRandom() {
            return (Math.random() >= 0.5);
        }

        var nameColumns = ["Slappy The Frog", "Lilly the Lizard", "Paulrus the Walrus", "Gregory the Goat", "Adam the Anaconda"];   
        attendance = {};

        nameColumns.forEach(name => {
            //var name = this.innerText;
            attendance[name] = [];

            for (var i = 0; i <= 11; i++) {
                attendance[name].push(getRandom());
            }
        });

        localStorage.attendance = JSON.stringify(attendance);
    }
}());


/* STUDENT APPLICATION */
$(function() {

    const model = {

    };
    // const model = {
    //     students: [{name: "Slappy The Frog", daysPresent: [1, 3, 4, 5, 6, 7, 10, 11]},
    //     {name: "Lilly the Lizard", daysPresent: [1, 2, 3, 7, 8, 9, 10]},
    //     {name: "Paulrus the Walrus", daysPresent: [1,4, 5, 6, 7, 11, 12]},
    //     {name: "Gregory the Goat", daysPresent: [7, 10, 12]},
    //     {name: "Adam the Anaconda", daysPresent: [1, 4, 6, 8, 10, 11, 12]}
    //     ]        
    // };

    const view = {
        init: function () {
            allMissed = $('tbody .missed-col'),
            allCheckboxes = $('tbody input');
            this.render();
        },
        render: function() {
            students = octopus.getStudents();
            Object.keys(students).forEach((key, value) => {

                const tr = document.createElement('tr');
                tr.className = 'student';
                const nameTd = document.createElement('td');
                nameTd.className = 'name-col';
                nameTd.textContent = key;
                tr.appendChild(nameTd);

                let count = 0;
                const days = students[key];
                for (var i=1; i<=12; i++){
                    const td = document.createElement('td');
                    td.className = 'attend-col';      
                    const input = document.createElement('input');
                    input.setAttribute("type", "checkbox");
                    if (days[i]==true){
                        input.setAttribute("checked", "checked");
                    }else {
                        count++;        
                    }     

                    input.addEventListener('click', (function(ind) {
                        return function(e){
                            // tell oct to update the day for this student
                            octopus.updateStudent(key, ind, e.target.checked);                        
                        };
                    })(i));

                    td.appendChild(input);
                    tr.appendChild(td);
                }
                const missedTd = document.createElement('td');
                missedTd.className = 'missed-col';
                missedTd.textContent = count;
                tr.appendChild(missedTd);
                document.getElementById('body').appendChild(tr);
            });            
        }
    };

    const octopus = {
      init: function() {
        model.students = JSON.parse(localStorage.attendance)
        view.init();
      },
      getStudents: function() {
        if (model.students == undefined){
            model.students = localStorage.attendance;
        }
        return model.students;
      },
      updateStudent: function(name, day, present) {

        model.students[name][day] = present;
        localStorage.attendance = JSON.stringify(model.students);
      }
    };

    // look at updateStudent...am I updated in the wrong place?  what's in localStorage?

    // now it's not drawing it all



    octopus.init();
}());
