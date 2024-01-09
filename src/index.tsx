import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { Button, Card, Typography, CardContent, CardActions, createTheme, ThemeProvider } from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from 'react-dom/client';

const App = () => (
    <div>
        <Button variant="contained" color="primary">
            Hello World
        </Button>
        <Card>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    Hello World
                </Typography>
                <Typography variant="h3" component="h2">
                    Hello World
                </Typography>
                <Typography variant="body2">Hello World</Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    </div>
);

const container = document.querySelector("#root")!;
const shadowContainer = container.attachShadow({ mode: "open" });
const shadowRootElement = document.createElement("div");
shadowContainer.appendChild(shadowRootElement);

const cache = createCache({
    key: "css",
    prepend: true,
    container: shadowContainer,
});

const shadowTheme = createTheme({
    components: {
        MuiPopover: {
            defaultProps: {
                container: shadowRootElement
            }
        },
        MuiPopper: {
            defaultProps: {
                container: shadowRootElement
            }
        },
        MuiModal: {
            defaultProps: {
                container: shadowRootElement
            }
        }
    }
});

createRoot(shadowRootElement).render(
    <StrictMode>
        <CacheProvider value={cache}>
            <ThemeProvider theme={shadowTheme}>
                <Typography>Shadow DOM</Typography>
                <App />
            </ThemeProvider>
        </CacheProvider>
    </StrictMode>
);
