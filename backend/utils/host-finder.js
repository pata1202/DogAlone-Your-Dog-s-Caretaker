const os = require('os');

/**
 * 호스트를 찾아 반환하는 함수
 * @param port {number} 포트
 * @returns {void}
 */
exports.findHost = (port) => {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const item of interfaces[name]) {
            // IPv4 주소만 반환
            if (item.family === 'IPv4') {
                const isInternal = item.internal;
                console.log(`${isInternal ? 'internal' : 'host'} :: http://${item.address}:${port}`);
            }
        }
    }
}
