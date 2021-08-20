import React, { Component } from "react";

class Counter extends Component {

  isCounterValueZero = (counter) => {
    console.log("Iscounter value zero called");
      return counter.value === 0 ? 1 : 0;
  }

  render() {

    const { counter, onIncrement, onDecrement, onDelete} = this.props;

    return (
      <div className="row">
        <div className="col-1">
           <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        </div>
        <div className="col">
            <button
              onClick={() => onIncrement(counter)}
              className="btn btn-secondary btn-sm"
            >
              +
            </button>
            <button
              onClick={ () => onDecrement(counter)}
              className="btn btn-secondary btn-sm m-2"
              disabled={this.props.counter.value === 0 ? 'disabled' : ''}
            >
              -
            </button>
            <button
              onClick={ () => onDelete(counter.id)}
              className="btn btn-danger btn-sm"
            >
              x
            </button>
        </div>
       
        <br />
      </div>
    );
  }

  getBadgeClasses() {
    let counterClasses = "badge badge-primary m-2 badge-";
    counterClasses += this.props.counter.value === 0 ? "warning" : "primary";
    return counterClasses;
  }

  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? "Zero" : value;
  }


}

export default Counter;
