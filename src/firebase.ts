//----- Firebase関連の処理 -----//
import 'firebase/firestore'

import firebase from 'firebase/app'
import $ from 'jquery'

import { firebaseConfig } from './firebaseConfig'
import { show } from './react'
import { ClassDataSnapshotType, dataJsonType, menuInfoType } from './type'

firebase.initializeApp(firebaseConfig)

const database = firebase.firestore()

// 各クラスの模擬店情報
class ClassData {
  class: string // クラス名・部活名
  name: string // 模擬店名
  isFood: boolean // 食販かどうか
  menus: menuInfoType[] // メニュー
  time: string // 待ち時間

  constructor(
    cls: string,
    name: string,
    isFood: boolean,
    menus: menuInfoType[],
    time: string
  ) {
    menus = menus.map((menu) => ({
      icon: menu.icon, // アイコンパス
      status: menu.status, // ステータス（op,sh,soのどれか）
    }))

    this.class = cls
    this.name = name
    this.isFood = isFood
    this.menus = menus
    this.time = time
  }
  // ReactでRenderできるObjectに成形
  format(): dataJsonType {
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
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ) => {
    const data = snapshot.data(options) as ClassDataSnapshotType
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
  database
    .collection('class')
    .withConverter(converter)
    .onSnapshot((snapshot) => {
      const data: dataJsonType[] = []
      snapshot.forEach((doc) => {
        data.push(doc.data().format())
      })
      void show(data)
    })

  // ページ下部の情報を取得
  database
    .collection('scrollInfo')
    .doc('info')
    .onSnapshot((snapshot) => {
      const data = snapshot.data()
      if (data && data.text) $('p.marquee').text(data.text)
    })
}

export { loadData }
