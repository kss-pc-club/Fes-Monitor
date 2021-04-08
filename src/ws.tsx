// WebSocket
import $ from "jquery";
import React from "react";
import ReactDOM from 'react-dom';
import { RenderIco } from './render';


class WebSoc{
  cls: string;
	/**
	 *
	 * @param cls - クラスのIDを指定
	 */
	constructor(cls: string){
		this.cls = cls;

		const socket = new WebSocket(`wss://kss-pc-club-websocket.herokuapp.com/kss-fes-monitor/${this.cls}`)
		socket.addEventListener("open", function(ev){
			socket.send(`Hi. ${cls}`);
			console.log(ev)
		});
		socket.addEventListener("close", function(ev){
			console.log(`切断されました。 ${cls}`,ev);
		});
		socket.addEventListener("message", function(ev){
			if(ev.data !== "Hi."){
				console.log(ev);

				const data = ev.data;
				const dataJson = JSON.parse(data);

				console.log(dataJson);

				const $parent = $(`div.section[data-cls="${cls}"]`);

				["shop", "time", "icons"].forEach(_=>{
					if(dataJson.hasOwnProperty(_)){
						const e = dataJson[_];
						if(_ === "icons"){
							$parent.find("div.icons").remove();
							$parent.find("div.iconContainer").each(function(){
								ReactDOM.render(<RenderIco i={e} />, this);
							})
							$parent.find("div.icons").attr("data-num", e.length);
							return;
						}

						$parent.find(`p.${_}`).text(e);
					}
				})
				socket.send("Ok");
			}
		});
	}
}

export { WebSoc };

