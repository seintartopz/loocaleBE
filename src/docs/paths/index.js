const { responses } = require("../components/responses/index");

module.exports = {
  paths: {
    "/discover": {
      get: {
        tags: ["Landing Page"],
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    statusCode: {
                      type: "number",
                      example: 200,
                    },
                    status: {
                      type: "string",
                      example: "success",
                    },
                    data: {
                      type: "array",
                      items: {
                        type: "object",
                        $ref: "#/components/schemas/discoverData",
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad request",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    diaz: {
                      $ref: "#/components/schemas/error400",
                    },
                    status: {
                      $ref: "#/components/schemas/status",
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {},
    },
  },
};
