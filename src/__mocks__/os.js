const os = jest.createMockFromModule('os');

os.hostname = jest.fn().mockReturnValue('HOSTNAME.com.au');

module.exports = os;
