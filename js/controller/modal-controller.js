function State(){
    this.container = null
    this.btnClose = null

}
const state = new State()
export function init(){
    state.container = document.querySelector('#contact-modal')
    state.btnClose = document.querySelector('#btn-modal-close')

    state.btnClose.addEventListener("click",closeModal)
    state.container.addEventListener('click',handleContainerClick)

}

export function showModal(){
    state.container.classList.add('active')
}
function closeModal(){
    state.container.classList.remove('active')
}
function handleContainerClick(event){
    if(event.target === this){ // this corresponde a section
        closeModal() //Se for clicado na section fecha o modal
    }
}