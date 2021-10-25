import {DateTime, Duration, Interval} from 'luxon';

export default class Box {
  containerEl: HTMLDivElement;
  timeLeft: number | DateTime;
  top: HTMLDivElement;
  bottom: HTMLDivElement;
  topNum: HTMLDivElement;
  bottomNum: HTMLDivElement;
  topNext: HTMLDivElement;
  topNextNum: HTMLDivElement;
  constructor(public type: string) {
    this.containerEl = document.querySelector(`.box.${this.type}`)
    console.log('box made', this.type, this.containerEl);

    this.configure();
  }

  flip = () => {
    this.top.setAttribute('class','top flip')
    // this.topNext.setAttribute('class','top next show')
    setTimeout(() => {
      this.top.setAttribute('class', 'top')
      // this.topNext.setAttribute('class','top next')
    },500)
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

  //  if(this.type == 'seconds'){
  //    this.flip()
  //  }
  console.log(this.topNext);
  
  if(typeTime === 0) {
    this.topNext.innerText = `59`
  } else {
    this.topNext.innerText = `${typeTime - 1}`
  }
    this.topNum.innerText = '' + typeTime
    this.bottomNum.innerText = '' + typeTime
  
  }

  getTime = () => {
    // const startDate = DateTime.now().minus({ days: 14 })
    const endDate = DateTime.now()
    let interval = Interval.before(endDate, {days: 14, hours: -16})
    // const {day,hour,minute,second} = (DateTime.fromMillis(interval.count()));
    // console.log(day,hour,minute,second);
    this.timeLeft = DateTime.fromMillis(interval.count())
    this.printTime();
    // console.log(this.timeLeft);
    
   
    setInterval(() => {
      this.timeLeft = this.timeLeft.minus({seconds: 1})
        if(this.type == 'seconds'){
          // this.flip()
        }
      // setTimeout(() => {
        // this.printTime();
      // },1)
    }, 1000)
  }

  insertEls = (el1: HTMLDivElement, el2: HTMLDivElement, el3: HTMLDivElement) => {
    this.containerEl.insertAdjacentElement('afterbegin', el1)
    this.containerEl.insertAdjacentElement('afterbegin', el3)
    this.containerEl.insertAdjacentElement('beforeend', el2)

    const top = this.containerEl.querySelector('.top')
    const topNext = this.containerEl.querySelector('.next')
    const bottom = this.containerEl.querySelector('.bottom')

    const timeDiv = document.createElement('div')
    timeDiv.setAttribute('class','time')
    top.insertAdjacentElement('beforeend', timeDiv)

    const timeDiv3 = document.createElement('div')
    timeDiv3.setAttribute('class','time')
    topNext.insertAdjacentElement('beforeend', timeDiv3)

    const timeDiv2 = document.createElement('div')
    timeDiv2.setAttribute('class','time')
    bottom.insertAdjacentElement('beforeend', timeDiv2)

    this.topNum = this.containerEl.querySelector('.top .time')
    this.bottomNum = this.containerEl.querySelector('.bottom .time')
    this.top = this.containerEl.querySelector('.top')
    this.topNext = this.containerEl.querySelector('.next .time')
    this.bottom = this.containerEl.querySelector('.bottom')
  }

  createEls = () => {
    const topDiv = document.createElement('div')
    topDiv.setAttribute('class', 'top');
    const topNextDiv = document.createElement('div')
    topNextDiv.setAttribute('class', 'next');
    const bottomDiv = document.createElement('div')
    bottomDiv.setAttribute('class', 'bottom');
    
    this.insertEls(topDiv, bottomDiv, topNextDiv)
  }
  
  configure = () => {
    this.createEls();

    this.getTime();
    
  }
}