export namespace Commands {
    export namespace Generate {
        export namespace CSS {
            export const name = 'css';
            export const messages = {
                success: 'CSS generated successfully.',
                error: 'An unexpected error occurred.'
            };

            export interface Options {
                config?: string;
                outputDir?: string;
                extname?: string;
            }
        }
    }
}
