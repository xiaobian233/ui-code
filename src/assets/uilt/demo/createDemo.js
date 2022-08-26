const fs = require('fs')
const path = require('path')
let srr = []
for (let i = 0; i < 15; i++) {
    srr.push({
        name: '虚拟-' + 'i',
        index: i,
        path: i
    })
}

fs.writeFile(path.join(__dirname, 'demo11.json'), JSON.stringify(srr), (e)=>{
    console.error(e);
})