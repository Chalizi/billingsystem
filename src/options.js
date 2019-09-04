export default [
  {
    value: 'yinpin',
    label: '饮品',
    children: [
      {
        value: 'naicha',
        label: '奶茶',
        children: [
          {
            value: 'bobanaicha',
            label: '波霸奶茶',
            price: '10'
          },
          {
            value: 'jinjuningmeng',
            label: '金桔柠檬',
            price: '10'
          }
        ]
      }
    ]
  },
  {
    value: 'zhushi',
    label: '主食',
    children: [
      {
        value: 'gaijiaofan',
        label: '盖浇饭',
        children: [
          {
            value: 'doujiaoqiezi',
            label: '豆角茄子',
            price: '12'
          },
          {
            value: 'wanzaiduorou',
            label: '万载剁肉',
            price: '15'
          },
          {
            value: 'xiaochaojidan',
            label: '小炒鸡蛋',
            price: '12'
          }
        ]
      },
      {
        value: 'dangu',
        label: '排骨',
        children: [
          {
            value: 'malachizhong',
            label: '麻辣翅中',
            price: '11'
          },
          {
            value: 'xianglapaigu',
            label: '香辣排骨',
            price: '15'
          },
          {
            value: 'jueweiyabo',
            label: '绝味鸭脖',
            price: '8'
          }
        ]
      },
      {
        value: 'shaokao',
        label: '烧烤',
        children: [
          {
            value: 'kaorouchaun',
            label: '烤肉串',
            price: '5'
          }
        ]
      }
    ]
  },
  {
    value: 'baihuo',
    label: '百货',
    children: [
      {
        value: 'dahuoji',
        label: '打火机',
        price: '2'
      },
      {
        value: 'zhijin',
        label: '纸巾',
        price: '2'
      },
      {
        value: 'puke',
        label: '扑克',
        price: '5'
      }
    ]
  },
  {
    value: 'chongzhi',
    label: '充值',
    serializable: true
  },
  {
    value: 'taoxian',
    label: '取现',
    serializable: true
  }
]

