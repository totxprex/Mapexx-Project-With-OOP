'use strict'



window.addEventListener('load', function (e) {
  document.querySelector('.logo').style = 'opacity: 1'
})

let dat = Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric'
}).format(new Date())

let statsContainer = document.querySelector('.containerForStat')
let eachInputDIv = document.querySelectorAll('.eachInputDIv')
let typeOption = document.querySelectorAll('.input')
let distanceOption = document.querySelectorAll('.inputDistance')
let durationOption = document.querySelectorAll('.inputDuation')
let cadenceOption = document.querySelectorAll('.inputCadence')
let cadenceorStepend = document.querySelectorAll('.cadence_or_stepend')
let runOpt = document.querySelectorAll('.runOpt')
let cyclingOpt = document.querySelectorAll('.cyclingOpt')
let input = document.querySelectorAll('.input')


let durationArr = []
let distanceArr = []
let cadenceArr = []
let coorFormarker = []
let inPutDivString = `<div class="eachInputDIv">
<div class="theInput">
  <p>Type &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span>
      <select class="input">
        <option class="runOpt" value="Running">Running</option>
        <option class="cyclingOpt"  value="Cycling">Cycling</option>
      </select>
    </span>

    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

    <span>
      Distance &nbsp;&nbsp;
      <span>
        <input class="inputDistance" type="number" placeholder="km">
        </input>
      </span>
    </span>
  </p>

  <p>Duration &nbsp; <span>
      <input class="inputDuation" type="number" placeholder="min">
      </input>
    </span>

    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

    <span class="cadence_or_stepend">
    <span>Cadence &nbsp;</span
      <span>
        <input class="inputCadence" type="number" placeholder="steps/min">
        </input>
      </span>
    </span>
  </p>

</div>
</div>`

let createNewInput = function () {


  eachInputDIv[0].insertAdjacentHTML('beforebegin', inPutDivString)

  eachInputDIv = document.querySelectorAll('.eachInputDIv')
  cadenceorStepend = document.querySelectorAll('.cadence_or_stepend')
  typeOption = document.querySelectorAll('.input')
  distanceOption = document.querySelectorAll('.inputDistance')
  durationOption = document.querySelectorAll('.inputDuation')
  cadenceOption = document.querySelectorAll('.inputCadence')
  input = document.querySelectorAll('.input')



  typeOption[0].addEventListener('click', function (e) {

    if (e.target.className = 'input') {

      if (e.target.value === 'Cycling') {

        cadenceorStepend[0].innerHTML = `ElevGain &nbsp;&nbsp;<span>
        <input class="inputCadence" type="number" placeholder="steps/min">
        </input>
      </span>`
        cadenceOption = document.querySelectorAll('.inputCadence')
      }
      else {
        cadenceorStepend[0].innerHTML = `Cadence &nbsp;<span>
        <input class="inputCadence" type="number" placeholder="steps/min">
        </input>
      </span>`
        cadenceOption = document.querySelectorAll('.inputCadence')
      }
    }
  })
}

//GeoLocation API
let latitude
let longitude
let coords
let map



if (navigator.geolocation) {

  navigator.geolocation.getCurrentPosition(function (position) {
    longitude = position.coords.longitude
    latitude = position.coords.latitude
    coords = [latitude, longitude]

    map = L.map('map').setView(coords, 13)

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


    map.on('click', function (e) {
      coorFormarker.push([e.latlng.lat, e.latlng.lng])
      createNewInput()
    })

  }, function () {
    console.log('I dont see the location')
  })
}





