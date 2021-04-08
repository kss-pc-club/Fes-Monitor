import { loadData } from './firebase'
import { slide } from './slide'
import { nowTimer } from './timer'

window.addEventListener('load', () => {
  loadData()
  setInterval(nowTimer, 100)
  setInterval(slide, 10000)
})
