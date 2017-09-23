module.exports = function FilterTypesPlugin(
  builder,
  {
    connectionFilterAllowedFieldTypes = [
      "String",
      "Int",
      "Float",
      "Boolean",
      "Datetime",
      "Date",
      "Time",
      "JSON",
    ],
  } = {}
) {
  builder.hook("build", build => {
    const connectionFilterOperators = {};
    return build.extend(build, {
      connectionFilterOperators,
      addConnectionFilterOperator(
        name,
        description,
        resolveType,
        resolveWhereClause,
        options
      ) {
        if (!name) {
          throw new Error("No filter operator name specified");
        }
        if (connectionFilterOperators[name]) {
          throw new Error("There is already a filter operator with this name");
        }
        if (!resolveType) {
          throw new Error("No filter operator type specified");
        }
        if (!resolveWhereClause) {
          throw new Error("No filter operator where clause resolver specified");
        }
        connectionFilterOperators[name] = {
          name,
          description,
          resolveType,
          resolveWhereClause,
          options,
        };
      },
      connectionFilterAllowedFieldTypes,
    });
  });
};
