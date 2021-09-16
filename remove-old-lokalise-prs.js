//var core = require("@actions/core");
var github = require("@actions/github");
var token = process.argv.slice(2).join('').substring(6);
var owner = github.context.repo.owner;
var repo = github.context.repo.repo;
console.log("test1232");
console.log("token:", token);
console.log("Owner:", owner);
console.log("repo:", repo);

const pullRequests = () => {
  const octo = github.getOctokit(token);
  var response = octo.rest.pulls.list({
        owner: owner,
        repo: repo,
    })["catch"]((e) => { 
        console.log(e.message) 
    });
    return response;
}

const parsePullRequestId = githubRef => {
  const result = /refs\/pull\/(\d+)\/merge/g.exec(githubRef);
  if (!result) throw new Error("Reference not found.");
  const [, pullRequestId] = result;
  return pullRequestId;
};

async function main() {

  let pullPromise = pullRequests();
  const currentPullId = parsePullRequestId(process.env.GITHUB_REF);
  console.log("currentPullId:", currentPullId);
  
  await pullPromise.then(prs => { 
    console.log("Pull requests:", prs)
    let filteredPrs = prs.data.filter(pr => {
    let regex = new RegExp('^Lokalise:[ _a-zA-Z0-9]+');
    return regex.test(pr.title) && pr.number != currentPullId;
    });
    console.log("filtered prs:", filteredPrs);
    if (!filteredPrs.length > 0) return true;
    //otherwise, go ahead and clear them out.
    filteredPrs.forEach(pr => {
      octo.rest.pulls.update({
          owner: owner,
          repo: repo,
          pull_number: pr.number,
          state: 'closed'
      });
    });
  });
  
};
main().catch(err => {
  console.error(err);
});;
