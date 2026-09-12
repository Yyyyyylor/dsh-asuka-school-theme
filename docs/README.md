# 项目索引

本页是 `dsh-asuka-school-theme` 的维护入口。项目当前版本为 `3.0.0`，兼容基线为 DeepSeek Harness `0.1.5-rc.2` / Cordis `4.0.2`。

## 从这里开始

- 使用、安装与功能概览：[English README](../README.md) / [中文 README](../README-zh-CN.md)
- 维护规则与验收要求：[项目级 AGENTS.md](../AGENTS.md)
- 面向用户的版本变化：[CHANGELOG.md](../CHANGELOG.md)
- 许可证与壁纸授权：[LICENSE](../LICENSE)、[assets/LICENSE.md](../assets/LICENSE.md)

## 架构速览

```text
DSH Host
├─ settings.register("asuka-school-theme", schema)
└─ webServer.register(三条固定 WebP 路由)

DSH Web Client
├─ settingsScope.bind() ──> AsukaThemeController
│                           ├─ 主题 token / 基线恢复
│                           ├─ 自动与手动场景
│                           └─ 双层壁纸运行时
├─ settings.general.item ──> Theme-Asuka 快捷行
├─ settings.section ───────> 完整设置页
└─ conversation.session.header.actions ──> 会话标题编辑
```

Host 入口为 `src/index.ts`，Client 入口为 `src/client/index.ts`。两端共享 `src/shared/` 的设置和壁纸定义；状态同步集中在 `src/client/controller.ts`，不应在 UI 组件中另建平行状态链路。

## 源码导航

| 目标 | 主要文件 | 对应测试 |
| --- | --- | --- |
| Host 设置与资源路由 | `src/index.ts`、`src/settings.ts` | `tests/dsh-contract.test.ts`、`tests/asset-route.test.ts` |
| 设置默认值、时段与校验 | `src/shared/settings.ts` | `tests/settings.test.ts` |
| Client 注册与生命周期 | `src/client/index.ts` | `tests/dsh-contract.test.ts` |
| 场景与设置协调 | `src/client/controller.ts` | `tests/controller.test.ts` |
| 主题 token 和启停恢复 | `src/client/presentation.ts`、`src/client/themes/` | `tests/themes.test.ts`、`tests/styles.test.ts` |
| 壁纸加载、预载与切换 | `src/shared/wallpapers.ts`、`src/client/wallpaper/runtime.ts` | `tests/wallpaper-runtime.test.ts`、`tests/asset-route.test.ts` |
| 快捷行与完整设置页 | `src/client/settings/` | `tests/range-row.test.tsx`、`tests/range-draft.test.ts` |
| 会话标题编辑 | `src/client/session-title/` | `tests/session-title-editor.test.tsx`、`tests/session-title-rename.test.ts` |
| 玻璃表面与宿主 DOM 样式 | `src/client/styles.ts` | `tests/styles.test.ts`，外加真实浏览器视觉回归 |
| 打包与发布结构 | `scripts/build-client.mjs`、`scripts/check-package.mjs`、`tsdown.config.ts` | `pnpm build`、`pnpm check`、`pnpm pack:check` |

## 专项文档

| 文档 | 用途 | 何时阅读或更新 |
| --- | --- | --- |
| [COMPATIBILITY.md](COMPATIBILITY.md) | DSH 0.1.5-rc.2 接口核对、Settings 关闭生命周期和验证边界 | DSH/Cordis 升级、注入图或宿主接口变化时 |
| [ARCHITECTURE-AUDIT.md](ARCHITECTURE-AUDIT.md) | Host/Client 数据流、生命周期、外观隔离和资源安全 | 改入口、控制器、slot、主题投影或路由时 |
| [theme-token-map.md](theme-token-map.md) | DSH/Shiki token 覆盖范围 | 改主题颜色、按钮、sidebar、composer 或代码块时 |
| [ASSETS.md](ASSETS.md) | 三张公开壁纸的构图、预算与目录规则 | 替换、重编码或新增壁纸时 |
| [ASSET-CANDIDATES.md](ASSET-CANDIDATES.md) | 壁纸来源与再分发决策 | 评估任何新图像素材时 |
| [RESEARCH.md](RESEARCH.md) | 初始 DSH 0.1.1-rc.2 调研历史及当前审计入口 | 追溯旧设计决策时；当前接口以兼容性文档为准 |

## 构建与验证

在仓库根目录执行：

```powershell
pnpm install
pnpm build
pnpm test
pnpm check
pnpm pack:check
git diff --check
```

- `pnpm build` 生成受版本控制且会进入发布包的 `lib/`；只修改 `src/` 而不刷新发布产物，会导致源码与安装包不一致。
- `pnpm test` 覆盖设置、控制器、壁纸竞态、样式契约、会话标题和真实 Cordis/DSH 声明的自动化回归。
- `pnpm check` 执行 TypeScript、资源、对比度和包结构检查。
- `pnpm pack:check` 只检查 npm pack 内容，不代表已经发布，也不代表真实 DSH Web 已加载成功。

涉及视觉或交互的改动还应在真实 DSH Web 中验证。重点覆盖早/午/晚、浅/深、Settings、sidebar、composer、菜单、代码块 sticky/滚动、窄窗口和 `reduceMotion`。Ubuntu/WSL2 未实测时必须明确标注。

## 发布内容边界

`package.json#files` 仅允许发布预构建 `lib/`、`assets/public/`、资源许可、Cordis patch、双语 README 和 LICENSE。`assets/private/`、本地 `.tgz`、`/tgz/`、测试与内部文档不会进入安装包。

项目未发布到 npm。GitHub Release 的版本化 `.tgz` 是首选安装产物；发布步骤只有在明确授权时执行。

