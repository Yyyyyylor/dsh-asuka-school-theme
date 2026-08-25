# 明日香学园 // 02

[English](README.md)

面向 DeepSeek Harness Web UI 的非官方明日香主题插件。插件提供明、暗两套外观、早/午/晚三张右侧人物壁纸，以及与本机时间同步的平滑背景切换。

> 本项目是非官方同人作品，与 DeepSeek、khara、Evangelion 及相关权利方不存在关联。

## 兼容性

- DSH：`0.1.1-rc.2`
- Cordis：`4.0.1`
- 开发环境：Node.js `>=20`
- 目标平台：Ubuntu / WSL2 Ubuntu，使用 DSH Web 和 Linux Chrome

Ubuntu 是本项目的目标运行平台，**应可使用**；不过当前只完成了编译基线验证，仍需在实际 Ubuntu/WSL2 的 DSH Web 环境中完成插件联调与浏览器截图回归测试。若你在 Ubuntu 上遇到问题，请记录 DSH 版本、浏览器版本及终端输出后再排查。

## 安装

### 从 GitHub Release 安装（推荐）

```bash
dsh plugin --profile web add https://github.com/Yyyyyylor/dsh-asuka-school-theme/releases/download/v0.2.7/dsh-asuka-school-theme-0.2.7.tgz
```

本项目暂未发布到 npm。GitHub Release 中的 `.tgz` 是已构建、带版本号的发布包，推荐直接使用。

### 从 GitHub 源码安装

```bash
dsh plugin --profile web add github:Yyyyyylor/dsh-asuka-school-theme#v0.2.7
```

该方式要求主机已安装 Git。请固定到标签而非 `main`，避免后续更新带来不可预期的变动。

### 从本地项目安装

在项目根目录执行：

```bash
pnpm install
pnpm build
npm pack
dsh plugin --profile web add ./dsh-asuka-school-theme-0.2.7.tgz
```

最后一条命令中的文件名应与 `npm pack` 实际输出的 `.tgz` 文件一致。

安装、更新或移除后，请重启 DSH Web profile。

## 使用方式

1. 在 **设置 → 通用 → Asuka School** 中快速切换“关闭 / 上学路上 / 午间教室 / 东京-3 夜”。
2. 在 **设置 → Asuka School** 中调整壁纸时段、透明度、模糊、装饰细节、减少动态效果，并可重置插件设置。
3. 默认“壁纸时段”为自动模式，按本机时间切换：
   - 早：06:00–11:00
   - 午：11:00–17:00
   - 晚：17:00–次日 06:00

自动切换使用交叉淡入效果；启用“减少动态效果”后会关闭该动画。插件不会改写 DSH 官方的浅色、深色或系统外观，只叠加所选的壁纸场景。

## 隐私与资源

插件不收集凭据、遥测或浏览器 `localStorage` 数据。标量偏好存储在 DSH 的插件专属 Host 设置命名空间中。

公开壁纸位于 `assets/public/`；相关使用说明见 [assets/LICENSE.md](assets/LICENSE.md) 与 [docs/ASSETS.md](docs/ASSETS.md)。请勿将私有开发素材放入发布包。

## 开发与验证

```bash
pnpm build
pnpm test
pnpm check
npm pack --dry-run
```

发布包预构建了 `lib/index.js` 与 `lib/client.js`，最终用户安装插件时不需要执行 postinstall 构建。

更多说明见 [docs/COMPATIBILITY.md](docs/COMPATIBILITY.md) 与 [docs/RESEARCH.md](docs/RESEARCH.md)。
