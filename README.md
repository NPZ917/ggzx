## vue3 + ts

- node 16.20.0
- pnpm 8.6.6
- `pnpm create vue@3`
- ts + jsx + vue rotuer + pinia + eslint + prettier
- `pnpm i`

## 修改报错信息 + 自动打开浏览器

- `"dev": "vite --open",`
- tsconfig.app.json `{compilerOptions: {"moduleResolution": "node"}}`

## 添加 lint-staged + husky + commitlint 配置

- `git init`
- pnpm i -D husky
- npx mrm lint-staged

pnpm i @commitlint/config-conventional @commitlint/cli -D
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'

```js
// commitlint.config.cjs
module.exports = {
  // 继承的规则
  extends: ['@commitlint/config-conventional'],
  // 定义规则类型
  rules: {
    // type 类型定义，表示 git 提交的 type 必须在以下类型范围内
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能 feature
        'fix', // 修复 bug
        'docs', // 文档注释
        'style', // 代码格式(不影响代码运行的变动)
        'refactor', // 重构(既不增加新功能，也不是修复bug)
        'perf', // 性能优化
        'test', // 增加测试
        'chore', // 构建过程或辅助工具的变动
        'revert', // 回退
        'build' // 打包
      ]
    ], // subject 大小写不做校验
    'subject-case': [0]
  }
}
```

pnpm i cz-customizable -D

根目录 `.cz-config.cjs`

```js
// .cz-config.js
module.exports = {
  // 可选类型，和commitlint.config.js配置的规则一一对应
  types: [
    { value: 'feat', name: 'feat: 新功能' },
    { value: 'fix', name: 'fix: 修复' },
    { value: 'docs', name: 'docs: 文档变更' },
    { value: 'style', name: 'style: 代码格式(不影响代码运行的变动)' },
    {
      value: 'refactor',
      name: 'refactor: 重构(既不是增加feature，也不是修复bug)'
    },
    { value: 'perf', name: 'perf: 性能优化' },
    { value: 'test', name: 'test: 增加测试' },
    { value: 'chore', name: 'chore: 构建过程或辅助工具的变动' },
    { value: 'revert', name: 'revert: 回退' },
    { value: 'build', name: 'build: 打包' }
  ], // 消息步骤，正常只需要选择
  messages: {
    type: '请选择提交类型:', // customScope: '请输入修改范围(可选):',
    subject: '请简要描述提交(必填):', // body: '请输入详细描述(可选):',
    footer: '请输入要关闭的issue(可选):',
    confirmCommit: '确认使用以上信息提交？(y/n)'
  }, // 跳过问题：修改范围，自定义修改范围，详细描述，issue相关
  skipQuestions: ['scope', 'customScope', 'body', 'footer'], // subject描述文字长度最长是72
  subjectLimit: 72
}
```

```js
"config": {
  "commitizen": {
    "path": "./node_modules/cz-customizable/"
  }
}
```

tsconfig.node.json 报错，将 `"module": "ESNEXT"`, => `"module": "esnext"`
eslint 报错 module is xxx ` rules: {'no-undef': 'off'}`
