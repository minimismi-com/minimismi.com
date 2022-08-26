export const validateEmail = (email: string): boolean => {
  const filter =
    /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
  return String(email).search(filter) !== -1;
};

export const customScrollTo = (offset: number, callback: any) => {
  const fixedOffset = offset.toFixed();
  const onScroll = function () {
    if (window.pageYOffset.toFixed() === fixedOffset) {
      window.removeEventListener(`scroll`, onScroll);
      callback();
    }
  };

  window.addEventListener(`scroll`, onScroll);
  onScroll();
  window.scrollTo({
    top: offset,
    behavior: `smooth`,
  });
};
