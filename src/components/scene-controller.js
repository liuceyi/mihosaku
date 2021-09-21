// require('./scene.js');
class SceneController {
  constructor(){           //构造函数，通过它可以定义和设置类的一些属性
    this.sceneList = [];
    this._sceneList = [sceneHome];
    this.sceneOnShow = null;
    // this._sceneList.append(sceneHome);
  }

  push(sceneName){
    var sceneObj = this.find(sceneName);
    this.sceneList.push(sceneObj);
    this.sceneOnShow = sceneObj;
  }

  back(){
    this.sceneOnShow = this.sceneList.pop();
  }

  show(){
    if (this.sceneOnShow != null) {
      this.sceneOnShow.show();
    }
		
  }

  find(sceneName){
    for(var i = 0; i < this._sceneList.length; i++) {
      if (sceneName == this._sceneList[i].name) {
        return this._sceneList[i]
      }
    }
  }

}

// Home Page
var sceneHome = new Scene();
sceneHome.name = 'Home';
sceneHome.show = function() {
  background(20);
  textAlign(CENTER);
  textSize(40);
  fill(color('#919191'));
  text("MihoSaku", width/2, height/2);
  print('123')
}

var sc = new SceneController();
// module.exports = sc;