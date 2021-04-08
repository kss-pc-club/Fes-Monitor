import $ from 'jquery'
import React from 'react'
import ReactDOM from 'react-dom'
import { createElem, sleep } from './functions'
import { Render } from './render'
import { isAnimating } from './slide'
import { dataJsonType } from './type'

const prPage = 1
let nowPageNum = 1

async function show(json: dataJsonType[]) {
  if(isAnimating) await sleep(1000)
  const nowShowingID = $('.page.showing').attr('id')
  nowPageNum = nowShowingID ? Number(nowShowingID.split('p')[1]) : 1;
  console.log(nowPageNum)
  $('.pages .page:not([class^=pr])').remove();
  $('.scrollBall .bContainer .ball').remove();
  $('.showing').removeClass('showing')
  const pageCount =
    json.length % 6 === 0 ? json.length / 6 : Math.ceil(json.length / 6)
  for (let i = 0; i < pageCount; i++) {
    const div = createElem('div', ['page'], `p${i + 1}`)
    const prPage1 = document.querySelector('div.pr1')
    if (prPage1) prPage1.insertAdjacentElement('beforebegin', div)
    const arr: dataJsonType[] = []
    for (let j = 0; j < (i == pageCount - 1 ? json.length - i * 6 : 6); j++) {
      arr.push(json[i * 6 + j])
    }
    ReactDOM.render(<Render j={arr} />, div)
  }
  for (let i = 1; i <= prPage; i++) {
    const prPage = document.querySelector(`div.pr${i}`)
    if (prPage) prPage.id = `p${pageCount + i}`
  }
  for (let i = 0; i < pageCount + prPage; i++) {
    const e = document.querySelector('div.scrollBall div.bContainer')
    const b = createElem('div', ['ball'], `b${i + 1}`)
    if (e) e.insertAdjacentElement('beforeend', b)
  }
  $(`.page#p${nowPageNum}`).addClass('showing');
  $(`.ball#b${nowPageNum}`).addClass('showing')
}

export { show, prPage }
