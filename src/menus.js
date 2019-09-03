import options from './options.js'

var menus = {}

function callBack (obj) {
  if (typeof parseFloat(obj.price) === 'number' && !isNaN(parseFloat(obj.price))) {
    menus[obj.value] = {
      value: obj.value,
      label: obj.label,
      price: obj.price
    }
  }
  if (obj.serializable) {
    menus[obj.value] = {
      value: obj.value,
      label: obj.label,
      serializable: obj.serializable
    }
  }
  if (obj.children) {
    obj.children.forEach(item => callBack(item))
  }
}

options.forEach(function (item) {
  callBack(item)
})

export default menus
