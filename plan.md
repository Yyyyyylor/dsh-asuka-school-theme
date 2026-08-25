# dsh-asuka-school-theme 开发计划（架构审查终版）

> **目标**：从零开发一个面向 DeepSeek Harness Web UI 的“校服明日香”主题插件 `dsh-asuka-school-theme`。  
> **审查日期**：2026-08-25  
> **首要目标环境**：Ubuntu / WSL2 Ubuntu + Linux Chrome/WSLg  
> **首要兼容基线**：`@deepseek-ai/dsh 0.1.1-rc.2`  
> **开发执行者**：Codex  
> **总体结论**：**高可行，建议实施。核心主题与原生 Settings 集成可完全走 DSH 官方扩展面；壁纸需要一个极薄的 Host 静态资源能力和插件自有样式层。**

---

## 1. 审查结论

### 1.1 总体可行性

| 子目标 | 可行性 | 审查结论 |
|---|---:|---|
| 注册 Light / Dark 第三方主题 | 10/10 | DSH 官方 `ThemeRuntime.register()` 原生支持 |
| Theme Token 覆盖 | 10/10 | `--dsw-*` 是官方主题语义层 |
| 原生 Settings UI 中出现插件设置 | 10/10 | 官方 `settings.general.item` / `settings.section` 扩展面明确支持 |
| 设置即时生效 | 10/10 | Settings scope + ThemeRuntime 均支持运行时更新 |
| 设置跨 DSH 重启持久化 | 9/10 | 当前 DSH 已支持第三方 Host settings namespace |
| 壁纸 | 8/10 | 可实现，但不属于 Theme Token 的纯颜色职责；需独立、受控的资源/样式层 |
| 明日香视觉小细节 | 8/10 | 颜色、按钮、Sidebar、代码区完全可行；部分动画/全局装饰需避免 DOM hack |
| Ubuntu / WSL2 | 10/10 | Web UI 插件，无 Windows 桌面 API 依赖 |
| 与 Better Sidebar 等共存 | 8.5/10 | 只要坚持 semantic token + additive slot，不抢占单例 slot，风险较低 |
| npm 独立发布 | 8/10 | 可行；最大技术坑是 DSH 动态 client 的 lazy-CJS bundle 格式 |
| 长期维护 | 7.5/10 | DSH 仍处 developer preview，必须做版本漂移检测 |

**最终评分：8.5/10。**

原方案的大方向正确，但需要四个重要修正：

1. **原生 Settings 不应只做一个塞满所有控件的 General row。**
   - General row 用于“一个偏好”。
   - 本项目采用：
     - `settings.general.item`：一个 **Asuka School 快捷主题行**；
     - `settings.section`：一个 **Asuka School 原生高级设置页**。
2. **标量配置不再以 `localStorage` 作为主要持久化。**
   - 当前官方 DSH 已移除早期第三方 namespace 的 Web allowlist 限制。
   - 使用 Host settings namespace + `ctx.settingsScope`。
3. **壁纸不能假设 `assets/` 会自动被浏览器访问。**
   - DSH client module 默认只负责 client bundle。
   - 公开壁纸采用极小的 Host 静态资源路由，或在 P0 找到更原生的稳定资源入口后替换。
4. **“ASUKA // 02”、Thinking pulse、EVA-02 progress 等只能在稳定 token / additive slot 能实现时加入。**
   - 不为了装饰破坏 DOM。
   - v1.0 宁可少做，也不能用依赖内部 class 名的 hack。

---

# 2. 已审阅的 DSH 架构资料

Codex 开发前应再次打开这些文件，且以**当前 checkout / 当前安装版本**为最终事实来源。

## 2.1 DSH 官方核心资料

### Theme

- `packages/client/ui-theme/src/client/index.ts`
- `packages/client/ui-theme/src/client/AppearanceRow.tsx`
- `packages/client/ui-theme/README.md`
- `packages/client/ui-layout/src/client/theme-presenter.ts`
- `docs/web-styling.md`

关键结论：

- `ThemeRuntime` 原生拥有：
  - `getTheme()`
  - `setTheme(id)`
  - `register(definition)`
  - `overrideTokens(source, tokens)`
- `register()` 返回 disposer。
- `overrideTokens()` 也返回 disposer。
- `theme/change` 是官方实时通知入口。
- ThemeRuntime 本身不直接操作 DOM，实际呈现由 `ui-layout` 完成。
- 第三方 theme id 可以注册，但官方 Appearance row 当前硬编码的仍是：
  - `light`
  - `dark`
  - `system`

因此：

> **仅调用 `ctx.theme.register()` 不会自动让 Asuka 主题出现在官方 Light/Dark/System 三按钮中。**

我们必须注册自己的原生 Settings UI。

### Settings

- `packages/client/ui-settings/src/client/contract/slots.ts`
- `packages/client/ui-settings-general/src/client/index.ts`
- `packages/client/ui-settings-general/README.md`
- `docs/cookbook/adding-a-settings-card.md`
- `docs/subsystems/settings.md`
- `.agents/notes/implemented/architecture/2026-08-12-plugin-owned-settings-surface.md`

关键结论：

- `settings.general.item`
  - 为 General 页增加一个偏好行；
  - 适合单一设置；
  - Feature 自己拥有文案、值和写路径。
- `settings.section`
  - 增加一个完整原生 Settings 页面；
  - 适合本项目的 Wallpaper / Opacity / Blur 等多项配置。
- 第三方插件可拥有自己的 settings namespace。
- 当前架构已经采用：
  - **Registering is exposing**
  - 旧的 `WEB_SETTINGS_NAMESPACES` 限制已移除。
- `ctx.settingsScope` 提供 revision-fenced 的客户端设置读写。
- Host settings provider 默认可落到 `$DSH_HOME/settings.yaml`。
- namespace 的注册和清理由 Cordis fiber 生命周期管理。

### Client plugin / packaging

- `docs/subsystems/client-modules.md`
- `packages/client/AGENTS.md`
- `packages/extensions/cordis-client-runner/src/client/slot-catalog.ts`

关键结论：

- 外部插件通过 package.json 的 `dsh.client` 加入 Web client graph。
- 必须暴露 `exports["./client"]`。
- browser bundle 不是普通 ESM 文件，而是 DSH module loader 可加载的 **lazy-CJS factory artifact**。
- DSH repo 内的 `clientBundle()` preset 当前不是面向外部包发布的稳定 npm 构建工具。
- 因此外部插件需要自行复现正确 wrapper。
- **禁止不小心把第二份 React 打进 client.js。**

