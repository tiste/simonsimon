"use strict";var Simon=function(){this.daftpunk=!1},app=new Simon,keys={49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9"};Simon.prototype.init=function(){var t=this;this.setScore(),$(".new-game").on("click",function(){t.newGame()}),$(".go-daftpunk").on("click",function(){$("body").addClass("daftpunk"),t.daftpunk=!0})},Simon.prototype.newGame=function(){this.setScore(),this.sequence=[],this.current=[],this.round=0,this["continue"]=!0,this.preventPlaying(),this.nextRound()},Simon.prototype.nextRound=function(){$(".score").text(this.sequence.length),this.sequence.push(this.randomNumber()),this.current=this.sequence.slice(0),this.animate()},Simon.prototype.randomNumber=function(){return Math.floor(9*Math.random()+1)},Simon.prototype.setScore=function(){var t=localStorage.getItem("max");t||(t=0,localStorage.setItem("max",0)),$(".max").text(t)},Simon.prototype.press=function(t){var e=this.current.shift();this.highlight(t),this["continue"]=e==t,this.canContinue()},Simon.prototype.canContinue=function(){0===this.current.length&&this["continue"]?(this.preventPlaying(),this.nextRound()):this["continue"]||(this.preventPlaying(),parseInt(localStorage.getItem("max"))<this.sequence.length-1&&(localStorage.setItem("max",this.sequence.length-1),this.setScore()))},Simon.prototype.letsPlay=function(){var t=this;$(".container").on("click",".tile[data-tile]",function(){t.press($(this).data("tile"))}),$(document).on("keypress",function(e){var n=e.which?e.which:e.keyCode;t.press(keys[n])})},Simon.prototype.preventPlaying=function(){$(".container").off("click",".tile[data-tile]"),$(document).off("keypress")},Simon.prototype.animate=function(){var t=0,e=this,n=this.sequence,i=setInterval(function(){e.highlight(n[t]),t++,t>=n.length&&(clearInterval(i),e.letsPlay())},600)},Simon.prototype.highlight=function(t){var e=$(".tile[data-tile="+t+"]").addClass("pressed");if(this.daftpunk){var n=$("[data-song="+t+"]")[0];n.pause(),n.currentTime=0,n.play()}setTimeout(function(){e.removeClass("pressed")},300)},app.init();