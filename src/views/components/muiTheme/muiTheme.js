import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createMuiTheme } from 'material-ui/styles';
import * as Colors from 'material-ui/colors';
import createPalette from 'material-ui/styles/createPalette';


const muiTheme = () => {
    let overwrites = {
  palette: {        
        primary: "#0d47a1",
        "primary2Color": "#1565c0",
        "accent1Color": "#e53935",
        "pickerHeaderColor": "#66bb6a",
        type: 'light'
    }    
};
console.log("THEME2::",overwrites);
return createPalette(overwrites);
}

export default muiTheme;

