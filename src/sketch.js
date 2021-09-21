// require('./components/scene-controller.js');
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(200);
}

function draw() {
  resizeCanvas(windowWidth, windowHeight);
  sc.show();

  // background(230);
  // textAlign(CENTER);
  // textSize(40);
  // fill(color('#919191'));
  // text("MihoSaku", width/2, height/2);
}

function keyPressed(){        //定义一个按键的事件，如果按下键盘的键，就调用此函数
  if(key == ' '){            //如果按下的键是空格键
    sc.push('Home');          //通过调用恐龙类的跳跃方法，使恐龙跳跃起来
  }
}