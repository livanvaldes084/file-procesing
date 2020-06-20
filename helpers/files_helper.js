/**
 * Get File Size
 * @param {*} stats
 */
exports.getFileSize = (stats) => {
  let { size } = stats;
  let i = Math.floor(Math.log(size) / Math.log(1024));
  return (
    (size / Math.pow(1024, i)).toFixed(1) * 1 +
    " " +
    ["B", "KB", "MB", "GB", "TB"][i]
  );
};
