function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms || 5000));
}

export { sleep };
