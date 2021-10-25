import {DateTime, Duration, Interval} from 'luxon';

export default class Box {
  containerEl: HTMLDivElement;
  timeLeft: number | DateTime;
  top: HTMLDivElement;
  bottom: HTMLDivElement;
  topNum: HTMLDivElement;
  bottomNum: HTMLDivElement;
  nextTop: HTMLDivElement;
  nextTopNum: HTMLDivElement;
  nextBottom: HTMLDivElement;
  nextBottomNum: HTMLDivElement;
  constructor(public type: string) {
    this.containerEl = document.querySelector(`.box.${this.type}`)
    console.log('box made', this.type, this.containerEl);

    this.configure();
  }

  flip = () => {
    this.top.setAttribute('class','top flip')
    this.nextBottom.setAttribute('class','nextBottom flip')
    // this.top.innerText = '' + (+this.top.innerText - 1);
    // this.nextTop.setAttribute('class','top next show')
    setTimeout(() => {
      this.nextBottom.setAttribute('class','nextBottom')
      this.top.setAttribute('class', 'top')
      // this.nextTop.setAttribute('class','top next')
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
  // console.log(this.nextTop);
  
  setTimeout(()=>{
  if(typeTime === 0) {
    this.nextTopNum.innerText = `59`
    this.nextBottomNum.innerText = '59'
  } else {
    this.nextTopNum.innerText = `${typeTime - 1}`
    this.nextBottomNum.innerText = `${typeTime - 1}`
  }
    this.topNum.innerText = '' + typeTime

      this.bottomNum.innerText = '' + typeTime
    },500)
  
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
      if(this.type == 'seconds'){
        this.flip()
      }
      // setTimeout(() => {
        this.timeLeft = this.timeLeft.minus({seconds: 1})
        this.printTime();
      // },650)
    }, 1500)
  }

  insertEls = (el1: HTMLDivElement, el2: HTMLDivElement, el3: HTMLDivElement, el4: HTMLDivElement) => {
    this.containerEl.insertAdjacentElement('afterbegin', el1)
    this.containerEl.insertAdjacentElement('afterbegin', el4)
    this.containerEl.insertAdjacentElement('afterbegin', el3)
    this.containerEl.insertAdjacentElement('beforeend', el2)

    const top = this.containerEl.querySelector('.top')
    const nextTop = this.containerEl.querySelector('.nextTop')
    const nextBottom = this.containerEl.querySelector('.nextBottom')
    const bottom = this.containerEl.querySelector('.bottom')

    const timeDiv = document.createElement('div')
    timeDiv.setAttribute('class','time')
    top.insertAdjacentElement('beforeend', timeDiv)

    const timeDiv3 = document.createElement('div')
    timeDiv3.setAttribute('class','time')
    nextTop.insertAdjacentElement('beforeend', timeDiv3)

    const timeDiv2 = document.createElement('div')
    timeDiv2.setAttribute('class','time')
    bottom.insertAdjacentElement('beforeend', timeDiv2)
    
    const timeDiv4 = document.createElement('div')
    timeDiv4.setAttribute('class','time')
    nextBottom.insertAdjacentElement('beforeend', timeDiv4)

    this.topNum = this.containerEl.querySelector('.top .time')
    this.bottomNum = this.containerEl.querySelector('.bottom .time')
    this.top = this.containerEl.querySelector('.top')
    this.nextTop = this.containerEl.querySelector('.nextTop')
    this.nextTopNum = this.containerEl.querySelector('.nextTop .time')
    this.bottom = this.containerEl.querySelector('.bottom')
    this.nextBottom = this.containerEl.querySelector('.nextBottom')
    this.nextBottomNum = this.containerEl.querySelector('.nextBottom .time')
  }

  createEls = () => {
    const topDiv = document.createElement('div')
    topDiv.setAttribute('class', 'top');
    const topNextDiv = document.createElement('div')
    topNextDiv.setAttribute('class', 'nextTop');
    const bottomDiv = document.createElement('div')
    bottomDiv.setAttribute('class', 'bottom');
    const bottomNextDiv = document.createElement('div')
    bottomNextDiv.setAttribute('class', 'nextBottom');
    
    this.insertEls(topDiv, bottomDiv, topNextDiv, bottomNextDiv)
  }
  
  configure = () => {
    this.createEls();

    this.getTime();
    
  }
}