type IconInfo = {
  src: string
  status: string
}[]

type dataJsonType = {
  class: string,
  name: string,
  time: string,
  icons: IconInfo
}

type TimeUnitsType = "h" | "m" | "s"

export { dataJsonType, IconInfo, TimeUnitsType }

