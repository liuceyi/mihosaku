class Scene {
  constructor(){           //构造函数，通过它可以定义和设置类的一些属性
    this.name = '';
    this.id = -1;
  }

  create(){
    this.do()
  }

  show(){
    // Overwrite here
  }

  destroy(){
		// If needed
  }

}

// module.exports = Scene;

// export default {sceneHome};