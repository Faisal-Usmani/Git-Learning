# Git Learning

This is my learning repository.

**Author:** Faisal Usmani

---

## What is Git?

Git is a version control system that tracks code changes.

### Benefits

- Track code history
- Undo mistakes
- Collaborate with teams
- Manage different features using branches

---

## Commands

### 1. Configuration

Check Git version:

```bash
git --version
git config --list
git config --global user.name "faisal"
git config --global user.email "faisal@gmail.com"

```

### 2. Clone And Status

```bash
git clone <link>
git status
```

### 3. add And commit

```bash
git add .
git commit -m ''some message"
git push origin main
```



# untracked 
when user create new file.
git status --> will show untracked status means git does not know about the file beacuse not committed yet.

# modified
git status--> modified status means user have made changes in commited file.


# staged
1. git add --> user have added the modified or untracked file
2. git status--> user have added the modified or untracked file then when use do git status it will show staged
3. now its ready to commit.


# unmodified
git status--> no change in file



### How to create SSH key

```bash
ssh-keygen -t ed25519 -C "YOUR_PERSONAL_GITHUB_EMAIL"
```
#### Verify the key exists


```bash
Get-ChildItem $HOME\.ssh
```
#### Show public key

```bash
Get-Content $HOME\.ssh\id_ed25519.pub
```
 #### Add the key to GitHub

 ```bash
setting->SSH and GPG Key
```

### Test
 ```bash
ssh -T git@github.com
```

### initialize the repository.

# Steps
1 create repository using new repository of same name as local repository
<br>
2 Add CLI Commands as begin below

```bash
git init
git remote add origin <link of repository>
git remote -v
git branch
git branch -M main
git push -u origin main
```


