// 虚拟DOM元素的类
class Element{
  constructor(type, props, children){
    this.type = type;
    this.props = props;
    this.children = children;
  }
}
function createElement(type, props, children){
  return new Element(type, props, children);
}
function setAttr(node, key, value){
  // eslint-disable-next-line default-case
  switch (key){
    case 'value':
      if(node.tagName.toUpperCase() === 'INPUT' || node.tagName.toUpperCase() === 'TEXTAREA'){
        node.value = value;
      }else{
        node.setAttribute(key, value);
      }
      break;
    case 'style':
      node.style.cssText = value;
      break;
    default:
      node.setAttribute(key, value);
      break;
  }
}
function render(eleObj){
  let el = document.createElement(eleObj.type);
  for(let key in eleObj.props){
    // 设置属性的方法
    setAttr(el, key, eleObj.props[key])
  }
  eleObj.children.forEach(child => {
    child = (child instanceof Element)?render(child):document.createTextNode(child);
    el.appendChild(child);
  })
  return el;
}
function renderDom(el, target){
  target.appendChild(el);
}
export {createElement, render, Element, renderDom, setAttr}