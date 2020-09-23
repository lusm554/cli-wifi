const { spawn } = require('child_process')

// Get network name 
const getWiFiName = spawn('networksetup', ['-getairportnetwork', 'en0'])
errorHandler(getWiFiName, 'networksetup')

function errorHandler(target, commandName) {
  target.stderr.on('data', (data) => {
    console.error(`${commandName} stderr: ${data}`);
  });

  target.on('close', (code) => {
    if(code === 0) return;

    console.log(`${commandName} process exited with code ${code}`);
  })
}

getWiFiName.stdout.on('data', (data) => {
  /**
   * Convert data from buffer to string
   * get the name of the WiFi and remove the spaces 
   */
  const WiFiName = data.toString().split(':')[1].trim()

  getWiFiPassword(WiFiName)
})

function getWiFiPassword(WiFiName) {
  const gettingWiFiPassword = spawn('security', ['find-generic-password', '-wa', WiFiName])
  errorHandler(gettingWiFiPassword, 'security')

  gettingWiFiPassword.stdout.on('data', (data) => {
    console.log(`WiFi: ${WiFiName}\nPassword: ${data.toString()}`)
  })
}