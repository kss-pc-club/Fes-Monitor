type IconInfo = {
  src: string
  status: string
}[]

type dataJsonType = {
  class: string
  name: string
  time: string
  icons: IconInfo
}

type menuInfoType = {
  icon: string
  status: string
}

type ClassDataSnapshotType = {
  class: string
  isFood: boolean
  menus: {
    icon: string
    name: string
    people: number
    price: number
    proceed: number
    status: string
  }[]
  name: string
  payProceeds: number
  proceeds: number
  time: string
}

type TimeUnitsType = 'h' | 'm' | 's'

export {
  dataJsonType,
  IconInfo,
  TimeUnitsType,
  menuInfoType,
  ClassDataSnapshotType,
}
