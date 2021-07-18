"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AdbDevice = (function () {
    function AdbDevice(client, props) {
        Object.assign(this, props || {});
        this.client = client;
    }
    AdbDevice.prototype.getSerialNo = function (cb) {
        return this.client.getSerialNo(this.id, cb);
    };
    AdbDevice.prototype.getDevicePath = function (cb) {
        return this.client.getDevicePath(this.id, cb);
    };
    AdbDevice.prototype.listProperties = function (cb) {
        return this.client.listProperties(this.id, cb);
    };
    AdbDevice.prototype.listFeatures = function (cb) {
        return this.client.listFeatures(this.id, cb);
    };
    AdbDevice.prototype.listPackages = function (cb) {
        return this.client.listPackages(this.id, cb);
    };
    AdbDevice.prototype.getIpAddress = function (cb) {
        return this.client.getIpAddress(this.id, cb);
    };
    AdbDevice.prototype.forward = function (local, remote, cb) {
        return this.client.forward(this.id, local, remote, cb);
    };
    AdbDevice.prototype.listForwards = function (cb) {
        return this.client.listForwards(this.id, cb);
    };
    AdbDevice.prototype.reverse = function (local, remote, cb) {
        return this.client.reverse(this.id, local, remote, cb);
    };
    AdbDevice.prototype.listReverses = function (cb) {
        return this.client.listReverses(this.id, cb);
    };
    AdbDevice.prototype.shell = function (command, cb) {
        return this.client.shell(this.id, command, cb);
    };
    AdbDevice.prototype.reboot = function (cb) {
        return this.client.reboot(this.id, cb);
    };
    AdbDevice.prototype.shutdown = function (cb) {
        return this.client.shutdown(this.id, cb);
    };
    AdbDevice.prototype.remount = function (cb) {
        return this.client.remount(this.id, cb);
    };
    AdbDevice.prototype.root = function (cb) {
        return this.client.root(this.id, cb);
    };
    AdbDevice.prototype.screenshot = function (cb) {
        return this.client.screenshot(this.id, cb);
    };
    AdbDevice.prototype.openTcp = function (port, host, cb) {
        return this.client.openTcp(this.id, port, host, cb);
    };
    AdbDevice.prototype.openLogcat = function (options, cb) {
        return this.client.openLogcat(this.id, options, cb);
    };
    AdbDevice.prototype.clear = function (pkg, cb) {
        return this.client.clear(this.id, pkg, cb);
    };
    AdbDevice.prototype.install = function (apk, options, args, cb) {
        return this.client.install(this.id, apk, options, args, cb);
    };
    AdbDevice.prototype.uninstall = function (pkg, options, cb) {
        return this.client.uninstall(this.id, pkg, options, cb);
    };
    AdbDevice.prototype.isInstalled = function (pkg, cb) {
        return this.client.isInstalled(this.id, pkg, cb);
    };
    AdbDevice.prototype.startActivity = function (pkg, activity, options, cb) {
        return this.client.startActivity(this.id, pkg, activity, options, cb);
    };
    AdbDevice.prototype.startService = function (pkg, service, options, cb) {
        return this.client.startService(this.id, pkg, service, options, cb);
    };
    AdbDevice.prototype.stat = function (path, cb) {
        return this.client.stat(this.id, path, cb);
    };
    AdbDevice.prototype.readDir = function (path, cb) {
        return this.client.readDir(this.id, path, cb);
    };
    AdbDevice.prototype.pushDataToFile = function (data, destPath, cb) {
        return this.client.pushDataToFile(this.id, data, destPath, cb);
    };
    AdbDevice.prototype.pushFile = function (srcPath, destPath, cb) {
        return this.client.pushFile(this.id, srcPath, destPath, cb);
    };
    AdbDevice.prototype.pullDataFromFile = function (srcPath, cb) {
        return this.client.pullDataFromFile(this.id, srcPath, cb);
    };
    AdbDevice.prototype.pullFile = function (srcPath, destPath, cb) {
        return this.client.pullFile(this.id, srcPath, destPath, cb);
    };
    AdbDevice.prototype.pull = function (path, cb) {
        return this.client.pull(this.id, path, cb);
    };
    AdbDevice.prototype.push = function (srcPath, destPath, mode, cb) {
        return this.client.push(this.id, srcPath, destPath, mode, cb);
    };
    AdbDevice.prototype.tcpip = function (port, cb) {
        if (port === void 0) { port = 5555; }
        return this.client.tcpip(this.id, port, cb);
    };
    AdbDevice.prototype.usb = function (cb) {
        return this.client.usb(this.id, cb);
    };
    AdbDevice.prototype.waitBootComplete = function (cb) {
        return this.client.waitBootComplete(this.id, cb);
    };
    AdbDevice.prototype.listSettings = function (mode, cb) {
        return this.client.listSettings(this.id, mode, cb);
    };
    AdbDevice.prototype.getProp = function (prop, cb) {
        return this.client.getProp(this.id, prop, cb);
    };
    AdbDevice.prototype.setProp = function (prop, value, cb) {
        return this.client.setProp(this.id, prop, value, cb);
    };
    AdbDevice.prototype.getSetting = function (mode, name, cb) {
        return this.client.getSetting(this.id, mode, name, cb);
    };
    AdbDevice.prototype.putSetting = function (mode, name, value, cb) {
        return this.client.putSetting(this.id, mode, name, value, cb);
    };
    AdbDevice.prototype.tap = function (x, y, source, cb) {
        return this.client.tap(this.id, x, y, source, cb);
    };
    AdbDevice.prototype.text = function (text, source, cb) {
        return this.client.text(this.id, text, source, cb);
    };
    AdbDevice.prototype.keyEvent = function (code, options, cb) {
        return this.client.keyEvent(this.id, code, options, cb);
    };
    AdbDevice.prototype.swipe = function (x1, y1, x2, y2, options, cb) {
        return this.client.swipe(this.id, x1, y1, x2, y2, options, cb);
    };
    AdbDevice.prototype.dragAndDrop = function (x1, y1, x2, y2, options, cb) {
        return this.client.dragAndDrop(this.id, x1, y1, x2, y2, options, cb);
    };
    AdbDevice.prototype.press = function (source, cb) {
        return this.client.press(this.id, source, cb);
    };
    AdbDevice.prototype.roll = function (x, y, source, cb) {
        return this.client.roll(this.id, x, y, source, cb);
    };
    AdbDevice.prototype.custom = function (CustomCommand, cb) {
        return this.client.customTransport(CustomCommand, this.id, cb);
    };
    AdbDevice.prototype.openMonkey = function (cb) {
        return this.client.openMonkey(this.id, cb);
    };
    AdbDevice.prototype.killApp = function (pkg, cb) {
        return this.client.killApp(this.id, pkg, cb);
    };
    AdbDevice.prototype.exec = function (cmd, cb) {
        return this.client.execDevice(this.id, cmd, cb);
    };
    AdbDevice.prototype.execShell = function (cmd, cb) {
        return this.client.execDeviceShell(this.id, cmd, cb);
    };
    AdbDevice.prototype.batteryStatus = function (cb) {
        return this.client.batteryStatus(this.id, cb);
    };
    AdbDevice.prototype.rm = function (path, options, cb) {
        return this.client.rm(this.id, path, options, cb);
    };
    AdbDevice.prototype.mkdir = function (path, options, cb) {
        return this.client.mkdir(this.id, path, options, cb);
    };
    AdbDevice.prototype.touch = function (path, options, cb) {
        return this.client.touch(this.id, path, options, cb);
    };
    AdbDevice.prototype.mv = function (srcPath, destPath, options, cb) {
        return this.client.mv(this.id, srcPath, destPath, options, cb);
    };
    AdbDevice.prototype.cp = function (srcPath, destPath, options, cb) {
        return this.client.cp(this.id, srcPath, destPath, options, cb);
    };
    AdbDevice.prototype.fileStat = function (path, cb) {
        return this.client.fileStat(this.id, path, cb);
    };
    return AdbDevice;
}());
exports.default = AdbDevice;
