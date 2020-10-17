import React from "react";
import Movies from "./components/movies/movies";
import './App.css';
// import NavBar from "./components/navbar";
// import Counters from "./components/counter/counters";

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from "@fortawesome/free-regular-svg-icons";

library.add(fas, far);

class App extends React.Component {
	state = {
		counters: [
			{ id: 1, value: 2 },
			{ id: 2, value: 0 },
			{ id: 3, value: 0 },
			{ id: 4, value: 0 },
		],
	};

	getTotal() {
		return this.state.counters.filter((counter) => counter.value > 0).length;
	}

	handleReset = () => {
		const counters = this.state.counters.filter((c) => {
			c.value = 0;
			return c;
		});

		this.setState({ counters });
	};

	handleIncrement = (counter) => {
		const counters = [...this.state.counters];
		const index = counters.indexOf(counter);
		counters[index] = { ...counter };
		counters[index].value++;
		this.setState({ counters });
  }
  
  handleDecrement = (counter) => {
    if (counter.value <= 0) {
      return;
    }

		const counters = [...this.state.counters];
		const index = counters.indexOf(counter);
		counters[index] = { ...counter };
		counters[index].value--;
		this.setState({ counters });
	}

	handleDelete = (counterId) => {
		const counters = this.state.counters.filter((c) => c.id !== counterId);
		this.setState({
			counters,
		});
	};

	render() {
		return (
			<React.Fragment>
				<Movies />
				{/* <NavBar totalCounters={this.getTotal()} />

				<main className="container mt-2">
					<Counters
						counters={this.state.counters}
						onReset={this.handleReset}
            			onIncrement={this.handleIncrement}
            			onDecrement={this.handleDecrement}
						onDelete={this.handleDelete}
					/>
				</main> */}
			</React.Fragment>
		);
	}
}

export default App;