### Slot

- `packages/client/ui-settings/src/client/contract/slots.ts`
- `packages/client/ui-sidebar/src/client/contract/slots.ts`
- `packages/client/AGENTS.md`

关键结论：

- UI 扩展必须走：
  ```ts
  ctx.slots.inject(slot, () => ctx.slots.register(...))
  ```
- 不要抢占已经被官方组件占用的 single slot。
- 特别不要为了主题去替换：
  - `sidebar.brand.mark`
  - `sidebar.brand.name`
  - `sidebar.workspaces`
  - `sidebar.settings`
- `sidebar.footer.action` 是 additive slot，但它是“动作位”，不应滥用成纯装饰。

---

## 2.2 社区参考实现

### `RevolutionLA/dsh-dream-skin`

重点参考：

- `package.json`
- `cordis.patch.yml`
- `lib/index.js`
- `lib/client.js`
- `docs/themes-spec.md`

用途：

- 主题注册；
- 壁纸；
- 浏览器/Host 双面插件；
- theme token；
- 持久化经验。

注意：

> 该项目较早的 `themes-spec.md` 中关于第三方 namespace 被 `WEB_SETTINGS_NAMESPACES` 阻断的描述已经被 DSH 后续官方架构改动淘汰。  
> **持久化判断必须以当前 DSH 官方源码为准，而不是照搬社区旧文档。**

### `nevertoday/dsh-theme-plugin`

重点参考：

- `tsdown.config.ts`
- `package.json`

用途：

- 外部 DSH 主题插件如何构建；
- lazy-CJS wrapper；
- platform externals；
- 避免 bundle 第二份 React；
- prebuilt package 结构。

---

# 3. 最终产品定义

## 3.1 插件名称

```text
dsh-asuka-school-theme
```

显示名称：

```text
Asuka School // 02
```

主题：

```text
Asuka School — After Class
Asuka School — Tokyo-3 Night
```

Theme IDs：

```text
asuka-school-light
asuka-school-dark
```

Settings namespace：

```text
asuka-school-theme
```

---

# 4. 视觉设计原则

主题不做成传统的“NERV 红黑警报 UI”。

目标视觉语言：

```text
东京-3校园
+
校服明日香
+
校服蓝
+
领结红
+
橙红头发
+
暖白 / 夜蓝开发环境
+
少量 EVA-02 暗示
```

最终应该让用户感受到：

> “这是明日香。”

而不是：

> “这是一个满屏 WARNING 的 EVA 红黑主题。”

---

# 5. 色彩系统

建立统一 design token，不允许业务文件散落十六进制颜色。

建议基准：

```ts
const ASUKA_COLORS = {
  schoolBlue: '#55758C',
  schoolBlueDark: '#30485D',
  ribbonRed: '#C7474F',
  hairOrange: '#D96A36',
  warmCream: '#F4F0E9',
  tokyoSky: '#91B9D2',
  nightNavy: '#171C24',
  panelNavy: '#202934',
}
```

这些值是**初始设计值**，Codex 必须通过实际 DSH 截图迭代，不得把它们当不可修改常量。

---

# 6. Light Theme

主题：

```text
Asuka School — After Class
```

目标感觉：

```text
东京-3学校放学后的暖色下午
```

原则：

- 背景：Warm Cream；
- Sidebar：浅校服蓝灰；
- Conversation surface：高不透明度暖白；
- Active：School Blue；
- Primary CTA / Send：Asuka Red；
- 轻量 hover / running accent：Hair Orange；
- 不使用大面积红；
- 不做粉色“少女主题”。

---

# 7. Dark Theme

主题：

```text
Asuka School — Tokyo-3 Night
```

目标：

```text
东京-3夜晚 / 放学后的安静开发环境
```

建议：

```text
Base      #171C24
Panel     #202934
Accent    Asuka Red
Secondary Hair Orange
```

规则：

- Code Block 比普通 surface 更深；
- Wallpaper 人物透明度低于 Light；
- 错误红与品牌红要有语义区分；
- success 继续使用可识别的低饱和绿；
- 不因主题把所有 status 都染成红色。

---

# 8. Theme Token 策略

## 8.1 P0 必须生成真实 token inventory

Codex 必须从**当前 DSH 0.1.1-rc.2 / 当前源码**生成：

```text
docs/theme-token-map.md
```

至少分类：

- Application background
- Surface layer 1/2/3
- Overlay
- Sidebar
- Primary/secondary/tertiary text
- Border
- Brand
- Button
- Hover / active
- Error
- Warning
- Success
- Markdown code
- Inline code
- Scrollbar
- Shiki syntax

优先使用：

```text
--dsw-alias-*
--dsw-specific-*
--shiki-token-*
```

不要以社区项目“当前有 89 个 token”这种数量为硬编码标准。

---

# 9. 原生 Settings UI：最终方案

这是 v1.0 **硬性要求**。

不得：

- 自建一个 `/settings-asuka` 网页；
- querySelector DSH Settings DOM；
- appendChild 到官方设置页；
- 修改 `ui-settings-general`；
- patch 官方 React 组件。

采用官方 slot。

---

## 9.1 General 快捷设置行

注册：

```text
settings.general.item
```

显示：

```text
Asuka School
[ Off ] [ After Class ] [ Tokyo-3 Night ]
```

它只处理一个核心偏好：

```text
mode
```

目的：

- 用户进入 Settings 第一页即可开关主题；
- 完全满足“把自己的设置行注册进 DSH 原生 Settings UI”。

注册必须采用：

```ts
ctx.slots.inject('settings.general.item', () =>
  ctx.slots.register(
    {
      name: 'settings.general.item',
      id: 'asuka-school-theme',
      order: <经过当前 slot contract 验证的值>,
      locale: 'settings.asukaSchool',
      ...
    },
    AsukaQuickRow,
  )
)
```

**具体参数名称必须以当前 slot contract 为准，不可盲抄本 Plan。**

---

## 9.2 原生 Asuka School 设置页

注册：

```text
settings.section
```

Navigation：

```text
General
...
Asuka School
...
```

页面包含：

```text
Theme
Wallpaper
Wallpaper Opacity
Wallpaper Blur
Decorative Details
Reduce Motion
Reset
Asset info
```

