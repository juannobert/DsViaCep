import Address from "../model/address.js"; // importando address

//Função construtora
function State(){ 
    this.Address = new Address()
    this.inputCep = null;
    this.inputStreet = null
    this.inputNumber = null
    this.inputCity = null

    this.btnSave = null
    this.btnClear = null

    this.errorCep = null
    this.errorNumber = null
}

const state = new State()

export function init(){
    state.inputCep = document.forms.newAddress.cep // Selecionando inputs no form a a partir do nome
    state.inputStreet = document.forms.newAddress.street
    state.inputNumber = document.forms.newAddress.number
    state.inputCity = document.forms.newAddress.city

    state.btnSave = document.forms.newAddress.btnSave
    state.btnClear = document.forms.newAddress.btnClear

    state.errorCep = document.querySelector('[data-error="cep"]')
    state.errorNumber = document.querySelector('[data-error="number"]')

    state.inputNumber.addEventListener("change",handlerInputNumberChange)

}

function handlerInputNumberChange(event){
    if(event.target.value == ""){
        setFormError("number","Campo Requerido")
    }
    else{
        setFormError("number","")
    }

}

function setFormError(key,value){
    const element = document.querySelector(`[data-error="${key}"]`)
    element.innerHTML = value

}