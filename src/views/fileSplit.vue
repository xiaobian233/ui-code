<template>
    <div>
        <w-upload v-model:fileList="files" :beforeUpload="(file, list) => beforeUpload(file, list)">
            <w-button>Upload files and generate files</w-button>
            <p style="color:red">单个分片大小:{{  data.size  }} 字节约等于1MB</p>
            <p style="color:red">当前文件大小: {{  data.file.size || 0  }} 字节</p>
        </w-upload>
    </div>
</template>

<script setup>
import { nextTick, reactive, ref, defineProps } from 'vue';
const data = reactive({
    size: 1020 * 1020,
    file: {}
})
const beforeUpload = (file) => {
    data.file = file
    let arr = []
    let count = 0
    let size = 1020 * 1020
    let index = 0
    while (count < file.size) {
        index++
        arr.push({
            index,
            size: file.slice(count, count + size)
        })
        count += size
    }
    alert('文件切片已生成: ' + index + '片')
    console.error(arr);
}
</script>

<style>
</style>