理由：

DSH 官方架构明确区分：

- “一个单独偏好” → `settings.general.item`
- “一整页功能” → `settings.section`

因此这比把六个 slider/toggle 全塞进 General row 更符合 DSH 架构。

---

# 10. Settings 数据模型

Host half 使用官方 settings seam。

建议 schema：

```ts
interface AsukaThemeSettings {
  mode: 'off' | 'after-class' | 'tokyo3-night'
  wallpaperEnabled: boolean
  wallpaperOpacity: number
  wallpaperBlurPx: number
  decorativeDetails: boolean
  reduceMotion: boolean
}
```

建议默认：

```yaml
mode: off
wallpaperEnabled: true
wallpaperOpacity: 0.20
wallpaperBlurPx: 0
decorativeDetails: true
reduceMotion: false
```

为什么默认 `mode: off`：

> **安装插件不应偷偷改变用户当前的 DSH 外观。**

用户主动选择 Asuka 后才生效。

---

# 11. Settings Host 注册

Host half 研究并使用：

```ts
settingsNamespace(...)
installSettingsSection(...)
```

或当前版本的等价官方 API。

要求：

- `applies: live`
- schema 限制：
  - opacity：`0.0–0.40`
  - blur：`0–20`
  - enum 严格校验
- 不保存任何 credential；
- 不把大型图片 base64 放进 `settings.yaml`。

Scalar settings 的唯一权威来源：

```text
Host Settings Namespace
```

Browser `localStorage` 不得成为 v1.0 scalar preference 的 authoritative store。

---

# 12. Settings Browser 访问

浏览器侧：

```text
ctx.settingsScope.bind({ namespace: 'asuka-school-theme' })
```

所有设置行 / 设置页共享同一个 controller。

不得出现：

```text
QuickRow 自己一份 state
Section 自己一份 state
Wallpaper Runtime 又自己一份 state
```

正确结构：

```text
Host Settings
      ↓
AsukaSettingsController
      ├── QuickRow
      ├── AsukaSection
      ├── ThemeController
      └── WallpaperController
```

单一事实来源。

---

# 13. Theme 与 Settings 同步状态机

这是本项目最重要的正确性点之一。

官方 ThemeRuntime 对第三方 theme id 的选择不自动持久化。

因此：

```text
Host setting: mode
```

负责持久化 Asuka 选择。

---

## 13.1 启用 Asuka

用户：

```text
mode = after-class
```

Controller：

```text
settings update
    ↓
ctx.theme.setTheme('asuka-school-light')
    ↓
theme/change
    ↓
UI 即时刷新
```

Night：

```text
ctx.theme.setTheme('asuka-school-dark')
```

---

## 13.2 用户改回 DSH 官方主题

必须处理：

```text
Asuka = active
↓
用户点击官方 Appearance
↓
Light / Dark / System
```

不能发生：

```text
官方切成 dark
↓
Asuka watcher 又强制切回来
↓
双方打架
```

正确策略：

1. Controller 维护 `applyingOwnTheme` guard。
2. 监听 `theme/change`。
3. 若变化不是插件自身发起，且 preference 变成非 Asuka theme：
   ```text
   mode → off
   ```
4. 用户的官方 Theme 选择获胜。

这必须有自动测试。

---

## 13.3 DSH 重启

如果 settings 中：

```text
mode = tokyo3-night
```

插件 Browser half 激活后：

```text
register themes
↓
read settings snapshot
↓
setTheme(asuka-school-dark)
```

确保跨重启恢复。

---

## 13.4 插件卸载 / dispose

如果 Asuka 当前 active：

- Theme disposer 自动移除注册；
- ThemeRuntime 应安全回退；
- Wallpaper CSS 层必须消失；
- Settings UI slots 消失；
- route 消失；
- listeners 消失。

不要在 dispose 中手写一堆互相冲突的 DOM 恢复逻辑。

---

# 14. 壁纸：修订后的实现方案

## 14.1 为什么不能只把图片放进 `assets/`

DSH 的 client module 系统明确负责：

```text
/plugins/<id>/client.js
```

不能假定 npm 包中任意：

```text
assets/foo.webp
```

会自动获得浏览器 URL。

因此壁纸必须明确设计传输路径。

---

## 14.2 优先级

P0 先检查当前 client slot catalog / web API 是否已有**不会替换现有 UI 的原生 background/decoration seat**。

优先级：

```text
官方 additive wallpaper / root-decoration seam（若存在）
        ↓
插件自有 global stylesheet + fixed body pseudo layer
```

禁止为壁纸替换：

```text
conversation
sidebar
sidebar.workspaces
root
```

之类 single occupant。

---

## 14.3 v1.0 推荐方案：固定白名单静态资源路由

Host half 注册类似：

```text
/asuka-school/assets/asuka-after-class.webp
/asuka-school/assets/asuka-tokyo3-night.webp
```

只允许固定白名单。

要求：

- GET / HEAD；
- POST → 405；
- 未知文件 → 404；
- `../` traversal → 404；
- 正确 Content-Type；
- 可设置长期缓存 + package version cache bust；
- 不允许 browser 提交任意文件路径；
- 不提供 directory listing。

优点：

- 图片不进入巨大 `client.js`；
- npm package 可直接携带 WebP；
- 同源；
- Ubuntu/WSL 无额外要求。

---

# 15. Wallpaper 呈现层

推荐插件拥有自己的 CSS：

```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  background-image: var(--asuka-wallpaper-image);
  background-position: right center;
  background-size: cover;
  opacity: var(--asuka-wallpaper-opacity);
  filter: blur(var(--asuka-wallpaper-blur));
}
```

实际 z-index / stacking 必须通过浏览器实测确定。

可再用第二层 gradient：

```text
左侧强遮罩
→ 中部渐隐
→ 右侧人物露出
```

Light：

```text
暖白遮罩
```

Dark：

```text
Night Navy 遮罩
```

注意：

- 这是**插件自有、稳定 document 层 CSS**；
- 不允许针对 DSH 内部 `.some-generated-class`；
- 不允许 MutationObserver 去追内部组件；
- 不允许不断扫描 DOM。

如果 DSH 当前提供更好的 root decoration seam，则改用官方 seam。

---

# 16. 壁纸构图

推荐尺寸：

```text
2560×1440
或
3840×2160
```

角色：

```text
右侧 60%–95%
```

