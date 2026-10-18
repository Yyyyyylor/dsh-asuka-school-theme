# #1195 运行依赖供应链审核

审核日期：2026-10-17。审核人：Codex，受项目作者委托；不是 DSH Store 维护者。

**结论：审阅已完成，制品完整性核验通过；目前不能签发符合商城格式的完整供应链通过记录。**
原因是依赖包含字符串代码求值、安装解析与原 lockfile 存在差异，且发布构建来源证明仍有明确边界。
这不是已证实的插件漏洞，也不是商城批准。未修改依赖、运行时代码、兼容版本或商城状态。

## 固定对象与规则

- 插件：`dsh-asuka-school-theme@3.2.2`。
- 唯一审阅对象：[5173509ca8249141f6a64e2449d2b46bf813f8d1](https://github.com/Yyyyyylor/dsh-asuka-school-theme/commit/5173509ca8249141f6a64e2449d2b46bf813f8d1)。不包含本地未发布的玻璃效果改动。
- 要求来源：[维护者 2026-10-15 回复](https://github.com/AI-Scarlett/DSH-Store/issues/1195#issuecomment-6195340069)。
- 审核规则：[DSH Store admission-review.mjs，58b1dec…](https://github.com/AI-Scarlett/DSH-Store/blob/58b1dec62ad5d6e43d3c07b042d1455926471d71/src/admission-review.mjs)。
- 商城绑定：`8d0908d819aae48ae0ffe3d6b7a2684facc07fe1bedb8abd42982cf0f0ee0a35`。
- 固定源码摘要：`f19a67a9a39262a6cd8b75569b9a4da08841123ecf070a5e7c3b970d7c1b738b`。

商城规则要求每个依赖节点具有不可变来源、逐文件摘要、完整覆盖、无安装脚本、静态模块加载和通过结论。
本报告保留不符合条件的事实，不构造虚假的 `complete: true / moduleLoading: static / securityVerdict: pass` 登记。

## 实际运行依赖树

固定 manifest 只有一个直接运行依赖，没有 optionalDependencies：

```text
dsh-asuka-school-theme@3.2.2
└─ @deepseek-ai/schemastery@3.18.4
   ├─ @deepseek-ai/cosmokit@~1.8.5
   └─ @standard-schema/spec@^1.1.0
```

| 证据 | Schemastery | Cosmokit | Standard Schema |
| --- | --- | --- | --- |
| 固定提交的 pnpm lockfile | 3.18.4 | 1.8.5 | 1.1.0 |
| 本轮隔离 npm 解析 | 3.18.4 | **1.8.6** | 1.1.0 |

使用原 manifest，在证据目录执行 `npm install --package-lock-only --ignore-scripts --omit=dev --omit=optional --legacy-peer-deps --no-audit --no-fund`。
只生成解析记录，没有创建 node_modules，没有执行安装、构建或目标代码。
`legacy-peer-deps` 将宿主提供的 peer 留在本次解析边界之外；这不是 DSH 安装或所有安装器的一致性保证。
原 lockfile 不属于插件分发 files，不能假定每个 Git/npm 安装器都会使用它。
生成锁文件的 SHA-256、实际解析的制品 URL、SRI 和依赖关系见 [evidence.json](evidence.json)。

Cordis/DSH 的 14 项 optional peer 由宿主提供；它们并非本次三个生产依赖节点，也没有被重新认证。
它们的版本声明不等于供应链审计通过。React、TypeScript、Vitest、esbuild 等是开发工具，未纳入第三方运行依赖通过范围。

## 制品完整性与来源

四个制品均从 `registry.npmjs.org` 的精确版本元数据取得，核对 tarball SHA-512、注册表 SHA-1、归档路径、逐文件 SHA-256、包身份、许可、依赖和生命周期脚本。
历史三个制品的 SRI 与固定 lockfile 一致；1.8.6 的 SRI 与新解析记录一致。共记录 65 个归档文件，清单和原始注册表签名见 [evidence.json](evidence.json)。

| 制品 | tarball SHA-256 |
| --- | --- |
| `@deepseek-ai/schemastery@3.18.4` | `da518e0b44fa27cdfbda9f798f7ab1ad3a055466bc2c030d0f6b2b86c9266d24` |
| `@deepseek-ai/cosmokit@1.8.5` | `9a4920c4c3f32490499a1566829345375ad6f64eaa756ee517c398a73fb4fe64` |
| `@deepseek-ai/cosmokit@1.8.6` | `02332c246aafba7f5f96246956e25e9693db91238a5105fde6d4e00c74036e78` |
| `@standard-schema/spec@1.1.0` | `a7cb7268be280ab518d450f8c3b07c86f23417225c0ab53691ed59b3067cceaf` |

使用 npm 当前公布的 ECDSA 公钥，验证签名消息 `name@version:dist.integrity`；捕获的 7 个注册表签名全部通过。
公钥 keyid 为 `SHA256:DhQ8wR5APBvFHLF/+Tc+AYvPOdTpcIDqOhxsBHRwC7U`。
签名与制品哈希证明所取制品与注册表记录一致，**不证明发布者账号未被入侵，也不证明构建过程可信**。

Schemastery 的 1 个发布 TypeScript 源文件、两个 Cosmokit 版本各 7 个发布 TypeScript 源文件，均与官方 DSH 固定提交
[`639ed015…`](https://github.com/deepseek-ai/deepseek-harness/tree/639ed015397290b3745d163aafe02ffee4aa3f84/vendor) 逐字节一致。
1.8.5 与 1.8.6 的 25 个归档文件中，仅 package.json 不同；其余 24 个文件，包括运行 JS，完全相同。
Schemastery 上游 manifest 的 `workspace:~` 被发布成 `~1.8.5`，属于已观察到的发布映射。

DeepSeek 的这些版本元数据没有 gitHead 或 provenance attestation，所以不能把源码相同推断为发布构建已被独立认证。
Standard Schema 的 npm attestation payload 指向
[`2c4e37f6…`](https://github.com/standard-schema/standard-schema/commit/2c4e37f6d92e7ddc1d0d0b6bab4173f1d8d41df1)，subject digest 与制品一致；该提交也对应 v1.1.0 tag。
本轮没有完成 Sigstore 证书链/透明日志的密码学验证，没有进行可重复构建。

## 代码与门禁结论

| 节点 | 观察 | 结论 |
| --- | --- | --- |
| Schemastery 3.18.4 | Host schema 验证；ESM/CJS 静态引用 Cosmokit，Standard Schema 是类型导入；字符串 callback 恢复使用 `new Function` | 需要商城裁定代码求值例外，不能登记为全静态 |
| Cosmokit 1.8.5 / 1.8.6 | 对象、数组、二进制编码、日期和 volatile 引用工具；无额外运行依赖 | 所审制品未观察到文件、网络、命令、凭据或代码加载行为 |
| Standard Schema 1.1.0 | ESM 入口为空；CJS 仅导出包装；类型声明 | 无运行依赖；非生命周期 build/lint 脚本未执行 |

四个制品均无 preinstall/install/postinstall/prepare、bin 或原生制品。
审阅了实际运行 JS 和 Schemastery/Cosmokit 源码对应关系；完整归档同时做路径、文件摘要和静态信号检查。
这不是漏洞数据库扫描、全生态审计、宿主组件审计或运行验收。

### SC-01：字符串回调恢复与全静态要求不兼容

固定上游 [Schemastery src/index.ts:276](https://github.com/deepseek-ai/deepseek-harness/blob/639ed015397290b3745d163aafe02ffee4aa3f84/vendor/schemastery/src/index.ts#L276)，
以及实际制品的 `lib/index.mjs:41`、`lib/index.cjs:42`，均包含 `new Function("return " + schema.callback)()`。
触发条件是将字符串 callback 作为 **schema 定义** 传给构造器。
插件 [src/settings.ts](https://github.com/Yyyyyylor/dsh-asuka-school-theme/blob/5173509ca8249141f6a64e2449d2b46bf813f8d1/src/settings.ts)
只构造固定七字段 schema，用户配置作为值验证，未发现进入该构造器分支的路径。
因此本报告不把它定性为已证实的可利用漏洞，但现行商城的 `moduleLoading: static` 条件不能如实满足。

### SC-02：传递范围会重新解析

本轮已经观察到 1.8.5 → 1.8.6，虽然运行文件相同，未来范围内的新制品不自动继承本次审阅。
商城需明确实际安装解析与制品摘要的绑定方式；若要求改变分发锁定方式，应在新的固定提交重新审核，不能事后声称旧提交已经锁住所有安装器。

### SC-03：来源证据的边界

注册表签名和源码逐字节匹配已核对；发布 gitHead、独立构建 provenance 和可重复构建仍未验证。
不得把未验证项目写为通过。

## 后续正式登记

需要商城维护者接受上述证据，并裁定 SC-01 / SC-02 / SC-03，或要求上游依赖/分发改动后审核新的固定提交。
在此之前保留 `blocked / review-required` 是诚实结果。结构化结论见 [supply-chain-review.json](supply-chain-review.json)。
本报告不改变 registry/admission-reviews.json，不签署商城维护者身份，不扩大 DSH 兼容范围。
