function tagsFilter(tagsArr) {
  return {
    type: "setTagFilter",
    data: tagsArr, //arr
  };
}

export default tagsFilter;
