class Scene {
  constructor(){           //构造函数，通过它可以定义和设置类的一些属性
    this.name = '';
  }

  create(){
    this.do()
  }

  do() {
    // Overwrite here
  }

  destroy(){
		// If needed
  }

}