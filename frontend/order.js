let importObject = window.localStorage.getItem('purchaseObject')
let orderDetails = JSON.parse(importObject)

let body = document.querySelector('body')
let mainDiv = document.createElement('mainDiv')
mainDiv.setAttribute('class', 'mainDiv')

let orderInfosDiv = document.createElement('div')
orderInfosDiv.setAttribute('class', 'orderInfosDiv')

mainDiv.appendChild(orderInfosDiv)

let input1 = document.createElement('input')
input1.setAttribute('name', 'name')
input1.setAttribute('placeholder', 'Your name')
input1.setAttribute('required', '')


let input2 = document.createElement('input')
input2.setAttribute('name', 'address')
input2.setAttribute('placeholder', 'Delivery address')
input2.setAttribute('required', '')

let input3 = document.createElement('input')
input3.setAttribute('name', 'email')
input3.setAttribute('placeholder', 'Your email address')
input3.setAttribute('required', '')

let inputDiv = document.createElement('div')
inputDiv.setAttribute('class', 'inputDiv')

let button = document.createElement('button')
button.setAttribute('class', 'totalpurchase')
button.innerText= 'purchase'

let buttonDiv = document.createElement('div')
buttonDiv.setAttribute('class', 'buttonDiv')

inputDiv.appendChild(input1)
inputDiv.appendChild(input2)
inputDiv.appendChild(input3)
buttonDiv.appendChild(button)

mainDiv.appendChild(orderInfosDiv)
mainDiv.appendChild(inputDiv)
mainDiv.appendChild(buttonDiv)


body.appendChild(mainDiv)

const purchasingList = ({type, subAmount, subPrice}) => `
<div class=orderInfos>
<input type=hidden name=${type.replace(/ /g, '-')}  value=${type.replace(/ /g, '-')}>
<p name=${type.replace(/ /g, '-')} >${type}:</p>
<input type=hidden name=${type.replace(/ /g, '-')}  value=${subAmount}>
<p name=${type.replace(/ /g, '-')} >${subAmount} piece(s),</p>
<input type=hidden name=${type.replace(/ /g, '-')}  value=${subPrice}>
<p name=${type.replace(/ /g, '-')} >${subPrice}</p>
</div>
`
window.addEventListener('load', () => {
    orderInfosDiv.insertAdjacentHTML("afterbegin", orderDetails.map(x=> purchasingList(x)).join(''))
  })


const totalPurchase = (e) =>{
    if(e.target.classList.value === 'totalpurchase' ){
    const inputFields = document.querySelectorAll('input');
    const inputValues = Array.from(inputFields).map(x => x.value); 
    if(inputValues[3] && inputValues[4] && inputValues[5]){
    fetch('/order/list', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'
            },
            body: JSON.stringify({ order: inputValues })
        }).
    catch(error => { console.error(error);
    }); return true
    } else {window.alert('Damn Man, the input fields are required'); return false}
}
}

let counting = 7

const countingFunc = () => {
    counting--
    if (counting >= 1){
    document.getElementById('countdown').innerText = counting
} else {clearInterval(setInterval(countingFunc, 1000)); window.location.href = '/' }
}


const waiting = (purchase) => {
    if(purchase){
    mainDiv.innerHTML = ''
    const thankYou = document.createElement('div')
    thankYou.setAttribute('class', 'thankYou')
    const thankYoup1 = document.createElement('p')
    thankYoup1.innerText = 'Thank You'
    const thankYoup2 = document.createElement('p')
    thankYoup2.innerText = 'Your order is on its way'
    const thankYoup3 = document.createElement('p')
    thankYoup3.innerText = 'The page will reload in...'
    const countDown = document.createElement('div')
    countDown.setAttribute('id', 'countdown')
    countDown.innerText = counting
    thankYou.appendChild(thankYoup1)
    thankYou.appendChild(thankYoup2)
    thankYou.appendChild(thankYoup3)
    thankYou.appendChild(countDown)
    mainDiv.appendChild(thankYou)
    setInterval(countingFunc, 1000)
}
}

const clickEvent = (e) => {
    waiting(totalPurchase(e))
}

window.addEventListener('click', clickEvent)



