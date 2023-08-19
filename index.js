const cards = document.querySelectorAll('.card')
const timeTag = document.querySelector('.time span strong')
const flipsTag = document.querySelector('.flips span strong')
const refreshBtn = document.querySelector('.details button')

let maxTime = 60
let timeLeft = maxTime
let flips = 0
let matched = 0
let disableDeck = false
let isPlaying = false
let cardOne, cardTwo, timer

const initTimer = () => {
	if (timeLeft <= 0) {
		return clearInterval(timer)
	}
	timeLeft--
	timeTag.innerText = timeLeft
}

const flipCard = ({ target: clickedCard }) => {
	if (!isPlaying) {
		isPlaying = true
		timer = setInterval(initTimer, 1000)
	}
	if (clickedCard !== cardOne && !disableDeck && timeLeft > 0) {
		flips++
		flipsTag.innerText = flips
		clickedCard.classList.add('flip')
		if (!cardOne) {
			return (cardOne = clickedCard)
		}
		cardTwo = clickedCard
		disableDeck = true
		let cardOneIcon = cardOne.querySelector('.back-view i').classList.value
		let cardTwoIcon = cardTwo.querySelector('.back-view i').classList.value
		matchedCards(cardOneIcon, cardTwoIcon)
	}
}

const matchedCards = (icon1, icon2) => {
	if (icon1 === icon2) {
		matched++
		if (matched == 6 && timeLeft > 0) {
			return clearInterval(timer)
		}
		cardOne.removeEventListener('click', flipCard)
		cardTwo.removeEventListener('click', flipCard)
		cardOne = cardTwo = ''
		return (disableDeck = false)
	}

	setTimeout(() => {
		cardOne.classList.add('shake')
		cardTwo.classList.add('shake')
	}, 400)
	setTimeout(() => {
		cardOne.classList.remove('shake', 'flip')
		cardTwo.classList.remove('shake', 'flip')
		cardOne = cardTwo = ''
		disableDeck = false
	}, 1200)
}

function shuffleCards() {
	timeLeft = maxTime
	flips = matched = 0
	cardOne = cardTwo = ''
	clearInterval(timer)
	timeTag.innerText = timeLeft
	flipsTag.innerText = flips
	disableDeck = isPlaying = false
	let arr = [
		'fa-js',
		'fa-html5',
		'fa-react',
		'fa-wordpress',
		'fa-angular',
		'fa-bootstrap',
		'fa-js',
		'fa-html5',
		'fa-react',
		'fa-wordpress',
		'fa-angular',
		'fa-bootstrap',
	]
	arr.sort(() => (Math.random() > 0.5 ? 1 : -1))
	cards.forEach((card, index) => {
		card.classList.remove('flip')
		let iconTag = card.querySelector('.back-view i')
		setTimeout(() => {
			iconTag.classList.value = `fa-brands ${arr[index]}`
		}, 500)
		card.addEventListener('click', flipCard)
	})
}

shuffleCards()
refreshBtn.addEventListener('click', shuffleCards)
cards.forEach((card) => {
	card.addEventListener('click', flipCard)
})
