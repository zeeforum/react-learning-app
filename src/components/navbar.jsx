import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavBar = ({ user }) => {
	return (
		<nav className="navbar navbar-light bg-light navbar-expand-sm">
			<Link to="/" className="navbar-brand">
				Vidly
			</Link>

			<ul className="navbar-nav">
				<li className="nav-item">
					<NavLink className="nav-link" to="/movies">Movies</NavLink>
				</li>
				<li className="nav-item">
					<NavLink className="nav-link" to="/customers">Customers</NavLink>
				</li>
				<li className="nav-item">
					<NavLink className="nav-link" to="/rental">Rental</NavLink>
				</li>
				{
					!user &&
					(<React.Fragment>
						<li className="nav-item">
							<NavLink className="nav-link" to="/login">Login</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/register">Register</NavLink>
						</li>
					</React.Fragment>)
				}
				{
					user &&
					(<React.Fragment>
						<li className="nav-item">
							<NavLink className="nav-link" to="/profile">
								{user.name}
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/logout">Logout</NavLink>
						</li>
					</React.Fragment>)
				}
			</ul>
		</nav>
	);
}

export default NavBar;