import * as PIXI from 'pixi.js';
import { BoxBlurFilter } from './boxblur.js';
import { EdgeFilter } from './edge.js';
import { GrayscaleFilter } from './grayscale.js';
import { MosaicFilter } from './mosaic.js';
// import { AsciiFilter } from 'pixi-filters/ascii';

// 絵の縦横サイズ
const imgSize = 256;

const app = new PIXI.Application();
await app.init({ width: imgSize * 3, height: imgSize * 2 });

document.body.appendChild(app.canvas);

await PIXI.Assets.load('kyocotan.png');
const style = {
  stroke: { width: 3, color: 0xffffff }
};
const bg1 = PIXI.Sprite.from('kyocotan.png');
const txt1 = new PIXI.Text({ text: 'Original', style });

const bg2 = PIXI.Sprite.from('kyocotan.png');
const txt2 = new PIXI.Text({ text: 'Gaussian Blur', style });
bg2.x = txt2.x = imgSize;

const bg3 = PIXI.Sprite.from('kyocotan.png');
const txt3 = new PIXI.Text({ text: 'Box Blur(3x3)', style });
bg3.x = txt3.x = imgSize * 2;

const bg4 = PIXI.Sprite.from('kyocotan.png');
const txt4 = new PIXI.Text({ text: 'Edge', style });
bg4.y = txt4.y = imgSize;

const bg5 = PIXI.Sprite.from('kyocotan.png');
const txt5 = new PIXI.Text({ text: 'Grayscale（基本課題）', style });
bg5.x = txt5.x = imgSize;
bg5.y = txt5.y = imgSize;

const bg6 = PIXI.Sprite.from('kyocotan.png');
const txt6 = new PIXI.Text({ text: 'モザイク（発展課題）', style });
bg6.x = txt6.x = imgSize * 2;
bg6.y = txt6.y = imgSize;


const container = new PIXI.Container();
container.addChild(bg1);
container.addChild(txt1);
container.addChild(bg2);
container.addChild(txt2);
container.addChild(bg3);
container.addChild(txt3);
container.addChild(bg4);
container.addChild(txt4);
container.addChild(bg5);
container.addChild(txt5);
container.addChild(bg6);
container.addChild(txt6);
app.stage.addChild(container);


// 内蔵ぼかしフィルタ（Gaussian Blur）
bg2.filters = [new PIXI.BlurFilter({ strength: 2 })];
// bg2.filters = [new AsciiFilter({ size: 7 })];

// boxblur.js によるぼかしフィルタ（Box Blur）
bg3.filters = [new BoxBlurFilter()];

// edge.js によるエッジ検出フィルタ（Edge）
bg4.filters = [new EdgeFilter()];


/**
 * 課題
 */
// カスタムフィルタを適用
bg5.filters = [new GrayscaleFilter];


bg6.filters = [new MosaicFilter];

