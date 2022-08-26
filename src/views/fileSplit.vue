<template>
    <div>
        <w-upload v-model:fileList="files" :beforeUpload="(file, list) => beforeUpload(file, list)">
            <w-button>Upload files and generate files</w-button>
        </w-upload>
    </div>
</template>

<script setup>
import { nextTick, reactive, ref, defineProps } from 'vue';
const beforeUpload = (file) => {
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
    alert('文件切片已生成: '+ index +'片')
    console.error(arr);
}
</script>

<style>
</style>