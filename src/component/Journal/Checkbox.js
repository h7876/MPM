import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { selectEntry } from "../../ducks/users";


class Checkbox extends Component {
  constructor() {
    super();

    this.state = {
      isChecked: false,
      entryToDelete: []
    };
    this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
  }

  toggleCheckboxChange = () => {
    const { handleCheckboxChange, label } = this.props;
    console.log(this.props)

    this.setState({ isChecked: !this.state.isChecked, entryToDelete: label });
    this.props.selectEntry(label)
    console.log(this.state.entryToDelete)
  };

  render() {
    const { label } = this.props;
    const { isChecked } = this.state;

    return (
      <div className="checkbox">
        <label>
          <input
            type="checkbox"
            value={label}
            checked={isChecked}
            onChange={this.toggleCheckboxChange}
          />

          {label}
        </label>
      </div>
    );
  }
}

Checkbox.PropTypes = {
  label: PropTypes.string.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    entryToDelete: state.entryToDelete
  };
}

export default connect(
  mapStateToProps,
  { selectEntry }
)(Checkbox);
