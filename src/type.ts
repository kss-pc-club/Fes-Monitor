//----- 使用するタイプ一覧 -----//

// timer.tsを参照
type type_TimeUnits = 'h' | 'm' | 's'

// 模擬店情報のステータス一覧
type type_Status = 0 | 1 | 2

// アイコン情報
type type_IconInfo = {
  src: string
  status: type_Status
}[]

// 各模擬店データ
type type_dataJson = {
  class: string
  name: string
  time: string
  icons: type_IconInfo
  isFood: boolean
}

// 模擬店のメニューで必要になる情報
type type_menuInfo = {
  icon: string
  status: type_Status
}

// Firebaseから取得する情報
type type_ClassDataSnapshot = {
  class: string
  isFood: boolean
  menus: {
    icon: string
    name: string
    status: type_Status
  }[]
  name: string
  payProceeds: number
  proceeds: number
  time: string
}

export {
  type_dataJson,
  type_IconInfo,
  type_TimeUnits,
  type_menuInfo,
  type_ClassDataSnapshot,
  type_Status,
}
