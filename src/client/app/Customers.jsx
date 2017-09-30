import React from 'react';

class Customers extends React.Component {

  constructor(props) {
        super(props);
        this.state = {likesCount : 0};
    }

  render() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th><abbr title="Position">Pos</abbr></th>
                        <th>Team</th>
                        <th><abbr title="Played">Pld</abbr></th>
                        <th><abbr title="Won">W</abbr></th>
                        <th><abbr title="Drawn">D</abbr></th>
                        <th><abbr title="Lost">L</abbr></th>
                        <th><abbr title="Goals for">GF</abbr></th>
                        <th><abbr title="Goals against">GA</abbr></th>
                        <th><abbr title="Goal difference">GD</abbr></th>
                        <th><abbr title="Points">Pts</abbr></th>
                        <th>Qualification or relegation</th>
                    </tr>
                </thead>
            </table>
        );
  }

}

export default Customers;