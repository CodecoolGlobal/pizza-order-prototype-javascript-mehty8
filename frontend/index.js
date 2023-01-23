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
let button = document.createElement('button')
button.setAttribute('class', 'totalpurchase')
button.innerText = 'Purchase'
button.setAttribute('type', 'submit')
form.appendChild(button)
header.appendChild(headerDiv)
body.appendChild(header)
body.appendChild(cardDiv)



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
        <button class=purchase>Purchase</button>
	</div>
`;

const purchasingList = (Type, Amount, Price) => `
<div class=purchasing name=${Type}>
<input type=hidden name=Type value=${Type}>
<p name=Type>${Type}</p>
<input type=hidden name=Amount value=${Amount}>
<p name=Amount>${Amount}</p>
<input type=hidden name=Price value=${Price}>
<p name=Price>${Price}</p>
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

const purchase = (e) => {
    let type = e.target.parentNode.querySelector('h2').innerText
    let subAmount = e.target.parentNode.querySelector('p').innerText
    let subPrice = e.target.parentNode.querySelector('.price').innerText
    form.insertAdjacentHTML("afterbegin", purchasingList(type, subAmount, subPrice))

}

const onClick = (e) => {
    amountPricing(e)
    purchase(e)
}

window.addEventListener('click', onClick)

header.addEventListener('mouseenter', () => headerDiv.appendChild(form))

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


