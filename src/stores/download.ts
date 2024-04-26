import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDownloadStore = defineStore('download', () => {
  const download = ref("http://127.0.0.1:9090/api/static/")

  return { download }
})
