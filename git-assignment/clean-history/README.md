1) Create multiple small commits.
- Create multiple files, add it and commit it. I did it for 3 files.

2) Squash them into a single commit.
- Use Command:
    "git rebase -i" 
    Then it open the editor, select the squash for the 2 files out of three and then click on button rebase.
    It open editor again for the commit so write the commit and then click commit button. It squash the multiple commits into the one. 

3) Verify the commit history is clean.
- For verify, use command:
    "git log --oneline"
    It shows the multiple commits into a single commit. 