关键区域：

```text
头部约 70%–85% X
人物主体约 65%–95% X
```

左侧：

```text
大量 negative space
```

避免：

- 人物脸在主聊天列正后方；
- 人物正中央；
- 超大头像；
- 复杂文字背景；
- 过强高光。

---

# 17. 图片资产策略

## 17.1 搜索优先顺序

为开发寻找候选：

1. 官方公开宣传素材；
2. 官方动画原画 / 设定图；
3. Pixiv 高人气明日香校服同人；
4. X / ArtStation / DeviantArt 等高质量作品；
5. 无适合可分发资产时，生成默认图。

关键词：

```text
惣流・アスカ・ラングレー 制服
式波・アスカ・ラングレー 制服
Asuka school uniform
Asuka Tokyo-3 school
Asuka school uniform wallpaper
Asuka Langley school uniform Pixiv
```

---

## 17.2 版权边界

“找到好图” ≠ “可以打进 npm”。

建立：

```text
docs/ASSET-CANDIDATES.md
```

每项：

```text
Title
Author
Source URL
Work ID
Resolution
Composition score
Visual score
License
Redistribution allowed?
LOCAL_USE_ONLY?
Notes
```

无明确再分发权：

```text
LOCAL_USE_ONLY
```

并且：

- 不 commit；
- 不进 npm；
- 不进 GitHub Release；
- 不移除作者签名；
- 不去水印；
- 不绕过 Pixiv 登录/反爬；
- 不声称不存在的授权。

---

# 18. Private / Personal artwork 模式

如个人本地使用喜欢的 Pixiv / 官方图：

目录：

```text
assets/private/
```

`.gitignore`：

```gitignore
assets/private/*
!assets/private/.gitkeep
```

开发者可手动放：

```text
assets/private/asuka-custom.webp
```

但**公开 release 构建必须拒绝 private asset 进入 pack**。

P9 加一个 fail-fast：

```text
发现 assets/private 中存在被 pack 的文件
→ build/release 失败
```

---

# 19. 公开发行默认图

公开 npm / GitHub release：

只允许：

- 明确获授权；
- 明确允许再分发；
- 自有版权；
- 项目生成的原创资产。

没有合适授权图时：

> **使用可用的 OpenAI image generation / image-2 能力生成默认壁纸。**

生成目标：

```text
Asuka Langley
school uniform
Tokyo-3 school atmosphere
hand-drawn Japanese cel-animation aesthetic
clean animation line art
subtle cel shading
painted school/city background
right-side composition
large negative space on the left
```

不要要求：

- 模仿某个具体在世 Pixiv 画师；
- “和 XXX 作品一模一样”。

至少生成 6–12 个候选，再视觉筛选。

---

# 20. 主题辨识度细节：v1.0

## 20.1 Send / Primary button

通过当前 DSH 实际 token inventory 找到：

```text
button-primary-fill
button-primary-hover
brand-primary
```

使用：

```text
Asuka Red
```

视觉灵感是红色领结，但按钮本身不要画成蝴蝶结。

---

## 20.2 Active Sidebar / Session

目标：

```text
School Blue surface
+
Hair Orange subtle rail
```

优先通过：

```text
--dsw-specific-sidebar-*
```

实现。

---

## 20.3 Code Block

即使 Light：

```text
Code Block = 独立深蓝灰 surface
```

覆盖：

```text
Markdown code token
Inline code token
Shiki token slots
```

测试：

- C++
- Python
- Bash
- YAML
- JSON
- XML
- CMake

---

## 20.4 State

Error：

```text
语义错误红
```

Success：

```text
低饱和绿
```

Warning：

```text
低饱和黄/橙
```

品牌红不能吞掉状态语义。

---

# 21. 装饰功能：严格限界

原计划的：

- `ASUKA // 02`
- Thinking pulse
- EVA-02 progress rail

保留设计目标，但改成：

### v1.0

只实现：

- Theme Token 能稳定实现的装饰；
- Asuka Settings 页内的 `ASUKA // 02` 标识；
- 自有 Wallpaper layer 动效；
- 不依赖 DSH 内部结构的 CSS。

### v1.1 候选

如果在当前 DSH slot catalog 中找到合适 additive slot：

- Thinking indicator accent；
- Agent running / Tool running accent；
- 轻量 EVA-02 progress。

### 禁止

为了这些效果：

```text
querySelector
MutationObserver
覆盖 conversation renderer
替换 sidebar.brand
patch ui-conversation
```

---

# 22. Reduce Motion

必须同时支持：

```css
@media (prefers-reduced-motion: reduce)
```

和插件设置：

```text
reduceMotion = true
```

开启后禁用/弱化：

- wallpaper transition；
- glow；
- pulse；
- hover transform；
- 未来任何 progress animation。

用户显式 `reduceMotion` 优先级最高。

---

# 23. 最终包架构

```text
dsh-asuka-school-theme/
│
├── package.json
├── cordis.patch.yml
├── tsdown.config.ts
├── README.md
├── LICENSE
│
├── scripts/
│   ├── platform-externals.mjs
│   ├── check-package.mjs
│   ├── check-assets.mjs
│   └── check-contrast.mjs
│
├── src/
│   ├── index.ts
│   │   # Host half:
│   │   # - settings namespace
│   │   # - static wallpaper route
│   │
│   ├── settings.ts
│   │   # schema / namespace / defaults
│   │
│   └── client/
│       ├── index.ts
│       ├── controller.ts
│       ├── locales.ts
│       │
│       ├── themes/
│       │   ├── colors.ts
│       │   ├── light.ts
│       │   ├── dark.ts
│       │   └── tokens.ts
│       │
│       ├── settings/
│       │   ├── AsukaQuickRow.tsx
│       │   ├── AsukaSection.tsx
│       │   ├── settings-store.ts
│       │   └── *.module.css
│       │
│       └── wallpaper/
│           ├── runtime.ts
│           └── wallpaper.css
│
├── assets/
│   ├── public/
│   │   ├── asuka-after-class.webp
│   │   └── asuka-tokyo3-night.webp
│   │
│   ├── previews/
│   │   ├── light.webp
│   │   └── dark.webp
│   │
│   └── private/
│       └── .gitkeep
│
├── tests/
│   ├── settings-host.test.ts
│   ├── controller.test.ts
│   ├── theme.test.ts
│   ├── token-coverage.test.ts
│   ├── contrast.test.ts
│   ├── asset-route.test.ts
│   ├── lifecycle.test.ts
│   └── visual/
│
└── docs/
    ├── RESEARCH.md
    ├── ARCHITECTURE-AUDIT.md
    ├── theme-token-map.md
    ├── ASSET-CANDIDATES.md
    ├── ASSETS.md
    └── COMPATIBILITY.md
```

