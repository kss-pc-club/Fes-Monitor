import $ from "jquery";
import { sleep } from "./functions";
import { prPage } from "./react";

const slide = async ()=>{
	const $now = $("div.page.showing");
	const $next = ($now.hasClass(`pr${prPage}`)) ? $("div.page#p1") : $now.next();
	$now.animate({left: -window.outerWidth}, 1000);
	$next.addClass("showing").css("left", window.outerWidth + 50).animate({left: 0}, 1000);

	const $nowBall = $("div.ball.showing");
	const $nextBall = ($now.hasClass(`pr${prPage}`)) ? $("div.ball#b1") : $nowBall.next();
	$nowBall.removeClass("showing");
	$nextBall.addClass("showing");


	// if($now.hasClass(`pr${prPage}`)){
	// 	var isPlaying = false;
	// 	document.querySelector("video").pause();
	// }
	await sleep(1000);
	// if($next.hasClass(`pr${prPage}`)){
	// 	var isPlaying = true;
	// 	document.querySelector("video").play();
	// }
	$now.removeClass("showing").removeAttr("style");
	$next.removeAttr("style");
}

export { slide };

