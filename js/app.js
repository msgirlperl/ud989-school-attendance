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

    octopus.init();
}());
