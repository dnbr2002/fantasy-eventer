import React, { Component } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import Avatar from 'material-ui/Avatar';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import Button from 'material-ui/Button';
import TextField from '@material-ui/core/TextField';

var compKey
var compTier

class AdminTable extends Component {
  static propTypes = {
    competitors: PropTypes.instanceOf(List).isRequired,
    updateCompetitor: PropTypes.func.isRequired,
    removeCompetitor: PropTypes.func.isRequired,
  };

  constructor() {
    super()
    this.removeCompetitor = this.removeCompetitor.bind(this)
    this.picFormatter = this.picFormatter.bind(this)
    this.updateScore = this.updateScore.bind(this)
  }

  removeCompetitor() {
    if (compTier === '1') {
      this.props.removeTier1Competitor(compKey);
    }
    if (compTier === '2') {
      this.props.removeTier2Competitor(compKey);
    }
  }

  updateScore(event) {
    event.preventDefault();
    const score = event.target.elements.score.value
    console.log("SCORE::", event.target.elements.score.value)

    const scoreUpdate = {
      score: score
    }

    if (score && compTier === '1') {
      this.props.updateTier1Competitor(compKey, scoreUpdate);
    }
    if (score && compTier === '2') {
      this.props.updateTier2Competitor(compKey, scoreUpdate);
    }

  }

  picFormatter(cell, row) {
    return (
      <span>
        <Avatar src={row.pic} />
      </span>
    );
  }


  render() {
    console.log("RBTABLE::", this.props.tier1CompetitorData);

    const columns = [
      {
        dataField: 'key',
        text: 'id'
      }, {
        dataField: 'rider',
        text: 'Rider'
      }, {
        dataField: 'horse',
        text: 'Horse'
      }, {
        dataField: 'tier',
        text: 'Tier'
      }, {
        dataField: 'pic',
        text: 'Pic',
        formatter: this.picFormatter
      }, {
        dataField: 'competition',
        text: 'Competition'
      }, {
        dataField: 'score',
        text: 'Score'
      }, {
        dataField: 'description',
        text: 'Description'
      }
    ];

    // Tier1 = this.props.tier1CompetitorData
    // Tier2 = this.props.tier2CompetitorData

    this.selectRow = {
      mode: 'checkbox',
      clickToSelect: true,
      clickToEdit: true,
      onSelect: (row, isSelect, rowIndex, e) => {
        compKey = row.key;
        compTier = row.tier;
      }
    };

    this.cellEdit = {
      mode: 'click',
      errorMessage: 'error',
      onTableChange: this.updateScore
    };


    this.cellEdit = {
      mode: 'click'
    };


    return (
      <div>
        <div className="g-row">
          <div className="g-col">
            <h4>Tier 1 Competitors</h4>
            <h4>Select and remove as needed</h4>
            <Button variant="raised" size="small" color="secondary" onClick={this.removeCompetitor} type="submit">Remove</Button>
          </div>
        </div>
        <br />
        <div className="bootstrap">
          <BootstrapTable
            keyField="key"
            striped={true}
            hover={true}
            data={this.props.competitors}
            columns={columns}
            selectRow={this.selectRow}
            cellEdit={cellEditFactory({ mode: 'click' })}
          />
        </div>
        <div className="form">
          <form onSubmit={this.updateScore}>
            <div className="g-row">
              <div className="g-col-3">
                <TextField label="Select then update score" id="score" type="text" name="score" />
              </div>
            </div>
            <br />
            <Button variant="raised" size="small" color="secondary" id="updateCompetitorScoreBtn" type="submit">Submit</Button>
          </form>
          <br />
        </div>
        <br />
      </div>

    )
  };
}

export default AdminTable;