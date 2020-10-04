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

    //Validate the given timestamp
    validateTweetSchedule(tweetTime)

    isTweetingTime = isTimeToTweet(tweetTime)

    if (isTweetingTime) {
        console.log("=======================>>> ", isTweetingTime)
        core.setOutput(true)
    }

} catch (error) {
    core.setFailed(error.message);
}

function validateTweetSchedule(tweetTime) {
    var parsedDate = Date.parse(tweetTime);

    if (isNaN(parsedDate)) {
        core.error("Error occured while parsing the given timestamp. Please provide the time in conventional UTC format as 2020-10-04T16:02:11.029Z")
        core.setFailed("Error occured while parsing the given timestamp. Please provide the time in conventional UTC format as 2020-10-04T16:02:11.029Z")   
    }
}

function isTimeToTweet(tweetTime) {
    parsedTime = Date.parse(tweetTime)
    presentTime = new Date().getTime()
    if ((presentTime-parsedDate) <= 900000 ) {
        return true
    } else {
        return false
    }
}