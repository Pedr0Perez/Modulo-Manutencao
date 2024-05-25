import React from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export default function ThemeBtn({ children }) {
    const sisColor = red[700];

    const outerTheme = createTheme({
        palette: {
            primary: {
                main: sisColor
            },
        },
    });

    return (
        <ThemeProvider theme={outerTheme}>
            {children}
        </ThemeProvider>
    );

}