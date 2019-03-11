workflow "Deploy" {
  on = "push"
  resolves = ["GitHub Action for npm"]
}

action "GitHub Action for Zeit" {
  uses = "actions/zeit-now@666edee2f3632660e9829cb6801ee5b7d47b303d"
  secrets = ["GITHUB_TOKEN"]
}

action "GitHub Action for npm" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["GitHub Action for Zeit"]
}
