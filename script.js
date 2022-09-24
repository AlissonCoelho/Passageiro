//******SERVICE WORKER*******
//Service Worker
// if (navigator.serviceWorker) {
//     //Register
//     navigator.serviceWorker.register("/sw.js");
// }

//******APLICATION*******

/*Objetos HTML */
let inputDestino = document.querySelector('#inputDestino');
let inputInico = document.querySelector('#inputInico');
let inputDias = document.querySelector('#inputDias');
let btnAddViagem = document.querySelector('#btnAddViagem')
let btnAdd = document.querySelector('#btnAdd');
let btnCanc1 = document.querySelector('#btnCanc1');
let tbody = document.querySelector('#tbody');
let badge = document.querySelector('#badge');
let qtdViagens = document.querySelector('#qtdViagens');
let tituloTela2 = document.querySelector('#tituloTela2');
let btnsAdd = document.querySelector('#btnsAdd');
let btnsEdi = document.querySelector('#btnsEdi');
let btnEditViagem = document.querySelector('#btnEditViagem');
let tituloTela3 = document.querySelector('#tituloTela3');
let salvarDias = document.querySelector('#salvarDias');
let listaDiasViagem = document.querySelector('#listaDiasViagem');


let viagens = []
//When app is load
onload = () => {

    //Carrega em local storage
    const v = JSON.parse(localStorage.getItem('viagens'));
    //Verifica se v diferente de null
    if (v)
        viagens = v;

    mostrarViagens();
    btnAdd.onclick = () => {
        active('tela2');
        tituloTela2.innerHTML = 'Adicionar Viagem';
        inputDestino.focus();
        btnsAdd.classList.remove('hidden');
        btnsEdi.classList.add('hidden');
    }
    badge.onclick = () => {
        inputDestino.value = '';
        inputInico.value = '';
        inputDias.value = '';
        inputDestino.removeAttribute('data-id');
        active('tela1');
    }
    btnCanc1.onclick = () => {
        inputDestino.value = '';
        inputInico.value = '';
        inputDias.value = '';
        active('tela1');
    }
    btnCanc2.onclick = () => {
        inputDestino.value = '';
        inputInico.value = '';
        inputDias.value = '';
        inputDestino.removeAttribute('data-id');
        active('tela1');
    }
    btnAddViagem.onclick = () => {
        addViagem(inputDestino, inputInico, inputDias);
    }
    btnEditViagem.onclick = () => {
        editViagem(inputDestino, inputInico, inputDias);
    }
    salvarDias.onclick = () => {
        salvarViagens();
        active('tela1');
    }
}

