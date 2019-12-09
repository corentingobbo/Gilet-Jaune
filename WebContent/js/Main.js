

var game = new Phaser.Game(1200, 900, Phaser.CANVAS, "", this, false, true, {"arcade":true});
//var can2 = new Phaser.Game(360,810, Phaser.CANVAS, "", this, false, true, {"arcade":true});
function gameOver(score){
    var nom = prompt("Quel est votre nom ?");

    if (nom!=null) {
        document.cookie = nom+"="+score;
    }
    window.location.reload()

}
function init() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = false;
    game.scale.pageAlignVertically = true;

}
function preload() {
	game.load.spritesheet('dix', 'assets/gfx/+10.png',90,90,9);

	game.load.spritesheet('bot','assets/gfx/character1.png',188,136,10);

	game.load.image('route', 'assets/gfx/route.jpg');
	game.load.image('out', 'assets/gfx/out-of-bounds.jpg');
    game.load.image('speech', 'assets/gfx/bulle.png');

	game.load.image('bus','assets/gfx/bus-png-top-view.png');
	game.load.image('voiture1','assets/gfx/car.png');
	game.load.image('voiture2','assets/gfx/car2.png');
	game.load.image('voiture3','assets/gfx/car3.png');
	game.load.image('voiture4','assets/gfx/car4.png');

	game.load.spritesheet('Sylvain','assets/gfx/Sylvain.png',360,810,3);
}

function create() {
	game.add.tileSprite(0, 0, 1200, 900, 'route');

    this.speed=20;
    this.speedSylvain=5;
    this.delay=3500;
    this.SylvainScale=0.25;

    cars=game.add.group();
    cars.enableBody = true;
    cars.physicsBodyType = Phaser.Physics.ARCADE;

    Sylvain = game.add.sprite(20,700,'Sylvain');
    SylvainSpeech = game.add.sprite(900,120,'Sylvain');
    Speech = game.add.sprite(600, 50, 'speech');
    this.Sylvain.scale.setTo(SylvainScale,SylvainScale);
    this.Sylvain.animations.add('anim',[0,1,2,3],speedSylvain,true);
    this.Sylvain.play('anim');
    this.SylvainSpeech.animations.add('anim',[0,1,2,3],speedSylvain,true);
    this.SylvainSpeech.play('anim');

    out=game.add.sprite(0,900,'out');

    robot = game.add.sprite(game.world.centerX, game.world.centerY, 'bot');
    this.robot.anchor.setTo(0.5, 0.5);
    this.robot.scale.setTo(0.6, 0.6);
    this.robot.animations.add('run',[1,2,3,4,5,6,7,8,9,10],speed,true);
    this.robot.animations.add('idle',[0],speed,true);
    this.robot.play('idle');

    game.physics.enable(robot, Phaser.Physics.ARCADE);
    game.physics.enable(out, Phaser.Physics.ARCADE);
    game.physics.setBoundsToWorld();
    robot.body.collideWorldBounds=true;

    this.robot.body.setSize(110,110,30,30);
    this.Sylvain.alpha=0;
    game.time.events.add(6000, function() {﻿game.add.tween(Sylvain).to({alpha: 1}, 3000, Phaser.Easing.Linear.None, true);}, this);
    game.time.events.add(2000, function() {﻿game.add.tween(SylvainSpeech).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true);}, this);
    game.time.events.add(2000, function() {﻿game.add.tween(Speech).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true);}, this);
}

modifs = {
	1: {angle:-90, speedX:-1, speedY:0 },
	2: {angle:180, speedX:0, speedY:1},
	3: {angle:-135, speedX:-1, speedY:1},
	4: {angle:90, speedX:1, speedY:0},
	6: {angle:135, speedX:1, speedY:1},
	8: {angle:0, speedX:0, speedY:-1},
	9: {angle:-45, speedX:-1, speedY:-1},
	12: {angle:45, speedX:1, speedY:-1}

}

var routes = [125,360,610,855,1090];
var hauteur = [-250,-400,-500,-550,-600];
var voitures = ['voiture1','voiture2','voiture3','voiture4','bus'];
var occupe=[false,false,false,false,false];
var compteur = 0;
var d = [0,0,0,0,0];
var score = 0;

function randomcoords(){
	var min=0;
	var max=5;
	var random = Math.floor(Math.random() * (+max - +min) + +min);
	if(!(occupe[random])){
		occupe[random]=true;
		return random;
	}
}

function random(){
	var min=0;
	var max=5;
	return Math.floor(Math.random() * (+max - +min) + +min);
}

function voiture(){
	for(i=0;i<1;i++){
		j=randomcoords();
		k=random();
		v=random();

		if(j!=null){
			if(occupe[j]==true){

				obj=this.game.add.sprite(routes[j],hauteur[k],voitures[v]);
				this.obj.anchor.setTo(0.5,0.5);
				if(v==4){
					this.obj.scale.setTo(0.6,0.6);
				}else{
					this.obj.scale.setTo(0.4,0.4);
				}
			    this.cars.add(obj);
			    this.game.add.tween(this.obj).to({y:900+this.obj.height},delay,Phaser.Easing.Linear.None,true,500,0);
			}
		}
	}
}

function collisionHard(o){
	gameOver(score);
}


function updateD(){
	for(i=0;i<5;i++){
		if(occupe[i]==true){
			d[i]+=1;
		}
		if(d[i]>=175){
			d[i]=0;
			occupe[i]=false;
			score+=10;
            $('.scoreSpan').html(score);
			scr(routes[i]);
		}
	}
}

function scr(col){
	dix = game.add.sprite(col-40,800,'dix');
	this.dix.animations.add('piece',[0,1,2,3,4,5,6,7,8,9],8,true);
	this.dix.play('piece');
	this.game.add.tween(this.dix).to({y:550+this.dix.height,alpha:0},1000,Phaser.Easing.Linear.None,true,500,0);
}

function update() {
	updateD();
	game.physics.arcade.collide(robot, cars, collisionHard);
	//game.physics.arcade.collide(cars,out, outOfBounds);

	//console.log("update");
	if (compteur==50){
		voiture();
		compteur=0;
	}
	compteur+=1%100;


	speedDIR= 8;
	dir = game.input.keyboard.isDown(Phaser.Keyboard.LEFT) +
	game.input.keyboard.isDown(Phaser.Keyboard.DOWN) *2 +
	game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) *4 +
	game.input.keyboard.isDown(Phaser.Keyboard.UP) *8;
	if (modifs[dir]){

	robot.angle = modifs[dir].angle;
	robot.x+=modifs[dir].speedX*speedDIR;
	robot.y+=modifs[dir].speedY*speedDIR;
	}
	if (dir!=0){
		this.robot.play('run');
	}else{
		this.robot.play('idle');
	}
}

function render() {
    //game.debug.spriteInfo(robot, 20, 32);
    //game.debug.body(robot);
	//game.debug.body(cars);

}
