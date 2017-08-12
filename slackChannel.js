#!/usr/bin/env node
'use strict';

const fs = require('fs');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = slackChannelLighthouseResult();

fs.readFile('.slackChannel', function(err, data) {
    if(err) {
        console.error(err);
        process.exit(1);
    }

    let sites = 'YEOMAN';
    let useOutputFile = 'filename.json';

    return sendSlack(data.toString(), sites, useOutputFile)
});

function slackChannelLighthouseResult() {
    const _currentTime = new Date().toLocaleString();

    useLighthouseSites(sites);
    useOutputFileName(outputFile);

    return JSON.stringify({"text": `Date & Time: ${_currentTime} \n URL: ${sites} \n Result: ${outputFile}`});
}

function sendSlack(webHook, sites, useOutputFile) {

    const _request = new XMLHttpRequest();
    let _slack = slackChannelLighthouseResult(sites, useOutputFile);

    _request.open('POST', webHook, true);
    _request.setRequestHeader('Content-Type', 'application/json');
    _request.send(_slack);
}

function useLighthouseSites(sites) {
    if(sites === undefined || sites === null) {
        sites = 'test';
    }
    return sites;
}

function useOutputFileName(outputFile) {
    if(outputFile === undefined || outputFile === null) {
        outputFile = '30';
    }
    return outputFile;
}
