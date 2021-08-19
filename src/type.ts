//----- 使用するタイプ一覧 -----//

// timer.tsを参照
type TimeUnitsType = 'h' | 'm' | 's'

// 模擬店情報のステータス一覧
type StatusType = 0 | 1 | 2

// アイコン情報
type IconInfo = {
  src: string
  status: StatusType
}[]

// 各模擬店データ
type dataJsonType = {
  class: string
  name: string
  time: string
  icons: IconInfo
  isFood: boolean
}

// 模擬店のメニューで必要になる情報
type menuInfoType = {
  icon: string
  status: StatusType
}

// Firebaseから取得する情報
type ClassDataSnapshotType = {
  class: string
  isFood: boolean
  menus: {
    icon: string
    name: string
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

