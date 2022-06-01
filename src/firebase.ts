//----- Firebase関連の処理 -----//
import { initializeApp } from 'firebase/app'
import {
  collection,
  doc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore'
import $ from 'jquery'
import "jquery.marquee"

import { firebaseConfig } from './firebaseConfig'
import { show } from './react'
import {
  type_ClassDataSnapshot,
  type_dataJson,
  type_FestivalDuration,
  type_menuInfo,
} from './type'

const app = initializeApp(firebaseConfig)
const database = getFirestore(app)

const festival_duration = {
  start: new Date(),
  end: new Date(),
}

// 各クラスの模擬店情報
class ClassData {
  class: string // クラス名・部活名
  name: string // 模擬店名
  isFood: boolean // 食販かどうか
  menus: type_menuInfo[] // メニュー
  time: string // 待ち時間

  constructor(
    cls: string,
    name: string,
    isFood: boolean,
    menus: type_menuInfo[],
    time: string
  ) {
    menus = menus.map((menu) => ({
      icon: menu.icon, // アイコンパス
      status: menu.status, // ステータス（0,1,2のどれか）
    }))

    this.class = cls
    this.name = name
    this.isFood = isFood
    this.menus = menus
    this.time = time
  }
  // ReactでRenderできるObjectに成形
  format(): type_dataJson {
    return {
      class: this.class,
      name: this.name,
      time: this.time,
      icons: this.menus.map((menu) => ({
        src: menu.icon,
        status: menu.status,
      })),
      isFood: this.isFood,
    }
  }
}

// 指定したものしか取得しないようにする（セキュリティの問題から）
const converter = {
  toFirestore: () => ({}),
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options) as type_ClassDataSnapshot
    return new ClassData(
      data.class,
      data.name,
      data.isFood,
      data.menus,
      data.time
    )
  },
}

const loadData = (): void => {
  // クラス情報を取得し、更新時も自動で取得する
  onSnapshot(
    query(
      collection(database, 'class_info').withConverter(converter),
      orderBy('class', 'asc')
    ),
    (snapshot) => {
      const data: type_dataJson[] = []
      snapshot.forEach((doc) => {
        data.push(doc.data().format())
      })
      void show(data)
    }
  )

  // ページ下部の情報を取得
  const $mqElem = ($('p.marquee') as any).marquee({
    gap: 100,
    speed: 1000,
    duplicated: true,
  })
  onSnapshot(doc(database, 'monitor', 'scroll_info'), (snapshot) => {
    const data = snapshot.data() as { text: string }
    if (data && data.text) {
      $('p.marquee').text(data.text);
      $mqElem.marquee("destroy").marquee({
        gap: 100,
        speed: 100,
        duplicated: true,
      })
    }
  })

  // 文化祭開始時刻・終了時刻を取得
  onSnapshot(doc(database, 'festival_duration', 'time'), (snapshot) => {
    const data = snapshot.data() as type_FestivalDuration
    festival_duration.start = data.start.toDate()
    festival_duration.end = data.end.toDate()
  })
}

export { loadData, festival_duration }
