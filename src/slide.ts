//----- ページをスライドさせる -----//
import $ from 'jquery'

import { sleep } from './functions'
import { prPage } from './react'

// アニメーションしているか（react.tsxの初めのほう参照）
let isAnimating = false

/**
 * ページをスライドさせます
 */
const slide = async (): Promise<void> => {
  isAnimating = true

  // 現在表示しているページ・ボールを取得
  const $now = $('div.page.showing')
  const $nowBall = $('div.ball.showing')

  // 次に表示すべきページ・ボールを取得（一番最後なら、最初に戻る）
  const $next = $now.hasClass(`pr${prPage}`) ? $('div.page#p1') : $now.next()
  const $nextBall = $now.hasClass(`pr${prPage}`)
    ? $('div.ball#b1')
    : $nowBall.next()

  // アニメーション
  $now.animate({ left: -window.outerWidth }, 1000)
  $next
    .addClass('showing')
    .css('left', window.outerWidth + 50)
    .animate({ left: 0 }, 1000)

  $nowBall.removeClass('showing')
  $nextBall.addClass('showing')

  // スライド1秒待つ
  await sleep(1000)

  $now.removeClass('showing').removeAttr('style')
  $next.removeAttr('style')

  isAnimating = false
}

export { slide, isAnimating }
