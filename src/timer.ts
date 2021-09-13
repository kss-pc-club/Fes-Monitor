//----- 現在時刻を表示するタイマー -----//

import $ from 'jquery'

import { festival_duration } from './firebase'
import { formatInt } from './functions'
import { type_TimeUnits } from './type'

/**
 * 現在時刻を表示します
 */
const nowTimer = (): void => {
  const d = new Date() // 現在の時刻
  const t = { h: d.getHours(), m: d.getMinutes(), s: d.getSeconds() } // 現在時刻のオブジェクト

  // 反映部分
  const units: type_TimeUnits[] = ['h', 'm', 's']
  units.forEach((_) => {
    $(`p.date span.${_}`).text(formatInt(t[_]))
  })

  // 開始時刻前の処理
  if (festival_duration.start > d) {
    const rm = Math.ceil(
      ((festival_duration.start.getTime() - d.getTime()) / (1000 * 60)) % 60
    )
    const rh = Math.ceil(
      (festival_duration.start.getTime() - d.getTime()) / (1000 * 60 * 60)
    )
    $('p.remainDate span.h').text(formatInt(rh) + '時間')
    $('p.remainDate span.m').text(formatInt(rm) + '分')
    $('p.remainDate span.txt').text('文化祭はまもなく開始します。開始まで')
  }
  // 終了時刻後の処理
  else if (d > festival_duration.end) {
    $('p.remainDate span.h').text('')
    $('p.remainDate span.m').text('')
    $('p.remainDate span.txt').text(
      '文化祭は終了しました。本日はご来場ありがとうございました！'
    )
  }
  // 文化祭中の処理
  else {
    const rm = Math.ceil(
      ((festival_duration.end.getTime() - d.getTime()) / (1000 * 60)) % 60
    )
    const rh = Math.ceil(
      (festival_duration.end.getTime() - d.getTime()) / (1000 * 60 * 60)
    )
    $('p.remainDate span.h').text(formatInt(rh) + '時間')
    $('p.remainDate span.m').text(formatInt(rm) + '分')
    $('p.remainDate span.txt').text('文化祭終了まで')
  }
}

export { nowTimer }
