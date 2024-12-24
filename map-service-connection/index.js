"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tl = require("azure-pipelines-task-lib/task");
function getServiceConnection() {
    const serviceConnectionId = tl.getInput("serviceConnection", true);
    const url = tl.getEndpointUrl(serviceConnectionId, true);
    const username = tl.getEndpointAuthorizationParameter(serviceConnectionId, "username", true);
    const password = tl.getEndpointAuthorizationParameter(serviceConnectionId, "password", false);
    return {
        url: url,
        username: username,
        password: password
    };
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Hello");
            var serviceConnection = getServiceConnection();
            console.log(`Service connection: ${serviceConnection}`);
            console.log(serviceConnection.url);
            console.log(serviceConnection.username);
            console.log(serviceConnection.password);
            let prefix = tl.getInput("prefix", true);
            let map = {};
            map[prefix + "_URL"] = serviceConnection.url;
            map[prefix + "_USERNAME"] = serviceConnection.username;
            map[prefix + "_PASSWORD"] = serviceConnection.password;
            for (let key in map) {
                const value = map[key];
                console.log(`Setting ${key} to value of length ${value.length}`);
                tl.setVariable(key, value);
            }
            ;
            tl.setResult(tl.TaskResult.Succeeded, 'Environment variables set successfully.');
        }
        catch (err) {
            tl.setResult(tl.TaskResult.Failed, err.message);
        }
    });
}
main();
