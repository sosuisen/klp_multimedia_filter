// 重ねる色を指定
const color = 0x909000;

// 絵の縦横サイズ
const imgSize = 260;

let app = new PIXI.Application({ antialias: true, width: imgSize * 3, height: imgSize * 2 });

document.body.appendChild(app.view);

const kyoco = PIXI.Texture.from('kyocotan.png');
const bg1 = PIXI.Sprite.from(kyoco);
const bg2 = PIXI.Sprite.from(kyoco);
bg2.x = imgSize;
const bg3 = PIXI.Sprite.from(kyoco);
bg3.x = imgSize * 2;
const bg4 = PIXI.Sprite.from(kyoco);
bg4.y = imgSize;
const bg5 = PIXI.Sprite.from(kyoco);
bg5.x = imgSize;
bg5.y = imgSize;
const bg6 = PIXI.Sprite.from(kyoco);
bg6.x = imgSize * 2;
bg6.y = imgSize;

app.stage.addChild(bg1);
app.stage.addChild(bg2);
app.stage.addChild(bg3);
app.stage.addChild(bg4);
app.stage.addChild(bg5);
app.stage.addChild(bg6);

const style = new PIXI.TextStyle({
  stroke: '#ffffff',
  strokeThickness: 3,
});

// 内蔵ぼかしフィルタ（Gaussian Blur）
bg1.filters = [new PIXI.filters.BlurFilter(1)];
bg1.addChild(new PIXI.Text('Normal（Alpha 0.5）', style));

// boxblur.js によるぼかしフィルタ（Box Blur）
bg2.filters = [new PIXI.filters.BoxBlurFilter()];
bg2.addChild(new PIXI.Text('Multiply', style));
console.log(kyoco.width);
// 
bg3.addChild(new PIXI.Text('Add', style));

// 
bg4.addChild(new PIXI.Text('Screen', style));

/**
 * 基本課題
 */ 
// カスタムフィルタを適用
//const myFilter = new PIXI.filters.MyFilter1());
//bg5.filters = [myFilter];
bg5.addChild(new PIXI.Text('Grayscale（基本課題）', style));

//const myFilter2 = new PIXI.filters.MyFilter2();
//bg6.filters = [myFilter];
bg6.addChild(new PIXI.Text('モザイク（発展課題）', style));
