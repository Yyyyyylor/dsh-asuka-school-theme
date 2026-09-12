# dsh-asuka-school-theme 项目协作指南

本文件适用于整个仓库。它补充上层协作规则，只记录本项目的结构、长期约束与验证方式。

## 项目基线

- 当前插件版本：`3.0.0`。
- 兼容基线：DeepSeek Harness `0.1.5-rc.2`、Cordis `4.0.2`、Node.js `>=20`、pnpm `11.19.0`。
- 目标环境：DSH Web；主要目标平台为 Ubuntu / WSL2 Ubuntu。Windows 已完成自动化与隔离 Host smoke test，不能据此声称 Ubuntu 实机已验证。
- 项目未发布到 npm。正式安装来源是 GitHub Release 中的预构建 `.tgz`，或固定 Git tag 的 GitHub 源。
- 开始修改前先阅读 [项目索引](docs/README.md)，再按任务进入对应源码与专项文档。

## 仓库地图

| 路径 | 职责 |
| --- | --- |
| `src/index.ts` | Host 入口：注册设置命名空间与三条只读壁纸路由。 |
| `src/settings.ts`、`src/shared/` | Host/Client 共用的设置 schema、时段解析、壁纸资源映射与显示参数。 |
| `src/client/index.ts` | Client 入口：安装样式、注册语言包和 additive slots，并连接设置控制器。 |
| `src/client/controller.ts` | 设置、主题、壁纸和自动时段切换的单一协调层。 |
| `src/client/presentation.ts`、`src/client/themes/` | 朝/午/夜配色与 DSH token 投影、关闭时的基线恢复。 |
| `src/client/wallpaper/` | 双层壁纸、预解码、预载、竞态取消和交叉淡入。 |
| `src/client/settings/` | 通用设置快捷行、完整设置页、范围控件草稿与共享视图 store。 |
| `src/client/session-title/` | 会话标题编辑 UI 与 DSH Session rename 调用。 |
| `src/client/styles.ts` | 插件自有全局样式、玻璃表面、宿主 DOM 适配及 reduced-motion 规则。 |
| `tests/` | Host/Client 契约、设置、控制器、壁纸、样式、标题编辑和资源路由回归。 |
| `scripts/` | Client 打包及资源、对比度、发布包结构检查。 |
| `lib/` | 受版本控制的构建产物；不要直接手工编辑。 |
| `assets/public/` | 会进入发布包的三张 WebP；`assets/private/` 不得进入发布包。 |
| `docs/` | 架构、兼容性、接口研究、资源来源和主题 token 说明。 |

## 架构与兼容性约束

1. Host 和 Client 必须保持分层。Host 使用 `settings`、`webServer`；浏览器端通过 DSH lazy-CJS loader 加载，并把 React 与 `@deepseek-ai/*` 保持为 external。不要把 Host-only 的 Schemastery 或 settings 模块打入 Client。
2. 设置命名空间 `asuka-school-theme` 是已持久化数据的兼容边界。新增设置必须有默认值、schema 校验并兼容旧配置；不要无迁移地改名。
3. `src/client/controller.ts` 是快捷行、设置页、主题投影和壁纸层的单一事实来源。新行为应接入现有控制器，不另建第二套状态同步链路。
4. 插件只能通过 `ctx.slots.inject(...)`/`ctx.slots.register(...)` 增量扩展 DSH，不替换宿主组件或占用宿主私有 seat。所有注册、样式与计时器都应由 Cordis effect 或显式 disposer 管理。
5. “关闭”必须恢复插件启用前捕获的 DSH 外观；不得持久化改写 DSH 官方 Light/Dark/System 偏好。
6. 自动时段固定为早 `06:00–11:00`、午 `11:00–17:00`、晚 `17:00–次日 06:00`。重启后配色与壁纸必须按当前时段同步，手动场景选择不得出现首次回跳。
7. 三张公开壁纸仅通过固定 allowlist 路径提供，维持 GET/HEAD、正确 MIME、immutable cache 与 `nosniff`。不得把请求路径拼接为任意文件路径。
8. 壁纸切换必须先完成解码再交叉淡入，并保留快速切换时的 stale-request 防护、失败回退和预载取消。透明度/模糊预览不得反复重写无关主题 token。
9. `src/client/styles.ts` 可使用 DSH token 和项目自有 `--asuka-*` token。避免为各组件复制硬编码颜色；朝/午/夜和浅/深色应保持可读性，语义 success 不使用主题主红色。
10. `backdrop-filter`、`overflow`、`position: sticky/fixed` 与 stacking context 可能影响 sidebar、Settings 和代码块。不得在未验证 containing block 的容器上随意增加滤镜或 transform。
11. 代码块必须保留固定语言标题/复制按钮、内容滚动、代码高亮和完整圆角裁剪；会话标题编辑必须保留键盘、IME、焦点、pending、错误提示和 aria 行为。
12. `reduceMotion` 与 `prefers-reduced-motion` 都要关闭非必要动画。当前 DSH Settings shell 在关闭时立即卸载，没有可用 exit/Presence 生命周期；在宿主接口改变前，不通过克隆 DOM、截获事件或延迟原生关闭伪造退出动画。

