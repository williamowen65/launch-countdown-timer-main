import {DateTime, Duration, Interval} from 'luxon';

export default class Box {
  containerEl: HTMLDivElement;
  timeLeft: number | DateTime;
  upper: HTMLDivElement;
  lower: HTMLDivElement;
  constructor(public type: string) {
    this.containerEl = document.querySelector(`.box.${this.type}`)
    console.log('box made', this.type, this.containerEl);

    this.configure();
  }

  printTime = () => {
    let typeTime: number | DateTime;
    switch (this.type) {
      case 'days':
        typeTime = this.timeLeft.day
        break;
        case 'hours':
        typeTime = this.timeLeft.hour > 12 ? this.timeLeft.hour - 12 : this.timeLeft.hour
        break;
        case 'minutes':
        typeTime = this.timeLeft.minute
        break;
        case 'seconds':
        typeTime = this.timeLeft.second
        break;
      default:
        break;
    }

    this.upper.innerText = '' + typeTime
    this.lower.innerText = '' + typeTime
  
  }

  getTime = () => {
    // const startDate = DateTime.now().minus({ days: 14 })
    const endDate = DateTime.now()
    let interval = Interval.before(endDate, {days: 14, hours: -16})
    // const {day,hour,minute,second} = (DateTime.fromMillis(interval.count()));
    // console.log(day,hour,minute,second);
    this.timeLeft = DateTime.fromMillis(interval.count())
    this.printTime();
    console.log(this.timeLeft);
    
   
    setInterval(() => {
      this.timeLeft = this.timeLeft.minus({seconds: 1})
      this.printTime();
    }, 1000)
  }

  insertEls = (el1: HTMLDivElement, el2: HTMLDivElement) => {
    this.containerEl.insertAdjacentElement('afterbegin', el1)
    this.containerEl.insertAdjacentElement('beforeend', el2)

    const top = this.containerEl.querySelector('.top')
    const bottom = this.containerEl.querySelector('.bottom')
    const timeDiv = document.createElement('div')
    timeDiv.setAttribute('class','time')
    const timeDiv2 = document.createElement('div')
    timeDiv2.setAttribute('class','time')
    top.insertAdjacentElement('beforeend', timeDiv)
    bottom.insertAdjacentElement('beforeend', timeDiv2)
    this.upper = this.containerEl.querySelector('.top .time')
    this.lower = this.containerEl.querySelector('.bottom .time')
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