export async function flushPromises(): Promise<void> {
  await new Promise(function (resolve) {
    setImmediate(resolve);
  });
}
