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
let closemodalbtn = document.querySelectorAll('.closemodalbtn')

let res
let data
let map
let longitude
let latitude
let coords
let durationArr = []
let distanceArr = []
let cadenceArr = []
let coorFormarker = []
let saveItemStorage
let getItemStorage
let dataSetNum
let deleteItemStorage
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

let inPutDivStringHide = `<div class="eachInputDIv hide">
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






navigator.geolocation.getCurrentPosition(function (position) {
  longitude = position.coords.longitude
  latitude = position.coords.latitude
  coords = [latitude, longitude]

  map = L.map('map').setView(coords, 13)

  L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
}, function () {
  console.log('Cannot')
})





let allCodeStart = setTimeout(function () {

  if (longitude) {

    saveItemStorage = function () {
      localStorage.setItem('durationArr', JSON.stringify(durationArr))
      localStorage.setItem('distanceArr', JSON.stringify(distanceArr))
      localStorage.setItem('cadenceArr', JSON.stringify(cadenceArr))
      localStorage.setItem('coorFormarker', JSON.stringify(coorFormarker))
    }

    getItemStorage = function () {
      durationArr = JSON.parse(localStorage.getItem('durationArr'))

      distanceArr = JSON.parse(localStorage.getItem('distanceArr'))

      cadenceArr = JSON.parse(localStorage.getItem('cadenceArr'))

      coorFormarker = JSON.parse(localStorage.getItem('coorFormarker'))
    }


    deleteItemStorage = function () {
      localStorage.removeItem('durationArr')

      localStorage.removeItem('distanceArr')

      localStorage.removeItem('cadenceArr')

      localStorage.removeItem('coorFormarker')
    }



    let iniStatFunc = function () {

      if (localStorage.getItem('durationArr')) {
        durationArr = JSON.parse(localStorage.getItem('durationArr'))

        distanceArr = JSON.parse(localStorage.getItem('distanceArr'))

        cadenceArr = JSON.parse(localStorage.getItem('cadenceArr'))

        coorFormarker = JSON.parse(localStorage.getItem('coorFormarker'))
      }


      eachInputDIv.forEach(function (el, ind, arr) {
        el.remove()
      })


      for (let loop = 0; loop <= durationArr.length - 1; loop++) {

        if (durationArr[loop] > 0) {

          statsContainer.insertAdjacentHTML('beforeend', `<div class="eachInputDIv">
      <div class="theStatsRunning" style="padding-top: 7px;">
      <p>
      Running on <span class="date">${dat}</span>
      <span><a class="closemodalbtn" style="float: right">
      &times;
      </a></span>
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
          closemodalbtn = document.querySelectorAll('.closemodalbtn')


          L.marker(coorFormarker[loop]).addTo(map)
            .bindPopup(L.popup({
              autoClose: false,
              closeOnClick: false,
              className: 'runningColorMap'
            })).setPopupContent(`Your Running on ${dat}: Distance: ${distanceArr[loop]}km. Duration: ${durationArr[loop]}min.☂️☂️☂️`)
            .openPopup();
        }


        else {
          statsContainer.insertAdjacentHTML('beforeend', `<div class="eachInputDIv">
      <div class="theStatsRunning" style="padding-top: 7px;">
      <p>
        Cycling on <span class="date">${dat}</span>
        <span><a class="closemodalbtn" style="float: right">
        &times;
      </a></span>
      </p>   
      <p style="font-size: x-small;">
        🏄 <span class="distanceStatInput">${Math.abs(distanceArr[loop])} km</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        ⏰ <span class="durationStatInput">${Math.abs(durationArr[loop])} min</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        ⚡ <span class="timeStatInput">${Number(Math.abs(distanceArr[loop]) / Math.abs(durationArr[loop]) / 60).toFixed(2)} min/km</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        👣 <span class="cade_or_stepedStatInput">${Math.abs(cadenceArr[loop])} spm</span>
      </p>    
      </div>
      </div>`
          )

          eachInputDIv = document.querySelectorAll('.eachInputDIv')
          closemodalbtn = document.querySelectorAll('.closemodalbtn')
          eachInputDIv[loop].classList.add('cyclingcolor')
          eachInputDIv[loop].setAttribute(`data-stat`, `${loop}`)


          L.marker(coorFormarker[loop]).addTo(map)
            .bindPopup(L.popup({
              autoClose: false,
              closeOnClick: false,
              className: 'cyclingcolorMap'
            })).setPopupContent(`Your Cycling on ${dat}: Distance: ${Math.abs(distanceArr[loop])}km. Duration: ${Math.abs(durationArr[loop])}min. 🚵🚵🚵`)
            .openPopup();
        }
      }


      if (statsContainer.childNodes.length < 5) {
        statsContainer.insertAdjacentHTML('beforeend', inPutDivStringHide)

        eachInputDIv = document.querySelectorAll('.eachInputDIv')
      }
    }
    iniStatFunc()




    let appEngingClass = class {
      constructor() {
        this.showMap()
        this.showStatsDiv()
        this.divNavigation()
      }

      showMap() {
        map.on('click', function (e) {
          coorFormarker.push([e.latlng.lat, e.latlng.lng])
          userObj.showInput()
          userObj.switchInput()
          userObj.delet()
        })
      }

      showInput() {
        eachInputDIv[0].insertAdjacentHTML('beforebegin', inPutDivString)

        eachInputDIv = document.querySelectorAll('.eachInputDIv')
        cadenceorStepend = document.querySelectorAll('.cadence_or_stepend')
        typeOption = document.querySelectorAll('.input')
        distanceOption = document.querySelectorAll('.inputDistance')
        durationOption = document.querySelectorAll('.inputDuation')
        cadenceOption = document.querySelectorAll('.inputCadence')
        input = document.querySelectorAll('.input')
      }


      switchInput() {
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

      showStatsLoop() {
        eachInputDIv.forEach(function (el, ind, arr) {
          el.remove()
        })

        for (let loop = 0; loop <= durationArr.length - 1; loop++) {

          if (durationArr[loop] > 0) {

            statsContainer.insertAdjacentHTML('beforeend', `<div class="eachInputDIv">
        <div class="theStatsRunning" style="padding-top: 7px;">
        <p>
        Running on <span class="date">${dat}</span>
        <span><a class="closemodalbtn" style="float: right">
        &times;
        </a></span>
        </p>   
        <p style="font-size: x-small;">
        🏄 <span class="distanceStatInput">${distanceArr[loop]} km</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        ⏰ <span class="durationStatInput">${durationArr[loop]} min</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        ⚡ <span class="timeStatInput">${(distanceArr[loop] / durationArr[loop]).toFixed(2)} min/km</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        👣 <span class="cade_or_stepedStatInput">${cadenceArr[loop]} spm</span>
        </p>    
        </div>
        </div>`
            )
            eachInputDIv = document.querySelectorAll('.eachInputDIv')
            closemodalbtn = document.querySelectorAll('.closemodalbtn')
            eachInputDIv[loop].classList.add('runningColor')
            eachInputDIv[loop].setAttribute(`data-stat`, `${loop}`)
          }


          else {
            statsContainer.insertAdjacentHTML('beforeend', `<div class="eachInputDIv">
            <div class="theStatsRunning" style="padding-top: 7px;">
            <p>
            Cycling on <span class="date">${dat}</span>
            <span><a class="closemodalbtn" style="float: right">
            &times;
            </a></span>
          </p>   
          <p style="font-size: x-small;">
          🏄 <span class="distanceStatInput">${Math.abs(distanceArr[loop])} km</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          ⏰ <span class="durationStatInput">${Math.abs(durationArr[loop])} min</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          ⚡ <span class="timeStatInput">${Math.abs(distanceArr[loop] / durationArr[loop]).toFixed(2)} min/km</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          👣 <span class="cade_or_stepedStatInput">${Math.abs(cadenceArr[loop])} spm</span>
          </p>    
          </div>
          </div>`
            )
            eachInputDIv = document.querySelectorAll('.eachInputDIv')
            closemodalbtn = document.querySelectorAll('.closemodalbtn')
            eachInputDIv[loop].classList.add('cyclingcolor')
            eachInputDIv[loop].setAttribute(`data-stat`, `${loop}`)
          }
        }
      }

      showStatsDiv() {
        document.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' && durationOption[0].value && distanceOption[0].value && cadenceOption[0].value && input[0].value === 'Running' && durationOption[0].value > 0 && distanceOption[0].value > 0 && cadenceOption[0].value > 0) {

            durationArr.push(durationOption[0].value)
            distanceArr.push(distanceOption[0].value)
            cadenceArr.push(cadenceOption[0].value)
            userObj.showStatsLoop()

            L.marker(coorFormarker[coorFormarker.length - 1]).addTo(map)
              .bindPopup(L.popup({
                autoClose: false,
                closeOnClick: false,
                className: 'runningColorMap'
              })).setPopupContent(`Your Running on ${dat}: Distance: ${distanceOption[0].value}km. Duration: ${durationOption[0].value}min.☂️☂️☂️`)
              .openPopup();

            saveItemStorage()
            userObj.delet()

          }


          else if (e.key === 'Enter' && durationOption[0].value && distanceOption[0].value && cadenceOption[0].value && input[0].value === 'Cycling' && durationOption[0].value > 0 && distanceOption[0].value > 0 && cadenceOption[0].value > 0) {
            durationArr.push(-durationOption[0].value)
            distanceArr.push(-distanceOption[0].value)
            cadenceArr.push(-cadenceOption[0].value)
            userObj.showStatsLoop()

            L.marker(coorFormarker[coorFormarker.length - 1]).addTo(map)
              .bindPopup(L.popup({
                autoClose: false,
                closeOnClick: false,
                className: 'cyclingcolorMap'
              })).setPopupContent(`Your Cycling on ${dat}: Distance: ${distanceOption[0].value}km. Duration: ${durationOption[0].value}min. 🚵🚵🚵`)
              .openPopup();

            saveItemStorage()
            userObj.delet()
          }

          else if (e.key === 'Enter') {
            alert('Invalid Input/Key')
          }
        })
      }

      divNavigation() {
        document.querySelector('.containerForStat').addEventListener('click', function (e) {
          if (coorFormarker[e.target.dataset.stat]) {
            map.setView(coorFormarker[e.target.dataset.stat], 13, {
              animate: true
            })
          }
        })
      }

      arrFilter(arr, dataSetNum) {
        res = arr.filter(function (el, ind) {
          return ind !== dataSetNum
        })
        return res
      }

      delet() {

        closemodalbtn.forEach(function (el, ind) {
          el.addEventListener('click', function (e) {
            e.stopPropagation()

            dataSetNum = Number(e.target.closest('.eachInputDIv').dataset.stat)

            delete durationArr[dataSetNum]
            delete distanceArr[dataSetNum]
            delete cadenceArr[dataSetNum]
            delete coorFormarker[dataSetNum]

            durationArr = durationArr.filter(function (el, ind) {
              return el !== null
            })

            distanceArr = distanceArr.filter(function (el, ind) {

              return el !== null
            })

            cadenceArr = cadenceArr.filter(function (el, ind) {
              return el !== null
            })

            coorFormarker = coorFormarker.filter(function (el, ind) {

              return el !== null
            })

            e.target.closest('.eachInputDIv').remove()

            eachInputDIv = document.querySelectorAll('.eachInputDIv')

            saveItemStorage()

            userObj.resetDataSet()
          })
        })
      }

      resetDataSet() {
        eachInputDIv.forEach(function (el, ind) {
          el.dataset.stat = `${ind}`
        })
      }

    }

    let userObj = new appEngingClass()

    userObj.delet()

  }

  else {
    document.location.reload('oopIndex.js')
  }


}, 5000)




