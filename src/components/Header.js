import React from 'react';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/actions/authActions';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VisibilityIcon from '@material-ui/icons/Visibility';
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';

const useStyles = makeStyles((theme) => ({
	'@global': {
		ul: {
			margin: 0,
			padding: 0,
			listStyle: 'none',
		},
	},
	appBar: {
		borderBottom: `1px solid ${theme.palette.divider}`,
	},
	toolbar: {
		flexWrap: 'wrap',
	},
	toolbarTitle: {
		flexGrow: 1,
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
}));

function Header(props) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	const user = useSelector((state) => state.auth.user);
	const logout = () => {
		dispatch(logoutUser());
		history.push('/login');
	};

	const role = user.role;

	return (
		<div className="header">
			<AppBar position="static" color="default" elevation={0} className={classes.appBar}>
				<Toolbar className={classes.toolbar}>
					<Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
						<Link to="/">
							<IconButton color="primary" style={{ backgroundColor: '#CDF7F6', borderRadius: "8px" }}>
								<HomeIcon fontSize="large" />
							</IconButton>
						</Link>
					</Typography>
					<nav>
						{role === 'USER' && (
							<Link to="/details" color="textPrimary" className={classes.link}>
								<Button variant="outlined">
									<VisibilityIcon />
									View CV
								</Button>
							</Link>
						)}
						{role === 'ADMIN' && (
							<Link to="/cvs" color="textPrimary" className={classes.link}>
								<Button variant="outlined">
									<ListIcon />
									List All
								</Button>
							</Link>
						)}
					</nav>
					<Button onClick={logout} color="primary" variant="outlined">
						Logout
						<ExitToAppIcon />
					</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default Header;