---

# 24. Browser plugin lifecycle

所有注册必须由 Cordis 生命周期拥有。

要求：

```ts
ctx.effect(() => ctx.theme.register(...), '...')
ctx.effect(() => ctx.locale.register(...), '...')
```

Slots：

```ts
ctx.slots.inject('...', () =>
  ctx.slots.register(...)
)
```

所有：

- event listener
- stylesheet
- theme registration
- token override
- settings store/controller
- route

都必须有明确 disposer。

---

# 25. React / Client 架构红线

遵守官方 `packages/client/AGENTS.md`：

- `ctx` 只存在于 `apply()` 世界；
- Component 不直接拿 ctx；
- Component 不手写外部 subscribe；
- reactive state 经官方 store/hooks/inject；
- cross-plugin 协作走 slot / service；
- 不从别的插件 value-import 私有组件；
- UI 文案通过 locale；
- CSS component 使用 semantic token；
- 不引入 Tailwind；
- 不引入新 component library。

---

# 26. Client bundle 构建

这是项目最容易踩坑的部分。

外部插件必须构建 DSH module loader 能识别的 client artifact。

参考 `nevertoday/dsh-theme-plugin`：

```ts
window.__ModuleLoader__.load({
  id: 'dsh-asuka-school-theme',
  factory: (require) => {
    // bundle
    return module.exports
  }
})
```

要求：

```text
factory id === package name
```

必须显式 externalize：

- React；
- Cordis；
- DSH platform seeded modules；
- 其他由 DSH module table 提供的包。

禁止：

```text
client.js 内打入第二份 React
```

否则 Settings React hooks 可能直接失效。

---

# 27. package.json 基本要求

必须有：

```jsonc
{
  "name": "dsh-asuka-school-theme",
  "exports": {
    ".": "./lib/index.js",
    "./client": "./lib/client.js",
    "./package.json": "./package.json"
  },
  "dsh": {
    "bundle": {
      "patch": "./cordis.patch.yml"
    },
    "client": {
      "platform": "web",
      "inject": [],
      "immediately": true
    }
  }
}
```

`inject` 的确切 package list：

> P0 根据 DSH 0.1.1-rc.2 当前 package 名与实际 client graph 填写。

预计包括：

- runtime；
- ui-theme；
- ui-settings；
- ui-settings-general；
- locale；
- 如 Settings section 还需其他 owner package，则补齐。

不要凭社区 README 复制版本。

---

# 28. 版本依赖

由于 DSH 处于 RC / developer preview：

不要发布：

```json
"peerDependencies": {
  "@deepseek-ai/...": "*"
}
```

作为长期策略。

P0 查明当前 npm package versions 后：

- 先精确 pin 开发依赖；
- peer range 采用经过测试的范围；
- CI 写入：
  ```text
  testedDshVersion = 0.1.1-rc.2
  ```

每次 DSH 升级：

1. 重新检查 slot catalog；
2. 重新检查 ThemeRuntime；
3. 重新检查 client module wrapper；
4. 重跑截图回归。

---

# 29. 发布包必须预构建

考虑到 DSH 插件安装经 pnpm，且安装脚本可能被 `allowBuilds` 阻止：

**v1.0 推荐 npm 包直接携带预构建：**

```text
lib/index.js
lib/client.js
assets/public/*.webp
```

用户安装不依赖：

```text
prepare
postinstall
native build
```

开发时：

```bash
pnpm build
```

发布前：

```bash
pnpm test
pnpm check
npm pack --dry-run
```

GitHub 源码安装如果需要 `prepare`，只作为次要路径。

首选用户安装：

```bash
dsh plugin --profile web add dsh-asuka-school-theme@latest
```

而不是：

```text
github:user/repo
```

这样还可以降低用户当前遇到的 GitHub HTTPS 安装不稳定问题。

---

# 30. `cordis.patch.yml`

保持最薄：

```yaml
- insert:
    - id: asuka-school-theme
      name: 'dsh-asuka-school-theme'
```

以当前 DSH plugin installer 实测为准。

不在 patch 中修改：

- ui-theme；
- ui-settings；
- ui-conversation；
- Better Sidebar；
- 其他用户插件。

---

# 31. 开发阶段 P0 — Architecture Recon

**必须先做，不允许跳过。**

Codex：

1. 确认当前：
   ```bash
   dsh --version
   ```
2. 记录：
   ```text
   @deepseek-ai/dsh 0.1.1-rc.2
   ```
   或真实输出。
3. 阅读当前官方文件：
   - ThemeRuntime
   - AppearanceRow
   - Settings slot contract
   - Settings cookbook
   - Client modules
   - Web styling
   - Sidebar slots
   - Client AGENTS
4. 如本机安装包可读，再与 GitHub 当前源码比较。
5. 建立：
   ```text
   docs/RESEARCH.md
   docs/ARCHITECTURE-AUDIT.md
   docs/theme-token-map.md
   ```

P0 Gate：

> 在无法解释 client bundle、theme registration、settings row、settings section、settings persistence、wallpaper delivery 六条链路前，不进入 P1。

---

# 32. P1 — Minimal Double-Face Plugin

实现：

- package.json；
- tsdown；
- Host entry；
- client entry；
- cordis.patch；
- 空的 Settings namespace；
- 一个最小 client smoke。

要求：

```bash
pnpm build
```

得到：

```text
lib/index.js
lib/client.js
```

检查 wrapper id。

**暂时不画明日香，不做复杂 UI。**

P1 Gate：

```text
DSH 可加载插件
client graph 中存在插件
浏览器无 React duplicate / module loader error
插件 remove 后 runtime 清理
```

---

# 33. P2 — Native Theme Registration

实现：

```text
asuka-school-light
asuka-school-dark
```

使用：

```text
ctx.theme.register()
```

不要 Wallpaper。

验收：

- 能通过开发调用切换 Light；
- 能切换 Dark；
- disposer 正常；
- 未启用时不改变现有 DSH；
- token 显示正确。

---

# 34. P3 — Native Settings Quick Row

