import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { getTokens } from './mds-helpers';
import MarketplaceListItem from './MarketplaceListItem';


const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

export default function InteractiveList() {
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
    const [tokens, setTokens] = React.useState();

    React.useEffect(() => {
        getTokens(setTokens);
    }, []);

    function isMarketplaceItem(value) {
        return value.name.app === 'stampd';
    }

    if (tokens) {
        return (
            <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
                <FormGroup row>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={dense}
                                onChange={(event) => setDense(event.target.checked)}
                            />
                        }
                        label="Enable dense"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={secondary}
                                onChange={(event) => setSecondary(event.target.checked)}
                            />
                        }
                        label="Enable secondary text"
                    />
                </FormGroup>
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                            Marketplace
                        </Typography>
                        <Demo>
                            <List dense={dense}>
                                {tokens.filter(isMarketplaceItem).map(token =>
                                    <MarketplaceListItem
                                        image={token.name.image}
                                        price={token.name.price}
                                        key={token.tokenid}
                                        primary={token.name.name}
                                        secondary={secondary}
                                        to={`/item/${token.tokenid}`}
                                        description={token.name.desciption} />
                                )}
                            </List>
                        </Demo>
                    </Grid>
                </Grid>
            </Box>
        );
    } else {
        return <p>You have no items. Please add one!</p>
    }
}