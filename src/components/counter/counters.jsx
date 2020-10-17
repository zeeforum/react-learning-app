import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
	render() {
        let { counters, onIncrement, onDecrement, onDelete, onReset } = this.props;
		return (
			<React.Fragment>
                <button className="btn btn-sm btn-primary" onClick={onReset}>Reset</button>
				{counters.map((counter) => (
					<Counter
						key={counter.id}
                        counter={counter}
                        onIncrement={onIncrement}
                        onDecrement={onDecrement}
						onDelete={onDelete}
					></Counter>
				))}
			</React.Fragment>
		);
	}
}

export default Counters;
