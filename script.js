//******SERVICE WORKER*******
//Service Worker
// if (navigator.serviceWorker) {
//     //Register
//     navigator.serviceWorker.register("/sw.js");
// }

//******APLICATION*******

/*Objetos HTML */
let addDestino = document.querySelector('#addDestino');
let addInico = document.querySelector('#addInico');
let addDias = document.querySelector('#addDias');
let btnAddViagem = document.querySelector('#btnAddViagem')
let btnAdd = document.querySelector('#btnAdd');
let btnCanc1 = document.querySelector('#btnCanc1');
let tbody = document.querySelector('#tbody');
let state = document.querySelector('#state');


let viagens = []
//When app is load
onload = () => {
    cabecalho();
    btnAdd.onclick = () => {
        active('tela2');
        addDestino.focus();
    }
    document.querySelector('#state').onclick = () => {
        active('tela1');
    }
    btnCanc1.onclick = () => {
        addDestino.value = '';
        addInico.value = '';
        addDias.value = '';
        active('tela1');
    }
    // document.querySelector('#btnCanc2').onclick = () => {
    //     document.querySelector('#InputEditTask').value = '';
    //document.querySelector('#InputNewTask').removeAttribute('data-id')
    //     active('screen1');
    // }
    btnAddViagem.onclick = () => {
        addViagem(addDestino, addInico, addDias);
    }
    // document.querySelector('#btnEdit').onclick = () => {
    //     ediTask(document.querySelector('#InputEditTask'));
    // }
    // document.querySelector('#btnDel').onclick = () => {
    //     delTask(document.querySelector('#InputEditTask'));
    // }
}

//Cria cabeçalho
const cabecalho = () => {
    let tr = tbody.insertRow();
    let Destino = tr.insertCell();
    let Inicio = tr.insertCell();
    let Dias = tr.insertCell();
    let Opcoes = tr.insertCell();

    Destino.innerHTML = 'Destino';
    Inicio.innerHTML = 'Inicio';
    Dias.innerHTML = 'Dias';
    Opcoes.innerHTML = 'Opções';
    tr.classList.add('tableHeader');
}

//Function to show tasks
const mostrarViagens = () => {
    tbody.innerHTML = '';
    cabecalho();
    viagens.forEach((v) => {

        //Cria os elementos da linha da tabela
        let tr = tbody.insertRow();
        let Destino = tr.insertCell();
        let Inicio = tr.insertCell();
        let Dias = tr.insertCell();
        let Opcoes = tr.insertCell();

        //botões de edição e delete
        //Elemento div que contem os botões
        let Div = document.createElement('div');
        Div.classList.add('buttonGroup');

        //Elemento botão de edição com todos atributos
        let btnEdi = document.createElement('button');
        btnEdi.classList.add('button');
        btnEdi.classList.add('secondary');
        btnEdi.setAttribute('data-id', v.id);
        btnEdi.onclick = () => {
            active('tela2');

        }

        //Elemento botão de delete com todos atributos
        let btnDel = document.createElement('button');
        btnDel.classList.add('button');
        btnDel.classList.add('danger');
        btnDel.setAttribute('data-id', v.id);
        btnDel.onclick = () => {

        }

        //Elemento imagem de edição
        let imgEdi = document.createElement('img');
        imgEdi.setAttribute("src", "/Images/edit.png");
        imgEdi.setAttribute("width", "16");
        imgEdi.setAttribute("height", "16");

        //Elemento imagem de delete
        let imgDel = document.createElement('img');
        imgDel.setAttribute("src", "/Images/delete.png");
        imgDel.setAttribute("width", "16");
        imgDel.setAttribute("height", "16");

        //Insere imagens dentro dos botões
        btnEdi.appendChild(imgEdi);
        btnDel.appendChild(imgDel);

        //Insere botões dentro do div
        Div.appendChild(btnEdi);
        Div.appendChild(btnDel);

        //Define os valores dos elementos tr da tabela
        tr.setAttribute('data-id', v.id);
        Destino.innerHTML = v.Destino;
        Inicio.innerHTML = v.Inicio;
        Dias.innerHTML = v.Dias.length;
        Opcoes.appendChild(Div);

    })
    state.innerHTML = viagens.length;
}

//Active screens
const active = (comp) => {
    let screenList = document.querySelectorAll('body > .component');
    screenList.forEach((c) => {
        c.classList.add('hidden')
    }
    );
    document.querySelector('#' + comp).classList.remove('hidden');
}

//Add Viagem
const addViagem = (addDestino, addInico, addDias) => {
    //Verifica se destino é diferente de vazio
    if (addDestino.value != '') {
        //Cria um vetor com a quantidade de dias 
        let dias = [];
        for (let i = 0; i < addDias.value; i++) {
            dias[i] = '';
        }
        //adiciona a viagem ao vetor dia
        viagens.push(
            {
                id: Math.random().toString().replace('0.', ''),
                Destino: addDestino.value,
                Inicio: addInico.value,
                Dias: dias
            }
        )
        active('tela1');
        mostrarViagens();
        // saveTasks();
        addDestino.value = '';
        addInico.value = '';
        addDias.value = '';
    }
}

// //Edit Task
// const ediTask = (InputEditTask) => {
//     if (InputEditTask.value != '') {
//         let idTask = InputEditTask.getAttribute('data-id');
//         let i = tasks.findIndex((t) => t.id == idTask);
//         tasks[i].description = InputEditTask.value
//         InputEditTask.value = '';
//         InputEditTask.removeAttribute('data-id');
//         active('screen1');
//         saveTasks();
//         showTasks();
//     }
// }

// //Delete Task
// const delTask = (InputEditTask) => {
//     if (InputEditTask.value != '') {
//         let idTask = InputEditTask.getAttribute('data-id');
//         tasks = tasks.filter((t)=> t.id != idTask);
//         InputEditTask.value = '';
//         InputEditTask.removeAttribute('data-id');
//         active('screen1');
//         saveTasks();
//         showTasks();
//     }
// }

// const saveTasks = () =>{
//     localStorage.setItem('tasks', JSON.stringify(tasks));
// }

