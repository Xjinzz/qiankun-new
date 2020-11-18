const context = '/iop/'
const path = {
  auth: {
    menus: context + 'auth/menu',
    logout: context + 'auth/logout',
    login: context + 'auth/login',
    info: context + 'auth/login/:token',
    captcha: context + 'auth/captcha',
    switch: context + 'auth/switch/:appCode',
    oldTokens: `${context}auth/old/tokens`
  },
  system: {
    // 服务
    serv: {
      index: context + 'serv/catalog-service', // 服务目录表格
      tree: context + 'serv/catalog-service/tree', // 服务目录树形
      servindex: context + 'serv/service', // 服务列表表格
      serviceTree: context + 'serv/catalog-service/tree', // 服务列表树
      methodIndex: context + 'serv/method', // 方法定义
      paramsIndex: context + 'serv/para', // 参数定义
      authIndex: context + 'serv/auth', // 服务授权
      batchPub: context + 'serv/service/pub-serv', // 批量发布
      batchUnPub: context + 'serv/service/unpub-serv', // 批量取消发布
      batchValide: context + 'serv/service/valide-serv', // 批量启用
      batchUnValide: context + 'serv/service/unvalide-serv', // 批量取消启用
      createToken: context + 'serv/auth/gen-token', // 生成token
      paramAuth: context + 'serv/auth-para', // 参数授权
      servImport: context + 'serv/service/import-serv-url', // 服务导入
      fileImport: context + 'serv/service/import-serv-file', // 文件上传导入
      batchAuth: context + 'serv/auth/batch-auth', // 批量授权
      batchDeleteAuth: context + 'serv/auth/batch-delete', // 批量清空授权
      batchDeleteService: context + 'serv/service/batch-delete', // 批量删除服务
      changeDir: context + 'serv/service/batch-change-dir' // 批量切换目录
    },
    // 日志列表
    log: context + 'system/log',
    logAll: {
      table: context + 'system/log',
      add: context + 'system/log',
      modify: context + 'system/log/:id',
      query: context + 'system/log/:id',
      delete: context + 'system/log/:id'
    },
    // 数据源定义列表
    dbjndi: {
      table: context + 'system/dbjndi',
      query: context + 'system/dbjndi/:id',
      modif: context + 'system/dbjndi/:id',
      add: context + 'system/dbjndi',
      delete: context + 'system/dbjndi/:id'
    },
    /**
     * 参数定义
     */
    userAttr: {
      index: `${context}system/user-attr`,
      tree: `${context}system/user-attr/tree`,
      copy: `${context}system/user-attr/copy-attr`,
      load: `${context}system/user-attr`,
      loadpval: `${context}system/user-attr/attr-user`,
      history: `${context}system/user-attr/user-val-his`,
      setup: `${context}system/user-attr/user-attr-val`,
      envi: `${context}system/user-attr/envi-attr-val`,
      dels: `${context}system/user-attr/:id`,
      delete: `${context}system/user-attr/attr-user/:id`,
      edit: `${context}system/user-attr/attr-user`,
      save: `${context}system/user-attr/attr-user/:id`,
      systemApp: `${context}system/app`,
      batchDelete: `${context}system/user-attr/attr-user/batch-delete`,
      detials: `${context}system/user-attr/attr-user/:id`,
      setdefin: `${context}system/user-attr/attr-defin`,
      clean: `${context}system/user-attr/clean-attr`,
      delParams: `${context}/system/user-attr/:id`,
      clatree: `${context}base/code/cla-tree`
    },
    /**
     * 接入管理
     */
    currency: {
      info: `${context}serv/access/info`,
      list: `${context}serv/app`,
      newadd: `${context}serv/app`,
      detail: `${context}serv/app/:id`,
      delete: `${context}serv/app/:id`,
      save: `${context}serv/access`,
      edit: `${context}serv/access/:id`,
      dopt: `${context}serv/adopt`
    },
    // 行政区划
    area: {
      index: `${context}base/area`,
      table: `${context}base/area`,
      query: context + 'base/area/:id',
      modif: context + 'base/area/:id',
      add: context + 'base/area',
      delete: context + 'base/area/:id',
      tree: `${context}base/area/tree`,
      moveTree: `${context}base/area/move-tree-note`
    },
    // 字典分类
    codecla: {
      index: `${context}base/codecla`,
      tree: `${context}base/codecla/tree`,
      allTree: `${context}base/codecla/tree-all`,
      moveTree: `${context}base/codecla/move-tree-note`
    },
    // 字典定义
    dict: {
      table: `${context}base/code`,
      query: context + 'base/code/:id',
      modif: context + 'base/code/:id',
      add: context + 'base/code',
      delete: context + 'base/code/:id',
      tree: `${context}base/code/tree`,
      code: `${context}base/code/dict`
    },
    /**
     * 字典定义
     */
    code: {
      index: `${context}base/code`,
      dict: `${context}base/code/dict`,
      detailByCode: `${context}base/code/info-code`
    },
    /**
     * 字典项
     */
    codeVla: {
      index: `${context}base/code-val`,
      tree: `${context}base/code-val/tree`
    },
    // 字典编码定义
    dictencode: {
      table: context + 'base/code-val',
      query: context + 'base/code-val/:id',
      modif: context + 'base/code-val/:id',
      add: context + 'base/code-val',
      delete: context + 'base/code-val/:id',
      tree: context + 'base/code-val/tree'
    },
    // 菜单管理
    program: {
      index: `${context}system/program`,
      table: context + 'system/program',
      query: context + 'system/program/:id',
      modif: context + 'system/program/:id',
      add: context + 'system/program',
      delete: context + 'system/program/:id',
      tree: context + 'system/program/tree',
      delAll: context + 'system/program/batchDelete',
      logLeve: context + 'system/program/log-level/:id',
      moveTree: `${context}system/program/move-tree-note`
    },
    // 皮肤管理
    skin: {
      index: `${context}system/skin`,
      table: context + 'system/skin',
      query: context + 'system/skin/:id',
      modif: context + 'system/skin/:id',
      add: context + 'system/skin',
      delete: context + 'system/skin/:id'
    },
    /**
     * 凭证定义
     */
    pubVoucher: {
      index: `${context}system/pub-voucher`
    },
    // 认证方式
    pubPolicyWay: {
      table: context + 'system/pub-policy-way',
      query: context + 'system/pub-policy-way/:id',
      modif: context + 'system/pub-policy-way/:id',
      add: context + 'system/pub-policy-way',
      delete: context + 'system/pub-policy-way/:id'
    },
    // 认证策略
    pubPolicyConf: {
      table: context + 'system/pub-policy-conf',
      query: context + 'system/pub-policy-conf/:id',
      modif: context + 'system/pub-policy-conf/:id',
      add: context + 'system/pub-policy-conf',
      delete: context + 'system/pub-policy-conf/:id'
    },
    /**
     * 统一机构
     */
    pubDept: {
      index: `${context}system/pub-dept`,
      tree: `${context}system/pub-dept/tree`,
      app: `${context}system/pub-dept/app-list/`,
      transfer: `${context}system/pub-dept/save-transfer`,
      merge: `${context}system/pub-dept/save-merge`,
      flag: `${context}system/pub-dept/set-flag`
    },
    /**
     * 统一机构管理员
     */
    pubDeptAdmin: {
      index: `${context}system/pub-dept-admin`,
      batch: `${context}system/pub-dept-admin/save-admin`
    },
    /**
     * 子系统机构(单位)
     */
    dept: {
      index: `${context}system/dept`,
      tree: `${context}system/dept/tree`,
      sync: `${context}system/dept/sync-dept`
    },
    /**
     * 统一人员
     */
    pubUser: {
      index: `${context}system/pub-user`,
      voucher: {
        index: `${context}system/pub-user-voucher`,
        loginName: `${context}system/pub-user-voucher/login-name`,
        phone: `${context}system/pub-user-voucher/phone`,
        pad: `${context}system/pub-user-voucher/pad`,
        reset: `${context}system/pub-user-voucher/reset-pwd`
      },
      job: `${context}system/pub-user-job`,
      app: {
        index: `${context}system/pub-user/app-list/`,
        batchRemove: `${context}system/pub-user/delete-app`
      },
      flag: `${context}system/pub-user/set-flag`
    },
    /**
     * 子系统用户
     */
    user: {
      index: `${context}system/user`,
      sync: `${context}system/user/sync-user`
    },
    administrators: {
      table: context + 'system/pub-dept-admin',
      add: context + 'system/pub-dept-admin',
      delete: context + 'system/pub-dept-admin/:id',
      deleteAdmin: context + 'system/pub-dept-admin/delete-admin',
      adminTable: context + 'system/pub-dept-admin/sel-user',
      addAdemin: context + 'system/pub-dept-admin/save-admin'
    },
    // 角色管理
    role: {
      table: context + 'system/role',
      add: context + 'system/role',
      query: context + 'system/role/:id',
      modif: context + 'system/role/:id',
      delete: context + 'system/role/:id',
      deptTree: context + 'system/role/dept/tree',
      funTree: context + 'system/role/base/tree',
      user: context + 'system/role/list/role/users',
      notrole: context + 'system/role/list/notrole/users',
      grant: context + 'system/role/grant/role/users',
      delUser: context + 'system/role/delete/role/users',
      roleRela: context + 'system/roleRela',
      roletable: context + 'system/roleRela',
      roleSelect: context + 'system/roleRela',
      roleDelete: context + 'system/roleRela/:id',
      roleModif: context + 'system/roleRela/:id',
      roleFunData: `${context}system/role/role/data`
    },
    /**
     * 用户与用户角色
     */
    userRole: {
      index: `${context}system/user-role`,
      table: context + 'system/user-role',
      list: context + 'system/user-role/list',
      add: context + 'system/user-role',
      editadd: context + 'system/user-role/save-job',
      query: context + 'system/user-role/:id',
      modif: context + 'system/user-role/:id',
      delete: context + 'system/user-role/list:id',
      tree: context + 'system/user-role/tree',
      roletree: context + 'system/user-role/auth-role-tree',
      saveall: context + 'system/user-role/save-all',
      treeall: context + 'system/user-role/tree-all',
      delall: context + 'system/user-role/batch-delete'
    },
    userList: {
      table: context + 'system/pub-user/app-list',
      appDelete: context + 'system/pub-user/delete-app',
      jobtable: context + 'system/pub-user/job-list',
      vouchertable: context + 'system/pub-user/voucher-list',
      deptTable: context + 'system/pub-user/dept-list',
      jobAdd: context + 'system/pub-user/save-job',
      jopDelete: context + 'system/pub-user/delete-job'
    },
    // 在线用户
    onlineUser: {
      index: `${context}system/pub-user/online`,
      tick: `${context}system/pub-user/online/tick`
    }
  },
  bpms: {
    engreg: {
      index: `${context}bpms/eng-reg`,
      add: context + 'bpms/eng-reg',
      query: context + 'bpms/eng-reg/:id',
      modif: context + 'bpms/eng-reg/:id',
      delete: context + 'bpms/eng-reg/:id'
    },
    // 流程定义
    definfo: {
      info: {
        index: `${context}bpms/def-info`,
        add: context + 'bpms/def-info',
        query: context + 'bpms/def-info/:id',
        modif: context + 'bpms/def-info/:id',
        delete: context + 'bpms/def-info/:id',
        getTree: context + 'bpms/def-info/tree',
        instances: context + 'bpms/def-info/instances', // 流程实例
        instancesActs: context + 'bpms/def-info/instance-acts' // 流程实例里的火哦的那个
      },
      // 流程定义 - 活动定义
      act: {
        index: `${context}bpms/act`,
        add: context + 'bpms/act',
        deleteAll: context + 'bpms/act/batch-delete'
      },
      defToEng: {
        index: `${context}bpms/def-to-eng`,
        table: `${context}bpms/def-to-eng`,
        query: context + 'bpms/def-to-eng/:id',
        add: context + 'bpms/def-to-eng',
        modify: context + 'bpms/def-to-eng',
        delete: context + 'bpms/def-to-eng'
      }
    },
    workflow: {
      index: `${context}bpms/workflow-binding`,
      table: `${context}bpms/workflow-binding`
    }
  },
  file: {
    // 模板类型
    types: {
      table: context + 'file/types',
      getTree: context + 'file/types/tree',
      // 关联物理库
      storeTreeCheck: context + 'file/store-ref-types/save-ref',
      storeTree: context + 'file/stores/type-refed-stores',
      storeList: context + 'file/store-ref-types/stores',
      // 模板
      template: context + 'file/type-template',
      tempDele: context + 'file/type-template/:id',
      // 生命周期
      lifecycle: context + 'file/lifecycle',
      lifeSwitch: context + 'file/lifecycle/switch-version-status/:id',
      operation: context + 'file/operation/re-binding',
      // 关联逻辑
      ctlgsList: context + 'file/catalogs/type-refed-ctlgs',
      ctlgsTree: context + 'file/catalogs/root-ctlgs',
      ctlgsTreeCheck: context + 'file/catalogs/save-types',
      // 开关
      tempSwitch: context + 'file/type-template/switch-status/:id',
      fileSwitch: context + 'file/types/switch-attr-status/:id'
    },
    // 非结构化数据库
    stores: {
      table: context + 'file/stores',
      getTree: context + 'file/stores/tree',
      // 关联文档类型
      typeList: context + 'file/store-ref-types/types',
      typeTree: context + 'file/types/store-refed-tree',
      treeCkeck: context + 'file/store-ref-types/save-ref',
      // 物理目录
      mappingList: context + 'file/typeMapping',
      mappingFormTree: context + 'file/types/store-refed-types-tree',
      // 文件发布
      refedList: context + 'file/publish-cfg/store-refed',
      refedRemove: context + 'file/publish-cfg',
      // 统计概览
      analysis: context + 'file/stores/analysis/:id',
      getDefiList: context + 'drms/attr/attr-tree/'
    },
    // 非结构化数据
    files: {
      filesTotal: context + 'file/stores/analysis-total',
      filesTree: context + 'file/files/hdfs-folder-tree',
      // 删除
      filesDelete: context + 'file/files/delete-hdfs-files',
      // 物理视图
      physicsList: context + 'file/files/list-hdfs-files',
      // 统计按钮
      folder: context + 'file/files/show-hdfs-folder-summary',
      // 重命名
      filesRename: context + 'file/files/rename-hdfs-file',
      // 新建文件夹
      filesAdd: context + 'file/files/make-hdfs-dir',
      // 移动文件夹
      filesMove: context + 'file/files/move-hdfs-files',
      // 合并文件夹
      filesMerge: context + 'file/files/merge-hdfs-folders',
      // 导出
      filesExport: context + 'file/files/export-hdfs-files',
      // 下载
      filesDown: context + 'file/files/download-hdfs-file',
      // 上传
      filesImport: context + 'file/files/import-hdfs-files',
      // 业务视图
      businessList: context + 'file/files',
      // 关联文件
      refedList: context + 'file/files/list-refed-files',
      // 生命周期
      lifecycleList: context + 'file/lifecycle-records'
    },
    catalogs: {
      table: context + 'file/catalogs/list-document-libs',
      add: context + 'file/catalogs',
      query: context + 'file/catalogs/:id',
      modify: context + 'file/catalogs/:id',
      delete: context + 'file/catalogs/:id',
      fileTree: context + 'file/catalogs/tree',
      menuTree: context + 'system/program/tree',
      issue: context + 'system/program/release-file-catalog-menu'
    },
    source: {
      index: context + `file/publish-cfg/ctlg-refed`
    },
    manage: {
      index: context + 'file/catalogs/files',
      tree: context + 'file/catalogs/folders',
      add: context + 'file/catalogs',
      statistics: context + 'file/catalogs/analysis',
      putName: context + 'file/catalogs/rename',
      putFileName: context + 'file/files/rename',
      fileUpload: context + `file/files/batch-upload`,
      delFiles: context + `file/files/file-delete`,
      download: context + `file/files/download`,
      moveTree: context + `file/catalogs/tree`,
      move: context + `file/catalogs/move-files`,
      batchDel: context + `file/catalogs/delete-files`,
      merge: context + `file/catalogs/merge-folder`
    },
    fileTypes: {
      index: context + 'file/types/ctlg-refed-types',
      treeUrl: context + 'file/types/ctlg-refed-tree',
      saveType: context + 'file/catalogs/save-types'
    },
    // files: {
    //   table: context + 'file/files/list-document-libs',
    //   add: context + 'file/files',
    //   modify: context + 'file/files/:id'
    // },
    publishCfg: {
      table: context + 'file/publish-cfg',
      index: context + 'file/publish-cfg',
      storesTree: context + 'file/stores/tree' // 源文件库地址
    }
  },
  app: {
    app: context + 'system/app'
  },
  application: {
    application: context + 'system/application'
  },
  msg: {
    recipient: {
      table: context + 'msg/recipient',
      add: context + 'msg/recipient',
      modify: context + 'msg/recipient/:id',
      query: context + 'msg/recipient/:id',
      delete: context + 'msg/recipient/:id',
      tree: context + 'msg/recipient/tree-all',
      deletes: context + 'msg/recipient/msg-update-status',
      batch: context + 'msg/send/batch-post'
    },
    sendType: {
      table: context + 'msg/send-type', // 方式配置
      index: context + 'msg/send-type/list-valide',
      add: context + 'msg/send-type',
      modify: context + 'msg/send-type/:id',
      query: context + 'msg/send-type/:id',
      delete: context + 'msg/send-type/:id',
      tree: context + 'msg/send-type/tree-all'
    },
    appTemplate: {
      // 系统模板
      index: context + 'msg/template/list-app-template', // 模板配置
      tree: context + 'msg/template/tree-app-template', // 模板树
      form: context + 'msg/template'
    },
    personageTemplate: {
      // 个人模板
      index: context + 'msg/template/list-personal-template', // 模板配置
      tree: context + 'msg/template/tree-personal-template', // 模板树
      del: context + 'msg/template'
    },
    contact: {
      // 通讯录分组
      index: context + 'msg/contact',
      tree: context + 'msg/contact/tree'
    },
    contactUser: {
      index: context + 'msg/contact-user',
      tree: context + 'msg/contact/tree',
      switch: context + 'msg/contact-user/move-tree-contact-user'
    },
    userCont: {
      index: context + 'msg/contact-user/user-cont'
    },
    send: {
      table: context + 'msg/send',
      add: context + 'msg/send',
      modify: context + 'msg/send/:id',
      query: context + 'msg/send/:id',
      delete: context + 'msg/send/:id',
      tree: context + 'msg/send/tree-all',
      recipient: context + 'msg/send/msg-send-recipient'
    },
    // 消息日志
    // FIXME: 确认好是否需要增加iop前缀
    msgStatistics: {
      getAllRecipient: context + 'msg/recipient/all-recipient'
    },
    statistics: {
      getMsgTypeList: context + 'msg/send-type',
      getMsgTypeData: context + 'msg/send/show-msg-type-num',
      getMsgContentTypeData: context + 'msg/send/show-msg-content-type-num',
      getSendSuccess: context + 'msg/send/show-msg-status-num',
      getMsgSecNum: context + 'msg/send/show-msg-status-section-num'
    }
  },
  /**
   * 个人设置
   */
  settings: {
    // 个人设置
    plist: `${context}system/pub-user-voucher`,
    /* 凭证 */
    voucher: `${context}system/pub-user-voucher/current-user`,
    // 基本信息
    info: `${context}system/pub-user-conf/user-info`,
    // 获取个人通讯方式
    userContactLine: `${context}system/pub-user-conf/user-contact`,
    // 保存个人通讯方式
    saveUserContact: `${context}system/pub-user-conf/save-user-contact`,
    // 个人设置-皮肤自定义
    settingsSkinData: `${context}system/skin/user-skin`,
    // 保存皮肤
    saveSettingsSkinData: `${context}system/skin/save-user-skin`,
    // 基本信息保存接口
    savePubUserData: `${context}system/pub-user`,
    // 系统消息是否开启
    userSysmsg: `${context}system/pub-user-conf/user-sysmsg-conf`,
    // 保存系统消息
    saveuserSysmsg: `${context}system/pub-user-conf/save-user-sysmsg-conf`,
    // 保存代办消息
    saveserTodoConf: `${context}system/pub-user-conf/save-user-todo-conf`,
    // 代办消息是否开启
    agencySysmsg: `${context}system/pub-user-conf/user-todo-conf`,
    // 代办消息是否开启
    upload: `${context}plat-iop-file/file/operation/upload`,
    saveSkinV2: `${context}system/skin`,
    getThemeList: `${context}system/skin/user-skin`,
    saveUserTheme: `${context}system/skin/save-user-skin`
  },

  fileStorage: {
    upload: `${context}file/operation/upload`,
    list: `${context}file/operation/files`,
    download: `${context}file/operation/download`,
    remove: `${context}file/operation/file-delete`
  },
  sysDefinition: {
    currency: `${context}system/app`,
    asyncTree: `${context}system/app/tree`,
    getPhyList: `${context}system/application`,
    getSubCompList: `${context}system/app/child-module-list`,
    userTree: `${context}system/app/get-dept-user`,
    getDependList: `${context}system/app/depend-module-list/`,
    getBeDependList: `${context}system/app/be-depend-module-list/`,
    doSaveDepend: `${context}system/app/depend-module`,
    doDelDepend: `${context}system/app/depend-module`,
    pgyCurrency: `${context}system/application`,
    authCurrency: `${context}system/pub-policy-road`,
    relaCurrency: `${context}system/pub-policy-rela`,
    relaChecked: `${context}system/pub-policy-rela/checked`,
    relaFormInfo: `${context}system/pub-policy-param/get-info`,
    relaFormSave: `${context}system/pub-policy-param`,
    getSkinList: `${context}system/skin/skin-sys`,
    getServerInfo: `${context}system/application/actuator/metrics-server`,
    getTomcatInfo: `${context}system/application/actuator/metrics-tomcat`,
    getJvmInfo: `${context}system/application/actuator/metrics-jvm`
  },
  /**
   * 服务组件
   */
  serv: {
    /**
     * 应用接入
     */
    app: {
      index: `${context}serv/app`,
      application: `${context}serv/app/serv-application`,
      listApplication: `${context}serv/app/list-application`
    },
    /**
     * 我的申请
     */
    apply: {
      index: `${context}serv/apply`,
      deleteBatch: `${context}serv/apply/batch-delete`,
      prepareWorkflow: `${context}serv/apply/prepare-workflow`,
      commitWorkflow: `${context}serv/apply/commit-workflow`,
      commit: `${context}serv/apply/:id/commit`,
      busiList: `${context}serv/apply/busi-list`,
      opinionList: `${context}serv/apply/opinion-list`,
      deleteRef: `${context}serv/apply/delete-ref`,
      appTree: `${context}serv/app/app-tree`,
      opinions: `${context}serv/apply/:id/opinions`,
      generate: `${context}serv/apply/get-order`
    },
    /**
     * 服务审批
     */
    applyAdmin: {
      index: `${context}serv/apply/admin`,
      back: `${context}serv/apply/back-workflow`,
      approval: `${context}serv/apply/:id/admin/approval`,
      returns: `${context}serv/apply/:id/admin/returns`
    },
    /**
     * 调用服务
     */
    call: {
      index: `${context}serv/service/all-serv`,
      tokenInfo: `${context}serv/auth/token-info`
    },
    /**
     * 服务接入
     */
    provider: {
      table: `${context}serv/service/my-serv`
    }
  },
  // 统一授权
  permit: {
    types: {
      list: context + `permit/auth-type/types`,
      tree: context + `permit/auth-type/tree`,
      index: context + `permit/auth-type`
    },
    authTrack: {
      tree: context + 'system/user-role/auth-role-tree',
      index: context + 'permit/auth-role/types',
      authData: context + 'permit/auth-acl/acls'
    }
  },
  /**
   * 工具组件
   */
  tools: {
    dimcode: {
      encode: context + `tools/dimcode/encode`,
      decode: context + `tools/dimcode/decode`
    }
  },
  // 数据源定义
  dataSourceSet: {
    table: context + 'system/jndi-config/log-list/0',
    setDataSource: context + 'system/jndi-config/set-jndi',
    getConfigList: context + 'system/jndi-config/load',
    getTypeList: context + 'system/jndi-method',
    saveConfig: context + 'system/jndi-config/save',
    delConfig: context + 'system/jndi-config/delete'
  }
}
export default path
