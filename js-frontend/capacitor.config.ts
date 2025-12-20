import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.jayharsiddhi.myapp',
  appName: 'MyApp',
  webDir: 'dist/js-frontend/browser',
  server: {
    url: 'https://jayharsiddhi.netlify.app',
  },
};

export default config;
