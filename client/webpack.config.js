module.exports = {
  resolve: {
    modules: [resolve(process.cwd(), 'src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};