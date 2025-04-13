<template>
    <Grid container>
        <Grid>
            <Grid xs="6" md="8">xs=6 md=8</Grid>
            <Grid xs="6" md="4">xs=6 md=4</Grid>
            <Grid xs="6" md="4">xs=6 md=4</Grid>
            <Grid xs="6" md="8">xs=6 md=8</Grid>
        </Grid>
        <Grid>
            <Grid :size="{ xs: 6, md: 8 }">xs=6 md=8</Grid>
            <Grid :size="{ xs: 6, md: 4 }">xs=6 md=4</Grid>
            <Grid :size="{ xs: 6, md: 4 }">xs=6 md=4</Grid>
            <Grid :size="{ xs: 6, md: 8 }">xs=6 md=8</Grid>
        </Grid>
    </Grid>
</template>
