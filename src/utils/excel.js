import XLSX from 'xlsx'
import xlStye from 'teenet-xlsx-style'
// 官方例子 进行修改并进行自定义
const _border = function(range, ws) {
  const arr = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
  ]
  if (range) {
    range.forEach((item) => {
      const startColNumber = Number(item.s.r)
      const endColNumber = Number(item.e.r)
      const startRowNumber = Number(item.s.c)
      const endRowNumber = Number(item.e.c)
      const test = ws[arr[startRowNumber] + (startColNumber + 1)]
      for (let col = startColNumber; col <= endColNumber; col++) {
        for (let row = startRowNumber; row <= endRowNumber; row++) {
          ws[arr[row] + (col + 1)] = test
        }
      }
    })
  }
  return ws
}

const _blob = function(sheet, sheetName) {
  sheetName = sheetName || 'sheet1'
  var workbook = {
    SheetNames: [sheetName],
    Sheets: {}
  }
  workbook.Sheets[sheetName] = sheet // 生成excel的配置项

  var wopts = {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary'
  }
  var wbout = xlStye.write(workbook, wopts)
  var blob = new Blob([s2ab(wbout)], {
    type: 'application/octet-stream'
  }) // 字符串转ArrayBuffer
  function s2ab(s) {
    var buf = new ArrayBuffer(s.length)
    var view = new Uint8Array(buf)
    // eslint-disable-next-line eqeqeq
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
    return buf
  }
  return blob
}

const _down = function(url, saveName) {
  if (typeof url === 'object' && url instanceof Blob) {
    url = URL.createObjectURL(url) // 创建blob地址
  }
  var aLink = document.createElement('a')
  aLink.href = url
  aLink.download = saveName || ''
  var event
  if (window.MouseEvent) event = new MouseEvent('click')
  else {
    event = document.createEvent('MouseEvents')
    event.initMouseEvent(
      'click',
      true,
      false,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    )
  }
  aLink.dispatchEvent(event)
}

export default function excel(id, rowLength = 0, echarts = true) {
  // 遍历参数
  [...arguments].forEach((item) => {
    if (item === false) {
      echarts = false
    }
  })
  if (!id) {
    alert('必须提供Table的ID, 你懂我意思吗^_^')
    return false
  }
  var xlsxParam = { raw: true } // 这个保证表格只进行解析, 不做运算
  var wb = XLSX.utils.table_to_sheet(
    document.querySelector('#' + id),
    xlsxParam
  )

  // 这个东西是当表格有合并的时候才会存在, 并不能作为判断有无数据的标准
  // wb['!merges']
  console.log(wb)
  for (var i = 0; i < 11; i++) {
    wb['!cols'][i] = { wpx: 130 }
  }
  // 循环每个单元格的样式
  const lastKey = []
  for (const key in wb) {
    if (key.indexOf('!') === -1 && wb[key].v) {
      lastKey.push(key)
      wb[key].s = {
        font: {
          sz: 12,
          bold: false,
          color: {
            rgb: '000000'
          }
        },
        alignment: {
          horizontal: 'center',
          vertical: 'center',
          wrap_text: true
        },
        border: {
          top: {
            style: 'medium',
            color: {
              rgb: echarts ? 'cccccc' : '000000'
            }
          },
          bottom: {
            style: 'medium',
            color: {
              rgb: echarts ? 'cccccc' : '000000'
            }
          },
          left: {
            style: 'medium',
            color: {
              rgb: echarts ? 'cccccc' : '000000'
            }
          },
          right: {
            style: 'medium',
            color: {
              rgb: echarts ? 'cccccc' : '000000'
            }
          }
        },
        fill: {
          bgColor: { rgb: 'C0504D' }
        }
      }
    }
  }

  // 备注
  wb[lastKey.slice(-1)].s = {
    alignment: {
      horizontal: 'left',
      vertical: 'left',
      wrap_text: true
    }
  }

  // 判断是否是echarts调用, 更改样式
  if (echarts) {
    // reg
    // 缺点: 表头不能确定, 通过参数解决
    const row = []
    for (let i = 1; i <= rowLength; i++) {
      row.push(i)
    }
    // eslint-disable-next-line no-eval
    const reg = eval('/[' + row.join('') + ']/')
    // th css
    Object.keys(wb).forEach((item) => {
      if (reg.test(item)) {
        wb[item].s = {
          font: {
            name: '宋体',
            sz: 12,
            color: { rgb: '000000' },
            bold: true,
            italic: false,
            underline: false,
            height: 20
          },
          alignment: {
            horizontal: 'center',
            vertical: 'center'
          },
          fill: {
            fgColor: { rgb: '3db3ff' }
          },
          border: {
            top: {
              style: 'medium',
              color: {
                rgb: 'cccccc'
              }
            },
            bottom: {
              style: 'medium',
              color: {
                rgb: 'cccccc'
              }
            },
            left: {
              style: 'medium',
              color: {
                rgb: 'cccccc'
              }
            },
            right: {
              style: 'medium',
              color: {
                rgb: 'cccccc'
              }
            }
          }
        }
      }
    })
  }

  var data = _border(wb['!merges'], wb) // 合并项添加边框
  var filedata = _blob(data) // 创建blob文件
  _down(filedata, new Date() + '-xxx报表.xlsx') // 下载文件
}
