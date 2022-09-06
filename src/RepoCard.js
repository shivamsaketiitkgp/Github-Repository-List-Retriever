function RepoCard({ repo, index }) {
  return (
    <a
      className="repo-item"
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
    >
      <div>
        <h4>
          {index + 1}. {repo.name}
        </h4>
        <p>Description: {repo.description}</p>
        <p>Owner Name: {repo.owner.login}</p>
        <p>Stars count: {repo.stargazers_count}</p>
        <p>Number of forks: {repo.forks_count}</p>
        <p>Language: {repo.language}</p>
      </div>
    </a>
  );
}

export default RepoCard;
