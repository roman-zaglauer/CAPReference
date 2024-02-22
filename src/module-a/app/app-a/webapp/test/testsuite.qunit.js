window.suite = function () {
  "use strict";

  // eslint-disable-next-line
  var oSuite = new roots.jsUnitTestSuite(),
    sContextPath = location.pathname.substring(
      0,
      location.pathname.lastIndexOf("/") + 1,
    );
  oSuite.addTestPage(sContextPath + "integration/opaTests.qunit.html");

  return oSuite;
};
