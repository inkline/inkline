<template>
    <div class="app-article">
        <slot />
    </div>
</template>

<style>
.app-article {
    width: 100%;
    max-width: 720px;
    box-sizing: border-box;

    article {
        > h1:first-child + p {
            font-weight: var(--lead--font-weight);
            font-size: var(--font-size-lg);

            a:hover::after {
                display: none;
            }
        }
    }

    a[target='_blank'] {
        --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='var(--font-size)' height='var(--font-size)' viewBox='0 0 13 13'%3E%3C!-- Icon from All by undefined - undefined --%3E%3Cpath fill='%23888888' fill-rule='evenodd' d='M3 2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V8.5a.5.5 0 0 0-1 0V12H3V3h3.5a.5.5 0 0 0 0-1zm9.854.146a.5.5 0 0 1 .146.351V5.5a.5.5 0 0 1-1 0V3.707L6.854 8.854a.5.5 0 1 1-.708-.708L11.293 3H9.5a.5.5 0 0 1 0-1h3a.5.5 0 0 1 .354.146' clip-rule='evenodd'/%3E%3C/svg%3E");

        &::after {
            content: '';
            width: 0.9em;
            height: 0.9em;
            mask-size: var(--font-size);
            -webkit-mask-size: var(--font-size);
            mask: var(--svg);
            display: inline-block;
            -webkit-mask: var(--svg);
            background-color: var(--color-primary);
            color: inherit;
            margin-left: var(--spacing-2xs);
            margin-right: var(--spacing-2xs);
        }
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        a[href^='#'] {
            --svg: url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 256 256' width='var(--font-size)' height='var(--font-size)' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M224 88h-48.6l8.47-46.57a8 8 0 0 0-15.74-2.86l-9 49.43H111.4l8.47-46.57a8 8 0 0 0-15.74-2.86L95.14 88H48a8 8 0 0 0 0 16h44.23l-8.73 48H32a8 8 0 0 0 0 16h48.6l-8.47 46.57a8 8 0 0 0 6.44 9.3A8 8 0 0 0 80 224a8 8 0 0 0 7.86-6.57l9-49.43h47.74l-8.47 46.57a8 8 0 0 0 6.44 9.3a8 8 0 0 0 1.43.13a8 8 0 0 0 7.86-6.57l9-49.43H208a8 8 0 0 0 0-16h-44.23l8.73-48H224a8 8 0 0 0 0-16m-76.5 64H99.77l8.73-48h47.73Z'/%3E%3C/svg%3E");

            color: inherit;
            position: relative;

            &::before {
                content: '';
                display: none;
                width: 0.9em;
                height: 0.9em;
                mask-size: 0.9em;
                -webkit-mask-size: 0.9em;
                mask: var(--svg);
                -webkit-mask: var(--svg);
                background-color: var(--color-primary);
                color: inherit;
                position: absolute;
                top: 0.1em;
                left: calc(-0.9em - var(--spacing-2xs));
            }

            &:hover {
                text-decoration: none;

                &::before {
                    display: inline-block;
                }
            }
        }
    }
}
</style>
