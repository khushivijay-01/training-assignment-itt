1) Create a new branch named feature-profile
    -git branch feature-profile
2) Switch to this branch
    -git checkout feature-profile
3) Add a new file profile.txt
    -touch profile.txt
4) commit the changes
    -git commit -a "add profile file"
5) Switch back to the main branch.
    -git checkout git-learning
6) Merge feature-profile into main.
    -git merge featue-profile
7) Verify the merged changes.
    -git log --oneline
    here HEAD verfies the merging part