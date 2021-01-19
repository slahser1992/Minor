import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';

const MinorAppBar = withStyles((theme) => ({
	root: {
		background: 'linear-gradient(45deg, #bdbdbd 30%, #212121 90%)',
	}
}))(({ children, ...props }) => (
	<AppBar position={"fixed"} className={props.classes.root}>
		{children}
	</AppBar>
));


export default MinorAppBar;