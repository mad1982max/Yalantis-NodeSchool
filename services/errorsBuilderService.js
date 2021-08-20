const errorsBuilderService = (errors) => {

  //from [{param: "name", msg: "not empty"}, {param: "name", msg: "at least 5 char"}]
  //to [{name: "not empty", "at least 5 char"}]

  return errors.reduce((collector, current) => {
    const singleError = {};
    const existParam = collector.find(item => current.param in item)

    if (existParam) {
      existParam[current.param] += ", " + current.msg
    } else {
      singleError[current.param] = current.msg;
      collector.push(singleError);
    }

    return collector;
  }, []);
}

module.exports = errorsBuilderService;