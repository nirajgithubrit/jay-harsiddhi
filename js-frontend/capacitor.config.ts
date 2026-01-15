import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.jayharsiddhi.myapp',
  appName: 'MyApp',
  webDir: 'dist/js-frontend/browser',
  server: {
    url: 'https://jayharsiddhi.netlify.app',
    // url: 'https://msmm42j0-4200.inc1.devtunnels.ms/'
  },
};

export default config;
