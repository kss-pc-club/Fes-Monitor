//----- HTMLへの出力関連 -----//

import React from 'react'

import { type_dataJson, type_IconInfo } from './type'

// 食販ではない場合のstatusの紐づけ（詳しくはmain.scss）
const FoodMap = ['op', 'sh', 'so']
const notFoodMap = ['no', 'pa', 'en']

class ColumnContainer extends React.Component<
  type_dataJson,
  Record<string, unknown>
> {
  // アイコンのコンテナを生成
  icon(i: type_IconInfo, f: boolean) {
    return (
      <div className="icons" data-num={i.length}>
        {i.map((ico) => {
          return (
            <div>
              <img
                className="icon"
                src={'./icons/' + ico.src + '.png'}
                data-status={f ? FoodMap[ico.status] : notFoodMap[ico.status]}
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

function Render(json: { j: type_dataJson[] }): JSX.Element {
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
