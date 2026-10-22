# DSH Store #1195：3.3.0 复检材料

日期：2026-10-22。作者委托的制品核验与能力边界补充，不是 DSH Store 独立批准。
功能基线为 `793371b`；本材料随 `v3.3.0` 固定标签发布，不包括已撤回的第二轮 UI 重构。
最终完整 Commit 与 Release 制品摘要由 issue 回复和 Release 的 SHA256SUMS 提供。
[release-package-files.json](release-package-files.json) 同时记录实际发版 tarball 的 SHA-256
及全部 66 个发布文件摘要；其值不从 Windows CRLF 工作副本推断。

## 对应维护者剩余要求

[2026-10-15 回复](https://github.com/AI-Scarlett/DSH-Store/issues/1195#issuecomment-6195340069)
要求实际分发依赖树、精确版本、来源/完整性，以及文件和同源资源路由能力记录。
仓库地址不再是当前阻塞项。旧版 3.2.2 的
[供应链审核](../store-1195-20261017/SUPPLY-CHAIN-REVIEW.md) 与
[能力审核](../store-1195-20261017/CAPABILITY-REVIEW.md) 保留原固定源范围，不能自动批准新版本。

## 3.3.0 实际运行依赖

```text
dsh-asuka-school-theme@3.3.0
└─ @deepseek-ai/schemastery@3.18.5
   ├─ @deepseek-ai/cosmokit@~1.8.6 → 1.8.6
   └─ @standard-schema/spec@^1.1.0 → 1.1.0
```

当前 pnpm lockfile 与本轮隔离 npm 解析选择相同三个运行节点。隔离解析使用完整 manifest，
执行 `npm install --package-lock-only --ignore-scripts --omit=dev --omit=optional --legacy-peer-deps --no-audit --no-fund`；
没有创建 node_modules 或执行目标安装脚本。npm 锁文件同时记录开发解析，制品核验仅选择非 dev/optional 节点。
14 项 DSH/Cordis optional peers 由宿主提供，不属于这三个生产依赖，也未获供应链认证。
传递依赖仍是范围，Git/npm 安装不承诺使用仓库的 pnpm lockfile；未来新解析必须重新核对。

| 制品 | 文件数 | tarball SHA-256 |
| --- | ---: | --- |
| Schemastery 3.18.5 | 8 | `607d635582d0bdd87ff4b48a36fd0cc6de06786cd62ce69cda3f5604554f523e` |
| Cosmokit 1.8.6 | 25 | `02332c246aafba7f5f96246956e25e9693db91238a5105fde6d4e00c74036e78` |
| Standard Schema 1.1.0 | 7 | `a7cb7268be280ab518d450f8c3b07c86f23417225c0ab53691ed59b3067cceaf` |

[runtime-artifacts.json](runtime-artifacts.json) 保存三个精确 npm 元数据来源、SHA-512 SRI、
SHA-1、SHA-256、40 个归档文件摘要、manifest 依赖、许可、签名与逐项结果。
从 `registry.npmjs.org` 下载，归档路径和非符号链接检查通过；全部 5 个捕获的注册表签名
使用 npm 公布的 ECDSA 公钥验证通过。三个制品无安装生命周期脚本或 bin。
这些结果证明所取字节与注册表记录一致，不证明发布账号/构建链未受攻击。

Schemastery 的 1 个、Cosmokit 的 7 个发布 TypeScript 源文件与官方 DSH
[`dsh-v0.2.1-rc.2` / 687f282…](https://github.com/deepseek-ai/deepseek-harness/tree/687f282e8625c6b8d11ff58211a90524be2e4317/vendor)
逐字节相同；逐文件 URL 在证据中。未独立重建发布 JS，未验证 provenance 证书链/透明日志。
Schemastery 3.18.5 仍有 `new Function("return " + schema.callback)()`（发布 ESM/CJS 第 42 行，源文件第 276 行）。
插件 `src/settings.ts` 仅构造固定七字段 schema，用户偏好作为值验证；没有改写 schema 定义或传入字符串 callback 的调用链。
本次没有把这一能力定性为已证实漏洞，也不能把该依赖申报为全静态加载/执行。
是否接受该边界及来源证据，仍需维护者独立裁定。

## 当前能力记录

| 能力 | 对应实现与限制 |
| --- | --- |
| files / read-only | `src/index.ts` → 固定 PUBLIC_ASSETS → 包内三张 WebP；`access/stat/createReadStream`。请求不参与文件路径；不写用户文件。缺失/非文件/预检拒绝返回 404，预检后的流失败可能中断响应。包目录完整性与 TOCTOU 仍是信任边界。 |
| network / specified-services | DSH WebServer 注册三条 exact 同源壁纸路由，GET/HEAD，其他方法 405；WebP MIME、immutable cache、nosniff。客户端只请求固定路径；不另开端口，暴露范围继承 DSH bind/TLS 配置。 |
| 持久状态 | 现有 controller 经 ConfigForms 修改七字段偏好；用户确认后经 Session API 修改当前会话标题。DSH 拥有传输/存储；本插件不读取凭据或上传消息正文。 |
| 浏览器 GPU | `liquid-glass-gpu.ts` 只将几何光学数值写入离屏 canvas；PNG data URL 不包含页面截图。SVG 在浏览器合成器中采样真实背景，不读取到 JS、不上传。设备/验证失败回退 CPU/SVG；Off/disposal 释放资源、观察器和事件。 |
| commands / credentials | 插件运行时没有命令、子进程、凭据读取或第三方遥测。安装器下载依赖与插件运行时能力分别评估。 |

建议维持真实 `files: read-only / network: specified-services / commands: none / credentials: none`；
设置与标题会修改持久状态，汇总权限保守为 high。未伪造 manifest 权限字段、修改 Store registry 或声称 block 已解除。
Host 资源路由与七字段 schema 相比 `793371b` 没有变动。

## 结构与运行证据

[marketplace-preflight.json](marketplace-preflight.json) 来自官方建议的 build-dsh-plugin
固定工具提交 `153ac8c77a492c7a69f280325b68f35004b79640`：
`direct / READY_FOR_CATALOG_ENTRY`，结构 errors/warnings/blockers 均为空。
这是没有提供 Store catalog/entry 的结构预检，不等于固定源扫描、Registry CI、供应链批准或上架。

完整构建、测试、包检查与既有 Windows 0.2.1-rc.2 浏览器证据见
[COMPATIBILITY.md](../../COMPATIBILITY.md)。本次发版不扩大 DSH 兼容声明，
未复测 Ubuntu/WSL、真实模型流式回复、OS reduced motion 或所有第三方组合。
等待维护者针对最终固定 Commit 记录专项能力审查，并裁定运行依赖的代码求值、来源和解析绑定边界。
