# DSH Store review / 商店审查说明

Author disclosure for plugin `3.2.2` (DSH `0.2.0-rc.2`),
2026-10-01. This is a bounded source/dependency review, not an independent
supply-chain certification or marketplace approval.

本说明对应 [DSH Store #1195](https://github.com/AI-Scarlett/DSH-Store/issues/1195)。
它说明当前实现与审查边界，不代表商店已获批，也不替代依赖的独立供应链审查。

## Identity, package and lifecycle / 身份、发布内容和生命周期

- Canonical repository: [Yyyyyylor/dsh-asuka-school-theme](https://github.com/Yyyyyylor/dsh-asuka-school-theme).
- Package: `dsh-asuka-school-theme`; Host entry ID: `asuka-school-theme`.
  `dsh.bundle.patch` points to the exported, package-relative `./cordis.patch.yml`.
  The patch only inserts this entry; it never disables or replaces official entries.
- Client factory ID: `dsh-asuka-school-theme`; target: DSH Web. Settings slots
  are additive; header-action ID: `asuka-session-title-editor`.
- No `preinstall`, `install`, `postinstall` or `prepare` scripts. `lib/` is
  prebuilt and committed, including Host JS, lazy-CJS Client JS and declarations.
- `files` includes only `lib/`, the three `assets/public/*.webp`, artwork notice,
  Bundle Patch, bilingual READMEs, this disclosure and MIT `LICENSE`.
  Private assets, tests, build scripts, lockfile, historical tarballs and the
  other internal documents are excluded from the installation package.
- MIT covers source; [artwork notice](assets/LICENSE.md) separately records
  generated image provenance and the fan-work/character-rights boundary.
- Styles, locale registrations, page policy, slots, subscriptions, timers and
  asset routes are removed through Cordis effects or owned disposers.

包的身份、入口、许可和安装期脚本均可静态核对；安装不依赖执行构建。
安装包不会包含私有素材。客户端不替换宿主组件，卸载会恢复捕获的原外观。

## Dependency review / 依赖审查

| Kind / 类型 | Exact scope / 实际范围 | Purpose and review boundary / 用途与审查边界 |
| --- | --- | --- |
| Runtime dependency / 运行依赖 | `@deepseek-ai/schemastery` **3.18.4** | Host Config validation. Exact pin replaces the previous caret range. Its published manifest is MIT and has no install lifecycle scripts. / 验证 Host 配置；锁定实际核对的版本。 |
| Runtime transitive / 传递运行依赖 | `@deepseek-ai/cosmokit` **1.8.5**, `@standard-schema/spec` **1.1.0**, resolved by `pnpm-lock.yaml` with integrity hashes | Schemastery's declared utility/schema dependencies; published manifests are MIT, without lifecycle scripts. Cosmokit has no dependencies; standard-schema is a type contract. / 工具与 schema 协议，具体解析值与完整性记录可复核。 |
| Host/Client peers / 宿主依赖 | Cordis `~4.0.4`; DSH peers **0.2.0-rc.2** | Host settings/WebServer; Client renderer, session controller/UI, conversation, locale, settings/general, theme; platform-seeded store/slots and session types. Optional peer metadata avoids installing a second official component graph. These services are still required on the Web runtime paths that use them. / 由 DSH 提供；optional peer 不表示缺少必要服务时仍可启用。 |
| Development only / 仅开发 | DSH/Cordis type and test packages, React/test renderer, Zustand/Immer, TypeScript, esbuild, tsdown, Vitest and type declarations | Build and automated checks only. These are not plugin runtime dependencies; React and all `@deepseek-ai/*` remain external in Client JS. / 不在客户端打包第二份 React，不把 Host schema 打进 Client。 |

The direct runtime dependency's published JS and manifests were inspected for
its schema-validation role; the resolved graph and lockfile integrity values
are available for separate review. This does not verify publisher accounts,
registry compromise, every future transitive resolution, or every toolchain
package. npm/Git installers may resolve transitive ranges anew: retaining the
lockfile in the source repository is evidence, not a promise that all installers
will honor it. There are no `optionalDependencies`.

运行依赖与开发工具分开记录。精确锁定直接运行依赖并保留 lockfile，不能消除第三方
包发布、传递依赖范围及安装器解析方式的供应链风险；DSH Store 的单独审查仍待完成。

## Capabilities and failure bounds / 权限、用途和失败边界

| Signal / 信号 | Source and purpose / 来源与用途 | Bound and failure / 边界与失败表现 |
| --- | --- | --- |
| Files: package read / 包内文件读取 | `src/index.ts` / built `lib/index.js`: `access`, `stat`, `createReadStream` read three WebPs | Filenames come only from the fixed allowlist, relative to the plugin package. Requests never become file paths. Missing/non-file/inaccessible assets return 404 before streaming; a later I/O failure can interrupt the response. No arbitrary file reads or writes by the asset handler. / 只读三张包内壁纸，路径不可由请求控制。 |
| Network: DSH HTTP routes / DSH HTTP 路由 | `ctx.webServer.register`: three exact `/asuka-school/assets/*.webp` routes; browser `Image.src`/preload uses those same-origin paths | GET/HEAD only; other methods return 405, allowlisted paths only, WebP MIME, immutable cache, `nosniff`. The plugin opens no listener itself: exposure inherits the DSH server's bind address, including LAN exposure if the operator configures it. These public images contain no user data. / 不另开端口，不连接第三方图片服务。 |
| DSH settings / DSH 设置写入 | Host volatile Config; `ctx.configForms.get('asuka-school-theme')` reads and edits seven scalar preferences | DSH owns profile patch persistence, revision fencing, validation and rollback. The ID and fields are retained; DSH migrates old `settings.yaml` sections to this entry and keeps `.imported` as its migration record. Refused scene writes restore accepted values; missing settings retain the existing loading/unavailable UI. / 不直接编辑其他配置或用户文件。 |
| Session title / 会话标题写入 | Only the explicit edit action calls `ctx.sessions.binding(id)?.session.rename(title)` | Current session only, user-supplied title; DSH owns persistence/transport. Missing binding and RemoteResult refusal become the existing localized editor error; pending, IME, keyboard and focus semantics are retained. / 不读取或上传消息正文，不操作其他会话。 |
| Browser appearance / 浏览器外观 | Plugin-owned styles, theme token projection and wallpaper layers | Off/unload restores the captured DSH baseline. Failed wallpaper decode retains the previous layer (or the base appearance if none succeeded); stale loads and preload cancellation remain. No `localStorage` preference store. / 不改写官方 Light/Dark/System 偏好。 |

The plugin uses DSH's existing browser-to-Host transport for settings and title
edits. It connects to **no third-party service**, sends **no uploads or
telemetry**, reads **no credentials**, and spawns **no commands or subprocesses**.
Downloading the plugin/dependencies at installation is separate from plugin
runtime traffic. Image generation was a development-time activity; no image
generation API or key is used at runtime.

插件不连接第三方服务、不上传数据、不收集遥测、不读取凭据、不启动命令或子进程。
files/network 信号是真实能力，不能声明为 none。考虑到 DSH 设置和会话标题会改变
持久状态，商店权限汇总宜保守评估为 high；这是作者的审查建议，不是已写入商店的状态。
本项目没有发明 `dsh.permissions` 等未经支持的 manifest 字段。

## Evidence and next gate / 证据与下一步

- Current interface evidence and test boundaries: [COMPATIBILITY.md](docs/COMPATIBILITY.md).
- Review contract: [DSH Store registry guide](https://github.com/AI-Scarlett/DSH-Store/blob/main/registry/README.md).
- Previous v3.1.0 read-only preflight: [build-dsh-plugin](https://github.com/AI-Scarlett/build-dsh-plugin),
  inspected at commit `16393774a52bf93c02ebd461d1fee426a3b3ac83`.
  One `audit-marketplace-entry.mjs` run returned `direct` /
  `READY_FOR_CATALOG_ENTRY`, without structural errors, blockers or warnings.
  No catalog entry/registry was supplied; this does not run the Store's bounded
  runtime source scanner or independent dependency/security approval. It has not
  been rerun for this 0.2.0-rc.2 release baseline.
- Local checks do not prove the default branch's fixed Commit, Store source
  review, dependency supply-chain approval, Registry CI, or public listing.
  No Store catalog, issue comment or real user profile is modified by this task.
- Once these changes reach the canonical default branch, Store automation can
  inspect the new fixed Commit. Capability/dependency gates may still require
  `user-reviewed` or retain `blocked`. Declarations alone cannot promise approval.

源码、自动测试、隔离 Host 和商店复检分别验收。当前工作只在本地提交，没有推送；
商店尚不能读取本次提交，也没有本次安装、卸载或精确回滚的完整多版本验收证据。
