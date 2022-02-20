import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

const init =()=>{
 Sentry.init({
     dsn: "https://da66bd1fd06e4def9e3ec8bcf2a972f1@o1148311.ingest.sentry.io/6219742",
     integrations: [new BrowserTracing()],
   
     // Set tracesSampleRate to 1.0 to capture 100%
     // of transactions for performance monitoring.
     // We recommend adjusting this value in production
     tracesSampleRate: 1.0,
         });
}


export default init
               