实现：

```text
Settings → General → Asuka School
```

只含：

```text
Off
After Class
Tokyo-3 Night
```

要求：

- 原生 slot；
- locale；
- keyboard accessible；
- aria pressed/selected；
- 即时切换；
- Host 持久化；
- reload 恢复。

P3 Gate：

> **此阶段完成后，用户已经能在 DSH 原生 Settings 中实际控制 Asuka Light/Dark。**

---

# 35. P4 — Native Asuka School Section

实现：

```text
Settings → Asuka School
```

先加入：

- Theme；
- Wallpaper toggle（先可 disabled/placeholder）；
- Decorative Details；
- Reduce Motion；
- Reset。

要求：

QuickRow 与 Section：

```text
100% 同步
```

不能有双份 state。

---

# 36. P5 — Palette + Full Token Coverage

把视觉设计正式落 token。

工作：

- surface；
- text；
- border；
- brand；
- button；
- hover；
- sidebar；
- state；
- scrollbars；
- markdown；
- Shiki。

自动检查：

- token value 合法；
- light text contrast；
- dark text contrast；
- button contrast；
- input contrast；
- code contrast；
- selected state contrast。

最低：

```text
普通文字 >= 4.5:1
大文字 >= 3:1
```

---

# 37. P6 — Wallpaper Public Asset Pipeline

先用 placeholder image 验证技术链。

实现：

```text
Host read-only static asset route
↓
Browser wallpaper runtime
↓
Settings opacity / blur
```

安全测试：

- valid GET；
- valid HEAD；
- unknown file；
- traversal；
- POST；
- MIME；
- cache；
- dispose route。

P6 Gate：

> 不依赖 DSH 内部 DOM class，也能稳定显示右侧壁纸。

---

# 38. P7 — Asset Research / Generation

创建候选表。

若找到高质量 Pixiv / 官方原画：

- 记录；
- 评估；
- 未获再分发权 → PRIVATE / LOCAL_ONLY。

若无合适公开资产：

生成 6–12 张：

```text
校服明日香
东京-3学校 / 城市
手绘动画感
右侧人物
左侧留白
```

视觉 QA：

- 脸；
- 眼睛；
- 发色；
- 发夹；
- 校服；
- 手；
- 身体比例；
- 背景；
- UI-safe zone。

选 Light / Dark 各一张。

---

# 39. P8 — Wallpaper Visual Integration

将真实资产接入。

Settings：

```text
Wallpaper [on/off]
Opacity   [0–40%]
Blur      [0–20px]
```

Light / Dark 可有不同 recommended default。

至少截图：

```text
1920×1080
2560×1440
窄窗口
```

检查：

- 角色脸不被 Sidebar 吃掉；
- 输入框不压脸；
- 主阅读区不受干扰；
- Settings panel 仍清晰；
- modal / tooltip 仍清晰。

---

# 40. P9 — Distinctive Asuka Details

只添加通过架构审查的细节：

优先：

1. Asuka Red send/primary；
2. School Blue active state；
3. Hair Orange selection rail；
4. Theme settings header：
   ```text
   ASUKA // 02
   ```
5. 轻量 wallpaper transition；
6. code theme。

如果无稳定 slot：

- Thinking pulse → defer；
- EVA-02 progress → defer。

不做 hack。

---

# 41. P10 — Compatibility Matrix

必须实机组合：

| 组合 | 必测 |
|---|---|
| Theme only | ✅ |
| + Better Sidebar | ✅ |
| + dsh-context | ✅ |
| + Agent Teams | ✅ |
| + Damage Pulse | ✅ |
| 全部开启 | ✅ |

特别检查：

### Better Sidebar

- terminal；
- CodeMirror；
- Git diff；
- file explorer；
- browser；
- Markdown；
- side panel。

### dsh-context

- charts；
- tooltip；
- legend；
- history；
- context text。

### Agent Teams

- roster；
- task；
- running/done/error chips。

### Damage Pulse

- balance widget；
- whale-girl；
- drag；
- z-index；
- red charge；
- green recharge。

---

# 42. P11 — Ubuntu / WSL2 验证

目标环境：

```text
WSL2 Ubuntu
Node 24 via NVM
DSH 0.1.1-rc.2
Linux Chrome under WSLg
```

启动：

```bash
cd ~/workspace
dsh web --no-open
```

Chrome：

```bash
google-chrome http://127.0.0.1:3080
```

验证：

- Light / Dark；
- Settings；
- persistence；
- wallpaper；
- font；
- CJK；
- resize；
- browser refresh；
- DSH restart。

不得加入：

- PowerShell-only path；
- Windows registry；
- Windows file association；
- Electron-only API。

---

# 43. P12 — Lifecycle / Uninstall

运行时“干净卸载”的定义：

执行 remove 后不得存在：

- ThemeRuntime theme；
- override layer；
- wallpaper CSS；
- wallpaper route；
- Settings slot；
- event listener；
- timer；
- observable subscription。

注意：

> Host settings 文件中可能保留一个**未注册、无效的旧 namespace 数据段**；这不等于运行时残留。

因此提供：

```text
Reset Asuka Settings
```

用于用户在卸载前清除用户层设置。

不要承诺“卸载自动修改 settings.yaml 抹掉所有历史字节”，除非当前官方 API 明确支持且经测试。

---

# 44. P13 — Release Gate

发布前：

```bash
pnpm build
pnpm test
pnpm check
npm pack --dry-run
```

检查 tarball：

不得有：

- `assets/private/*`
- 未授权 Pixiv 图片
- 超大 PNG 原稿
- PSD
- credential
- `.env`
- 本地路径
- debug screenshot
- source cache

必须有：

- `lib/index.js`
- `lib/client.js`
- `cordis.patch.yml`
- public WebP
- license / asset attribution
- README。

---

# 45. 安装测试

使用干净 profile 测试。

推荐：

```bash
dsh plugin --profile web add ./dsh-asuka-school-theme
```

或本地 tgz。

发行版：

```bash
dsh plugin --profile web add dsh-asuka-school-theme@latest
```

然后完整重启 DSH Web。

原因：

> DSH client module 的插件集合与 package metadata 并非所有变化都能在当前进程中即时重新扫描；首次安装/移除后的正式验证应以重启为准。

---

# 46. Update / Remove

目标：

```bash
dsh plugin --profile web add dsh-asuka-school-theme@latest
```

