1) Create multiple small commits.
- create multiple files , add it and commit it . i did it for 3 files.

2) Squash them into a single commit.
- use command:
    "git rebase -i" 
    then it open the editor , select the squash for the 2 files out of three and then click on button rebase .
    it open editor again for the commit so write the commit and then click commit button . it squash the multiple commits into the one. 

3) Verify the commit history is clean.
- for verify , use command:
    "git log --oneline"
    it shows the multiple commits into a single commit. 