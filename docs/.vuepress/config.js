const { fs, path } = require('@vuepress/shared-utils');

module.exports = ctx => ({
  dest: '.site',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'TuTou123com',
      description: '全栈技术——为技术② 发烧'
    }
  },
  head: [
    ['link', { rel: 'icon', href: `/logo.png` }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
    [
      "script",
      {
        "data-ad-client": "ca-pub-2245427233262012",
        async: true,
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      }
    ]
  ],
  theme: '@vuepress/default',
  themeConfig: {
    repo: 'vuejs/vuepress',
    editLinks: true,
    docsDir: 'packages/docs/docs',
    // #697 Provided by the official algolia team.
    algolia: ctx.isProd ? ({
      apiKey: '3a539aab83105f01761a137c61004d85',
      indexName: 'vuepress'
    }) : null,
    smoothScroll: true,
    locales: {
      '/': {
        label: '简体中文',
        selectText: '选择语言',
        ariaLabel: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        nav: require('./nav/zh'),
        sidebar: {
          '/api/': getApiSidebar(),
          '/guide/': getGuideSidebar('八股文', '分章节'),
          '/plugin/': getPluginSidebar('插件', '介绍', '工具'),
          '/theme/': getThemeSidebar('主题', '介绍')
        }
      }
    }
  },
  plugins: [
    ['@vuepress/back-to-top', true],
    ['@vuepress/pwa', {
      serviceWorker: true,
      updatePopup: true
    }],
    ['@vuepress/medium-zoom', true],
    ['@vuepress/google-analytics', {
      ga: 'UA-128189152-1'
    }],
    ['container', {
      type: 'vue',
      before: '<pre class="vue-container"><code>',
      after: '</code></pre>'
    }],
    ['container', {
      type: 'upgrade',
      before: info => `<UpgradePath title="${info}">`,
      after: '</UpgradePath>'
    }],
    ['flowchart']
  ],
  extraWatchFiles: [
    '.vuepress/nav/zh.js'
  ]
});

function getNotesBar() {
  return [
    {
      title: '职场故事',
      collapsable: false,
      children: [
        '',
        '程序员和数学',
        'using-a-theme',
        'writing-a-theme'
      ]
    }
  ]
}

function getApiSidebar () {
  return [
    'cli',
    'node'
  ]
}

function getGuideSidebar (groupA, groupB) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        ['', groupB],
        '1.数据结构',
        '2.JAVA基础',
        '3. 集合面试总集',
        '4.MySQL',
        '5.多线程',
        '6.Redis',
        '7.微服务架构',
        // '8.nginx_jwt_maven_git',
        // 'getting-started',
        // 'directory-structure',
        // 'basic-config',
        // 'assets',
        // 'markdown',
        // 'using-vue',
        // 'i18n',
        // 'deploy'
      ]
    }
  ]
}

const officalPlugins = fs
  .readdirSync(path.resolve(__dirname, '../plugin/official'))
  .map(filename => 'official/' + filename.slice(0, -3))
  .sort();

function getPluginSidebar (pluginTitle, pluginIntro, officialPluginTitle) {
  return [
    {
      title: pluginTitle,
      collapsable: false,
      children: [
        ['', pluginIntro],
        'using-a-plugin',
          "1.der",
          "2.ww"
      ]
    },
    {
      title: officialPluginTitle,
      collapsable: false,
      children: officalPlugins
    }
  ]
}


function getThemeSidebar (groupA, introductionA) {
  return [
    {
      title: groupA,
      collapsable: false,
      sidebarDepth: 2,
      children: [
        ['', introductionA],
        'using-a-theme',
        'writing-a-theme',
        'option-api',
        'default-theme-config',
        'blog-theme',
        'inheritance'
      ]
    }
  ]
}
