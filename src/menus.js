import options from './options.js'

var menus = {}

function callBack (obj) {
  if (typeof obj.price === 'number') {
    menus[obj.value] = {
      value: obj.value,
      label: obj.label,
      price: obj.price
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
