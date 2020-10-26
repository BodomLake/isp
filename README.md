# isp
isp-mevn架构的前后端分离的项目；处于dev分支上；
初始化一个Git仓库 git init
查看分支：git branch
创建分支：git branch <name>
切换分支：git checkout <name>
创建+切换分支：git checkout -b <name>
合并某分支到当前分支：git merge <name>
删除分支：git branch -d <name>
新建一个标签 git tag <name>
指定标签信息 git tag -a <tagname> -m "blablabla..."
用PGP签名标签 git tag -s <tagname> -m "blablabla..."
查看所有标签 git tag
推送一个本地标签 git push origin <tagname>
推送全部未推送过的本地标签 git push origin --tags
删除一个本地标签 git tag -d <tagname>
删除一个远程标签 git push origin :refs/tags/<tagname>
查看远程库信息 git remote -v；
从本地推送分支 git push origin branch-name，如果推送失败，先用git pull抓取远程的新提交；
在本地创建和远程分支对应的分支 git checkout -b branch-name origin/branch-name，本地和远程分支的名称最好一致；
建立本地分支和远程分支的关联 git branch --set-upstream branch-name origin/branch-name；
从远程抓取分支 git pull，如果有冲突，要先处理冲突。
工作区的状态 git status
查看修改内容 git diff
版本回滚 git reset --hard commit_id
查看提交历史 git log 查看命令历史 git reflog