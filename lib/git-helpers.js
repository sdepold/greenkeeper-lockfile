'use strict'

const exec = require('child_process').execSync

const updateNeedle = /chore\(package\): update .* to version .*/
const updateAllNeedle = /chore\(package\): update dependencies/

module.exports = {
  getNumberOfCommitsOnBranch: function getNumberOfCommitsOnBranch (branch) {
    const lastCommit = exec(`git log --pretty=oneline --abbrev-commit -1`).toString().trim()
    return (lastCommit.match(updateNeedle) || lastCommit.match(updateAllNeedle)) ? 1 : 0
  },
  getRepoSlug: function getRepoSlug (githubUrl) {
    var ghRegex = /\S+[:|/](\w+(?:[-]\w+)*)\/(\w+(?:[-]\w+)*)/g
    var parsed = ghRegex.exec(githubUrl)
    return (
      `${parsed[1]}/${parsed[2]}`
    )
  }
}
