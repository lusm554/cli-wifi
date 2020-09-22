const { spawn } = require('child_process')

// Get network name 
const getWiFiName = spawn('networksetup', ['-getairportnetwork', 'en0'])

getWiFiName.stdout.on('data', (data) => {
    // console.log(`stdout: ${data}`);
    console.log(data.toString())
})

getWiFiName.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
})

getWiFiName.on('error', (error) => {
    console.error(error);
})

getWiFiName.on("close", code => {
    console.log(`child process exited with code ${code}`);
});