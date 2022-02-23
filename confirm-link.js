class ConfirmLink extends HTMLAnchorElement {
  constructor(){
    super();  
  }

  connectedCallback(){
    this.addEventListener('click', event => {
      if(!confirm('Do yo really want to leave?')){
        event.preventDefault();
      }    
    })
  }

}

customElements.define('rk-confirm-link', ConfirmLink, { extends: 'a'});