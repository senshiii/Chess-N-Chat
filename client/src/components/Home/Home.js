import React, { Fragment } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, Toolbar, Typography, Container, Box } from '@material-ui/core';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

import ChessImg from '../../assets/home/chess1.jpg';

const useStyles = makeStyles((theme) => ({
	navbarbg: {
		background: '#1d1d1d',
		[theme.breakpoints.down('xs')]: {
			paddingLeft: theme.spacing(2),
			'& > div': {
				display: 'flex',
				justifyContent: 'center'
			}
		},
		paddingLeft: theme.spacing(8)
	},
	button: {
		borderColor: '#ff5e15',
		color: '#fff',
		marginLeft: 'auto',
		display: 'flex',
		alignItems: 'center',
		'&:hover': {
			background: '#ff5e15'
		},
		[theme.breakpoints.down('xs')]: {
			display: 'none'
		}
	},
	container: {
		marginTop: '64px',
		paddingTop: '1rem',
		height: 'calc(100vh - 90px)',
		background: '#fff',
		[theme.breakpoints.down('md')]: {
			'&>div': {
				flexDirection: 'column-reverse',
				'& div': {
					width: '100%',
					height: '50%'
				}
			}
		}
	}
}));

const Home = () => {
	const classes = useStyles();
	return (
		<Fragment>
			<AppBar className={classes.navbarbg}>
				<Toolbar>
					<Typography variant="h5">
						<Icon icon="chess-board" /> Chess N Chat
					</Typography>
					<Button className={classes.button} variant="outlined" size="small">
						<Icon icon="plus-square" />&nbsp;Create Room
					</Button>
				</Toolbar>
			</AppBar>
			<Container className={classes.container}>
				<Box display="flex" justifyContent="flex-start" alignItems="center" height="100%">
					<Box component="div" width="50%">
						<Typography variant="h3">
							<Icon icon="chess" /> Chess feels better when played with humans.
						</Typography>
						<Typography variant="h3" style={{ marginTop: '.5rem' }}>
							Especially friends
						</Typography>
						<Typography variant="h6" style={{ marginTop: '.8rem' }}>
							Connect with friends over some chess. Made for chess lovers.
						</Typography>
					</Box>
					<Box component="div" width="50%">
						<img src={ChessImg} alt="Chess Banner Img" width="100%" height="100%" />
					</Box>
				</Box>
			</Container>
		</Fragment>
	);
};

export default Home;
