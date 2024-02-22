sap.ui.define(["sap/fe/test/ObjectPage"], function (ObjectPage) {
  "use strict";

  var CustomPageDefinitions = {
    actions: {},
    assertions: {},
  };

  return new ObjectPage(
    {
      appId: "cap.refernce.appa",
      componentId: "RootsObjectPage",
      entitySet: "Roots",
    },
    CustomPageDefinitions,
  );
});
