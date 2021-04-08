import React from 'react';
import { dataJsonType, IconInfo } from './type';

class Icons extends React.Component<dataJsonType,{}>{
	icon(i:IconInfo){
		return(
			<div className="icons" data-num={i.length}>
				{i.map(ico=>{
					return(
						<div>
							<img className="icon" src={"./icons/"+ico.src+".png"} data-status={ico.status} />
							<p></p>
						</div>
					)
				})}
			</div>
		)
	}
	render(){
		return this.icon(this.props.icons);
	}
}

class ColumnContainer extends Icons{
	render(){
		let e;
		if(this.props.icons.length !== 0){
			e = this.icon(this.props.icons);
		}
		return(
			<div className="section" data-cls={this.props.class}>
				<p className="cls">{this.props.class}</p>
				<p className="shop">{this.props.name}</p>
				<p className="time">{this.props.time}</p>
				<div className="iconContainer">{e}</div>
			</div>
		)
	}
}

function Render(json: {j:dataJsonType[]}){
		console.log(json);
    const Columns = json.j.map(c=>{
				return(<ColumnContainer class={c.class} name={c.name} time={c.time} icons={c.icons} />)
			})

		return(
			<>{Columns}</>
		)
}

function RenderIco(icons: {i:IconInfo}){
	return (
		<Icons icons={icons.i} class="" name="" time="" />
	)
}

export { Render, RenderIco };

