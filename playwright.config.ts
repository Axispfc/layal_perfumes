import {defineConfig,devices} from '@playwright/test';
export default defineConfig({
 testDir:'./tests',testMatch:'**/*.spec.ts',
 reporter:[['list'],['html',{open:'never'}]],
 use:{baseURL:'http://127.0.0.1:3000',screenshot:'only-on-failure',trace:'retain-on-failure'},
 projects:[
  {name:'desktop',use:{...devices['Desktop Chrome']}},
  {name:'mobile',use:{...devices['iPhone 13'],defaultBrowserType:'chromium'}},
 ],
 webServer:{command:'npm run start',url:'http://127.0.0.1:3000',reuseExistingServer:false},
});
