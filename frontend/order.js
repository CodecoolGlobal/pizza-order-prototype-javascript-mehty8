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
<p name=${type.replace(/ /g, '-')} >${type}</p>
<input type=hidden name=${type.replace(/ /g, '-')}  value=${subAmount}>
<p name=${type.replace(/ /g, '-')} >${subAmount}</p>
<input type=hidden name=${type.replace(/ /g, '-')}  value=${subPrice}>
<p name=${type.replace(/ /g, '-')} >${subPrice}</p>
</div>
`
orderInfosDiv.insertAdjacentHTML("afterbegin", orderDetails.map(x=> purchasingList(x)).join(''))



