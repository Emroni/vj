console.clear();

// Export log method for each module
module.exports = {
    log,
    io: (message) => log('(IO) ' + message),
    stream: (message) => log('(STREAM) ' + message),
};

// Set up time options
const localeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
};

function log(message) {
    // Get time
    const date = new Date().toLocaleString('nl-NL', localeOptions);

    // Parse message
    message = message.replace(/\[/gm, '\x1b[32m')
        .replace(/\(/gm, '\x1b[33m')
        .replace(/{/gm, '\x1b[31m')
        .replace(/[\])}]/gm, '\x1b[0m')

    // Output
    console.log(`\x1b[37m[${date}]\x1b[0m ${message}`);
}