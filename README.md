# photo-library

一个时间轴功能的相册

## 环境需求

* nodejs v7.8+
* ImageMagick
    * MacOS:  ```brew install imagemagick```
    * Windows: [Download](http://www.imagemagick.com.cn/download.html) (需配置环境变量)

## 运行

1. 安装依赖

    ```yarn```
2. **照片**（带有Exif信息） 放入至 /photos 文件夹

3. 压缩并生成照片数据

    ```yarn photos```

4. 运行项目

    ```yarn serve```

5. 生成静态页面

    ```yarn build```

## TODO

* 最大化预览
* ...

## 预览

![preview](./preview/preview.jpg)
