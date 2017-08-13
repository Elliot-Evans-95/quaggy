#!/usr/bin/env node
'use strict';

const fs = require('fs');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = function (sites, useOutputFile) {
    console.log('SITES:', sites);
    console.log('FILES:', useOutputFile);
    findSites(sites);
    findOutputFiles(useOutputFile);
};

function findSites(sites) {
    return sites;
}

function findOutputFiles(useOutputFile) {
    return useOutputFile;
}

fs.readFile('.slackChannel', function(err, data) {
    if(err) {
        console.error(err);
        process.exit(1);
    }

    let getSites = findSites();
    let getFileOutput = findOutputFiles();

    return sendSlack(data.toString(), getSites, getFileOutput)
});

function slackChannelLighthouseResult(sites, outputFile) {
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
    parameterErrorHandler(sites, 'sites');
    return sites;
}

function useOutputFileName(outputFile) {
    parameterErrorHandler(outputFile, 'output file');
    return outputFile;
}

function parameterErrorHandler(param, name) {
    if(param === undefined || param === null) {
        console.error(`Unable to find ${name}`);
        process.exit(1);
    }
}
