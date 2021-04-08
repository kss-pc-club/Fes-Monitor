//----- 現在時刻を表示するタイマー -----//

import $ from 'jquery'

import { formatInt } from './functions'
import { TimeUnitsType } from './type'

// 終了時刻を指定
const endTime = { h: 14, m: 30 }

/**
 * 現在時刻を表示します
 */
const nowTimer = (): void => {
  const d = new Date() // 現在の時刻
  const t = { h: d.getHours(), m: d.getMinutes(), s: d.getSeconds() } // 現在時刻のオブジェクト

  // 反映部分
  const units: TimeUnitsType[] = ['h', 'm', 's']
  units.forEach((_) => {
    $(`p.date span.${_}`).text(formatInt(t[_]))
  })

  // 残り時間を表示する
  let rm = endTime.m - t.m
  let rh = endTime.h - t.h
  if (rm < 0) {
    rh--
    rm += 60
  }
  $('p.remainDate span.h').text(formatInt(rh))
  $('p.remainDate span.m').text(formatInt(rm))

  // 時間が過ぎたら、メッセージを表示する
  if (rh < 0) {
    $('p.remainDate').text(
      '文化祭は終了しました。本日はご来場、誠にありがとうございました！'
    )
  }
}

export { nowTimer }
