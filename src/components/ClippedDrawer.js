import React from 'react';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';
import NotesIcon from '@material-ui/icons/Notes';
import { Switch,Route,Link } from 'react-router-dom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Editor from '../components/Editor/Editor'
import Notes from '../components/Notes'
import Search from '../components/Search'
// import InboxIcon from '@material-ui/icons/InboxIcon';
import EpisodeList from './EpisodeList';
import Signout from './Signout';
const drawerWidth = 240;



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    drawerPaper: { background: "white" }
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background:'#10B981',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function ClippedDrawer() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const [logout, setLogout] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      {logout?
      <Signout/>:null}
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
            <div className="text-3xl font-semibold text-green-900">
           PodcastKeep
           </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerPaper]: true,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <List>
          {['Search'].map((text, index) => (<Link to={"/"+text}>
          <ListItem button key={text}>
                 
              <ListItemIcon>{index % 2 === 0 ? <SearchIcon /> : <NotesIcon />}</ListItemIcon>
              <ListItemText primary={text} />
               
            </ListItem>
            </Link>
          
          ))}
<ListItem button key={Signout} onClick={()=>{setLogout(true)}}>
              <ListItemIcon> <ExitToAppIcon/>  </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>

          
        </List>
        <Divider />
        {/* <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts','Inbox', 'Starred', 'Send email', 'Drafts','Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text} onClick={()=>{console.log(text)}}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
        <Divider />
       
      </Drawer>

      <main className={classes.content}>
        <div className={classes.toolbar} />
       
        <Switch>
          <Route exact path ="/">
          <Search />
          </Route>
          <Route path="/notes">
            <Notes />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/editor/:episodeID">
            <Editor />
          </Route>
          <Route path="/episodes">
            <EpisodeList />
          </Route>
        </Switch>
      </main> 
    </div>
  );
}
