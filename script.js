const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)
const $container = $('.container')
const $seats = $$('.row .seat:not(.occupied)')
const $count = $('#count')
const $total = $('#total')
const $movieSelect = $('#movie')
let $ticketPrice = parseInt($movieSelect.value) // adding a + sing in front of the value will convert to number as well

// console.log(typeof $ticketPrice)

// populateUI()

// Save selected movie index and price
function saveMovieData(movieIndex, moviePrice) {
  localStorage.setItem('movieIndex', movieIndex)
  localStorage.setItem('moviePrice', moviePrice)
}

// Update total and count
function updateSelectedCount() {
  const $selectedSeats = $$('.row .seat.selected')

  // gets the elements from $selectedSeats and for each item (seat) takes the elements of the global variable $seats and looks for the index of that seat. Basically it looks for the selected seats on the global array of seats and returns a new array with the indexes of those selected seats
  const seatsIndexes = [...$selectedSeats].map((seat) =>
    [...$seats].indexOf(seat),
  )
  console.log(seatsIndexes)

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndexes))

  const selectedSeatsCount = $selectedSeats.length
  // console.log(selectedSeatsCount)
  $count.innerText = selectedSeatsCount
  $total.innerText = selectedSeatsCount * $ticketPrice
}

// Get data from localStorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))

  console.log(selectedSeats)
  // looks if selectedSeats is defined and if it has something in it.
  if (selectedSeats !== null && selectedSeats.length > 0) {
    //* For each seat on unselected seats ($seats) will look if that seat's index is on the selectedSeats array (indexes array) obtained from localStorage, if it is, it means it was selected previously on another session and we must bring it back to the selected state (add the class 'selected')
    $seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected')
      }
    })
  }

  const selectedMovieIndex = localStorage.getItem('movieIndex')
  if (selectedMovieIndex !== null) {
    $movieSelect.selectedIndex = selectedMovieIndex
  }

  const selectedSeatsCount = selectedSeats.length
  // console.log(selectedSeatsCount)
  $count.innerText = selectedSeatsCount
  $ticketPrice = parseInt(localStorage.getItem('moviePrice'))
  $total.innerText = selectedSeatsCount * $ticketPrice
}

//add first event listener for changing the class to the seats when they are selected;
//grab the container, add the event listener and when we run the event we wanna make sure the seat element is the one that's doing that
$container.addEventListener('click', (e) => {
  //  console.log(e.target)

  // select only open seat
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    // console.log(e.target)

    e.target.classList.toggle('selected')

    updateSelectedCount()
  }
})

// Movie select event
$movieSelect.addEventListener('change', (e) => {
  $ticketPrice = parseInt(e.target.value)
  updateSelectedCount()

  saveMovieData(e.target.selectedIndex, e.target.value)
})

// Initial count and total set
document.addEventListener('DOMContentLoaded', populateUI())


