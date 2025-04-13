<template>
    <Grid container>
        <Grid direction="row">
            <Grid size="3">1</Grid>
            <Grid size="3">2</Grid>
            <Grid size="3">3</Grid>
            <Grid size="3">4</Grid>
        </Grid>

        <Grid direction="row-reverse">
            <Grid size="3">1</Grid>
            <Grid size="3">2</Grid>
            <Grid size="3">3</Grid>
            <Grid size="3">4</Grid>
        </Grid>

        <Grid direction="column">
            <Grid size="3">1</Grid>
            <Grid size="3">2</Grid>
            <Grid size="3">3</Grid>
            <Grid size="3">4</Grid>
        </Grid>

        <Grid direction="column-reverse">
            <Grid size="3">1</Grid>
            <Grid size="3">2</Grid>
            <Grid size="3">3</Grid>
            <Grid size="3">4</Grid>
        </Grid>

        <Grid :direction="{ xs: 'column', md: 'row' }">
            <Grid size="3">1</Grid>
            <Grid size="3">2</Grid>
            <Grid size="3">3</Grid>
            <Grid size="3">4</Grid>
        </Grid>

        <Grid direction-xs="column" direction-md="row">
            <Grid size="3">1</Grid>
            <Grid size="3">2</Grid>
            <Grid size="3">3</Grid>
            <Grid size="3">4</Grid>
        </Grid>
    </Grid>
</template>
