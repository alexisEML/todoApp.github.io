const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");
const containerReal = document.getElementById("container-real")

const todos = JSON.parse(localStorage.getItem("todos"));


const todoCount = document.getElementById("todo-count")
const btnReset = document.getElementById("btn-reset")

const rC = document.getElementById("rC")
let rCcount = 0;

let DiaRealizado;
var indicador;


let count = localStorage.getItem("count");
let countTodo = 0;

todoCount.innerText = count;

const reals = JSON.parse(localStorage.getItem("reals"));

if (reals) {
    reals.forEach((real) => {

        CreateCuadro(real.indi)
        console.log(real)
    });
}

if (todos) {
    todos.forEach((todo) => {
        addTodo(todo);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    addTodo();
});

function addTodo(todo) {
    let todoText = input.value;

    countTodo++
    console.log(countTodo)




    if (todo) {
        todoText = todo.text;
    }

    if (todoText) {
        const todoEl = document.createElement("li");
        if (todo && todo.completed) {
            todoEl.classList.add("completed");
        }

        todoEl.innerText = todoText;

        todoEl.addEventListener("click", (e) =>{
            e.preventDefault();
            countTodo--
            todoEl.remove()
        })

        todoEl.addEventListener("contextmenu", (e) => {
            e.preventDefault();

            todoEl.remove();
            count++
            console.log("no")
            todoCount.innerText = count


            updateLS();
        });

        todosUL.appendChild(todoEl);

        input.value = "";

        updateLS();
    }
}







function CreateCuadro (Dia){
    if(Dia == true){
        // const real = document.createElement("div")
        // real.classList.add("real-green")
        // real.classList.add("real")
        // containerReal.appendChild(real) 
        // real.classList.add("indicador")
        const real = document.createElement("i")
        real.classList.add("far")
        real.classList.add("fa-check-circle")
        containerReal.appendChild(real)
        } else {
        // const real = document.createElement("div")
        // real.classList.add("real-red")
        // real.classList.add("real")
        // containerReal.appendChild(real)
        const real = document.createElement("i")
        real.classList.add("far")
        real.classList.add("fa-times-circle")
        containerReal.appendChild(real)
    }
}


btnReset.addEventListener("click",()=>{
    todoCount.innerText = count;
    
    if (count == countTodo) {
        console.log("completado")
        rCcount++
        rC.innerText = rCcount
        DiaRealizado = true
        CreateCuadro(DiaRealizado)
        

    } else {
        console.log("incompleto")
        rCcount = 0;
        rC.innerText = rCcount
        DiaRealizado = false
        CreateCuadro(DiaRealizado)
    }
    console.log("tareas completadas" + count)
    console.log("cantidad de tareas" + countTodo)

    if (count == countTodo) {
        count = 0
        countTodo = 0;
    }
    //count = 0;

    todoCount.innerText = count;
    updateLS()
})









function updateLS() {
    const todosEl = document.querySelectorAll("li");

    const todos = [];

    todosEl.forEach((todoEl) => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains("completed"),
        });
    });

    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("count", count)

    const realEl = document.querySelectorAll(".real")

    const reals = []

    realEl.forEach((real) => {
        reals.push({
            real: realEl,
            indi: real.classList.contains("indicador")
        });
    });

    localStorage.setItem("reals", JSON.stringify(reals));


}



