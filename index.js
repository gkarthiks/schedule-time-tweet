const core = require('@actions/core');
const github = require('@actions/github');

try {
    
    var startingParseSymbol = core.getInput("time-schedule-parser").trim();
    var issueContext = github.context.payload.issue.body;
    var issueNumber = github.context.payload.issue.number;

    var issueTitle = github.context.payload.issue.title;

    console.log(`
    The symbol declared for parsing is ${startingParseSymbol}
    The issue title is ${issueTitle}
    `);
    var tweetTime = issueContext.substring(issueContext.indexOf(startingParseSymbol) + startingParseSymbol.length, issueContext.lastIndexOf(startingParseSymbol));
    console.log(`The tweet schedule is ${tweetTime}`);

    var scheduledTime = issueContext.substring(issueContext.indexOf("Time:")+5, issueContext.length).trim()

    console.log("================ Scheduled Time---> ", scheduledTime)


} catch (error) {
    core.setFailed(error.message);
}