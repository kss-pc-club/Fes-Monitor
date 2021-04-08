type TimeUnitsType = 'h' | 'm' | 's'
type StatusType = 'op' | 'sh' | 'so'

type IconInfo = {
  src: string
  status: StatusType
}[]

type dataJsonType = {
  class: string
  name: string
  time: string
  icons: IconInfo
  isFood: boolean
}

type menuInfoType = {
  icon: string
  status: StatusType
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
    status: StatusType
  }[]
  name: string
  payProceeds: number
  proceeds: number
  time: string
}

export {
  dataJsonType,
  IconInfo,
  TimeUnitsType,
  menuInfoType,
  ClassDataSnapshotType,
  StatusType,
}
