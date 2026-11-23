let tasks = [
    {
        text:"Activity 12 - To-Do List",
        hours:4,
        completed:false
    },

    {
        text:"Clean room",
        hours:3,
        completed:false
    },

    {
        text:"Watch a movie",
        hours:3,
        completed:false
    },

    {
        text:"Plan week",
        hours:2,
        completed:true
    }
];


let currentFilter="all";


const form=document.getElementById("add-form");
const taskInput=document.getElementById("task-input");
const hoursInput=document.getElementById("hours-input");

const taskList=document.getElementById("task-list");

const summary=document.getElementById("task-summary");

const clearBtn=document.getElementById("clear-completed");

const toggleBtn=document.getElementById("toggle-all");

const filters=document.querySelectorAll(".filter");





function getDifficulty(hours){

    if(hours<=2)
        return "Easy";

    if(hours<=5)
        return "Medium";

    return "Hard";

}



function render(){


    taskList.innerHTML="";


    let filtered=tasks.filter(task=>{

        if(currentFilter==="active")
            return !task.completed;

        if(currentFilter==="completed")
            return task.completed;


        return true;

    });



    filtered.forEach((task,index)=>{


        let realIndex=tasks.indexOf(task);


        let li=document.createElement("li");

        li.className="task-item";



        li.innerHTML=`

        <div class="task-left">

        <input type="checkbox" ${task.completed?"checked":""}>

        <span class="task-name ${task.completed?"completed":""}">
        ${task.text}
        </span>

        </div>


        <div class="task-right">

        <span class="difficulty ${getDifficulty(task.hours).toLowerCase()}">
        ${getDifficulty(task.hours)} · ${task.hours}h
        </span>


        <button class="delete">
        ×
        </button>

        </div>

        `;



        let checkbox=li.querySelector("input");

        checkbox.onclick=()=>{

            task.completed=!task.completed;
            render();

        };



        let del=li.querySelector(".delete");


        del.onclick=()=>{

            tasks.splice(realIndex,1);

            render();

        };



        let text=li.querySelector(".task-name");


        text.ondblclick=()=>{

            editText(text,task);

        };



        let badge=li.querySelector(".difficulty");


        badge.ondblclick=()=>{

            editHours(badge,task);

        };



        taskList.appendChild(li);


    });



    updateFooter();

}





function updateFooter(){

    let active=tasks.filter(t=>!t.completed);


    let hours=active.reduce(
        (sum,t)=>sum+t.hours,
        0
    );


    summary.innerHTML=
    `${active.length} items left · ${hours} hours total`;



    clearBtn.hidden=
    !tasks.some(t=>t.completed);



    let allDone=
    tasks.length>0 &&
    tasks.every(t=>t.completed);


    toggleBtn.textContent=
    allDone ?
    "Mark all active":
    "Mark all done";

}





form.onsubmit=(e)=>{

    e.preventDefault();


    tasks.push({

        text:taskInput.value,

        hours:Number(hoursInput.value)||0,

        completed:false

    });


    taskInput.value="";

    hoursInput.value=0;


    render();

};





filters.forEach(button=>{


    button.onclick=()=>{


        filters.forEach(b=>
            b.classList.remove("active")
        );


        button.classList.add("active");


        currentFilter=
        button.dataset.filter;


        render();


    };


});





toggleBtn.onclick=()=>{


    let done=
    tasks.every(t=>t.completed);


    tasks.forEach(t=>{

        t.completed=!done;

    });


    render();

};





clearBtn.onclick=()=>{


    tasks=
    tasks.filter(t=>!t.completed);


    render();

};






function editText(element,task){


    let input=document.createElement("input");

    input.value=task.text;


    element.replaceWith(input);

    input.focus();


    input.select();



    input.onkeydown=(e)=>{


        if(e.key==="Enter"){

            task.text=input.value;

            render();

        }


        if(e.key==="Escape"){

            render();

        }


    };


}





function editHours(element,task){


    let input=document.createElement("input");


    input.type="number";

    input.value=task.hours;



    element.replaceWith(input);


    input.focus();

    input.select();



    input.onkeydown=(e)=>{


        if(e.key==="Enter"){

            task.hours=
            Number(input.value)||0;


            render();

        }


        if(e.key==="Escape"){

            render();

        }

    };


}




render();