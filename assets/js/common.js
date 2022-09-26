!(function () {
  var i,
    t,
    s,
    n = document.getElementsByTagName('body'),
    a = matchMedia('screen and (min-width: 768px)'),
    o = window.pageYOffset || document.documentElement.scrollTop,
    e = {
      init: function () {
        ;(i = this).setProperty(), a.matches ? this.setPropertyPC() : this.setPropertySP()
      },
      setProperty: function () {
        ;(this.clsCurrent = '-current'),
          (this.clsOpened = '-opened'),
          (this.clsClosed = '-closed'),
          (this.clsOverFlow = 'u-overflow'),
          (this.header = document.getElementsByClassName('c-header')),
          (this.headerNav = this.header[0].getElementsByClassName('c-header-nav')),
          (this.headerAccordion = this.header[0].getElementsByClassName('u-accordion-btn')),
          (this.headerMainBtn = this.header[0].getElementsByClassName('m-headerNav-mainBtn')),
          (this.headerMainBtnHasSub = this.header[0].getElementsByClassName('m-headerNav-mainBtn -hasSubNav')),
          (this.headerSubNav = this.header[0].getElementsByClassName('m-headerSubNav')),
          (this.headerMain = this.header[0].getElementsByClassName('m-headerMain')),
          (this.headerHumbergerBtn = this.header[0].getElementsByClassName('m-headerMain-humbergerBtn')),
          (this.headerCloseBtn = this.header[0].getElementsByClassName('m-headerNav-close'))
      },
      setPropertyPC: function () {
        ;(this.headerMainBtnHasSubLength = this.headerMainBtnHasSub.length),
          (this.isOpen = {}),
          (this.ifMain = {}),
          (this.ifSub = {}),
          (this.mouseOnListener = {}),
          (this.mouseOffListener = {}),
          this.addCurrent(location.pathname)
        for (var e = 0; e < this.headerMainBtnHasSub.length; e++)
          (i.mouseOnListener[e] = i.setMouseOn.bind(i, e)),
            (i.mouseOffListener[e] = i.setMouseOff.bind(i, e)),
            i.headerMainBtnHasSub[e].addEventListener('mouseenter', i.mouseOnListener[e], !1),
            (i.isOpen[e] = { main: !1, sub: !1, firstVisit: !0 }),
            (i.ifMain[e] = i.headerMainBtnHasSub[e].classList.contains('m-headerNav-mainBtn')),
            (i.ifSub[e] = i.headerSubNav[e].classList.contains('m-headerSubNav'))
      },
      setPropertySP: function () {
        ;(this.humbergerListener = this.setHumberger.bind(this)),
          this.countTimer,
          (this.counter = 0),
          (this.headerNavHeight = window.innerHeight - this.headerMain[0].clientHeight),
          (this.headerNav[0].style.height = 0),
          this.headerHumbergerBtn[0].addEventListener('click', this.humbergerListener, !1),
          this.headerCloseBtn[0].addEventListener('click', this.humbergerListener, !1)
      },
      resetPropertyPC: function () {
        this.headerNav[0].classList.remove(this.clsClosed),
          this.headerNav[0].classList.remove(this.clsOpened),
          (this.headerNav[0].style.height = 'auto'),
          this.headerHumbergerBtn[0].classList.remove(this.clsOpened),
          n[0].classList.remove(this.clsOverFlow),
          this.headerHumbergerBtn[0].removeEventListener('click', this.humbergerListener, !1),
          this.headerCloseBtn[0].removeEventListener('click', this.humbergerListener, !1)
      },
      resetPropertySP: function () {
        this.headerNav[0].classList.remove(this.clsClosed),
          this.headerNav[0].classList.remove(this.clsOpened),
          this.headerCloseBtn[0].classList.remove(this.clsOpened),
          this.headerCloseBtn[0].classList.remove(this.clsClosed)
        for (var e = 0; e < this.headerMainBtnHasSub.length; e++)
          i.headerMainBtnHasSub[e].classList.remove(i.clsOpened),
            i.headerMainBtnHasSub[e].classList.remove(i.clsClosed),
            i.headerMainBtnHasSub[e].removeEventListener('mouseenter', i.mouseOnListener[e], !1),
            i.headerMainBtnHasSub[e].removeEventListener('mouseleave', i.mouseOffListener[e], !1)
        for (e = 0; e < this.headerSubNav.length; e++)
          i.headerSubNav[e].classList.remove(i.clsOpened),
            i.headerSubNav[e].classList.remove(i.clsClosed),
            i.headerSubNav[e].removeEventListener('mouseenter', i.mouseOnListener[e], !1),
            i.headerSubNav[e].removeEventListener('mouseleave', i.mouseOffListener[e], !1)
      },
      addCurrent: function (e) {
        this.pathArray = [
          'concept',
          ['try-way', 'pro'],
          ['course', 'futoukou', 'selectiveuni', 'med', 'english', 'sports'],
          'around',
          'experience',
          ['event', 'campaign'],
          'exam',
        ]
        for (var t = 0; t < this.pathArray.length; t++)
          if ('string' != typeof this.pathArray[t])
            for (var s = 0; s < this.pathArray[t].length; s++)
              -1 !== e.indexOf(this.pathArray[t][s]) && this.headerMainBtn[t].classList.add(this.clsCurrent)
          else -1 !== e.indexOf(this.pathArray[t]) && this.headerMainBtn[t].classList.add(this.clsCurrent)
      },
      setMouseOn: function (e) {
        this.ifMain[e] &&
          ((this.isOpen[e].main = !0),
          this.headerNav[0].classList.remove(this.clsClosed),
          this.headerNav[0].classList.add(this.clsOpened),
          this.headerMainBtnHasSub[e].classList.remove(this.clsClosed),
          this.headerSubNav[e].classList.remove(this.clsClosed),
          this.headerMainBtnHasSub[e].classList.add(this.clsOpened),
          this.headerSubNav[e].classList.add(this.clsOpened),
          this.isOpen[e].firstVisit &&
            ((this.isOpen[e].firstVisit = !1),
            this.headerMainBtnHasSub[e].addEventListener('mouseleave', this.mouseOffListener[e], !1),
            this.headerSubNav[e].addEventListener('mouseenter', this.mouseOnListener[e], !1),
            this.headerSubNav[e].addEventListener('mouseleave', this.mouseOffListener[e], !1))),
          this.ifSub[e] && (this.isOpen[e].sub = !0)
      },
      setMouseOff: function (e) {
        this.ifMain[e] && (this.isOpen[e].main = !1),
          this.ifSub[e] && (this.isOpen[e].sub = !1),
          setTimeout(function () {
            i.isOpen[e].main ||
              i.isOpen[e].sub ||
              (i.headerMainBtnHasSub[e].classList.remove(i.clsOpened),
              i.headerSubNav[e].classList.remove(i.clsOpened),
              i.headerMainBtnHasSub[e].classList.add(i.clsClosed),
              i.headerSubNav[e].classList.add(i.clsClosed))
          }, 10)
        for (var t = 0; t < this.headerMainBtnHasSub.length; t++) {
          if (this.isOpen[t].main) return !1
          for (var s = 0; s < this.headerMainBtnHasSub.length; s++) if (this.isOpen[s].sub) return !1
          t === this.headerMainBtnHasSub.length - 1 &&
            (this.headerNav[0].classList.add(this.clsClosed), this.headerNav[0].classList.remove(this.clsOpened))
        }
      },
      setHumberger: function () {
        if (this.headerHumbergerBtn[0].classList.contains(this.clsOpened)) {
          for (var e = 0; e < this.headerAccordion.length; e++) i.headerAccordion[e].classList.remove(i.clsOpened)
          this.headerHumbergerBtn[0].classList.remove(this.clsOpened),
            this.headerNav[0].classList.add(this.clsClosed),
            this.headerNav[0].classList.remove(this.clsOpened),
            this.countDown(parseInt(this.headerNav[0].style.height, 10), this.headerNavHeight, this.headerNav[0]),
            n[0].classList.remove(this.clsOverFlow),
            setTimeout(function () {
              ;(n[0].style.top = 0), window.scrollTo(0, i.windowTop)
            }, 10)
        } else
          (this.windowTop = o),
            n[0].classList.add(this.clsOverFlow),
            (n[0].style.top = -this.windowTop + 'px'),
            this.headerHumbergerBtn[0].classList.add(this.clsOpened),
            this.headerNav[0].classList.add(this.clsOpened),
            this.headerNav[0].classList.remove(this.clsClosed),
            this.countUp(0, this.headerNavHeight, this.headerNav[0])
      },
      countUp: function (e, t, s) {
        e < t
          ? ((e += Math.pow(t / 15, 1 + 0.1 * this.counter)),
            (s.style.height = e + 'px'),
            (this.countTimer = setTimeout(function () {
              i.countUp(e, t, s)
            }, 10)),
            this.counter++)
          : (clearTimeout(this.countTimer), (s.style.height = t + 'px'), (this.counter = 0))
      },
      countDown: function (e, t, s) {
        0 < e
          ? ((e -= Math.pow(t / 15, 1 + 0.1 * this.counter)),
            (s.style.height = e + 'px'),
            (this.countTimer = setTimeout(function () {
              i.countDown(e, t, s)
            }, 10)),
            this.counter++)
          : (clearTimeout(this.countTimer), (s.style.height = 0), (this.counter = 0))
      },
    },
    r = {
      init: function () {
        ;(this.header = document.querySelector('.m-headerMain')),
          (this.footerContact = document.querySelector('.c-pageTopContainer')),
          (this.flg = !1)
      },
      anim: function () {
        if (this.flg) return !1
        0 != this.header.getBoundingClientRect().top &&
          this.header.getBoundingClientRect().top < 50 &&
          ((this.footerContact.style.display = 'block'), this.footerContact.classList.add('-anim'), (this.flg = !0))
      },
    },
    h = {
      init: function () {
        ;(this.clsOpened = '-opened'),
          (this.clsOnlyOnce = '-onlyOnce'),
          (this.accordion = document.getElementsByClassName('u-accordion-btn')),
          (this.clsHeader = 'm-headerNav-mainBtn'),
          (this.accordionListener = {}),
          (t = this)
        for (var e = 0; e < this.accordion.length; e++)
          (t.accordionListener[e] = t.setAccordion.bind(t, e)),
            t.accordion[e].addEventListener('click', t.accordionListener[e], !1)
      },
      setAccordion: function (e, t) {
        if (void 0 !== this.accordion[e].attributes.href) {
          if (
            a.matches ||
            (!a.matches &&
              this.accordion[e].classList.contains(this.clsOpened) &&
              !this.accordion[e].classList.contains(this.clsHeader))
          )
            return !0
          t.preventDefault()
        } else t.preventDefault()
        this.accordion[e].classList.contains(this.clsOpened)
          ? this.accordion[e].classList.remove(this.clsOpened)
          : this.accordion[e].classList.add(this.clsOpened),
          this.removeBtn(e)
      },
      removeClass: function () {
        for (var e = 0; e < this.accordion.length; e++)
          t.accordion[e].parentNode.classList.contains(t.clsOnlyOnce) || t.accordion[e].classList.remove(t.clsOpened)
      },
      removeBtn: function (e) {
        this.accordion[e].parentNode.classList.contains(this.clsOnlyOnce) &&
          this.accordion[e].classList.add(this.clsOnlyOnce)
      },
    },
    c = {
      init: function () {
        ;(this.rwdImg = document.querySelectorAll('.p-rwdImg')), this.latestType, this.checkType()
      },
      checkType: function () {
        var e = this,
          t = a.matches ? 'data-pcsrc' : 'data-spsrc'
        if (e.latestType !== t) {
          for (var s = e.rwdImg.length, i = 0; i < s; i++)
            e.rwdImg[i].setAttribute('src', e.rwdImg[i].getAttribute(t)), (e.rwdImg[i].style.visibility = 'visible')
          e.latestType = t
        }
      },
    },
    l = {
      init: function () {
        ;(this.breadPc = document.querySelector('.m-breadcrumbs:not(.-sp)')),
          (this.breadSp = document.querySelector('.m-breadcrumbs.-sp')),
          l.getCont()
      },
      getCont: function () {
        null != this.breadPc &&
          null != this.breadSp &&
          ((this.breadCont = this.breadPc.innerHTML), (this.breadSp.innerHTML = this.breadCont))
      },
    },
    d = {
      init: function () {
        ;((s = this).anchor = document.getElementsByClassName('u-anchor')),
          (this.anchor.length = this.anchor.length),
          (this.goal = []),
          (this.target = []),
          (this.loopCounter = 0),
          this.setAnchorEv()
      },
      setAnchorEv: function () {
        for (var e = 0; e < this.anchor.length; e++)
          this.anchor[e].getAttribute('href').split('#')[1] &&
            (this.target[e] = document.getElementById(this.anchor[e].getAttribute('href').split('#')[1])),
            this.anchor[e].addEventListener('click', this.scrollAnchor.bind(s, e), !1)
      },
      scrollAnchor: function (e, t) {
        ;(this.progress = o), $('body,html').animate({ scrollTop: this.getGoal(e) }, 600, 'easeInOutQuart')
      },
      getGoal: function (e) {
        return (
          this.target[e] &&
            ((this.goal[e] = this.target[e].getBoundingClientRect().top + o),
            a.matches && (this.goal[e] -= document.getElementsByClassName('m-headerMain')[0].clientHeight)),
          this.goal[e]
        )
      },
    },
    m = {
      init: function () {
        ;(this.pageTopFixed = document.getElementsByClassName('-pageTop -typeFixed')),
          (this.footerCopy = document.getElementsByClassName('c-footerCopyContainer')),
          (this.footerCopyHeight = this.footerCopy[0].offsetHeight)
      },
      checkScrollTopPos: function () {
        ;(this.comparedPos = n[0].offsetHeight - this.footerCopyHeight - window.innerHeight),
          a.matches
            ? o >= this.comparedPos
              ? (this.pageTopFixed[0].style.bottom = this.footerCopyHeight + 20 + 'px')
              : o < this.comparedPos && (this.pageTopFixed[0].style.bottom = 'auto')
            : (this.pageTopFixed[0].style.bottom = 'auto')
      },
    },
    u = {
      init: function () {
        if (!(0 < document.getElementsByClassName('u-print').length)) return !1
        ;(this.btnPrint = document.getElementsByClassName('u-print')),
          (this.scrollTop = 0),
          this.btnPrint[0].addEventListener('click', this.startPrint.bind(this)),
          void 0 !== window.onafterprint && window.addEventListener('afterprint', this.finishPrint.bind(this))
      },
      startPrint: function (e) {
        e.preventDefault(), (this.scrollTop = window.scrollY), window.print()
      },
      finishPrint: function () {
        window.scrollTo(0, this.scrollTop)
      },
    },
    p = {
      init: function () {
        0 < document.getElementsByClassName('m-searchSchoolBox').length &&
          ((this.$searchSchoolBox = $('.m-searchSchoolBox')),
          (this.$sumbit = this.$searchSchoolBox.find('.m-searchSchoolBox-submit')),
          (this.$select = this.$searchSchoolBox.find('.m-searchSchoolBox-select')),
          (this.$form = this.$searchSchoolBox.find('.m-searchSchoolBox-form')),
          this.nowIndex,
          (this.length = this.$searchSchoolBox.length),
          (this.pcTxt = '都道府県を選択してください'),
          (this.spTxt = '都道府県を選択'),
          this.$sumbit.click(this.setClickEvent.bind(this)),
          a.matches ? this.rewriteTxt(this.pcTxt) : this.rewriteTxt(this.spTxt))
      },
      setClickEvent: function (e) {
        return (
          (this.nowIndex = this.$sumbit.index(e.currentTarget)),
          null != this.$select.eq(this.nowIndex).val() &&
            '' != this.$select.eq(this.nowIndex).val() &&
            (this.$form.eq(this.nowIndex).attr('action', this.$select.eq(this.nowIndex).val()),
            this.$form.eq(this.nowIndex).submit()),
          !1
        )
      },
      rewriteTxt: function (e) {
        for (var t = 0; t < this.length; t++) this.$select.eq(t).find('option:first-of-type').text(e)
      },
    },
    g = 'try_cmpBnr',
    f = '20200901',
    v = {
      html:
        '<div class="c-cmpBnrModal"><div class="c-cmpBnrModal-inner"><div class="c-cmpBnrModal-bnr"><img src="/assets/img/cmpBnrModal-bnr_pc.png?' +
        f +
        '" data-pcsrc="/assets/img/cmpBnrModal-bnr_pc.png?' +
        f +
        '" data-spsrc="/assets/img/cmpBnrModal-bnr_sp.png?' +
        f +
        '" class="p-rwdImg" alt="CMで話題！受験対策なら全国No.1のトライ 入試問題的中AI 切り替えキャンペーンも受付中！詳しくはこちら"></div><ul class="c-cmpBnrModal-btnArea"><li class="c-cmpBnrModal-btn"><a class="p-roundBtn -bright -gentle" href="/campaign/">キャンペーンの<br>詳細はこちら<svg class="p-roundBtn-arrow"><use xlink:href="/assets/img/symbols.svg#roundBtn_arrow-icon"></use></svg></a></li><li class="c-cmpBnrModal-btn"><a class="p-roundBtn -emphasis -gentle" href="/contact/">授業料・資料請求の<br>お問い合わせ<svg class="p-roundBtn-arrow"><use xlink:href="/assets/img/symbols.svg#roundBtn_arrow-icon"></use></svg></a></li></ul><a href="#" class="c-cmpBnrModal-close"></a></div></div>',
      init: function () {
        $('#main').append(this.html),
          (this.body = $('body')),
          (this.modal = $('.c-cmpBnrModal')),
          (this.modalClose = $('.c-cmpBnrModal-close')),
          -1 !== document.cookie.indexOf(g) ? this.checkCookie() : this.setCookie()
      },
      checkCookie: function () {
        for (var e = document.cookie.split(';'), t = 0; t < e.length; t++)
          -1 !== e[t].indexOf(g) && -1 === e[t].indexOf(f) && this.resetCookie()
      },
      setCookie: function () {
        document.cookie = encodeURIComponent(g) + '=' + f + ';path=/;max-age=2592000;'
      },
      resetCookie: function () {
        ;(document.cookie = encodeURIComponent(g) + '=' + f + ';path=/;'), this.setCookie()
      },
      setModal: function () {
        this.modal.addClass('-on'),
          this.modal.on('click', this.judgeClose.bind(this, this.modal)),
          this.modalClose.on('click', this.judgeClose.bind(this, this.modalClose)),
          this.body.addClass('-fixed')
      },
      judgeClose: function (e, t) {
        ;((e === this.modal && $(t.target)[0] === this.modal[0]) || e === this.modalClose) &&
          (t.preventDefault(), this.closeModal())
      },
      closeModal: function () {
        this.modal.addClass('-off'), this.body.removeClass('-fixed')
      },
    }
  svg4everybody(),
    window.addEventListener('DOMContentLoaded', function () {
      0 < document.getElementsByClassName('u-accordion-btn').length && h.init(),
        v.init(),
        c.init(),
        l.init(),
        d.init(),
        m.init(),
        u.init(),
        document.getElementsByClassName('m-headerMain')[0].classList.contains('-common') ||
          document.getElementsByClassName('m-headerMain')[0].classList.contains('-lp') ||
          e.init(),
        p.init(),
        r.init()
    }),
    window.addEventListener('scroll', function () {
      ;(o = window.pageYOffset || document.documentElement.scrollTop), m.checkScrollTopPos(), r.anim()
    }),
    a.addListener(function () {
      a.matches
        ? (document.getElementsByClassName('m-headerMain')[0].classList.contains('-common') ||
            document.getElementsByClassName('m-headerMain')[0].classList.contains('-lp') ||
            (e.resetPropertyPC(), e.setPropertyPC()),
          0 < document.getElementsByClassName('u-accordion-btn').length && h.removeClass(),
          0 < document.getElementsByClassName('m-searchSchoolBox').length && p.rewriteTxt(p.pcTxt))
        : (document.getElementsByClassName('m-headerMain')[0].classList.contains('-common') ||
            document.getElementsByClassName('m-headerMain')[0].classList.contains('-lp') ||
            (e.resetPropertySP(), e.setPropertySP()),
          0 < document.getElementsByClassName('m-searchSchoolBox').length && p.rewriteTxt(p.spTxt))
    }),
    window.addEventListener('resize', function () {
      c.checkType(),
        (o = window.pageYOffset || document.documentElement.scrollTop),
        (m.footerCopyHeight = m.footerCopy[0].offsetHeight),
        m.checkScrollTopPos(),
        a.matches ||
          document.getElementsByClassName('m-headerMain')[0].classList.contains('-common') ||
          document.getElementsByClassName('m-headerMain')[0].classList.contains('-lp') ||
          (e.headerHumbergerBtn[0].classList.contains(e.clsOpened) &&
            ((e.headerNavHeight = window.innerHeight - e.headerMain[0].clientHeight),
            (e.headerNav[0].style.height = e.headerNavHeight + 'px')))
    })
})()
