sap.ui.require(
  [
    "sap/fe/test/JourneyRunner",
    "cap/refernce/appa/test/integration/FirstJourney",
    "cap/refernce/appa/test/integration/pages/RootsList",
    "cap/refernce/appa/test/integration/pages/RootsObjectPage",
    "cap/refernce/appa/test/integration/pages/LeafsObjectPage",
  ],
  function (
    JourneyRunner,
    opaJourney,
    RootsList,
    RootsObjectPage,
    LeafsObjectPage,
  ) {
    "use strict";
    var JourneyRunner = new JourneyRunner({
      // start index.html in web folder
      launchUrl: sap.ui.require.toUrl("cap/refernce/appa") + "/index.html",
    });

    JourneyRunner.run(
      {
        pages: {
          onTheRootsList: RootsList,
          onTheRootsObjectPage: RootsObjectPage,
          onTheLeafsObjectPage: LeafsObjectPage,
        },
      },
      opaJourney.run,
    );
  },
);
