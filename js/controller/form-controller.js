import Address from "../model/address.js"; // importando address
import * as addressService from '../service/address-service.js'
import * as listController from './list-controller.js';

//Função construtora
function State(){ 
    this.address = new Address()
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
    state.inputNumber.addEventListener("change",handlerInputNumberKeyup)

    state.btnClear.addEventListener("click",handleBtnClearClick)
    state.btnSave.addEventListener("click",handleBtnSaveClick)
    state.inputCep.addEventListener("change",hendleInputCepChange)

}

function handlerInputNumberKeyup(event){
    state.address.number = event.target.value
}
async function hendleInputCepChange(event){
    try{
        const cep = event.target.value;
        const address = await addressService.findByCep(cep);
     
        state.address.cep = address.cep
        state.address.street = address.street
        state.address.city = address.city
        
        state.inputCity.value = address.city
        state.inputStreet.value = address.street

        state.inputNumber.focus()

        setFormError("cep","")
    }catch(e){
        state.inputCity.value = ""
        state.inputStreet.value = ""
        setFormError("cep","Informe um CEP válido!")
    }
}
async function handleBtnSaveClick(event){
    event.preventDefault()
    const errors = addressService.getErrors(state.address)
    const keys = Object.keys(errors)
    if(keys.length > 0){
        keys.forEach(key =>{
            setFormError(key,errors[key])
        })
    }
    else{
        listController.addCard(state.address)
        clearForm()
        state.address = new Address()
    }

    
}

function handleBtnClearClick(event){
    event.preventDefault()
    clearForm()
}

function clearForm(){
    state.inputCep.value = "" 
    state.inputNumber.value = "" 
    state.inputStreet.value = "" 
    state.inputCity.value = "" 

    setFormError("cep","")
    setFormError("number","")
     
    state.inputCep.focus()
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