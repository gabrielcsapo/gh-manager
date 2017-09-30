import React from 'react';

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: ''
    };
  }
  sort(key, direction, array) {
    if(direction == 1) {
      return array.sort((a, b) => a[key] > b[key] ? -1 : 1);
    } else {
      return array.sort((a, b) => a[key] < b[key] ? -1 : 1);
    }
  }
  setStort(k) {
    const { sort, direction } = this.state;
    this.setState({
      sort: k,
      direction: k === sort ? -direction : 1
    });
  }
  render() {
    const { sort, direction } = this.state;
    const { keys, query } = this.props;

    return (<table className="table responsive text-left">
        <thead>
          {keys.map((k) => {
            return <th onClick={this.setStort.bind(this, k)}>{ k } {k == sort && direction == 1 ? "⬆️" : k == sort && direction == -1 ? "⬇️" : ""}</th>
          })}
        </thead>
        <tbody>
          {sort ?
            this.sort(sort, direction, query).map((v) => {
              return (<tr>
                {keys.map(function(r) {
                  return <td> {v[r]} </td>
                })}
              </tr>);
            })
          :
            query.map((v) => {
              return (<tr>
                {keys.map(function(r) {
                  return <td> {v[r]} </td>
                })}
              </tr>);
            })
          }
        </tbody>
    </table>);
  }
}

module.exports = Table;
