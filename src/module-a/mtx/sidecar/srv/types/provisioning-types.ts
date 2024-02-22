export type Html5Runtime = {
    uaa: {
      xsappname: string;
    };
  };

  export type Destination = {
    xsappname: string;
  };
  
  export type Connectivity = {
    xsappname: string;
  };

  export type JobScheduler = {
    uaa: {
      xsappname: string;
    };
  };

  export type Workzone = {
    uaa: {
      xsappname: string;
    };
  };

  
  export enum ServiceTags {
    SaaS = "SaaS",
    Html5AppsRepoRt = "html5-apps-repo-rt",
    Destination = "destination",
    Connectivity = "connectivity",
    Jobscheduler = "jobscheduler",
    Workzone = "build-workzone-standard"
  }
  
  export interface IError {
    name: string;
    message: string;
    stack?: string;
    code?: number | string;
  }
  