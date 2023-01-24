let visibilty = false

let body = document.querySelector('body')
let cardDiv = document.createElement('div')
cardDiv.setAttribute('id', 'cardDiv')
let header = document.createElement('header')
header.innerText = 'Helmet'
let headerDiv = document.createElement('div')
headerDiv.setAttribute('class', 'headerDiv')
let form = document.createElement('form')
form.setAttribute('action', '/order')
form.setAttribute('method', 'post')

let welcomeDiv = document.createElement('div')
welcomeDiv.setAttribute('class', 'welcome')
let welcomeImg = document.createElement('img')
welcomeImg.setAttribute('src', 'pictures/fist1.jpg')
let welcomeText= document.createElement('p')
welcomeText.innerText = 'SuperPower Inc.'
welcomeDiv.appendChild(welcomeImg)
welcomeDiv.appendChild(welcomeText)

let intro = document.createElement('div')
intro.setAttribute('class', 'intro')
intro.innerText = 'You can be a real superhero'

let customerCare = document.createElement('div')
customerCare.setAttribute('class', 'opinion')
let customerText = document.createElement('p')
customerText.innerText = 'What an experience'
customerCare.appendChild(customerText)


let input1 = document.createElement('input')
input1.setAttribute('name', 'name')
input1.setAttribute('placeholder', 'Tell me your name')
input1.setAttribute('required', '')


let input2 = document.createElement('input')
input2.setAttribute('name', 'address')
input2.setAttribute('placeholder', 'Tell me your address')
input2.setAttribute('required', '')

let input3 = document.createElement('input')
input3.setAttribute('name', 'email')
input3.setAttribute('placeholder', 'Tell me your email address')
input3.setAttribute('required', '')

let inputDiv = document.createElement('div')
inputDiv.setAttribute('class', 'inputDiv')
let totalAmount = document.createElement('div')
totalAmount.setAttribute('class', 'total')
inputDiv.appendChild(totalAmount)
inputDiv.appendChild(input1)
inputDiv.appendChild(input2)
inputDiv.appendChild(input3)




let button = document.createElement('button')
button.setAttribute('class', 'totalpurchase')
button.innerText = 'Purchase'
button.setAttribute('type', 'submit')
inputDiv.appendChild(button)

form.appendChild(inputDiv)
header.appendChild(headerDiv)

let upperDiv = document.createElement('div')
upperDiv.setAttribute('class', 'upperDiv')
upperDiv.appendChild(header)

let mainDiv= document.createElement('div')
mainDiv.setAttribute('class', 'mainDiv')
mainDiv.appendChild(upperDiv)
mainDiv.appendChild(welcomeDiv)
mainDiv.appendChild(intro)
mainDiv.appendChild(cardDiv)
mainDiv.appendChild(customerCare)
body.appendChild(mainDiv)



fetch('/superpowers.json').then(response => response.json()).then(data=> superpowerList(data))

let amount = 1



const superpower = ({Type, Icon, Shot, Last, Price}) => `
	<div class="superpowerList">
		<h2>${Type}</h2>
        <img src=${Icon}>
		<h3>${Shot}</h3>
		<h3>${Last}</h3>
        <div class = button>
         <button class=plus>+</button>
         <p class= amount>${amount}</p>
         <button class=minus>-</button>
        </div>
		<h3 class=price>${Price}</h3>
        <button class=purchase>Add to Helmet</button>
	</div>
`;

const purchasingList = (Type, Amount, Price) => `
<div class=purchasing>
<p name=${Type.replace(/ /g, '-')} >${Type}</p>
<input type=hidden name=${Type.replace(/ /g, '-')}  value=${Amount}>
<p name=${Type.replace(/ /g, '-')} >${Amount}</p>
<input type=hidden name=${Type.replace(/ /g, '-')}  value=${Price}>
<p name=${Type.replace(/ /g, '-')} >${Price}</p>
</div>
`


const superpowerList = y =>
    y.map(x=>cardDiv.insertAdjacentHTML('beforeend', superpower(x))
)


const pricingPlus = (x,y) => {
    x.innerText =
    (Number(x.innerText.replace(/\.| \$/g, '')) * 
    (Number(y.innerText)/(Number(y.innerText)-1))).toString().replace(/(\d{3})$/, '.$1 $')
}

const pricingMinus = (x,y) => {
    x.innerText =
    (Number(x.innerText.replace(/\.| \$/g, '')) * 
    (Number(y.innerText)/(Number(y.innerText)+1))).toString().replace(/(\d{3})$/, '.$1 $')
}

const amountPricing = (e) => {
    let changingAmount = e.target.parentNode.querySelector('p')
    let changingPrice = e.target.parentNode.parentNode.querySelector('.price')
    e.target.classList.value === 'plus' ? (
    changingAmount.innerText = Number(changingAmount.innerText) +1,
    pricingPlus(changingPrice, changingAmount)) :
    e.target.classList.value === 'minus' && Number(changingAmount.innerText) > 1 ? (
    changingAmount.innerText = Number(changingAmount.innerText) -1,
    pricingMinus(changingPrice, changingAmount)) :
    console.log('dedeew')
}

totalAmountCounting = 0

const purchase = (e) => {
    if (e.target.classList.value === 'purchase'){
    let type = e.target.parentNode.querySelector('h2').innerText
    let subAmount = e.target.parentNode.querySelector('p').innerText
    let subPrice = e.target.parentNode.querySelector('.price').innerText
    form.insertAdjacentHTML("afterbegin", purchasingList(type, subAmount, subPrice))
    totalAmountCounting += Number(subPrice.replace(/\.| \$/g, ''))
    visibilty = true
    totalAmount.innerText = 'Total Amount: ' + String(totalAmountCounting).replace(/(\d{3})$/, '.$1') + ' $'
    console.log(totalAmountCounting)
    }
}

const onClick = (e) => {
    amountPricing(e)
    purchase(e)
}



window.addEventListener('click', onClick)

header.addEventListener('mouseenter', () => {if (visibilty === true){headerDiv.appendChild(form)}})

header.addEventListener('mouseleave', () => form.remove())


/* const onClick = (e) => e.target.id === 'plus' ? amount = amount + 1 : window.alert('NW')

window.addEventListener('click', onClick)
console.log(amount) */



/* window.addEventListener('click', e => e.target.id === 'plus' ? window.alert('Wtf') : console.log('Wtf'))

for(let i =0; i < buttonsPlus.length; i++){
    buttonsPlus[i].addEventListener('click', (e) => window.alert('wtf'))
}
 */


/* clickevent;
window, load
window click */


