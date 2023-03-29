const shutDown = (server) => {
  server.close(() => {
    console.log('SHUT DOWN GRACEFULLY');
    process.exit(0);
  });

  setTimeout(() => {
    console.error('COULD NOT CLOSE CONNECTIONS IN TIME, FORCEFULLY SHUT DOWN');
    process.exit(1);
  }, 10000);
};

module.exports = {
  shutDown,
};
