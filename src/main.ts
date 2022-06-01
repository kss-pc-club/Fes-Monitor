//----- メインファイル -----//

import { loadData } from './firebase'
import { slide } from './slide'
import { nowTimer } from './timer'

window.addEventListener('load', () => {
  loadData(); // データを読み込み表示する
  setInterval(nowTimer, 100) // 100msごとに現在時刻を更新
  setInterval(slide, 10000) // 10秒ごとにページを切り替え
})
