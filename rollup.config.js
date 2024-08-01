// rollup.config.js
export default {
    // other options
    output: {
      manualChunks(id) {
        if (id.includes('node_modules')) {
          return 'vendor'; // Move all dependencies to a single chunk
        }
      }
    }
  };
  