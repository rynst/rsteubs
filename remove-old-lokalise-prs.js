// var core = require("@actions/core");
// var github = require("@actions/github");
// var token = core.getInput('token');
// var owner = github.context.repo.owner;
// var repo = github.context.repo.repo;

// const pullRequests = () => {
//     var octo = new github.GitHub(token);
//     var response = octo.pulls.list({
//         owner: owner,
//         repo: repo,
//     })["catch"]((e) => { 
//         console.log(e.message) 
//     });
//     return response;
// }

(function() {
//   let pullPromise = pullRequests();
//   const currentPullId = parsePullRequestId(process.env.GITHUB_REF);
//   let filteredPrs = await pullPromise.then(prs => { prs.data.filter( pr => {
//     let regex = new RegExp('^Lokalise:[ _a-zA-Z0-9]+');
//     return regex.test(pr.name) && pr.number != currentPullId;
//   })});
  
//   //excluding current PR, if none then all past PRs deleted
//   if (!filteredPrs.length) return true;

//   //otherwise, go ahead and clear them out.
//   filteredPrs.forEach(pr => {
//     octo.pulls.update({
//         owner: owner,
//         repo: repo,
//         pull_number: pr.number,
//         state: 'closed'
//     });
//   });

}());
