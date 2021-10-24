export default class Box {
  containerEl: HTMLDivElement;
  constructor(public type: string) {
    this.containerEl = document.querySelector(`.box.${this.type}`)
    console.log('box made', this.type, this.containerEl);

    this.configure();
  }

  setTime = () => {

  }

  insertEls = (el1: HTMLDivElement, el2: HTMLDivElement) => {
    this.containerEl.insertAdjacentElement('afterbegin', el1)
    this.containerEl.insertAdjacentElement('beforeend', el2)
  }

  createEls = () => {
    const topDiv = document.createElement('div')
    topDiv.setAttribute('class', 'top');
    const bottomDiv = document.createElement('div')
    bottomDiv.setAttribute('class', 'bottom');
    
    this.insertEls(topDiv, bottomDiv)
  }
  
  configure = () => {
    this.createEls();

    this.setTime();
    
  }
}