// Trailing-edge debounce factory with a real `cancel()`. Vendored locally so the
// plugin stays self-contained (no dependency on @sero-ai/common's publish cadence).

export interface DebouncedFn<Args extends unknown[]> {
  (...args: Args): void;
  cancel: () => void;
}

/**
 * Trailing-edge debounce: coalesces rapid calls and invokes `fn` once, `delay`
 * ms after the last call. `cancel()` clears any pending invocation (call it on
 * unmount / teardown to avoid a stale write after the owner is gone).
 */
export function createDebouncedFn<Args extends unknown[]>(
  fn: (...args: Args) => void,
  delay: number,
): DebouncedFn<Args> {
  let timer: ReturnType<typeof setTimeout> | null = null;
  const debounced = (...args: Args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn(...args);
    }, delay);
  };
  debounced.cancel = () => {
    if (!timer) return;
    clearTimeout(timer);
    timer = null;
  };
  return debounced;
}
