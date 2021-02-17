const { authenticate } = require('@feathersjs/authentication').hooks;
const { fastJoin, disallow } = require("feathers-hooks-common");

const joinsResolves = {
  joins: {
    join: () => async (records, context) => {
      // let
      [records.user, records.blog] = await Promise.all([
        context.app
          .service("users")
          .getModel()
          .findOne({
            where: { id: records.user_id},
          }),
        context.app
          .service("blogs")
          .getModel()
          .findOne({
            where: { id: records.blog_id},
          }),
      ]);
    },
  },
};

module.exports = {
  before: {
    all: [ ],
    find: [],
    get: [],
    create: [authenticate('jwt')],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [],
    find: [fastJoin(joinsResolves)],
    get: [fastJoin(joinsResolves)],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
