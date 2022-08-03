let addBtn = document.getElementById("add-btn");
addBtn.addEventListener("click", (event) => {
    event.preventDefault();
    addBtnClick();
});

let showBtn = document.getElementById("get-btn");
showBtn.addEventListener("click", (event) => {
    showBtnClick();
});

function addBtnClick() {
    let taskName = document.getElementById("task-name").value;
    let taskLocation = document.getElementById("task-location").value;
    let taskNumber = Number(document.getElementById("task-number").value);
    let newTask = {
        task_name: taskName,
        task_location: taskLocation,
        task_number: taskNumber
    };
    console.log(JSON.stringify(newTask));
    let AAA = `New Task: ${taskName}, ${taskLocation}, ${taskNumber}`;
    
    const ulEl = document.querySelector(".new-list");
    const newLi = document.createElement("li");
    newLi.innerText = AAA;
    ulEl.appendChild(newLi);

    fetch('/list', {
        method: 'POST',
        body: JSON.stringify(newTask),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.log(err));

    fetch("/list")
    .then((res) => res.json())
    .then((data) => {
        for (let i=0; i<data.length; i++) {
            console.log(JSON.stringify(data[i]["task_name"]))
        }
    }
    );
}

function showBtnClick() {
    console.log("checking1");
    fetch('/list')
    .then((data) => {
        return data.json();
        console.log("checking2");
    })
    .then((allData) => {
        console.log(allData);
        let allList = "";
        allData.map((row) => {
            const ulEl = document.querySelector(".old-list");
            const oldLi = document.createElement("li");
            oldLi.innerText = `TASK: ${row.task_name}, AT: ${row.task_location}, Duration: ${row.task_number} min`;
            ulEl.appendChild(oldLi);            
            const deleteButton = document.createElement("div");
        
            deleteButton.innerHTML = `
            <button class="delete-btn">DELETE</button>
            `;
            oldLi.appendChild(deleteButton);
            deleteButton.addEventListener("click", () => {
                oldLi.remove();

                deleteMethod()               
            })
        
        function deleteMethod() {
            fetch("/list" +"/" + row["id"], {
                method: 'DELETE'
            }).then(()=> {
                console.log('Deleted');
                // alert("A task is deleted from the list(DB)")
            }).catch(err => {
                console.log(err);
            });
        };
    })
})
};