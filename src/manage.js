import 'whatwg-fetch'

import React from 'react';
import QS from 'querystring';

import Layout from './layout';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

const KEYS = [ { value: 'archive_url', label: 'archive_url' },
  { value: 'assignees_url', label: 'assignees_url' },
  { value: 'blobs_url', label: 'blobs_url' },
  { value: 'branches_url', label: 'branches_url' },
  { value: 'clone_url', label: 'clone_url' },
  { value: 'collaborators_url', label: 'collaborators_url' },
  { value: 'comments_url', label: 'comments_url' },
  { value: 'commits', label: 'commits' },
  { value: 'commits_url', label: 'commits_url' },
  { value: 'compare_url', label: 'compare_url' },
  { value: 'contents_url', label: 'contents_url' },
  { value: 'contributors_url', label: 'contributors_url' },
  { value: 'created_at', label: 'created_at' },
  { value: 'days_stagnant', label: 'days_stagnant' },
  { value: 'default_branch', label: 'default_branch' },
  { value: 'deployments_url', label: 'deployments_url' },
  { value: 'description', label: 'description' },
  { value: 'deprecated', label: 'deprecated' },
  { value: 'downloads_url', label: 'downloads_url' },
  { value: 'events_url', label: 'events_url' },
  { value: 'fork', label: 'fork' },
  { value: 'forks', label: 'forks' },
  { value: 'forks_count', label: 'forks_count' },
  { value: 'forks_url', label: 'forks_url' },
  { value: 'full_name', label: 'full_name', clearableValue: false },
  { value: 'git_commits_url', label: 'git_commits_url' },
  { value: 'git_refs_url', label: 'git_refs_url' },
  { value: 'git_tags_url', label: 'git_tags_url' },
  { value: 'git_url', label: 'git_url' },
  { value: 'has_downloads', label: 'has_downloads' },
  { value: 'has_issues', label: 'has_issues' },
  { value: 'has_pages', label: 'has_pages' },
  { value: 'has_wiki', label: 'has_wiki' },
  { value: 'health', label: 'health' },
  { value: 'homepage', label: 'homepage' },
  { value: 'hooks_url', label: 'hooks_url' },
  { value: 'html_url', label: 'html_url' },
  { value: 'id', label: 'id' },
  { value: 'issue_comment_url', label: 'issue_comment_url' },
  { value: 'issue_events_url', label: 'issue_events_url' },
  { value: 'issues_url', label: 'issues_url' },
  { value: 'keys_url', label: 'keys_url' },
  { value: 'labels_url', label: 'labels_url' },
  { value: 'language', label: 'language' },
  { value: 'languages', label: 'languages' },
  { value: 'languages_url', label: 'languages_url' },
  { value: 'last_contribution', label: 'last_contribution' },
  { value: 'merges_url', label: 'merges_url' },
  { value: 'milestones_url', label: 'milestones_url' },
  { value: 'mirror_url', label: 'mirror_url' },
  { value: 'name', label: 'name' },
  { value: 'notifications_url', label: 'notifications_url' },
  { value: 'open_issues', label: 'open_issues' },
  { value: 'open_issues_count', label: 'open_issues_count' },
  { value: 'owner', label: 'owner' },
  { value: 'permissions', label: 'permissions' },
  { value: 'private', label: 'private' },
  { value: 'pulls_url', label: 'pulls_url' },
  { value: 'pushed_at', label: 'pushed_at' },
  { value: 'releases_url', label: 'releases_url' },
  { value: 'size', label: 'size' },
  { value: 'ssh_url', label: 'ssh_url' },
  { value: 'stargazers_count', label: 'stargazers_count' },
  { value: 'stargazers_url', label: 'stargazers_url' },
  { value: 'statuses_url', label: 'statuses_url' },
  { value: 'subscribers_url', label: 'subscribers_url' },
  { value: 'subscription_url', label: 'subscription_url' },
  { value: 'svn_url', label: 'svn_url' },
  { value: 'tags_url', label: 'tags_url' },
  { value: 'teams_url', label: 'teams_url' },
  { value: 'trees_url', label: 'trees_url' },
  { value: 'topics', label: 'topics' },
  { value: 'updated_at', label: 'updated_at' },
  { value: 'url', label: 'url' },
  { value: 'watchers', label: 'watchers' },
  { value: 'watchers_count', label: 'watchers_count' } ];

class Manage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      keys: ["full_name"],
      query: [],
      loading: false,
      error: ""
    }
    try {
        const { user, keys } = QS.parse(this.props.location.search.substring(1, this.props.location.search.length));
        this.state['user'] = user;
        this.state['keys'] = JSON.parse(keys);
    } catch(ex) {
      console.error(ex);
    }
  }
  query () {
    const { user, keys } = this.state;

    this.setState({
      loading: true
    });

    fetch('/api/metrics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user,
        keys
      })
    })
    .then((response) => response.json())
    .then((json) => {
      const { error, results } = json;

      this.setState({
        error: error ? JSON.stringify(error, null, 4) : '',
        query: results,
        loading: false
      })

      if (history.pushState) {
        var url = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
        url += `?user=${user}`;
        url += `&keys=${JSON.stringify(keys)}`;
        window.history.pushState({ path: url },'', url);
      }
    })
    .catch((error) => {
      this.setState({
        error: error.toString(),
        loading: false
      })
    })
  }
  updateName(ex) {
    const user = ex.target.value;
    this.setState({
      user
    });
  }
  updateKeys(keys) {
    this.setState({
      keys: keys.map((k) => k.value)
    })
  }
  render () {
    const { user, query, error, keys, loading } = this.state;

    return (
      <Layout>
        <div>
        { loading ?
          <div style={{ top: "50%", right: "50%", position: "absolute" }}>
            <div className="spinner spinner-primary"></div>
          </div>
        : '' }
          <div style={{ width:'50%', margin: '0 auto', opacity: `${loading ? 0.5 : 1}` }}>
            <div style={{ position: "relative" }}>
              <input type="text" placeholder="type the name of the organization" onChange={this.updateName.bind(this)} value={ user }/>
              <button className="btn" onClick={this.query.bind(this)} style={{ margin: '4px', top: 0, right: 0, height: '30px', padding: '4px', position: 'absolute' }}> Query </button>
            </div>
            <hr className="ellipsis" style={{ paddingBottom: "20px", paddingTop: 0 }}/>
            <Select
              name="metric-keys"
              value={ keys }
              multi={ true }
              options={ KEYS }
              onChange={this.updateKeys.bind(this)}
              />
            <div>
              { error ?
                <div className="alert alert-danger text-white">
                  { error }
                </div>
              : ''}
              { query && query.length > 0 ?
                <table className="table responsive text-left">
                  <thead>
                    {keys.map(function(k) {
                      return <th> { k }</th>
                    })}
                  </thead>
                  <tbody>
                    {query.map((v) => {
                      return (<tr>
                        {keys.map(function(r) {
                          return <td> {v[r]} </td>
                        })}
                      </tr>);
                    })}
                  </tbody>
              </table>
              : ''}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Manage;
