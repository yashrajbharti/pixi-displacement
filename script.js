var width = window.offsetWidth;
var height = window.offsetHeight;
var playground = document.getElementById('px-render');

var canvas;

var ratio = 150 / 830;

var count = 0;
var raf;


var renderer = PIXI.autoDetectRenderer(width, height, {transparent:true});
renderer.autoResize = true;
var tp, preview;
var displacementSprite,
	displacementFilter,
	stage;

function setScene(url){
			playground.appendChild(renderer.view);

	        stage = new PIXI.Container();

	        tp = PIXI.Texture.fromImage(url);
	        preview = new PIXI.Sprite(tp);

	        preview.anchor.x = 0;

	        displacementSprite = PIXI.Sprite.fromImage('https://res.cloudinary.com/dvxikybyi/image/upload/v1486634113/2yYayZk_vqsyzx.png');
	        displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

	       	displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);

	        displacementSprite.scale.y = 0.6;
	        displacementSprite.scale.x = 0.6;


	        stage.addChild(displacementSprite);

	        stage.addChild(preview);

			animate();
}

function removeScene(){
	cancelAnimationFrame(raf);
	stage.removeChildren();
	stage.destroy(true);
	playground.removeChild(canvas);
}


function animate() {
    raf = requestAnimationFrame(animate);

    displacementSprite.x = count*10;
	displacementSprite.y = count*10;

	count += 0.05;

    stage.filters = [displacementFilter];

    renderer.render(stage);

    canvas = playground.querySelector('canvas');
}

setScene('https://unsplash.it/800/?random');
