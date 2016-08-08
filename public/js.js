!function(){"use strict";var t=function(t,e){return!!i(t,e)},e=function(t,e){return n(t,e)},i=function(t,e){for(var i=t.length-1;i>=0;i--){var n=t[i].y+t[i].r,o=e.y-e.r;if(n>o)return!0}return!1},n=function(t,e){if(!t.length)return!1;if(!e.length)return!1;for(var i=!1,n=t.length-1;n>=0;n--)if(i=o(t[n],n,e))return i;return!1},o=function(t,e,i){for(var n=!1,o=i.length-1;o>=0;o--)if(n=s(t,e,i[o],o))return n;return!1},s=function(t,e,i,n){var o={};return o.top=t.y-t.r,o.bottom=t.y+t.r,o.left=t.x-t.r,o.right=t.x+t.r,!(i.y<o.top)&&(!(i.y>o.bottom)&&(!(i.x<o.left)&&(!(i.x>o.right)&&{enemy:e,shot:n})))};window.Lose=t,window.Hit=e}(),function(){"use strict";var t={enemy:{rowN:5,colN:10,moveMultp:.008,rowWmultp:.7,shiftWmultp:.3,enemies:[],val:{rowW:0,shiftW:0,shiftH:0,enemyR:0,shiftV:0,xDelta:0,yDelta:0,movingRight:!0,movingDown:!1}},shot:[],score:{initEnemies:0,enemies:0,shots:0,hits:0,accuracy:0}};window.Data=t}(),function(){"use strict";var t=function(){this.data={rowN:5,colN:10,moveMultp:.008,rowWmultp:.7,shiftWmultp:.3,enemies:[],rowW:0,shiftW:0,shiftH:0,enemyR:0,shiftV:0,xDelta:0,yDelta:0,movingRight:!0,movingDown:!1}};t.prototype.init=function(t,e){this.data.rowW=t*this.data.rowWmultp,this.data.shiftW=t*this.data.shiftWmultp,this.data.shiftV=this.data.moveMultp*t*e;var i=2*this.data.colN-1;this.data.enemyR=this.data.rowW/i/2,this.data.shiftH=this.data.enemyR;for(var n=this.data.enemyR,o=this.data.enemyR,s=this.data.enemyR,a=n,h=o,r=this.data.rowN-1;r>=0;r--){for(var c=this.data.colN-1;c>=0;c--)this.initEachEnemy(n,o,s),n+=4*s;n=a,o=h+4*s*r}},t.prototype.initEachEnemy=function(t,e,i){var n={x:t,y:e,r:i,state:"active",shift:this.data.shiftV};this.data.enemies.push(n)},t.prototype.animate=function(){this.movement(),this.processState()},t.prototype.movement=function(){return!!this.data.enemies[0]&&void(this.data=this.data.movingDown?e(this.data):i(this.data))};var e=function(t){return t=n(t),t.yDelta>=t.shiftH&&(t=o(t)),t.enemies=t.enemies.map(s),t},i=function(t){return t=a(t),t.xDelta>=t.shiftW&&(t=h(t)),t.enemies=t.movingRight?t.enemies.map(r):t.enemies.map(c),t},n=function(t){return t.yDelta=t.yDelta+t.shiftV,t},o=function(t){return t.movingDown=!1,t.yDelta=0,t},s=function(t){return t.y=t.y+t.shift,t},a=function(t){return t.xDelta=t.xDelta+t.shiftV,t},h=function(t){return t.movingRight=!t.movingRight,t.xDelta=0,t.movingDown=!0,t},r=function(t){return t.x=t.x+t.shift,t},c=function(t){return t.x=t.x-t.shift,t};t.prototype.processState=function(){for(var t=this.data.enemies.length-1;t>=0;t--)y(this.data.enemies[t],t,this.data.enemies)};var y=function(t,e,i){"hit"==t.state&&i.splice(e,1)};t.prototype.hit=function(t){this.data.enemies[t].state="hit"},window.Enemy=t}(),function(){"use strict";var t={speed:.3,isPlaying:!1,z:0,top:0,left:0,el:{game:document.getElementById("shooty-shoot"),score:document.getElementById("score"),canvas:document.getElementById("shooty-shoot-canvas"),home:document.getElementById("home"),lose:document.getElementById("lose"),win:document.getElementById("win"),homeH1:document.querySelector("#home h1"),homePlayBtn:document.getElementById("home-play-btn")},els:{playBtns:document.getElementsByClassName("play-btn"),shots:document.getElementsByClassName("shots"),hits:document.getElementsByClassName("hits"),accuracy:document.getElementsByClassName("accuracy"),keyLeft:document.getElementsByClassName("key-left"),keyRight:document.getElementsByClassName("key-right"),keyShoot:document.getElementsByClassName("key-shoot")}};t.init=function(){var e=new Promise(function(t,e){State.set("shooty-shoot"),"shooty-shoot"==State.current?t("Success!"):e("Failure!")});e.then(t.setZ).then(Home.removeListeners).then(Enemy.init).then(Shooter.init).then(Shot.init).then(function(){t.isPlaying=!0}).then(function(){window.requestAnimationFrame(t.drawCanvas)}).then(Score.init)},t.setZ=function(){t.z=t.el.canvas.offsetWidth},t.drawCanvas=function(){var e=t.el.canvas.getContext("2d");e.canvas.width=t.z,e.canvas.height=t.z,e.clearRect(0,0,t.z,t.z),Collision.check(),Enemy.draw(e),Shooter.draw(e),Shot.draw(e),t.isPlaying&&window.requestAnimationFrame(t.drawCanvas)},t.play=function(){t.init()},t.win=function(){t.isPlaying=!1,State.set("win")},t.lose=function(){t.isPlaying=!1,State.set("lose")},window.G=t}(),function(){"use strict";var t={addListeners:function(){window.addEventListener("keydown",t.keyDown),window.addEventListener("keyup",t.keyUp),G.el.homePlayBtn.addEventListener("mouseover",t.playHover),G.el.homePlayBtn.addEventListener("mouseout",t.playUnHover)},removeListeners:function(){window.removeEventListener("keydown",t.keyDown),window.removeEventListener("keyup",t.keyUp),G.el.homePlayBtn.removeEventListener("mouseover",t.playHover),G.el.homePlayBtn.removeEventListener("mouseout",t.playUnHover)}};t.keyDown=function(e){37==e.keyCode&&t.keyInstructions("press",G.els.keyLeft),39==e.keyCode&&t.keyInstructions("press",G.els.keyRight),17!=e.keyCode&&32!=e.keyCode||t.keyInstructions("press",G.els.keyShoot)},t.keyUp=function(e){37==e.keyCode&&t.keyInstructions("release",G.els.keyLeft),39==e.keyCode&&t.keyInstructions("release",G.els.keyRight),17!=e.keyCode&&32!=e.keyCode||t.keyInstructions("release",G.els.keyShoot)},t.keyInstructions=function(t,e){"press"==t?_(e).forEach(function(t){t.classList.add("highlight")}):_(e).forEach(function(t){t.classList.remove("highlight")})},t.playHover=function(){G.el.homeH1.classList.add("home-h1-highlight")},t.playUnHover=function(){G.el.homeH1.classList.remove("home-h1-highlight")},window.Home=t}(),function(){"use strict";var t=function(){e(),State.set("home"),document.removeEventListener("DOMContentLoaded",t)};document.addEventListener("DOMContentLoaded",t);var e=function(){for(var t=document.getElementsByClassName("play-btn"),e=t.length-1;e>=0;e--)t[e].addEventListener("click",ShootyShoot.play)}}(),function(){"use strict";var t={listen:function(){window.addEventListener("keydown",t.keyDown),window.addEventListener("keyup",t.keyUp)}};t.keyDown=function(t){37==t.keyCode&&ShootyShoot.keyLeft(!0),39==t.keyCode&&ShootyShoot.keyRight(!0),17!=t.keyCode&&32!=t.keyCode||ShootyShoot.keyShoot(!0)},t.keyUp=function(t){37==t.keyCode&&ShootyShoot.keyLeft(!1),39==t.keyCode&&ShootyShoot.keyRight(!1),17!=t.keyCode&&32!=t.keyCode||ShootyShoot.keyShoot(!1)},window.key=t}(),function(){"use strict";var t=function(t,e){this.data={initEnemies:t,enemies:t,shots:0,hits:0,accuracy:0},this.els=e};t.prototype.draw=function(){i(this.els.shots,this.data.shots),i(this.els.hits,this.data.hits),i(this.els.accuracy,this.setGetAccuracy())},t.prototype.shot=function(){return this.data.shots++,this.data.shots},t.prototype.hit=function(){return this.data.hits++,this.data.enemies--,this.data.hits},t.prototype.setGetAccuracy=function(){return this.data.shots?(this.data.accuracy=e(this.data.hits,this.data.shots),this.data.accuracy):this.data.accuracy};var e=function(t,e){var i=t/e;return i=100*i,i=Math.round(i)},i=function(t,e){for(var i=t.length-1;i>=0;i--)t[i].textContent=e;return e};window.Score=t}(),function(){"use strict";var t=function(){this.v={x:null,y:null,r:null,defaultOpacity:.5,shootOpacity:.7,currentOpacity:null},this.wMultp=.05,this.moveMultp=.01,this.isMovingLeft=!1,this.isMovingRight=!1,this.isShooting=!1,this.delayShot=!1};t.prototype.init=function(t){this.v.r=t*this.wMultp,this.v.x=t/2,this.v.y=t-this.v.r-1,this.v.currentOpacity=this.v.defaultOpacity},t.prototype.animate=function(t){var e=this.isLeftRightStall();this.isMovingLeft&&!e&&this.moveLeft(t),this.isMovingRight&&!e&&this.moveRight(t),this.fadingOpacity()},t.prototype.moveLeft=function(t){var e=this.v.x,i=this.v.r,n=this.moveMultp,o=e-t*n;o-i>=1&&(this.v.x=o)},t.prototype.moveRight=function(t){var e=this.v.x,i=this.v.r,n=this.moveMultp,o=e+t*n;o+i<=t-1&&(this.v.x=o)},t.prototype.isLeftRightStall=function(){return this.isMovingLeft&&this.isMovingRight},t.prototype.setShotOpacity=function(){this.v.currentOpacity=this.v.shootOpacity},t.prototype.fadingOpacity=function(){this.v.currentOpacity>this.v.defaultOpacity&&(this.v.currentOpacity=this.v.currentOpacity-.01)},window.Shooter=t}(),function(){"use strict";var t=function(){this.speed=.5,this.isPlaying=!1,this.z=0,this.el={game:document.getElementById("shooty-shoot"),score:document.getElementById("score"),canvas:document.getElementById("shooty-shoot-canvas"),home:document.getElementById("home"),lose:document.getElementById("lose"),win:document.getElementById("win"),homeH1:document.querySelector("#home h1"),homePlayBtn:document.getElementById("home-play-btn")},this.els={playBtns:document.getElementsByClassName("play-btn"),shots:document.getElementsByClassName("shots"),hits:document.getElementsByClassName("hits"),accuracy:document.getElementsByClassName("accuracy"),keyLeft:document.getElementsByClassName("key-left"),keyRight:document.getElementsByClassName("key-right"),keyShoot:document.getElementsByClassName("key-shoot")}};t.prototype.init=function(){this.z=this.el.canvas.offsetWidth},window.shshData=t}(),function(){"use strict";var t={data:{},shooter:{},shot:{},enemy:{}};t.play=function(){State.set("shooty-shoot"),t.load()},t.load=function(){this.data=new shshData,this.data.init(),key.listen(),this.shooter=new Shooter,this.shooter.init(this.data.z),this.enemy=new Enemy,this.enemy.init(this.data.z,this.data.speed),this.shot=new Shot,this.shot.init(this.data.z),this.score=new Score(this.enemy.data.enemies.length,this.data.els),this.drawScoreboard(),this.data.isPlaying=!0,this.draw()},t.draw=function(){var t=this.data.el.canvas.getContext("2d");t.canvas.width=this.data.z,t.canvas.height=this.data.z,t.clearRect(0,0,this.data.z,this.data.z),view.shooter(this.shooter.v,t),view.shots(this.shot.data,t),view.enemies(this.enemy.data.enemies,t),this.animate()},t.drawFromRequestAnimationFrame=function(){t.draw()},t.animate=function(){this.enemy.data.enemies[0]||this.win(),this.shooter.animate(this.data.z),this.shooter.isShooting&&this.shoot(),this.shot.animate(),this.enemy.animate();var t=Lose(this.enemy.data.enemies,this.shooter.v);t&&this.lose();var e=Hit(this.enemy.data.enemies,this.shot.data);e&&this.hit(e),this.data.isPlaying&&window.requestAnimationFrame(this.drawFromRequestAnimationFrame)},t.keyLeft=function(t){this.shooter.isMovingLeft=t},t.keyRight=function(t){this.shooter.isMovingRight=t},t.keyShoot=function(t){this.shooter.isShooting=t},t.shoot=function(){return!this.shooter.delayShot&&(this.engageDelay(),this.shooter.setShotOpacity(),this.shot.launch(this.shooter.v),void this.score.shot())},t.engageDelay=function(){this.shooter.delayShot=!0,window.setTimeout(this.releaseDelay,300)},t.releaseDelay=function(){t.shooter.delayShot=!1},t.drawScoreboard=function(){t.score.draw(),window.setTimeout(function(){t.drawScoreboard()},500)},t.hit=function(t){this.enemy.hit(t.enemy),this.shot.hit(t.shot),this.score.hit()},t.lose=function(){this.data.isPlaying=!1,State.set("lose")},t.win=function(){this.data.isPlaying=!1,State.set("win")},window.ShootyShoot=t}(),function(){"use strict";var t=function(){this.data=[],this.accel=null};t.prototype.init=function(t){this.accel=.01*t},t.prototype.launch=function(t){var e={x:t.x,y:t.y-t.r,state:"active",accel:this.accel};this.data.push(e)},t.prototype.animate=function(){this.movement(),this.processState()},t.prototype.movement=function(){return!!this.data[0]&&(this.data=this.data.map(e),void(this.data=this.data.map(i)))};var e=function(t){return t.y=t.y-t.accel,t},i=function(t){return t.y<0&&(t.state="miss"),t};t.prototype.processState=function(){if(!this.data[0])return!1;for(var t=this.data.length-1;t>=0;t--)n(this.data[t],this.data)};var n=function(t,e){"miss"!=t.state&&"hit"!=t.state||e.splice(t,1)};t.prototype.hit=function(t){this.data[t].state="hit"},window.Shot=t}(),function(){"use strict";var t={current:"",available:[{id:"shooty-shoot",display:"flex"},{id:"home",display:"flex"},{id:"lose",display:"flex"},{id:"win",display:"flex"}]};t.set=function(t){for(var e=this.available.length-1;e>=0;e--)this.available[e].id==t&&this.apply(this.available[e])},t.apply=function(t){this.current=t.id,this.clear(),document.getElementById(t.id).style.display=t.display},t.clear=function(){for(var t=this.available.length-1;t>=0;t--)document.getElementById(this.available[t].id).style.display="none"},window.State=t}(),function(){"use strict";var t={};t.reload=function(){window.location.reload()},t.loop=function(t,e){for(var i=t.length-1;i>=0;i--)e(t[i])},window.U=t}(),function(){"use strict";var t={};t.shooter=function(t,e){e.beginPath(),e.fillStyle="rgba( 126, 192, 238, "+t.currentOpacity+" )",e.arc(t.x,t.y,t.r,0,2*Math.PI),e.fill()},t.enemies=function(t,i){for(var n=t.length-1;n>=0;n--)e(t[n],i)};var e=function(t,e){e.beginPath(),e.fillStyle="rgba( 255, 99, 71, 0.5 )",e.arc(t.x,t.y,t.r,0,2*Math.PI),e.fill()};t.shots=function(t,e){for(var n=t.length-1;n>=0;n--)i(t[n],e)};var i=function(t,e){e.beginPath(),e.fillStyle="white",e.rect(t.x,t.y,5,5),e.fill()};window.view=t}();
//# sourceMappingURL=maps/js.js.map
