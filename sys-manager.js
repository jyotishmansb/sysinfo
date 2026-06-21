const os = require('os'); 


// Collects all system information and returns 
function getSystemInfo() {
  return {
    // Operating System details
    osType: os.type(),           // e.g., "Windows_NT", "Linux"
    platform: os.platform(),     // e.g., "win32", "linux"
    release: os.release(),       // e.g., "10.0.19045"
    arch: os.arch(),             // e.g., "x64"
    hostname: os.hostname(),     // Computer name
    homeDir: os.homedir(),       // User's home folder

    // CPU details
    cpuModel: os.cpus()[0].model,  // CPU name
    cpuCores: os.cpus().length,    // Number of cores
    cpuSpeed: os.cpus()[0].speed + ' MHz',

    // Node.js runtime info
    nodeVersion: process.version,

    // Memory (RAM) details
    totalMemory: formatBytes(os.totalmem()),
    freeMemory: formatBytes(os.freemem()),

    
  };
}

// ---- ENVIRONMENT VARIABLES ----

// Returns selected environment variables
function getEnvVars() {
  // These are safe env variable names we want to show
  const keys = [
    'PATH', 'USERNAME', 'OS', 'COMPUTERNAME',
    'PROCESSOR_ARCHITECTURE', 'NUMBER_OF_PROCESSORS',
    'APPDATA', 'TEMP', 'SYSTEMROOT', 'PROGRAMFILES',
    'HOME', 'USER', 'SHELL', 'LANG', 'NODE_ENV',
  ];

  const result = {};

  // Loop through each key and get its value
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    result[key] = process.env[key] || null; // null if not found
  }

  return result;
}

// ---- HELPER FUNCTIONS ----

// Converts bytes to a readable format (e.g., 1024 → "1.00 KB")
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
}




// ---- STANDALONE JSON OUTPUT IN TERMINAL----
// If you run this file directly: node sys-manager.js
// It will print all system info as JSON in the console

if (require.main === module) {
  var output = {
    systemInfo: getSystemInfo(),
    environmentVariables: getEnvVars(),
  };

  console.log(JSON.stringify(output, null, 2));
}