## 修改流程

1. 先执行 `git status --short --branch`，保留与任务无关的用户改动。
2. 阅读任务涉及的源码、对应测试和 [专项文档索引](docs/README.md)。涉及 DSH API 时，以本机目标版本声明/实现和官方同 tag 源码为准，不凭旧接口名称猜测。
3. 只修改 `src/`、测试、脚本或文档中的真源。需要交付可安装包时运行构建，由脚本刷新 `lib/`；不要直接修补生成文件。
4. 修改依赖或 DSH 注入图时同步维护 `package.json`、`pnpm-lock.yaml`、`dsh.client.inject`、类型导入和契约测试。
5. 修改公开壁纸时同步检查 `assets/LICENSE.md`、`docs/ASSETS.md`、`docs/ASSET-CANDIDATES.md`；无明确再分发权的第三方或官方动画素材不得进入仓库与发布包。
6. 修改兼容版本、安装方式或用户功能时同步中英文 README、`CHANGELOG.md` 和相关 `docs/`。两份 README 的核心版本、安装命令和功能说明必须一致。

## 验证矩阵

常规完整验证在仓库根目录执行：

```powershell
pnpm build
pnpm test
pnpm check
pnpm pack:check
git diff --check
```

- 纯文档改动：至少检查 Markdown 链接、版本描述、`git diff --check` 和最终 `git status`。
- 设置/schema/控制器改动：运行 `settings`、`controller`、`range-*` 测试，并完成完整验证。
- DSH API、Host 路由或依赖改动：运行 `dsh-contract`、`asset-route`、完整验证；条件允许时使用隔离 `DSH_HOME` 做 Host smoke test，禁止修改用户现有 profile。
- 壁纸运行时改动：运行 `wallpaper-runtime`、`controller`、`styles`，并在真实浏览器验证三场景、快速切换、失败回退和 reduced motion。
- 样式/主题改动：运行 `themes`、`styles`、`check-contrast`，并在浅/深、早/午/晚、窄窗口、Settings、sidebar、composer 和代码块中做视觉回归。
- 会话标题改动：运行 `session-title-*`，并在真实 DSH 验证鼠标、Enter、Escape、失焦、IME、错误和焦点恢复。

自动测试、组件渲染、Host smoke test 与真实浏览器/Ubuntu 验证必须分别陈述，不能互相替代。

## Git 与发布

- 除非当前用户明确要求，否则不要 commit、push、tag、创建 Release 或合并隔离分支。
- 发布时必须同步版本与 CHANGELOG，执行完整验证，生成并检查 `.tgz`，确认 tag、GitHub Release 和资产均存在且安装路径与 README 一致。
- `*.tgz` 和 `/tgz/` 是本地历史包目录，不加入 Git。不要删除无法确认归属的历史包或用户素材。

