function component() {
  let element = document.createElement("div");
  
  const a = new A('我是一个类!!!!!!!!!!');
  element.innerHTML = "hello my webpack environment" + a.info;
  return element;
}

class A {
  constructor(params) {
    this.info = params;
  }
}

console.log(new A("我是一个类!!!!!!!!!!"));

document.body.appendChild(component());
