class Tooltip extends HTMLElement{
  constructor(){
    super(); 
    
    this.toolptipContainer;
    this._tooltipText = 'Some default text';
    this.attachShadow({mode: 'open'});
    this.isVisible = false;
    this.shadowRoot.innerHTML = `
      <style>
        span{font-weight:bold;background: yellow;}
        ::slotted(span){background: red}
        :host{background-color: grey;}
      </style>
      <slot>DEfault Text</slot>
      <span>(?)</span>`;

  }

  connectedCallback(){//DOM initializations
  if(this.getAttribute('text')){
    this._tooltipText = this.getAttribute('text');
  }
    this._tooltipIcon = this.shadowRoot.querySelector('span');
    this._tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this) );
    this._tooltipIcon.addEventListener('mouseleave', this._removeTooltip.bind(this) );
    this.shadowRoot.appendChild(this._tooltipIcon);
  }

  _render(){
    let tooltipContainer = this.shadowRoot.querySelector('div');
    if(this.isVisible){
        toolptipContainer = document.createElement('div');
        toolptipContainer.textContent = this._tooltipText;
        this.shadowRoot.appendChild(toolptipContainer);
    }else{
      if(tooltipContainer){
        this.shadowRoot.removeChild(tooltipContainer);  
      }
    }
  }

  _showTooltip() {
    this.isVisible = true;
    this.render();
  }

  _removeTooltip(){
    this.isVisible = false;
    this._render();
  }

  disconnectedCallback(){//Cleanup Work
    this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip);
    this._tooltipIcon.removeEventListener('mouseleave', this._removeTooltip);
  }

  static get observedAttributes(){
    return ['text', 'class']
  }

  attributeChangedCallback(name, oldvalue, newvalue){//
    console.log('AttributeChangedCallback', name, oldvalue, newvalue) 
    if(oldvalue === newvalue){
      return;
    }

    if(name === 'text'){
      this._tooltipText = newvalue;
    }
  }

}

customElements.define('rk-tooltip', Tooltip);