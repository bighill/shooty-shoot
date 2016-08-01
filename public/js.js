!function(){"use strict";var t={};t.check=function(){if(!Enemy.data.enemies.length)return!1;for(var t=Enemy.data.enemies.length-1;t>=0;t--){var e=Enemy.data.enemies[t].y+Enemy.data.enemies[t].r,a=Shooter.y-Shooter.r;if(this._shooterCollision(e,a),Shot.data.length)for(var i=Shot.data.length-1;i>=0;i--)this._shotCollision(Shot.data[i],i,Enemy.data.enemies[t],t)}},t._shotCollision=function(e,a,i,n){var s={};return s.top=i.y-i.r,s.bottom=i.y+i.r,s.left=i.x-i.r,s.right=i.x+i.r,!(e.y<s.top)&&(!(e.y>s.bottom)&&(!(e.x<s.left)&&(!(e.x>s.right)&&void t.hit(a,n))))},t._shooterCollision=function(t,e){t>e&&G.lose()},t.hit=function(t,e){Shot.data[t].state="hit",Enemy.data.enemies[e].state="dead",Score.hit()},window.Collision=t}(),function(){"use strict";var t={enemy:{rowN:1,colN:3,moveMultp:.008,rowWmultp:.7,shiftWmultp:.3,enemies:[],val:{rowW:0,shiftW:0,shiftH:0,enemyR:0,shiftV:0,xDelta:0,yDelta:0,movingRight:!0,movingDown:!1}},shot:[]};window.Data=t}(),function(){"use strict";var t={data:{}};t.init=function(){var e=t;e.data=_.cloneDeep(Data.enemy),e.data.val.rowW=G.z*e.data.rowWmultp,e.data.val.shiftW=G.z*e.data.shiftWmultp,e.data.val.shiftV=e.data.moveMultp*G.z*G.speed;var a=2*e.data.colN-1;e.data.val.enemyR=e.data.val.rowW/a/2,e.data.val.shiftH=e.data.val.enemyR;for(var i=e.data.val.enemyR,n=e.data.val.enemyR,s=e.data.val.enemyR,o=i,h=n,l=e.data.rowN-1;l>=0;l--){for(var r=e.data.colN-1;r>=0;r--)e.setRow(i,n,s),i+=4*s;i=o,n=h+4*s*l}Score.setEnemies(e.data.rowN*e.data.colN)},t.setRow=function(t,e,a){var i={x:t,y:e,r:a,state:"active"};this.data.enemies.push(i)},t.draw=function(t){if(!this.data.enemies[0])return G.win(),!1;if(this.data.val.movingDown){this.data.val.yDelta=this.data.val.yDelta+this.data.val.shiftV,this.data.val.yDelta>=this.data.val.shiftH&&(this.data.val.movingDown=!1,this.data.val.yDelta=0);for(var e=this.data.enemies.length-1;e>=0;e--)this._adjustEnemy(this.data.enemies[e],t,e,this.data.enemies,this.data.val.shiftV)}else{this.data.val.xDelta=this.data.val.xDelta+this.data.val.shiftV,this.data.val.xDelta>=this.data.val.shiftW&&(this.data.val.movingRight=!this.data.val.movingRight,this.data.val.xDelta=0,this.data.val.movingDown=!0);for(var a=this.data.enemies.length-1;a>=0;a--)this._adjustEnemy(this.data.enemies[a],t,a,this.data.enemies,this.data.val.shiftV)}},t._adjustEnemy=function(t,e,a,i,n){this.data.val.movingDown?t.y=t.y+n:this.data.val.movingRight?t.x=t.x+n:t.x=t.x-n,"active"==t.state?this._drawEnemy(t,e):"dead"==t.state?this._deactivate(a,i):this._deactivate(a,i)},t._drawEnemy=function(t,e){e.beginPath(),e.fillStyle="rgba( 255, 99, 71, 0.5 )",e.arc(t.x,t.y,t.r,0,2*Math.PI),e.fill()},t._deactivate=function(t,e){e.splice(t,1)},window.Enemy=t}(),function(){"use strict";var t={speed:1.3,isPlaying:!1,z:0,top:0,left:0,el:{game:document.getElementById("shooty-shoot"),score:document.getElementById("score"),canvas:document.getElementById("shooty-shoot-canvas"),home:document.getElementById("home"),lose:document.getElementById("lose"),win:document.getElementById("win")},els:{playBtns:document.getElementsByClassName("play-btn"),shots:document.getElementsByClassName("shots"),hits:document.getElementsByClassName("hits"),accuracy:document.getElementsByClassName("accuracy")}};t.init=function(){var e=new Promise(function(t,e){State.set("shooty-shoot"),"shooty-shoot"==State.current?t("Success!"):e("Failure!")});e.then(t.setZ).then(Enemy.init).then(Shooter.init).then(Shot.init).then(function(){t.isPlaying=!0}).then(function(){window.requestAnimationFrame(t.drawCanvas)}).then(Score.init)},t.setZ=function(){t.z=t.el.canvas.offsetWidth},t.drawCanvas=function(){var e=t.el.canvas.getContext("2d");e.canvas.width=t.z,e.canvas.height=t.z,e.clearRect(0,0,t.z,t.z),Collision.check(),Enemy.draw(e),Shooter.draw(e),Shot.draw(e),t.isPlaying&&window.requestAnimationFrame(t.drawCanvas)},t.play=function(){t.init()},t.win=function(){t.isPlaying=!1,State.set("win")},t.lose=function(){t.isPlaying=!1,State.set("lose")},window.G=t}(),function(){"use strict";var t=function(){window.addEventListener("resize",U.reload),e(G.els.playBtns),State.set("home"),document.removeEventListener("DOMContentLoaded",t)},e=function(t){for(var e=t.length-1;e>=0;e--)t[e].addEventListener("click",G.play)};document.addEventListener("DOMContentLoaded",t)}(),function(){"use strict";var t={initEnemies:0,enemies:0,shots:0,hits:0,accuracy:0};t.init=function(){t.draw()},t.draw=function(){this._setElText(G.els.shots,this.shots),this._setElText(G.els.hits,this.hits),this._setElText(G.els.accuracy,this.setGetAccuracy()),window.setTimeout(function(){t.draw()},500)},t.setEnemies=function(t){return this.initEnemies=t,this.enemies=t,this.enemies},t.shot=function(){return this.shots++,this.shots},t.hit=function(){return this.hits++,this.enemies--,this.hits},t.setGetAccuracy=function(){return this.shots?(this.accuracy=this._calcPercentage(this.hits,this.shots),this.accuracy):this.accuracy},t._calcPercentage=function(t,e){var a=t/e;return a=100*a,a=Math.round(a)},t._setElText=function(t,e){for(var a=t.length-1;a>=0;a--)t[a].textContent=e;return e},window.Score=t}(),function(){"use strict";var t={wMultp:.05,moveMultp:.01,x:0,y:0,r:0,defaultOpacity:.5,shootOpacity:.7,currentOpacity:.5,moveLeft:!1,moveRight:!1,shooting:!1,delayShot:!1};t.init=function(){var e=t;e.r=G.z*e.wMultp,e.x=G.z/2,e.y=G.z-e.r-1,window.addEventListener("keydown",e.keyPress),window.addEventListener("keyup",e.keyRelease)},t.draw=function(t){t.beginPath(),t.fillStyle="rgba( 126, 192, 238, "+this.currentOpacity+" )",this.moveLeft&&this.left(),this.moveRight&&this.right(),this.shooting&&this.shoot(t),this.currentOpacity>this.defaultOpacity&&(this.currentOpacity=this.currentOpacity-.01),t.arc(this.x,this.y,this.r,0,2*Math.PI),t.fill()},t.keyPress=function(e){37==e.keyCode&&(t.moveLeft=!0),39==e.keyCode&&(t.moveRight=!0),17!=e.keyCode&&32!=e.keyCode||(t.shooting=!0)},t.keyRelease=function(e){37==e.keyCode&&(t.moveLeft=!1),39==e.keyCode&&(t.moveRight=!1),17!=e.keyCode&&32!=e.keyCode||(t.shooting=!1)},t.left=function(){var t=this.x-G.z*this.moveMultp;t-this.r>=1&&(this.x=t)},t.right=function(){var t=this.x+G.z*this.moveMultp;t+this.r<=G.z-1&&(this.x=t)},t.shoot=function(t){return!this.delayShot&&(this.engageDelay(),this.currentOpacity=this.shootOpacity,void Shot.launch(this.x,this.y-this.r))},t.engageDelay=function(){this.delayShot=!0,window.setTimeout(this.releaseDelay,300)},t.releaseDelay=function(){t.delayShot=!1},window.Shooter=t}(),function(){"use strict";var t={data:[]};t.init=function(){t.data=_.cloneDeep(Data.shot)},t.launch=function(t,e){var a={x:t,y:e,state:"active"};this.data.push(a),Score.shot()},t.draw=function(t){if(!this.data[0])return!1;for(var a=this.data.length-1;a>=0;a--)e(this.data[a],a,this.data,t)};var e=function(t,e,s,o){t.y=t.y-.01*G.z,t.state=a(t),"active"==t.state?i(o,t):"miss"==t.state?n(e,s):"hit"==t.state?n(e,s):n(e,s)},a=function(t){return t.y<0?"miss":t.state},i=function(t,e){t.beginPath(),t.fillStyle="white",t.rect(e.x,e.y,5,5),t.fill()},n=function(t,e){e.splice(t,1)};window.Shot=t}(),function(){"use strict";var t={current:"",available:[{id:"shooty-shoot",display:"flex"},{id:"home",display:"flex"},{id:"lose",display:"flex"},{id:"win",display:"flex"}]};t.set=function(t){for(var e=this.available.length-1;e>=0;e--)this.available[e].id==t&&this.apply(this.available[e])},t.apply=function(t){this.current=t.id,this.clear(),document.getElementById(t.id).style.display=t.display},t.clear=function(){U.loop(this.available,function(t){var e=document.getElementById(t.id);e.style.display="none"})},window.State=t}(),function(){"use strict";var t={};t.reload=function(){window.location.reload()},t.loop=function(t,e){for(var a=t.length-1;a>=0;a--)e(t[a])},window.U=t}();
//# sourceMappingURL=maps/js.js.map
