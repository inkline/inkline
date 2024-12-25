<template>
    <Media>
        <template #image>
            <img src="../assets/placeholder-100x100.jpg" height="80" width="80" alt="Media Image" />
        </template>
        <h3 class="_margin:0">Media Title</h3>
        <p class="_margin:0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>

        <Media>
            <template #image>
                <img
                    src="../assets/placeholder-100x100.jpg"
                    height="60"
                    width="60"
                    alt="Media Image"
                />
            </template>
            <h3 class="_margin:0">Nested Media Title</h3>
            <p class="_margin:0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
        </Media>
    </Media>
</template>
<script setup></script>
