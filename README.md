# 硅基源流 SiliconSource 官网

硅基源流人工智能官方网站，使用 Astro 及 Tailwind CSS 构建。

## 本地开发

```sh
pnpm install
pnpm astro dev --background
```

后台服务可通过以下命令管理：

```sh
pnpm astro dev status
pnpm astro dev logs
pnpm astro dev stop
```

## 构建

```sh
pnpm build
```

## 域名部署

推送到 `main` 分支后，GitHub Actions 会自动构建并通过 GitHub Pages 部署到：

<https://siliconsource.cn>

自定义域名通过 `CNAME` 文件配置。
