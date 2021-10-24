import {DateTime, DateTimeUnit, Interval} from 'luxon';

export default class Box {
  containerEl: HTMLDivElement;
  startTime: DateTime;
  constructor(public type: string) {
    this.containerEl = document.querySelector(`.box.${this.type}`)
    console.log('box made', this.type, this.containerEl);

    this.configure();
  }

  printTime = () => {
    let typeTime: number;
    switch (this.type) {
      case 'days':
        typeTime = this.startTime.day
        break;
        case 'hours':
        typeTime = this.startTime.hour
        break;
        case 'minutes':
        typeTime = this.startTime.minute
        break;
        case 'seconds':
        typeTime = this.startTime.second
        break;
      default:
        break;
    }
    const top = this.containerEl.querySelector('.top')
    const bottom = this.containerEl.querySelector('.bottom')
    const timeDiv = document.createElement('div')
    timeDiv.setAttribute('class','time')
    timeDiv.innerText = '' + typeTime
    const timeDiv2 = document.createElement('div')
    timeDiv2.setAttribute('class','time')
    timeDiv2.innerText = '' + typeTime
    top.insertAdjacentElement('beforeend', timeDiv)
    bottom.insertAdjacentElement('beforeend', timeDiv2)
    console.log(typeTime);
  }

  getTime = () => {
    // const startDate = DateTime.now().minus({ days: 14 })
    const endDate = DateTime.now()
    let interval = Interval.before(endDate, {days: 14})
    // const {day,hour,minute,second} = (DateTime.fromMillis(interval.count()));
    // console.log(day,hour,minute,second);
    this.startTime = DateTime.fromMillis(interval.count())
    this.printTime();
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

    this.getTime();
    
  }
}