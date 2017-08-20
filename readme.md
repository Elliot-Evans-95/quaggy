# Quaggy

## Adds Slack integration into google's 'lighthouse' project

### How it works

The package will look for a file called `.slackChannel` in the root of your project.
Once found to will take the text inside and use that as the references for slack's WebHook.

Then it will take onto lighthouse's result and post the result to your slack channel.

### What it posts

Currently the Bot posts into the channel: 

* Date & Time
* Result Score
* The filename is got the data from

### What is currently using this package

Currently Pharos is using this project.