//Cria cabeçalho
const cabecalho = () => {
    let tr = tbody.insertRow();
    let Destino = tr.insertCell();
    let Inicio = tr.insertCell();
    let Dias = tr.insertCell();
    let Opcoes = tr.insertCell();

    Destino.innerHTML = 'Destino';
    Destino.onclick = () => {
        viagens.sort((a, b) => {
            if (a.Destino < b.Destino)
                return -1;
            if (a.Destino > b.Destino)
                return 1;
            return 0;
        })
        mostrarViagens();
        salvarViagens();
    }

    Inicio.innerHTML = 'Inicio';
    Inicio.onclick = () => {
        viagens.sort((a, b) => {
            if (a.Inicio < b.Inicio)
                return -1;
            if (a.Inicio > b.Inicio)
                return 1;
            return 0;
        })
        mostrarViagens();
        salvarViagens();
    }

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

        Destino.onclick = () => {
            preencherDias(v.id);
        }
        Inicio.onclick = () => {
            preencherDias(v.id);
        }
        Dias.onclick = () => {
            preencherDias(v.id);
        }

        //botões de edição e delete
        //Elemento div que contem os botões
        let Div = document.createElement('div');
        Div.classList.add('buttonGroup');

        //Elemento botão de edição com todos atributos
        let btnEdi = document.createElement('button');
        btnEdi.classList.add('button');
        btnEdi.classList.add('secondary');
        //Ação do botão editar
        btnEdi.onclick = () => {

            //Ativa  tela de formulario
            active('tela2');
            //Defini o titulo
            tituloTela2.innerHTML = 'Editar Viagem';
            //defino o foco
            inputDestino.focus();
            //Ativa botões de edição
            btnsAdd.classList.add('hidden');
            btnsEdi.classList.remove('hidden');

            //Define valores nos campos
            inputDestino.value = v.Destino;
            inputDestino.setAttribute('data-id', v.id);
            inputInico.value = v.Inicio;
            inputDias.value = v.Dias.length;
            inputDestino.focus();

        }

        //Elemento botão de delete com todos atributos
        let btnDel = document.createElement('button');
        btnDel.classList.add('button');
        btnDel.classList.add('danger');
        btnDel.setAttribute('data-id', v.id);
        //Ação do botão deletar
        btnDel.onclick = () => {
            delViagem(v.id);
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
    qtdViagens.innerHTML = viagens.length;

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
const addViagem = (inputDestino, inputInico, inputDias) => {
    //Verifica se destino é diferente de vazio
    if (inputDestino.value != '') {
        //Cria um vetor com a quantidade de dias 
        let dias = [];
        for (let i = 0; i < inputDias.value; i++) {
            dias[i] = '';
        }
        //adiciona a viagem ao vetor dia
        viagens.push(
            {
                id: Math.random().toString().replace('0.', ''),
                Destino: inputDestino.value,
                Inicio: inputInico.value,
                Dias: dias
            }
        )
        //Limpa o formulario
        inputDestino.value = '';
        inputInico.value = '';
        inputDias.value = '';

        active('tela1');
        mostrarViagens();
        salvarViagens();

    }
}

//Edit Viagem
const editViagem = (inputDestino, inputInico, inputDias) => {
    //Verifica se destino é diferente de vazio
    if (inputDestino.value != '') {
        //Busca o valor do ID
        let idViagem = inputDestino.getAttribute('data-id');
        //Selecionar o indice onde está o ID
        let i = viagens.findIndex((v) => v.id == idViagem);
        //Cria um vetor com a quantidade de dias 
        let dias = [];
        for (let j = 0; j < inputDias.value; j++) {
            if (viagens[i].Dias[j])
                dias[j] = viagens[i].Dias[j];
            else
                dias[j] = '';
        }

        //Salva a edição no vetor
        viagens[i].Destino = inputDestino.value;
        viagens[i].Inicio = inputInico.value;
        viagens[i].Dias = dias;

        //Limpa o formulario
        inputDestino.value = '';
        inputInico.value = '';
        inputDias.value = '';
        inputDestino.removeAttribute('data-id');
        active('tela1');
        mostrarViagens();
        salvarViagens();
    }
}

//Delete Viagem
const delViagem = (idViagem) => {
    if (confirm("Tem certeza que quer apagar essa viagem?")) {
        viagens = viagens.filter((v) => v.id != idViagem);
        active('tela1');
        mostrarViagens();
        salvarViagens();
    }
}

//Preencher dias
const preencherDias = (idViagem) => {
    //Busca o destino da viagem
    let i = viagens.findIndex((v) => v.id == idViagem);
    //Verifica se exite algum dia para preencher
    if (viagens[i].Dias.length > 0) {
        //Define o titulo com o nome do destino
        tituloTela3.innerHTML = viagens[i].Destino;
        //Ativa Tela 3
        active('tela3');
        listaDiasViagem.innerHTML = '';
        //Monta a lista para cada dia
        viagens[i].Dias.forEach((dia, j) => {
            //Cria o elemento li
            let liDia = document.createElement('li');
            //Descrição do dia na li:
            liDia.innerHTML = `Dia ${j}:`

            //Cria elemento input
            let inputDia = document.createElement('input');
            inputDia.classList.add('valid')
            inputDia.setAttribute('autocomplete', 'off')
            //Insere descrições dos dias ja existetes
            inputDia.value = dia;
            //Monitora inserção de dados
            inputDia.oninput = (e) => {
                viagens[i].Dias[j] = e.target.value;
            }

            //insere elemento input denro do <li>
            liDia.appendChild(inputDia);

            //insere elemento <li> dentro da lista
            listaDiasViagem.appendChild(liDia);
        })
    }
}

//Salvar Local Storage
const salvarViagens = () => {
    localStorage.setItem('viagens', JSON.stringify(viagens));
}

