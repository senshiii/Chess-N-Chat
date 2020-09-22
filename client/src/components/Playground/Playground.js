import React, { useEffect, useContext, Fragment, useState } from 'react';
import io from 'socket.io-client';

import {
	AppBar,
	Box,
	Container,
	CssBaseline,
	Button,
	IconButton,
	Toolbar,
	Typography,
	Hidden,
	Tooltip,
	Menu,
	MenuItem,
	ListItemIcon,
	ListItemText
} from '@material-ui/core';
import { GroupAddOutlined, ExitToAppRounded, MoreVertSharp } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import { SocketContext } from '../../context/socket-context';
import Chessboard from '../Chessboard/Chessboard';

const useStyles = makeStyles((theme) => ({
	appbar: {
		height: theme.mixins.toolbar.minHeight,
		background: '#1d1d1d',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	toolbar: {
		width: '100%',
		height: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	content: {
		marginTop: theme.mixins.toolbar.minHeight,
		height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
		padding: '0',
		overflow: 'hidden'
	},
	videoBoxes: {
		background: '#f4f4f4',
		width: '25vw',
		height: '100%'
	},
	chessboard: {
		background: 'red',
		width: '45vw',
		height: '100%'
	},
	matchDetails: {
		background: '#eee',
		width: '30vw',
		height: '100%'
	},
	title: {
		flexGrow: '1'
	},
	exitButton: {
		color: theme.palette.error.dark
	}
}));

const Playground = (props) => {
	const roomId = props.match.params.roomId;
	const { socket, setSocket } = useContext(SocketContext);

	const classes = useStyles();

	const [ anchorEl, setAnchorEl ] = useState(false);

	useEffect(() => {
		setSocket((prevSocket) => io('localhost:8000', { query: { roomId } }));
	}, []);

	return (
		<Fragment>
			<CssBaseline />
			<AppBar className={classes.appbar}>
				<Toolbar className={classes.toolbar}>
					<Typography variant="body1" color="initial" className={classes.title}>
						Room : {roomId}
					</Typography>
					<Hidden mdDown>
						<Button color="inherit" startIcon={<GroupAddOutlined />}>
							Invite Others
						</Button>
						<Tooltip title="Leave Room">
							<IconButton edge="end" className={classes.exitButton}>
								<ExitToAppRounded />
							</IconButton>
						</Tooltip>
					</Hidden>
					<Hidden mdUp>
						<IconButton edge="end" color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>
							<MoreVertSharp />
						</IconButton>
						<Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
							<MenuItem>
								<ListItemIcon>
									<GroupAddOutlined />
								</ListItemIcon>
								<ListItemText>Invite Others</ListItemText>
							</MenuItem>
							<MenuItem>
								<ListItemIcon>
									<ExitToAppRounded className={classes.exitButton} />
								</ListItemIcon>
								<ListItemText className={classes.exitButton} >Leave Room</ListItemText>
							</MenuItem>
						</Menu>
					</Hidden>
				</Toolbar>
			</AppBar>
			<Container className={classes.content} maxWidth="xl">
				<Box display="flex" justifyContent="flex-start" width="100%" height="100%">
					<Box className={classes.videoBoxes}>
						<Typography variant="h5">Video Chat Boxes</Typography>
					</Box>
					<Box className={classes.chessboard}>
						<Chessboard />
					</Box>
					<Box className={classes.matchDetails}>
						<h1>Match Details</h1>
					</Box>
				</Box>
			</Container>
		</Fragment>
	);
};

export default Playground;
