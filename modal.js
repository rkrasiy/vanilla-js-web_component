class Modal extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode: 'open'});
    this.isOpen = false;
    this.container = '';
    this.shadowRoot.innerHTML = `
      <style>
      #backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: rgb(0 0 0 / 90%);      
        z-index: 10;
        pointer-events: none;
        opacity: 0;
      }

      :host([opened]) #backdrop,
      :host([opened]) #modal{
        opacity: 1;
        pointer-events: all;
      }

      :host([opened]) #modal{
          top: 15vh;
      }

      #modal{
        position: fixed;
        top: 10vh;
        left: 25%;
        width: 50%;
        z-index: 100;
        background: white;
        border-radius: 2px;
        pointer-events: none;
        opacity: 0;
        transition: all .3s ease-out;
      }
      #main, #actions{
        border-top: 1px solid #ddd;
      }
      header, #main,#actions{
        padding: 1rem;      
      }
      ::slotted(h1){font-size: 1.25rem;}
      #actions{
        padding: 1rem;
        dusplay: flex;
        justify-content: flex-end;
      }
      #actions button{
        margin: 0 .25rem;
      }
      </style>
      
      <div id='backdrop'></div>
      <div id='modal'>
        <header>
          <slot name="title">Default Modal Title</slot>
        </header>
        <section>
          <div id='main'>
            <slot></slot>
          </div>
        </section>
        <section>
          <div id="actions">    
            <button id='confirm'>OK</button>
            <button id='cancel'>Cancel</button>
          </div>
        </section>
      </div>
      
    `;
    // const slots = this.shadowRoot.querySelectorAll('slot');
    // slots[1].addEventListener('slotchange', event => {
    //   console.dir(slots[1].assignedNodes())
    // })

  }

  connectedCallback(){//DOM initializations
    const confirmBtn = this.shadowRoot.querySelector('#confirm');
    confirmBtn.addEventListener('click', this._confirm.bind(this))

    const cancelButton = this.shadowRoot.querySelector('#cancel');
    cancelButton.addEventListener('click',  this._cancel.bind(this))

    const backdrop = this.shadowRoot.querySelector('#backdrop');
    backdrop.addEventListener('click',  this._cancel.bind(this))
  }

  // attributeChangedCallback(name, oldValue, newValue){
  //   if( name === 'opened'){
  //     if(this.hasAttribute('opened')){
  //       this.shadowRoot.querySelector('#backdrop').style.opacity = '1'
  //       this.shadowRoot.querySelector('#backdrop').style.opacityEvents = 'all'
  //     }    
  //   }
  // }

  close(){
    if(this.hasAttribute('opened')){
      this.removeAttribute('opened');
    } 
      this.isOpen = false
  }

  open(){
    this.setAttribute('opened','');
    this.isOpen = true;
  }

  _cancel(event){
    this.close();
    const cancelEvent = new Event('cancel', { bubbles: true, composed: true});
    event.target.dispatchEvent(cancelEvent)
  }

  _confirm(){
    this.close();
    const confirmEvent = new Event('confirm');
    this.dispatchEvent(confirmEvent)
  }
}

customElements.define('rk-modal', Modal)