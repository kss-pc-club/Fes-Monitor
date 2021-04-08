import firebase from 'firebase/app'
import 'firebase/firestore'
import $ from 'jquery'
import { firebaseConfig } from './firebaseConfig'
import { show } from './react'
import { ClassDataSnapshotType, dataJsonType, menuInfoType } from './type'

firebase.initializeApp(firebaseConfig)

const database = firebase.firestore()

class ClassData {
  class: string
  name: string
  isFood: boolean
  menus: menuInfoType[]
  time: string

  constructor(
    cls: string,
    name: string,
    isFood: boolean,
    menus: menuInfoType[],
    time: string
  ) {
    menus = menus.map((menu) => ({
      icon: menu.icon,
      status: menu.status,
    }))

    this.class = cls
    this.name = name
    this.isFood = isFood
    this.menus = menus
    this.time = time
  }
  format() {
    return {
      class: this.class,
      name: this.name,
      time: this.time,
      icons: this.menus.map((menu) => ({
        src: menu.icon,
        status: menu.status,
      })),
    }
  }
}

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

const loadData = () => {
  database
    .collection('class')
    .withConverter(converter)
    .onSnapshot((snapshot) => {
      const data: dataJsonType[] = []
      snapshot.forEach((doc) => {
        data.push(doc.data().format())
      })
      show(data)
    })

  database.collection('scrollInfo').doc('info').onSnapshot(snapshot=>{
    const data = snapshot.data();
    if(data && data.text) $('p.marquee').text(data.text)
  })
}

export { loadData }
