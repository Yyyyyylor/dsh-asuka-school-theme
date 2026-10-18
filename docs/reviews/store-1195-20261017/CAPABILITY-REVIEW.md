# #1195 文件与同源资源路由能力审核

审核日期：2026-10-17。审核人：Codex，受项目作者委托；不是 DSH Store 维护者。

**结论：所审固定源码的能力用途与边界明确，建议接受受限 high 权限记录；这不是商城已登记通过。**
供应链审核仍有待裁定项，因此本项建议不会单独解除 block。

## 固定对象和覆盖

- 插件版本：3.2.2，固定提交 [`5173509ca8249141f6a64e2449d2b46bf813f8d1`](https://github.com/Yyyyyylor/dsh-asuka-school-theme/commit/5173509ca8249141f6a64e2449d2b46bf813f8d1)。
- 商城规则：[`58b1dec62ad5d6e43d3c07b042d1455926471d71`](https://github.com/AI-Scarlett/DSH-Store/blob/58b1dec62ad5d6e43d3c07b042d1455926471d71/src/admission-review.mjs)。
- `bounded-source-v3` 分发面扫描：26/26 个文本文件，147,680 bytes，没有截断、预算跳过或未解析本地模块。
- 源码摘要：`f19a67a9a39262a6cd8b75569b9a4da08841123ecf070a5e7c3b970d7c1b738b`。
- 审核绑定：`8d0908d819aae48ae0ffe3d6b7a2684facc07fe1bedb8abd42982cf0f0ee0a35`，与商城当前条目完全一致。
- 商城有界规则扫描零 critical / warning 命中；这是固定源扫描结果，不等于独立安全审计或真实运行验收。

使用 `git cat-file` 获取原始 Git blob，核对文件尺寸、Git blob SHA-1 和 SHA-256。
不使用 Windows 工作区的 CRLF 转换字节冒充固定提交。
完整文件清单、静态信号和三张公开资产摘要见 [evidence.json](evidence.json)。
在机器扫描之外，追踪 Host 路由、Client 壁纸加载、设置写入、标题确认和卸载恢复的调用链。

## 能力调用链与边界

| 能力 | 入口 → 操作 | 边界与失败表现 |
| --- | --- | --- |
| 包内文件读取 | `apply()` → 固定 PUBLIC_ASSETS → package-relative URL → `access/stat/createReadStream` | 只读三张公开 WebP；请求参数不参与文件路径。缺失、非文件或预检拒绝返回 404；预检之后的流错误不保证被转换为 404 |
| 资源 HTTP 路由 | `ctx.webServer.register({kind: 'exact'})` → `/asuka-school/assets/<固定文件名>` | GET/HEAD；其他方法 405。WebP MIME、nosniff、immutable cache；不注册通配读取接口，不另开监听端口 |
| 浏览器资源请求 | `wallpaperAssetUrl(period)` → `Image.src` / CSS background | 只使用上述固定同源路径；失败保留原壁纸，取消/代次防护阻止陈旧加载覆盖新场景。未观察到第三方上报/上传 |
| 插件设置持久化 | `configForms.get('asuka-school-theme')` → controller → `settings.set/mutate` | 固定七个标量字段；Host Config 校验枚举、布尔、透明度/模糊范围。存储、验证及拒绝由 DSH 接口负责，不直接写 Profile 文件 |
| 会话标题持久化 | 用户编辑并确认 → `renameSessionTitle` → 当前 binding 的 `session.rename(title)` | 当前注入 sessionId、用户文本；没有绑定或服务拒绝会报错。没有标题输入进入 HTML 或代码执行器的调用链 |
| 浏览器外观 | 自有样式/壁纸/主题 token → Cordis disposer | Off/卸载恢复捕获的 token、移除自有节点、取消计时器和订阅；不持久改写官方主题偏好 |

固定源码入口：

- [Host 路由与方法检查](https://github.com/Yyyyyylor/dsh-asuka-school-theme/blob/5173509ca8249141f6a64e2449d2b46bf813f8d1/src/index.ts#L27)
- [固定壁纸资源映射](https://github.com/Yyyyyylor/dsh-asuka-school-theme/blob/5173509ca8249141f6a64e2449d2b46bf813f8d1/src/shared/wallpapers.ts)
- [Client 壁纸加载](https://github.com/Yyyyyylor/dsh-asuka-school-theme/blob/5173509ca8249141f6a64e2449d2b46bf813f8d1/src/client/wallpaper/runtime.ts)
- [设置协调与写入](https://github.com/Yyyyyylor/dsh-asuka-school-theme/blob/5173509ca8249141f6a64e2449d2b46bf813f8d1/src/client/controller.ts#L111)
- [当前会话标题写入](https://github.com/Yyyyyylor/dsh-asuka-school-theme/blob/5173509ca8249141f6a64e2449d2b46bf813f8d1/src/client/session-title/rename.ts#L5)
- [标题编辑确认入口](https://github.com/Yyyyyylor/dsh-asuka-school-theme/blob/5173509ca8249141f6a64e2449d2b46bf813f8d1/src/client/session-title/SessionTitleEditor.tsx)

## 建议权限记录

```json
{
  "level": "high",
  "files": "read-only",
  "network": "specified-services",
  "commands": "none",
  "credentials": ["none"]
}
```

files 是插件直接读包内公开资产的能力，不将 DSH 内部设置/标题存储误表述为插件任意文件写入。
由于插件会经宿主接口修改持久设置与会话标题，汇总等级仍保守为 high。
network 是现有 DSH 服务的固定公开路由与客户端请求，不应改成 none。
这一级别建议必须与固定源码绑定，未来改动不能自动继承。

## 信任假设与未验证范围

- 壁纸是有意公开的包内资产，不携带用户数据；没有单独鉴权不等于任意用户文件公开。
- “同源”描述浏览器请求目标，不代表服务仅对 localhost 开放。监听地址、LAN/公网暴露和传输保护继承 DSH 配置。
- 假设已安装包未被本机攻击者改写；`stat` 会跟随符号链接，不能把 allowlist 宣称为抵抗包目录篡改或所有 TOCTOU 的沙箱。
- 设置和标题通过宿主接口执行；本轮没有重新审计宿主的鉴权、事务、迁移、传输和磁盘实现。
- 没有执行目标插件、依赖、安装/构建脚本，没有启动真实 Profile、改名真实会话或调用模型。
- 未复测 Ubuntu/WSL、运行时故障、安装/卸载/回滚。商城 runtime/security audit 不得因此改成 verified。
- 依赖中的代码求值与来源问题由 [供应链审核](SUPPLY-CHAIN-REVIEW.md) 单独记录；本项结论不能覆盖它。

## 供维护者登记的提案

[capability-review-proposal.json](capability-review-proposal.json) 包含与 Store 记录字段相同的能力审核建议。
外层明确标记 `proposal-only-not-a-store-registry`、`appliedToStore: false`，审核人没有冒用商城维护者身份。
使用上述固定规则的 `validateAdmissionReviews()` 核对 record 字段，格式通过。
仅将能力提案送入 `admissionDecision()` 的本地模拟，结果仍为 **review-required**，符合供应链门禁尚未满足的事实。
本轮没有把该提案写入商城 registry，也没有改动 catalog 状态或冒签独立审核。
