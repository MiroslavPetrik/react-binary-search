import React, { Component } from "react";
import PropTypes from "prop-types";
import cn from "classnames";

// display value in the begining
// index = binSearch(value)
// print index and :tada:
// print sad face when does not exists

const makeListComponent = Cell =>
  class List extends Component {
    static propTypes = {
      values: PropTypes.array.isRequired,
      cellProps: PropTypes.object.isRequired
    };

    render() {
      const { values, cellProps } = this.props;

      return (
        <div className="list">
          {values.map((value, index, array) => (
            <Cell
              key={value}
              value={value}
              index={index}
              array={array}
              {...cellProps}
            />
          ))}
        </div>
      );
    }
  };

const BinarySearchListCell = ({
  value,
  index,
  array,
  left,
  right,
  mid,
  searchValue
}) => (
  <code
    className={cn("cell", {
      "is-dead": index < left || right < index,
      "is-left": index === left,
      "is-right": index === right,
      "is-mid": index === mid,
      "is-match": searchValue === array[mid]
    })}
  >
    {value}
  </code>
);

const BinarySearchList = makeListComponent(BinarySearchListCell);

class BinarySearch extends Component {
  static propTypes = {
    array: PropTypes.array.isRequired,
    value: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired
  };

  render() {
    const { array, value, left, right } = this.props;
    const chunk = array.slice(left, right);
    const mid = left + Math.floor(chunk.length / 2);

    const guess = array[mid];

    return (
      <div className="binary-search">
        <div className="input">
          <BinarySearchList
            values={array}
            cellProps={{ left, mid, right, searchValue: value }}
          />
        </div>
        {mid === left || mid === right ? (
          <h2 className="result">
            <code>{value}</code> is not on the list. 😢 <br />
            Index is <code>null</code>.
          </h2>
        ) : value < guess ? (
          <BinarySearch {...this.props} right={mid} />
        ) : guess < value ? (
          <BinarySearch {...this.props} left={mid} />
        ) : (
          <h2 className="result">
            The index of <code>{value}</code> is <code>{mid}</code>.
          </h2>
        )}
      </div>
    );
  }
}

class App extends Component {
  state = {
    value: 14
  };

  handleValueChange = ({ target }) =>
    this.setState({ value: parseInt(target.value) });

  render() {
    const { value } = this.state;
    const sortedArray = [...new Array(20).keys()].map(value => value + 1);

    return (
      <>
        <header>
          <h1>Binary Search</h1>

          <label htmlFor="value">Value</label>
          <input
            type="range"
            id="value"
            min={0}
            max={sortedArray.length}
            value={value}
            onChange={this.handleValueChange}
          />
          <h2>
            What's the index of <code>{value}</code>?
          </h2>
        </header>
        <section>
          <BinarySearch
            array={sortedArray}
            value={value}
            left={0}
            right={sortedArray.length - 1}
          />
        </section>
        <footer>
          ⚛
          <a href="https://github.com/MiroslavPetrik/react-binary-search">
            Miroslav Petrik
          </a>
        </footer>
      </>
    );
  }
}

export default App;