用于更新。

移除：

```bash
dsh plugin --profile web remove dsh-asuka-school-theme
```

README 写清：

```text
安装后重启 Web profile
更新后重启
卸载后重启
```

不要把 HMR 开发行为当作生产安装行为。

---

# 47. 自动测试清单

## Theme

```text
[ ] light registration
[ ] dark registration
[ ] duplicate id protected
[ ] dispose light
[ ] dispose dark
[ ] active dispose fallback
[ ] token validity
```

## Controller

```text
[ ] default off does not hijack DSH
[ ] after-class sets light
[ ] tokyo3-night sets dark
[ ] external light selection turns Asuka mode off
[ ] external dark selection turns Asuka mode off
[ ] external system selection turns Asuka mode off
[ ] no event loop
[ ] reload restores active Asuka
```

## Settings

```text
[ ] namespace registration
[ ] schema range
[ ] QuickRow registration
[ ] Section registration
[ ] QuickRow ↔ Section sync
[ ] live update
[ ] persistence
[ ] reset
[ ] dispose
```

## Wallpaper

```text
[ ] toggle
[ ] opacity
[ ] blur
[ ] light asset
[ ] dark asset
[ ] asset 404
[ ] path traversal blocked
[ ] method restriction
[ ] route disposed
```

## Accessibility

```text
[ ] WCAG AA text
[ ] button contrast
[ ] focus visible
[ ] keyboard
[ ] reduced motion
```

---

# 48. Visual QA Checklist

每轮重要 UI 改动：

```text
[ ] 明日香是视觉重点，但不妨碍工作
[ ] 角色不压聊天文本
[ ] Sidebar 可读
[ ] Composer 可读
[ ] user / assistant 层次清楚
[ ] code block 可读
[ ] diff 可读
[ ] terminal 可读
[ ] Settings 原生感一致
[ ] Asuka QuickRow 易找到
[ ] Asuka School Section 易理解
[ ] Slider / Toggle 易读
[ ] Modal 不被壁纸污染
[ ] Tooltip 不被壁纸污染
[ ] Dark 不灰成一片
[ ] Light 不刺眼
[ ] 红色没有吞掉 error 语义
[ ] success 仍可识别
[ ] focus ring 可见
```

---

# 49. Screenshot Regression

保存：

```text
tests/visual/
├── light-home.png
├── light-chat.png
├── light-code.png
├── light-settings.png
├── dark-home.png
├── dark-chat.png
├── dark-code.png
├── dark-settings.png
├── all-plugins-light.png
└── all-plugins-dark.png
```

不要只比较像素差异。

Codex 必须使用视觉能力判断：

- 层次；
- 遮挡；
- 可读性；
- 构图；
- 角色位置；
- 语义状态。

---

# 50. 性能预算

目标：

```text
Client JS gzip：尽可能 < 150 KB（不含图片）
Light wallpaper：≤ 1.5 MB
Dark wallpaper：≤ 1.5 MB
Preview：≤ 300 KB / 张
```

避免：

- 在 client.js 内 base64 打包 3 MB 壁纸；
- 每次 render 重新计算大 token 表；
- MutationObserver；
- 高频 interval；
- 大面积 backdrop-filter 叠层。

---

# 51. Security

Host asset route：

- fixed allowlist；
- no path traversal；
- GET/HEAD only；
- no user-controlled absolute path；
- no arbitrary file read。

Custom wallpaper upload 若未来做 v1.1：

- 单独安全设计；
- size limit；
- MIME；
- image decode；
- owner-only file；
- 随机/固定受控文件名；
- 不直接接受浏览器给出的服务器路径。

---

# 52. Local Custom Image：v1.1 而非 v1.0 核心

为保持“薄插件”，v1.0：

```text
2 张公开默认壁纸
+
开发时可替换 assets/private
```

真正 GUI runtime upload：

```text
选择本地图片
压缩
持久化
删除
```

放入 v1.1。

原因：

> 图片上传本身会显著扩大 Host API、安全、持久化和测试范围，与“薄 Theme 插件”目标冲突。

---

# 53. README 必须包含

- Preview；
- Supported DSH version；
- Ubuntu / WSL2；
- Installation；
- Update；
- Uninstall；
- Settings path；
- Light / Dark；
- Wallpaper；
- Reset；
- Compatibility；
- Asset attribution；
- Privacy；
- Known limitations；
- Troubleshooting。

入口写成真实实现：

```text
Settings → General → Asuka School
Settings → Asuka School
```

---

# 54. 法务 / Fan Project 标记

README：

```text
Unofficial fan-made theme for DeepSeek Harness.
Not affiliated with DeepSeek, khara, Evangelion, or the original rights holders.
```

代码 license 可 MIT。

图片 license 独立：

```text
assets/LICENSE.md
```

不要用 MIT 暗示第三方角色图也被 MIT 许可。

---

# 55. Codex 的执行方式

**不要一次性写完整项目。**

严格：

```text
P0 Research
↓
P1 Package boot
↓
P2 Theme Runtime
↓
P3 Quick Settings row
↓
P4 Settings Section
↓
P5 Tokens
↓
P6 Wallpaper transport
↓
P7 Asset
↓
P8 Visual integration
↓
P9 Decorations
↓
P10 Compatibility
↓
P11 Ubuntu
↓
P12 Lifecycle
↓
P13 Release
```

每阶段：

```text
Implement
→ Build
→ Unit test
→ Start DSH
→ Browser inspect
→ Screenshot
→ Visual QA
→ Fix
→ Commit
```

---

# 56. Codex 必须遵守的红线

## 绝对禁止

```text
修改 DSH node_modules 核心文件
修改官方 ui-theme
修改官方 ui-settings
修改官方 ui-conversation
querySelector 内部 UI 组件
依赖 hashed CSS class
MutationObserver 修补 UI
替换 occupied single slot 来做皮肤
把第二份 React 打进 client bundle
把未经授权 Pixiv 图发到 npm
```

## 必须优先

```text
ThemeRuntime
Settings namespace
settingsScope
slots
locale
semantic tokens
Cordis lifecycle
CSS Modules / plugin-owned stylesheet
```

---

# 57. Git commit 建议

