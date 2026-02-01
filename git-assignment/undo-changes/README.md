1) Modify intro.txt but do not stage it.
 -i) Modify file

2) Discard the changes.
 -git restore intro.txt

3) Modify skills.txt, stage it, then unstage it.
 -i) Modify skills.txt
  ii) git add skills.txt
  iii) git restore --staged skills.txt

4) Modify goals.txt, commit it, then revert the commit.
 -i) Modify goals.txt
  ii) git add goals.txt
  iii) git commit -m "message"
  iv) git log --oneline
  v) git revert <commit id>