let showStatLoop = function () {

  eachInputDIv.forEach(function (el, ind, arr) {
    el.remove()
  })

  for (let loop = 0; loop <= durationArr.length - 1; loop++) {

    if (durationArr[loop] > 0) {

      statsContainer.insertAdjacentHTML('beforeend', `<div class="eachInputDIv">
      <div class="theStatsRunning" style="padding-top: 7px;">
    <p>
      Running on <span class="date">${dat}</span>
    </p>   
    <p style="font-size: x-small;">
      🏄 <span class="distanceStatInput">${distanceArr[loop]} km</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      ⏰ <span class="durationStatInput">${durationArr[loop]} min</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      ⚡ <span class="timeStatInput">${distanceArr[loop] / durationArr[loop]} min/km</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      👣 <span class="cade_or_stepedStatInput">${cadenceArr[loop]} spm</span>
    </p>    
  </div>
  </div>`
      )
      eachInputDIv = document.querySelectorAll('.eachInputDIv')
      eachInputDIv[loop].classList.add('runningColor')
      eachInputDIv[loop].setAttribute(`data-stat`, `${loop}`)
    }


    else {
      statsContainer.insertAdjacentHTML('beforeend', `<div class="eachInputDIv">
      <div class="theStatsRunning" style="padding-top: 7px;">
      <p>
        Cycling on <span class="date">${dat}</span>
      </p>   
      <p style="font-size: x-small;">
        🏄 <span class="distanceStatInput">${Math.abs(distanceArr[loop])} km</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        ⏰ <span class="durationStatInput">${Math.abs(durationArr[loop])} min</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        ⚡ <span class="timeStatInput">${Math.abs(distanceArr[loop]) / (Math.abs(durationArr[loop])) / 60} min/km</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        👣 <span class="cade_or_stepedStatInput">${Math.abs(cadenceArr[loop])} spm</span>
      </p>    
    </div>
    </div>`
      )
      eachInputDIv = document.querySelectorAll('.eachInputDIv')
      eachInputDIv[loop].classList.add('cyclingcolor')
      eachInputDIv[loop].setAttribute(`data-stat`, `${loop}`)
    }
  }
}




let showStatDiv = function () {

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && durationOption[0].value && distanceOption[0].value && input[0].value === 'Running') {

      durationArr.push(durationOption[0].value)
      distanceArr.push(distanceOption[0].value)
      cadenceArr.push(cadenceOption[0].value)
      showStatLoop()

      L.marker(coorFormarker[coorFormarker.length - 1]).addTo(map)
        .bindPopup(L.popup({
          autoClose: false,
          closeOnClick: false,
          className: 'runningColorMap'
        })).setPopupContent(`Your exercise on ${dat}: Distance: ${distanceOption[0].value}km. Duration: ${durationOption[0].value}min.☂️☂️☂️`)
        .openPopup();

    }


    else if (e.key === 'Enter' && durationOption[0].value && distanceOption[0].value && input[0].value === 'Cycling') {
      durationArr.push(-durationOption[0].value)
      distanceArr.push(-distanceOption[0].value)
      cadenceArr.push(-cadenceOption[0].value)
      showStatLoop()

      L.marker(coorFormarker[coorFormarker.length - 1]).addTo(map)
        .bindPopup(L.popup({
          autoClose: false,
          closeOnClick: false,
          className: 'cyclingcolorMap'
        })).setPopupContent(`Your exercise on ${dat}: Distance: ${distanceOption[0].value}km. Duration: ${durationOption[0].value}min. ☂️☂️☂️`)
        .openPopup();
    }
  })
}

showStatDiv()





document.querySelector('.containerForStat').addEventListener('click', function (e) {
  if (coorFormarker[e.target.dataset.stat]) {
    map.setView(coorFormarker[e.target.dataset.stat], 13)
  }
})

























//Further Practice

//Using OOP to store the stat date for workout

let classParent = class {
  constructor(distance, duration, cadence) {
    this.distance = distance
    this.duration = duration
    this.cadence = cadence
  }
  sumUpAllData() {
    return this.distance + this.duration + this.cadence
  }
}

let classChild = class extends classParent {
  constructor(distance, duration, cadence) {
    super(distance, duration, cadence)
  }
}

let user1 = new classChild(1, 1, 1)

console.log(user1)




