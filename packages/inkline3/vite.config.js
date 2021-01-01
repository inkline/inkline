const pathAliasMap = {
    '@/': '/src/',
    '~': '/node_modules/',
};

export default {
    resolvers: [
        {
            alias(path) {
                for (const [slug, res] of Object.entries(pathAliasMap)) {
                    if (path.startsWith(slug)) {
                        return path.replace(slug, res)
                    }
                }
            }
        }
    ]
}
