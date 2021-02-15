const os = jest.createMockFromModule('os');

os.hostname = () => 'HOSTNAME';

module.exports = os;
