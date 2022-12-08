#!/bin/bash

set -eu

branches=(main uebung_7 uebung_6 uebung_5 uebung_4 uebung_3 uebung_2 uebung_1)

git checkout main > /dev/null
git pull

for ((i=1; i < ${#branches[@]}; i++)); do
  current=${branches[i]}
  previous=${branches[i-1]}
  echo ""
  echo "Rebasing $current..."
  git branch --delete --force "$current" 2> /dev/null || true
  git checkout "$current"
  if ! git rebase --onto "$previous" "$current~1" "$current"; then
    while true; do
      echo "Rebase failed, please resolve the conflicts and press enter"
      read -r _
      if git rebase --continue; then
        break
      fi
    done
  fi
  echo "You can now make manual edits (with amend), or continue directly with [ENTER]"
  read -r _
done

git log --pretty=format:'%Cred%h%Creset %C(bold blue)<%an>%Creset%C(yellow)%d%Creset %Cgreen(%cr)%Creset%n%w(80,8,8)%s' --graph "${branches[@]}"

echo "Press enter to push results or CTRL-C to cancel"
read -r _
git push origin --atomic --force "${branches[@]}"

git checkout main
echo "Done, switched back to main."
