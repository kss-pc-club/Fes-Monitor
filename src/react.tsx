//----- Reactを用いて模擬店待ち時間を表示 -----//

import $ from 'jquery'
import React from 'react'
import ReactDOM from 'react-dom'
import { createElem, sleep } from './functions'
import { Render } from './render'
import { isAnimating } from './slide'
import { dataJsonType } from './type'


const prPage = 1 // クラス情報とは別のページ（以下「PRページ」）の数

async function show(json: dataJsonType[]): Promise<void> {
  // アニメーション中の場合は1秒待って表示を更新する
  if (isAnimating) await sleep(1000)

  // 現在表示されているページ番号を取得
  const nowShowingID = $('.page.showing').attr('id')
  const nowPageNum = nowShowingID ? Number(nowShowingID.split('p')[1]) : 1

  // 一度全要素を削除（消さないと重なって表示される）
  $('.pages .page:not([class^=pr])').remove()
  $('.scrollBall .bContainer .ball').remove()
  $('.showing').removeClass('showing')

  // ページを生成
  const pageCount = Math.ceil(json.length / 6)
  for (let i = 0; i < pageCount; i++) {
    // 全体の枠を生成 <div class="page" id="p1">みたいな
    const div = createElem('div', ['page'], `p${i + 1}`)

    // 各ページをPRページ前に表示
    const prPage1 = document.querySelector('div.pr1')
    if (prPage1) prPage1.insertAdjacentElement('beforebegin', div)

    // 模擬店情報を格納
    const arr: dataJsonType[] = []
    for (let j = 0; j < (i == pageCount - 1 ? json.length - i * 6 : 6); j++) {
      arr.push(json[i * 6 + j])
    }

    // div内に各模擬店情報を表示
    ReactDOM.render(<Render j={arr} />, div)
  }

  // PRページに番号を振る
  for (let i = 1; i <= prPage; i++) {
    const prPage = document.querySelector(`div.pr${i}`)
    if (prPage) prPage.id = `p${pageCount + i}`
  }

  // ページ下部のボールを生成
  for (let i = 0; i < pageCount + prPage; i++) {
    const e = document.querySelector('div.scrollBall div.bContainer')
    const b = createElem('div', ['ball'], `b${i + 1}`)
    if (e) e.insertAdjacentElement('beforeend', b)
  }

  // 表示すべきページ・ボールにshowingクラスを付与
  $(`.page#p${nowPageNum}`).addClass('showing')
  $(`.ball#b${nowPageNum}`).addClass('showing')
}

export { show, prPage }

