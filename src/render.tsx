//----- HTMLへの出力関連 -----//

import React from 'react'

import { dataJsonType, IconInfo } from './type'

// 食販ではない場合のstatusの紐づけ（詳しくはmain.scss）
const notFoodMap = { op: 'no', sh: 'pa', so: 'en' }

class ColumnContainer extends React.Component<
  dataJsonType,
  Record<string, unknown>
> {
  // アイコンのコンテナを生成
  icon(i: IconInfo, f: boolean) {
    return (
      <div className="icons" data-num={i.length}>
        {i.map((ico) => {
          return (
            <div>
              <img
                className="icon"
                src={'./icons/' + ico.src + '.png'}
                data-status={f ? ico.status : notFoodMap[ico.status]}
              />
              <p></p>
            </div>
          )
        })}
      </div>
    )
  }

  // クラスの模擬店情報を生成
  render() {
    let e
    if (this.props.icons.length !== 0) {
      e = this.icon(this.props.icons, this.props.isFood)
    }
    return (
      <div className="section" data-cls={this.props.class}>
        <p className="cls">{this.props.class}</p>
        <p className="shop">{this.props.name}</p>
        <p className="time">{this.props.time}</p>
        <div className="iconContainer">{e}</div>
      </div>
    )
  }
}

function Render(json: { j: dataJsonType[] }): JSX.Element {
  // クラス情報からReact形式に変換する
  const Columns = json.j.map((c) => {
    return (
      <ColumnContainer
        class={c.class}
        name={c.name}
        time={c.time}
        icons={c.icons}
        isFood={c.isFood}
      />
    )
  })

  return <>{Columns}</>
}

export { Render }
