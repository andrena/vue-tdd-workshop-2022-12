#!/bin/bash

set -eu

git remote add github git@github.com:andrena/vue-tdd-workshop-2022-12.git 2>/dev/null || true
git fetch --prune --all

git branch --delete --force tmp 2> /dev/null || true
git checkout origin/uebung_1
git checkout --orphan tmp
git commit -m "Übung 1"
git push github --force HEAD:refs/heads/uebung_1

for i in $(seq 2 7); do
  git checkout "origin/uebung_$i" -- .
  git commit -m "Übung $i"
  git push github --force "HEAD:refs/heads/uebung_$i"
done

git checkout origin/main -- .
git commit -m "Lösung"
git push github --force HEAD:refs/heads/loesung

git log --pretty=format:'%Cred%h%Creset %C(bold blue)<%an>%Creset%C(yellow)%d%Creset %Cgreen(%cr)%Creset%n%w(80,8,8)%s' --graph github/loesung
git remote rm github
git checkout main

echo "Done, switched back to main."
