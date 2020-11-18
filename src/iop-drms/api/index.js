const context = '/iop/drms/'
const contextIop = '/iop/'
const test = '/test/'
const path = {
  server: {
    openData: {
      table: context + 'server/open-data',
      serTable: context + 'server/open-data/service-list',
      tree: context + 'server/open-data/catalog-data',
      servTree: context + 'server/open-data/catalog-service',
      treeAll: context + 'server/open-data/tree-all',
      getData: context + 'server/open-data/:id',
      // 数据集和数据目录的查询区域
      objectDomain: '/iop/drms/server/open-data/object-domain/object',
      // 接口服务的查询区域
      serviceDomain: '/iop/drms/server/open-data/object-domain/service'
    },
    serv: {
      // 最上面详情
      table: context + 'server/open-data/:id',
      // 中间
      methList: '/iop/serv/method/list/:id',
      // 最下面
      meth: '/iop/serv/para/list/:id',
      // 再往下
      para: '/iop/serv/para/:id'
    }
  },
  manage: {
    catalog: {
      form: `${context}` + 'catalog',
      allList: context + 'catalog',
      add: context + 'catalog',
      query: context + 'catalog/:id',
      modif: context + 'catalog/:id',
      delete: context + 'catalog/:id',
      tree: context + 'catalog/tree-all',
      asynTree: context + 'catalog/tree',
      rele: context + 'catalog/release-change/:id'
    },
    object: {
      form: `${context}` + 'object',
      allList: context + 'object',
      add: context + 'object',
      query: context + 'object/:id',
      modif: context + 'object/:id',
      delete: context + 'object/:id',
      tree: context + 'object/tree-all',
      asynTree: context + 'object/tree',
      file: context + 'object/file-list',
      rele: context + 'object/release-change/:id',
      releAll: context + 'object/release-all/:id',
      authTree: context + 'object/tree-other',
      codeTree: '/iop/base/code/tree-all',
      serv: `${context}object/object-service`,
      servTree: context + 'object/tree-serv-all',
      servRele: context + 'object/release-service/:id',
      rulesTree: context + 'rules/tree-all',
      // 修改分类
      cataChange: context + 'object/chang-catalog',
      // 上传
      import: context + 'object/upload',
      // 下载的树
      exportTree: context + 'object/tree-auth',
      // 导出
      exportObj: context + 'object/download/json'
    },
    attr: {
      form: `${context}` + 'attr',
      allList: context + 'attr',
      add: context + 'attr',
      query: context + 'attr/:id',
      modif: context + 'attr/:id',
      delete: context + 'attr/:id',
      tree: context + 'attr/tree-all',
      asynTree: context + 'attr/tree',
      attrTree: context + 'attr/attr-tree/:id'
    },
    desc: {
      form: `${context}` + 'desc',
      allList: context + 'desc',
      add: context + 'desc',
      query: context + 'desc/:id',
      modif: context + 'desc/:id',
      delete: context + 'desc/:id',
      tree: context + 'desc/tree-all',
      asynTree: context + 'desc/tree'
    },
    segment: {
      form: `${context}` + 'segment-object',
      allList: context + 'segment-object',
      add: context + 'segment-object',
      query: context + 'segment-object/:id',
      modif: context + 'segment-object/:id',
      delete: context + 'segment-object/:id',
      tree: context + 'segment-object/tree-all',
      asynTree: context + 'segment-object/tree'
    },
    rela: {
      form: `${context}` + 'object-relation',
      allList: context + 'object-relation',
      add: context + 'object-relation',
      query: context + 'object-relation/:id',
      modif: context + 'object-relation/:id',
      delete: context + 'object-relation/:id',
      tree: context + 'object-relation/tree-all',
      asynTree: context + 'object-relation/tree'
    },
    rules: {
      form: `${context}` + 'rules',
      allList: context + 'rules'
    },
    auth: {
      table: context + 'auth',
      tree: contextIop + 'system/dept/tree',
      save: context + 'auth/save-auth',
      treeAttr: context + 'auth/tree-attr',
      treeManage: context + 'auth/tree-manage',
      treeVisit: context + 'auth/tree-visit'
    }
  },
  drmsAuth: {
    list: context + 'drms-auth',
    tree: context + 'drms-auth/tree-all'
  },
  resource: {
    list: `${context}data-manage/object/list`,
    tabList: `${context}catalog/tree`,
    constructList: `${context}data-manage/construct-list`,
    constructForm: `${context}data-manage/construct-form`,
    getSelectorName: `${context}data-manage/data/obj`,
    getRelationList: `${context}object-relation/relation-list`,
    getAnalysis: `${context}data-manage/data/analysis`,
    getDimesionList: `${context}attr/attr-dict`,
    doAddToMenu: `/iop/system/program/release-drms-obj-menu`
  },
  portal: {
    // 数据资源数量
    objCount: context + 'portal/object/count',
    // 服务接口数量
    serCount: context + 'portal/service/count',
    // 接入平台数量
    count: context + 'portal/app/count',
    // 接口调用数量
    cal: context + 'portal/service/cal/count',
    // 访问热度
    appHot: context + 'portal/app/hot',
    // 最新数据
    objNew: context + 'portal/object/list/new',
    // 最热数据
    objHot: context + 'portal/object/list/hot',
    // 柱状容量
    dataBar: context + 'portal/data/bar',
    // 柱状数据
    objBar: context + 'portal/object/bar',
    // 饼状数据
    objPie: context + 'portal/object/pie'
  },
  dataManage: {
    searchList: contextIop + 'system/dbjndi',
    importTablesMeta: context + 'meta-data/import-tables-meta',
    saveResource: context + 'meta-data/meta-trans-resource'
  },
  zhuangfa: {
    upload: test + 'zf/upload/file',
    // 链接本地 test
    table: test + 'zf/upload/data-count',
    getInfo: test + 'zf/upload/get-index',
    dataSummaryTree: test + 'zf/upload/get-tree/'
  }
}
export default path