```text
chore: scaffold asuka school theme plugin
build: add dsh lazy-cjs client bundle
feat: register asuka light and dark themes
feat: add host-backed asuka settings namespace
feat: add native asuka quick settings row
feat: add native asuka settings section
feat: implement asuka semantic token palette
feat: theme shiki syntax colors
feat: add read-only wallpaper asset route
feat: add wallpaper runtime and controls
feat: add asuka visual accents
test: add theme and settings lifecycle coverage
test: add wallpaper route security checks
test: add contrast gates
docs: document assets and redistribution policy
release: prepare v1.0.0
```

---

# 58. v1.0 Definition of Done

必须全部满足：

## Architecture

```text
[ ] 标准 DSH Host + Client 双面插件
[ ] 无 DSH 核心修改
[ ] 无内部 DOM selector hack
[ ] 正确 lazy-CJS client artifact
[ ] 无 duplicate React
```

## Theme

```text
[ ] Asuka School Light
[ ] Asuka School Dark
[ ] DSH ThemeRuntime register
[ ] Theme disposer
[ ] full semantic token audit
[ ] Shiki
```

## Native Settings

```text
[ ] General 快捷 Asuka School 行
[ ] 原生 Asuka School Settings Section
[ ] Host settings namespace
[ ] browser settingsScope
[ ] 即时同步
[ ] 重启持久化
[ ] reset
```

## Theme coexistence

```text
[ ] 安装默认不劫持外观
[ ] Asuka 可主动开启
[ ] 官方 Light/Dark/System 可随时抢回控制
[ ] 无 theme/change 循环
```

## Wallpaper

```text
[ ] Public Light asset
[ ] Public Dark asset
[ ] 受控 static route
[ ] Opacity
[ ] Blur
[ ] Toggle
[ ] Gradient readability mask
```

## Visual

```text
[ ] 校服蓝
[ ] 明日香红
[ ] 发色橙
[ ] 右侧人物
[ ] ASUKA // 02 设置页细节
[ ] Code readability
[ ] WCAG AA
[ ] Reduced motion
```

## Compatibility

```text
[ ] Ubuntu / WSL2
[ ] Linux Chrome
[ ] Better Sidebar
[ ] dsh-context
[ ] Agent Teams
[ ] Damage Pulse
```

## Release

```text
[ ] no private artwork
[ ] no unauthorized artwork
[ ] prebuilt package
[ ] npm pack clean
[ ] install
[ ] update
[ ] remove
[ ] restart validation
```

---

# 59. 最终架构图

```text
DeepSeek Harness
│
├── ThemeRuntime
│     │
│     ├── asuka-school-light
│     └── asuka-school-dark
│
├── User Settings Seam
│     │
│     └── namespace: asuka-school-theme
│            ├── mode
│            ├── wallpaperEnabled
│            ├── wallpaperOpacity
│            ├── wallpaperBlurPx
│            ├── decorativeDetails
│            └── reduceMotion
│
├── Native Settings UI
│     │
│     ├── General
│     │     └── AsukaQuickRow
│     │
│     └── Asuka School
│           └── AsukaSection
│
├── Client Theme Controller
│     │
│     ├── settingsScope
│     ├── theme/change
│     ├── ThemeRuntime
│     └── WallpaperRuntime
│
├── Host static asset route
│     │
│     ├── asuka-after-class.webp
│     └── asuka-tokyo3-night.webp
│
└── Existing ecosystem
      ├── Better Sidebar
      ├── dsh-context
      ├── Agent Teams
      └── Damage Pulse
```

---

# 60. 最终工程判断

本项目的**主题核心、原生 Settings、Ubuntu 支持、插件安装与卸载均有明确 DSH 架构支撑**，不是依赖“网页能改 CSS，所以应该能做”的投机实现。

最大的三个技术风险已经可以明确控制：

### 风险 A：DSH 仍处 RC

处理：

```text
固定兼容基线
+
P0 架构重审
+
版本漂移测试
```

### 风险 B：外部 client bundle 格式

处理：

```text
复现官方 lazy-CJS factory
+
显式 external platform dependencies
+
禁止第二份 React
+
预构建发布
```

### 风险 C：Wallpaper 不属于纯 ThemeRuntime

处理：

```text
先查 additive 官方 seam
否则
固定白名单 Host asset route
+
插件自有 document-level background CSS
+
零内部 selector
```

因此 Codex 可以开始实现。

**推荐首个里程碑不是“先找明日香图片”，而是：**

```text
P0 → P1 → P2 → P3
```

完成后必须达到：

> 在 WSL2 Ubuntu 的 DSH Web 中，安装插件 → 打开原生 Settings → 看到 Asuka School 快捷行 → 选择 After Class / Tokyo-3 Night → Light/Dark Theme Token 立即生效 → 重启 DSH 后选择仍恢复。

只有这个基础闭环通过，才进入 Wallpaper 和图片资产阶段。

---

# 61. 本次架构审查参考链接

## DeepSeek Harness 官方

- https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/package.json
- https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/client/ui-theme/src/client/index.ts
- https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/client/ui-theme/src/client/AppearanceRow.tsx
- https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/client/ui-theme/README.md
- https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/client/ui-settings/src/client/contract/slots.ts
- https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/client/ui-settings-general/src/client/index.ts
- https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/client/ui-settings-general/README.md
- https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/cookbook/adding-a-settings-card.md
- https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/settings.md
- https://github.com/deepseek-ai/deepseek-harness/blob/master/.agents/notes/implemented/architecture/2026-08-12-plugin-owned-settings-surface.md
- https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/client-modules.md
- https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/client/AGENTS.md
- https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/web-styling.md
- https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/client/ui-sidebar/src/client/contract/slots.ts

## 社区参考

- https://github.com/RevolutionLA/dsh-dream-skin
- https://github.com/RevolutionLA/dsh-dream-skin/blob/main/package.json
- https://github.com/RevolutionLA/dsh-dream-skin/blob/main/lib/index.js
- https://github.com/RevolutionLA/dsh-dream-skin/blob/main/docs/themes-spec.md
- https://github.com/nevertoday/dsh-theme-plugin
- https://github.com/nevertoday/dsh-theme-plugin/blob/main/tsdown.config.ts
- https://github.com/nevertoday/dsh-theme-plugin/blob/main/package.json

---

**文档用途**：将本文件直接提供给 Codex 作为开发总计划。在实际开发时，若当前 DSH 源码与本文出现差异，**以当前官方源码和安装版本为准，先更新 `docs/ARCHITECTURE-AUDIT.md`，再继续实现。**
