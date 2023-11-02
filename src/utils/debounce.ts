export const debounce = <T extends (...arg: any[])=> any>(fn: T, delay = 800) => {
  let timer;
  return function (...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
