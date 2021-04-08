import $ from "jquery";
import { formatInt } from "./functions";
import { TimeUnitsType } from "./type";

const endTime = {h: 14, m: 30};
const nowTimer = ()=>{
	const d = new Date();
	const t = { h: d.getHours(), m: d.getMinutes(), s: d.getSeconds() };
	const units:TimeUnitsType[] = ["h", "m", "s"]
  units.forEach(_=>{
		$(`p.date span.${_}`).text(formatInt(t[_]));
	});
	let rm = endTime.m - t.m;
	let rh = endTime.h - t.h;
	if(rm < 0){
		rh--;
		rm += 60;
	}
	$("p.remainDate span.h").text(formatInt(rh));
	$("p.remainDate span.m").text(formatInt(rm));

	if(rh<0){
		$("p.remainDate").text("文化祭は終了しました。本日はご来場、誠にありがとうございました！");
	}
};

export { nowTimer };

