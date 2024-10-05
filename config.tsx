const devConfig = {
    API_URL: 'http://10.0.2.2:5001',
  };
  
  const prodConfig = {
    API_URL: 'http://127.0.0.1:5001',
  };
  
  const config = __DEV__ ? devConfig : prodConfig;
  
  export default config;
  