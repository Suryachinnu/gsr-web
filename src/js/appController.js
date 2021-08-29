/**
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your application specific code will go here
 */
define(['knockout', 'ojs/ojcontext', 'ojs/ojmodule-element-utils', 'ojs/ojknockouttemplateutils', 'ojs/ojcorerouter', 'ojs/ojmodulerouter-adapter', 'ojs/ojknockoutrouteradapter', 'ojs/ojurlparamadapter', 'ojs/ojresponsiveutils', 'ojs/ojresponsiveknockoututils', 'ojs/ojarraydataprovider',
        'ojs/ojoffcanvas', 'ojs/ojmodule-element', 'ojs/ojknockout'],
  function(ko, Context, moduleUtils, KnockoutTemplateUtils, CoreRouter, ModuleRouterAdapter, KnockoutRouterAdapter, UrlParamAdapter, ResponsiveUtils, ResponsiveKnockoutUtils, ArrayDataProvider, OffcanvasUtils) {

     function ControllerViewModel() {

      this.KnockoutTemplateUtils = KnockoutTemplateUtils;

      // Handle announcements sent when pages change, for Accessibility.
      this.manner = ko.observable('polite');
      this.message = ko.observable();
      announcementHandler = (event) => {
          this.message(event.detail.message);
          this.manner(event.detail.manner);
      };

      document.getElementById('globalBody').addEventListener('announce', announcementHandler, false);


      // Media queries for repsonsive layouts
      const smQuery = ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      this.smScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
      const mdQuery = ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
      this.mdScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);

      let navData = [
        { path: '', redirect: 'home' },
        { path: 'home', detail: { label: 'Home', iconClass: 'oj-ux-ico-bar-chart' } },
        { path: 'about', detail: { label: 'About Us', iconClass: 'oj-ux-ico-fire' } },
        { path: 'focus', detail: { label: 'Our Focus Areas', iconClass: 'oj-ux-ico-contact-group' } },
        { path: 'contact', detail: { label: 'Contact Us', iconClass: 'oj-ux-ico-information-s' } },
        { path: 'joinus', detail: { label: 'Join Us', iconClass: 'oj-ux-ico-information-s' } }
      ];
      let navData1 = [
        { path: 'home', detail: { label: 'Home', iconClass: 'oj-ux-ico-bar-chart' } },
        { path: 'about', detail: { label: 'About Us', iconClass: 'oj-ux-ico-fire' } },
        { path: 'focus', detail: { label: 'Our Focus Areas', iconClass: 'oj-ux-ico-contact-group' } },
        { path: 'contact', detail: { label: 'Contact Us', iconClass: 'oj-ux-ico-information-s' } },
      ];

      // Router setup
      this.router = new CoreRouter(navData, {
        urlAdapter: new UrlParamAdapter()
      });
      this.router.sync();

      this.moduleAdapter = new ModuleRouterAdapter(this.router);

      this.selection = new KnockoutRouterAdapter(this.router);

      // Setup the navDataProvider with the routes, excluding the first redirected
      // route.
      this.navDataProvider = new ArrayDataProvider(navData1, {keyAttributes: "path"});

      // Drawer
      // Close offcanvas on medium and larger screens
      this.mdScreen.subscribe(() => {OffcanvasUtils.close(this.drawerParams);});
      this.drawerParams = {
        displayMode: 'overlay',
        selector: '#navDrawer',
        content: '#pageContent'
      };
      // Called by navigation drawer toggle button and after selection of nav drawer item
      this.toggleDrawer = () => {
        this.navDrawerOn = true;
        return OffcanvasUtils.toggle(this.drawerParams);
      }
      this.routeToPage = (_path) => {
        this.router.go({ path: _path });
      };

      // Header
      // Application Name used in Branding Area
      this.appName = ko.observable("App Name");
      // User Info used in Global Navigation area
      this.userLogin = ko.observable("john.hancock@oracle.com");

      // Footer
          
      this.footerLinks = [
        {name: 'Dr. GSR Charitable Trust', linkId: 'aboutTrust', linkTarget:'#'},
        { name: "Privacy Statement", id: "privacyStmt", linkTarget: "#" },
        { name: "Disclaimer and Cookie Statement", id: "disccookie", linkTarget: "#" },
        { name: "Disclosures", id: "disclosure", linkTarget: "#" },
        { name: "Notices", id: "notices", linkTarget: "#" },
      ];
     }
     // release the application bootstrap busy state
     Context.getPageContext().getBusyContext().applicationBootstrapComplete();

     return new ControllerViewModel();
  }
);
