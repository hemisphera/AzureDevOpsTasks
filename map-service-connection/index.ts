import tl = require('azure-pipelines-task-lib/task');

function getServiceConnection() {
    const serviceConnectionId = tl.getInput("serviceConnection", true);
    const url = tl.getEndpointUrl(serviceConnectionId, true);
    const username = tl.getEndpointAuthorizationParameter(serviceConnectionId, "username", true);
    const password = tl.getEndpointAuthorizationParameter(serviceConnectionId, "password", false);

    return {
        url: url,
        username: username,
        password: password
    }
}

async function main(): Promise<void> {
    try {
        console.log("Hello");
        var serviceConnection = getServiceConnection();

        console.log(`Service connection: ${serviceConnection}`);
        console.log(serviceConnection.url);
        console.log(serviceConnection.username);
        console.log(serviceConnection.password);

        let prefix = tl.getInput("prefix", true);
        let map: { [index: string]: string; } = {};
        map[prefix + "_URL"] = serviceConnection.url;
        map[prefix + "_USERNAME"] = serviceConnection.username;
        map[prefix + "_PASSWORD"] = serviceConnection.password;

        for (let key in map) {
            const value = map[key];
            console.log(`Setting ${key} to value of length ${value.length}`);
            tl.setVariable(key, value);
        };

        tl.setResult(tl.TaskResult.Succeeded, 'Environment variables set successfully.');
    } catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

main();