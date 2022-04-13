import BMF from "browser-md5-file"

const bmf = new BMF()


let bridge: Awaited<typeof import("../pkg/md5_generator")>
async function initBridge() {
    bridge = await import("../pkg/md5_generator")
}

function getFileMd5InBrowser(file: File) {
  return new Promise<string>((resolve, reject) => {
    bmf.md5(file, (err: Error, md5: string) => {
      err ? reject(err) : resolve(md5)
    })
  })
}

function file2U8(file: File) {
  if (!file) return null
  return new Promise<Uint8Array>(function (resolve, reject) {
    const reader = new FileReader()
    reader.onload = function () {
      resolve(new Uint8Array(reader.result as ArrayBuffer))
    }
    reader.onerror = function (err) {
      reject(err)
    }
    reader.readAsArrayBuffer(file)
  })
}

async function inputHandler(index: number) {
    const file: File = this.files?.[0]
    if (!file) return
    const now = Date.now()
    const md5s: string[] = []
    const fileList = new Array<File>(100).fill(file)
    for (const f of fileList) {
        if (index === 0) {
            if (!bridge) {
                await initBridge()
            }
            md5s.push(bridge.md5(await file2U8(f)))
        } else {
            md5s.push(await getFileMd5InBrowser(f))
        }
    }
    console.log(index === 0 ? '使用了wasm' : '未使用wasm')
    console.log("md5s: ", md5s)
    console.log("耗时: ", Date.now() - now)
}

document.querySelectorAll("input").forEach((input, index) => {
    input.onchange = () => inputHandler.bind(input)(index)
})
