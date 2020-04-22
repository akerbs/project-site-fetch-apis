/**
 * EXAMPLE Structure
 */
const { src, dest } = require('gulp');

module.exports = (settings) => {
  const fnName = () => {
    const sourceFiles = '';
    const targetFolder = '';

    src(sourceFiles).pipe(dest(targetFolder));
  };

  return {
    task: fnName
  };
};
