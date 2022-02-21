import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

const init =()=>{
    Sentry.init({
        //put url in env variable
      dsn: process.env.REACT_APP_SENTRY_URL,
      // dsn: "https://d4196f226e354c198f1bef4e85c139e7@o1148311.ingest.sentry.io/6220073",
      
      integrations: [
        new BrowserTracing({
          tracingOrigins: [process.env.REACT_APP_BASE_URL],
        }),
      ],
    
      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 1.0,
      // disablePerformance: true,
          });
}


export default { init }
               