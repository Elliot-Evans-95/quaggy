#!/usr/bin/env node
'use strict';

const fs = require('fs');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = getData(getSites,  getUseOutputFile);

function getData(getSites, getUseOutputFile) {

    let getWebHook = findFileForWebHook('.slackChannel', function(data) {
        return data.toString();
    });

    let sites = useLighthouseSites(getSites);
    let outputFile = useOutputFileName(getUseOutputFile);
    let webHook = useWebHook(getWebHook);

    buildMessage(sites, outputFile, webHook);
}

function findFileForWebHook(filePath){
    return fs.readFileSync(filePath);
}

function buildMessage(sites, outputFile, webHook) {
    const _currentTime = new Date().toLocaleString();
    let message = JSON.stringify({"text": `Date & Time: ${_currentTime} \n URL: ${sites} \n Result: ${outputFile}`});

    sendSlack(webHook, message);
}

function sendSlack(getWebHook, message) {
    const _request = new XMLHttpRequest();

    _request.open('POST', getWebHook, true);
    _request.setRequestHeader('Content-Type', 'application/json');
    _request.send(message);
}

function useLighthouseSites(sites) {
    parameterErrorHandler(sites, 'sites');
    return sites;
}

function useOutputFileName(outputFile) {
    parameterErrorHandler(outputFile, 'output file');
    return outputFile;
}

function useWebHook(webHook) {
    parameterErrorHandler(webHook, 'webhook');
    return webHook;
}

function parameterErrorHandler(param, name) {
    if(param === undefined || param === null) {
        console.error(`Unable to find ${name}`);
        process.exit(1);
    }
}
