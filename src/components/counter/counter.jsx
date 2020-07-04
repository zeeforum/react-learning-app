import React, { Component } from "react";

class Counter extends Component {
  state = {
    count: 0,
    tags: ["tag1", "tag2", "tag3"],
    // imageUrl: "https://picsum.photos/200", // get unique image of size 200*200
  };

  // constructor() {
  //   super();
  //   this.handleIncrement = this.handleIncrement.bind(this);
  // }

  renderTags() {
    if (this.state.tags.length === 0) return <p>There are no tags!</p>;

    return this.state.tags.map((tag, index) => (
      <li key={index}>
        {tag}
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <button onClick={this.handleIncrement}>Increment</button>
      </li>
    ));
  }

  handleIncrement = () => {
    this.setState({
      count: this.state.count + 1,
    });
    console.log("Button Clicked!", this.state.count);
  };

  render() {
    return (
      <React.Fragment>
        {/* {this.state.tags.length === 0 && <p>Please create a new tag!</p>} */}
        <ul>{this.renderTags()}</ul>
      </React.Fragment>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.state.count === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { count } = this.state;
    return count === 0 ? "Zero" : count;
  }
}

export default Counter;
