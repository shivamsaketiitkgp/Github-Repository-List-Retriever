## React App to display the list of GitHub repositories. 

Github API to fetch repo list

<https://api.github.com/search/repositories?q=language:Javascript&sort=stars&order=desc>&page=1&per_page=10

**Show basic details of the repo**

1) Repo name: `name`
2) Description: `description`
3) Owner name: `owner.login`
4) Stars count: `stargazers_count`
5) Number of forks: `forks_count`
6) Language: `language`

**Functionalities**
1) On click of the card/item the user is redirected to the GitHub repository page
2) Pagination - User is able to view the repo list in a paginated manner 

**Listof options**
1) Page number
2) Page size
3) Next page
4) Previous page
3) Search based on language and name
4) Sorting (Ascending and Descending):
1) Sort by stars
2) Sort by Name
