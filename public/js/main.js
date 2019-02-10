var vueapp = new Vue({
  el: '#vueapp',
  data: {
    iOrWe: '[I/We]',
    typeOfApp: '',
    typeOfAppTxt: '[open source/free/freemium/ad-supported/commercial]',
    typeOfDev: '',
    appName: '[App Name]',
    myOrOur: '[my/our]',
    meOrUs: '[me/us]',
    atNoCost: '[at no cost]',
    retainedInfo: '[retained on your device and is not collected by [me/us] in any way]/[retained by us and used as described in this privacy policy]',
    devName: '',
    companyName: '',
    devOrCompanyName: '[Developer/Company name]',
    pidInfoIn: '',
    pidInfo: '[add whatever else you collect here, e.g. users name, address, location, pictures]',
    gps: true,
    admob: false,
    firebase_analytics: false,
    piwik: false,
    fabric: false,
    clicky: false,
    crashlytics: false,
    facebook: false,
    osType: '',
    requirementOfSystem: 'system',
    thirdPartyServices: thirdPartyServicesJsonArray
  },
  methods: {
    selectAllText: function (id) {
      selectText(id)
    },
    toggleState: function (item) {
      let state = item.model

      console.log('Item:', item.name, item.model, item[state])
      // For reactive update of the json
      // Toggle the state
      Vue.set(thirdPartyServicesJsonArray, item.model, !item[state])
    },
    generateHTML: function (id, filename) {
      let content = getContent(id)
      let title = getTitle(id)
      let rawHTML = getRawHTML(content, title)
      downloadHTML(filename, rawHTML)
    },
    generateMD: function (id, filename) {
      let content = getContent(id)
      let title = getTitle(id)
      let rawHTML = getRawHTML(content, title)
      let markdown = convertHtmlToMd(rawHTML)
      downloadMD(filename, markdown)
    },
    generate: function () {
      if (this.typeOfDev === 'Individual') {
        this.devOrCompanyName = this.devName
        this.iOrWe = 'I'
        this.myOrOur = 'my'
        this.meOrUs = 'me'
        this.retainedInfo =
          'retained on your device and is not collected by ' +
          this.meOrUs +
          ' in any way'
      } else if (this.typeOfDev === 'Company') {
        this.devOrCompanyName = this.companyName
        this.iOrWe = 'we'
        this.myOrOur = 'our'
        this.meOrUs = 'us'
        this.retainedInfo =
          'retained by us and used as described in this privacy policy'
      }

      if (this.typeOfApp === 'Commercial') {
        this.atNoCost = ''
      } else {
        this.atNoCost = 'at no cost'
      }

      if (this.pidInfoIn === '') {
        this.pidInfo = '.'
      } else {
        this.pidInfo = ', including but not limited to ' + this.pidInfoIn + '.'
      }

      switch (this.typeOfApp) {
        case 'Free':
        case 'Freemium':
        case 'Commercial':
          this.typeOfAppTxt = 'a ' + this.typeOfApp
          break
        case 'Open Source':
        case 'Ad Supported':
          this.typeOfAppTxt = 'an ' + this.typeOfApp
          break
      }

      switch (this.osType) {
        case 'Android': {
          this.osType = 'Android'
          this.requirementOfSystem = 'system'
          break
        }
        case 'iOS': {
          this.osType = 'iOS'
          this.requirementOfSystem = 'system'
          break
        }
        case 'Android & iOS': {
          this.osType = 'Android & iOS'
          this.requirementOfSystem = 'both systems'
          break
        }
      }

      document.getElementById('privacy_tab').click()
    }
  }
})
