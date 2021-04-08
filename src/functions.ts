/**
 * document.createElement の拡張
 * @param tag - タグを指定
 * @param classList - Classを指定
 * @param id - 要素のID属性
 * @param opt - 他の属性とか
 * @returns HTMLElement
 */
const createElem = (
  tag = 'div',
  classList: string[] = [],
  id = '',
  opt = {}
): HTMLElement => {
  const r = document.createElement(tag)
  classList.forEach((_) => {
    r.classList.add(_)
  })
  r.id = id
  for (const _ in opt) {
    if (opt[_]) r.setAttribute(_, opt[_])
  }
  return r
}

/**
 * Intをフォーマットします
 * @param data - フォーマットする整数
 */
const formatInt = (data: number): string => String(data).padStart(2, '0')

/**
 * 指定秒数待機します
 * @param ms - Sleepするミリ秒数
 * @returns Promise
 */
const sleep = (ms: number): Promise<void> =>
  new Promise((r) => setTimeout(r, ms))

export { createElem, formatInt, sleep }
