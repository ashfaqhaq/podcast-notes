import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ClippedDrawer from './ClippedDrawer'
// import InboxIcon from '@material-ui/icons/InboxIcon';
import ExitToApp from '@material-ui/icons/ExitToApp';
import MailIcon from '@material-ui/icons/Mail';
import Signout from './Signout';
import {Link} from "react-router-dom";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }));


  export default function SideDrawer(){
    const [logout, setLogout] = useState(false) 
    const classes = useStyles();

    return(
        <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        {logout?
    (<Signout /> ): (null)}
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {['Search', 'Notes', 'Editor', 'Community'].map((text, index) => (
              <Link to= {`/${text}`}>
              <ListItem button key={text}>
                
                <ListItemIcon>{index % 2 === 0 ? null : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
          {/* <List>
            {['All mail', 'Trash', 'Log out'].map((text, index) => (
              <ListItem button key={text} >
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List> */}
           <List>
                <Button onClick={()=>setLogout(true)}> Signout</Button>
                <Button onClick={()=>{console.log("asdasd")}}> Signout</Button>
              <ListItem  button key={'signout'} >
                <ListItemIcon >{ <ExitToApp />}</ListItemIcon>
                <ListItemText primary={'logout'}  />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    )


  }