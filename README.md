# md5-generator

一个简单的文件md5生成工具, 由rust生成wasm, 比[browser-md5-file](https://www.npmjs.com/package/browser-md5-file)高效, 项目中启动本地的vite服务(详看package.json)有对比数据可查看

# 前置步骤


# 启动web调试服务

```bash
$ yarn dev
```

```bash
$ yarn dev
```

# rust -> wasm

- [查阅MDN](https://developer.mozilla.org/zh-CN/docs/WebAssembly/Rust_to_wasm), 安装必需的依赖
- 编译生成wasm
```bash
$ yarn wpb
```