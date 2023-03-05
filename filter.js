import * as PIXI from 'pixi.js';
import { BoxBlurFilter } from './boxblur.js';
import { EdgeFilter } from './edge.js';
import { GrayscaleFilter } from './grayscale.js';
import { MosaicFilter } from './mosaic.js';

// 重ねる色を指定
const color = 0x909000;

// 絵の縦横サイズ
const imgSize = 260;

const app = new PIXI.Application({ antialias: true, width: imgSize * 3, height: imgSize * 2 });

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

// Original
bg1.addChild(new PIXI.Text('Original', style));

// 内蔵ぼかしフィルタ（Gaussian Blur）
bg2.filters = [new PIXI.BlurFilter(2)];
bg2.addChild(new PIXI.Text('Gaussian Blur', style));

// boxblur.js によるぼかしフィルタ（Box Blur）
bg3.filters = [new BoxBlurFilter()];
bg3.addChild(new PIXI.Text('Box Blur(5x5)', style));

// edge.js によるエッジ検出フィルタ（Edge）
bg4.filters = [new EdgeFilter()];
bg4.addChild(new PIXI.Text('Edge', style));



/**
 * 基本課題
 */ 
// カスタムフィルタを適用
bg5.filters = [new GrayscaleFilter];
bg5.addChild(new PIXI.Text('Grayscale（基本課題）', style));

bg6.filters = [new MosaicFilter];
bg6.addChild(new PIXI.Text('モザイク（発展課題）', style));
