import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Counter extends Component {
	// state = {
	//   count: 0,
	//   tags: ["tag1", "tag2", "tag3"],
	//   imageUrl: "https://picsum.photos/200", // get unique image of size 200*200
	// };

	// constructor() {
	//   super();
	//   this.handleIncrement = this.handleIncrement.bind(this);
	// }

	// renderTags() {
	//   if (this.state.tags.length === 0) return <p>There are no tags!</p>;

	//   return this.state.tags.map((tag, index) => (
	//     <li key={index}>
	//       {tag}
	//       <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
	//       <button onClick={this.handleIncrement}>Increment</button>
	//     </li>
	//   ));
	// }

	// handleIncrement = () => {
	//   this.setState({
	//     count: this.state.count + 1,
	//   });
	//   console.log("Button Clicked!", this.state.count);
	// };

	render() {
    let { counter, onIncrement, onDecrement, onDelete} = this.props;

		return (
			<div className="row mt-1">
				<div className="col-12 col-sm-2">
					<span className={this.getBadgeClasses()}>{this.formatCount()}</span>
				</div>
				<div className="col-12 col-sm-4">
					<button
						className="btn btn-sm btn-secondary mr-1"
						onClick={() => onIncrement(counter)}
					>
						<FontAwesomeIcon icon="plus" />
					</button>
					<button
						className="btn btn-sm btn-secondary mr-1"
            onClick={() => onDecrement(counter)}
            disabled={counter.value <= 0}
					>
						<FontAwesomeIcon icon="minus" />
					</button>
					<button
						className="btn btn-sm btn-danger"
						onClick={() => onDelete(counter.id)}
					>
						<FontAwesomeIcon icon="times" />
					</button>
				</div>
			</div>
		);
	}

	getBadgeClasses() {
    let classes = "badge m-2 badge-";
    let { value } = this.props.counter;
		classes += value === 0 ? "warning" : "primary";
		return classes;
	}

	formatCount() {
		const { value } = this.props.counter;
		return value === 0 ? "Zero" : value;
	}
}

export default Counter;
