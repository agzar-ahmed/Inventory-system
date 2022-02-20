import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux"
import store from "./store/store"
import { toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logger from './services/httpSevice';


// logger()
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
  //dsn: "https://da66bd1fd06e4def9e3ec8bcf2a972f1@o1148311.ingest.sentry.io/6219742",
  dsn: "https://d4196f226e354c198f1bef4e85c139e7@o1148311.ingest.sentry.io/6220073",
  
  integrations: [
    new BrowserTracing({
      tracingOrigins: ["http://localhost:3002/api/"],
    }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
  // disablePerformance: true,
      });

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <App /> 
        <ToastContainer/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
